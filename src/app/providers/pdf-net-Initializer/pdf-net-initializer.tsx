import { viewerActions } from 'entities/viewer/model';
import { useEffect } from 'react';
import { APRYSE_KEY } from 'shared/constants/env';
import { DocumentCoreInstance } from 'shared/libs/apryse/document-core';
import { PDFNet } from 'shared/libs/apryse/pdf-net';
import { useAppDispatch } from 'shared/libs/redux';

import { setupWebViewerCore } from 'widgets/document-editor/lib/helpers/setup-webviewer-core';

export const PDFNetInitializer = ({ children }: {children: JSX.Element}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializePDFNet = async () => {
      if ('Core' in window !== false) {
        const WebViewerCore = window.Core as DocumentCoreInstance;

        setupWebViewerCore(WebViewerCore);
        await WebViewerCore.PDFNet.initialize(APRYSE_KEY);

        PDFNet.setPDFNet(WebViewerCore.PDFNet);
        dispatch(viewerActions.setIsPDFNetInitialized(true));
      }
    };

    initializePDFNet();
  }, [dispatch]);

  return <>{children}</>;
};
