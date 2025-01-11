import { Core } from '@pdftron/webviewer';

export type DocumentViewerInstance = Core.DocumentViewer;

class DocumentViewerClass {
  documentViewer: DocumentViewerInstance = {} as DocumentViewerInstance;

  setDocumentViewer(viewer: DocumentViewerInstance) {
    this.documentViewer = viewer;

    return this.documentViewer;
  }
}

export const DocumentViewer = new DocumentViewerClass();
