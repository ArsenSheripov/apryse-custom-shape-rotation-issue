import { Core } from '@pdftron/webviewer';
import { RefObject } from 'react';
import { APRYSE_KEY } from 'shared/constants/env';
import { DocumentCoreInstance } from 'shared/libs/apryse/document-core';
import { DocumentViewer } from 'shared/libs/apryse/document-viewer';

interface SetupDocumentViewerParams {
  WebViewerCore: DocumentCoreInstance;
  scrollView: RefObject<HTMLElement>;
  viewer: RefObject<HTMLElement>;
  documentSrc?: string | Core.PDFNet.PDFDoc;
}

export const setupDocumentViewer = ({ WebViewerCore, scrollView, viewer, documentSrc }: SetupDocumentViewerParams) => {
  const documentViewer = DocumentViewer.setDocumentViewer(new WebViewerCore.DocumentViewer());

  if (scrollView.current) {
    documentViewer.setScrollViewElement(scrollView.current);
  }

  if (viewer.current) {
    documentViewer.setViewerElement(viewer.current);
  }

  documentViewer.enableAnnotations();

  if (documentSrc) {
    documentViewer.loadDocument(documentSrc, {
      l: APRYSE_KEY,
      onError: error => {
        console.error(error);
      },
    });
  }

  return documentViewer;
};
