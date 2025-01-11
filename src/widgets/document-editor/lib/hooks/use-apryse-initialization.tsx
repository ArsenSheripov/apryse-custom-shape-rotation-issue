import { Core } from '@pdftron/webviewer';
import { RefObject, useEffect, useRef, useState } from 'react';
import { AnnotationManager } from 'shared/libs/apryse/annotation-manager';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { DocumentViewer } from 'shared/libs/apryse/document-viewer';
import { registerAnnotations } from 'shared/libs/apryse/helpers/register-annotations';
import { registerTools } from 'shared/libs/apryse/helpers/register-tools';

import { resetBackspaceForContentEdit } from '../helpers/reset-backspace-for-content-edit';
import { setupDocumentViewer } from '../helpers/setup-document-viewer';
import { setupSelectionModel } from '../helpers/setup-selection-model';
import { setupTools } from '../helpers/setup-tools';
import { useAppDispatch, useAppSelector } from 'shared/libs/redux';
import { viewerSelectors } from 'entities/viewer/model';
import { setupEventHandlers } from '../helpers/setup-event-handlers';
import { PDFNet } from 'shared/libs/apryse/pdf-net';

interface UseApryseInitializationParams {
  viewer: RefObject<HTMLElement>;
  scrollView: RefObject<HTMLElement>;
  documentUrl?: string;
}

export const useApryseInitialization = ({
  scrollView,
  viewer,
  documentUrl,
}: UseApryseInitializationParams) => {
  const dispatch = useAppDispatch();
  const isPDFNetInitialized = useAppSelector(viewerSelectors.selectIsPDFNetInitialized);

useEffect(() => {  
  if (!('Core' in window) || !documentUrl || !isPDFNetInitialized) return;

  let cleanupHandlers: (() => void) | undefined;

  const initializeApryse = async () => {
    if (!('Core' in window)) return;

    const WebViewerCore = DocumentCore.core;
    console.log("🚀 ~ WebViewerCore:", WebViewerCore);

    const { Annotations } = WebViewerCore;

    const getPDFDoc = async () => {
      let retryCount = 0;
      const maxRetries = 10;

      while (!PDFNet.pdfNet?.PDFDoc?.createFromURL) {
        retryCount++;
        if (retryCount > maxRetries) {
          throw new Error('PDFNet.PDFDoc.createFromURL is not available after maximum retries.');
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const pdfDoc = await PDFNet.pdfNet.PDFDoc.createFromURL(documentUrl);

      return pdfDoc;
    };

    try {
      const pdfDoc = await getPDFDoc();

      const documentViewer = setupDocumentViewer({
        WebViewerCore,
        scrollView,
        viewer,
        documentSrc: pdfDoc,
      });

      const annotationManager = AnnotationManager.setAnnotationManager(
        documentViewer.getAnnotationManager()
      );

      setupSelectionModel(Annotations);

      const { addEventHandlers, removeEventHandlers } = setupEventHandlers(dispatch);

      documentViewer.addEventListener(
        'documentLoaded',
        async () => {
          setupTools({ documentViewer, documentCore: WebViewerCore });

          registerAnnotations({ Annotations, annotationManager });

          registerTools({ documentViewer });

          resetBackspaceForContentEdit(WebViewerCore);

          addEventHandlers();

          annotationManager.enableRedaction();
        },
        { once: true }
      );

      cleanupHandlers = () => {
        removeEventHandlers();
        documentViewer.closeDocument();
      };
    } catch (error) {
      console.error('Error during Apryse initialization:', error);
    }
  };

  initializeApryse();

  return () => {
    const handleDocClose = async () => {
      if (DocumentViewer.documentViewer.closeDocument)
        await DocumentViewer.documentViewer.closeDocument();
      if (DocumentViewer.documentViewer.dispose)
        DocumentViewer.documentViewer.dispose();
    };

    handleDocClose();
    if (cleanupHandlers) {
      cleanupHandlers();
    }
  };
}, [documentUrl, isPDFNetInitialized]);
};
