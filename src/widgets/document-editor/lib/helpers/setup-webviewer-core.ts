import { DocumentCore, DocumentCoreInstance } from 'shared/libs/apryse/document-core';

export const setupWebViewerCore = (WebViewerCore: DocumentCoreInstance) => {
  WebViewerCore.setWorkerPath('/webviewer');
  WebViewerCore.enableFullPDF();

  DocumentCore.setCore(WebViewerCore);
};
