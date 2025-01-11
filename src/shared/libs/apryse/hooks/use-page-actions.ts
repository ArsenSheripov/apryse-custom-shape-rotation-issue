import { DocumentCore } from '../document-core';
import { DocumentViewer } from '../document-viewer';
import { setCurrentPage } from '../helpers/set-current-page';

export const workerTypes = {
  IMAGE: 'image',
  PDF: 'pdf',
  OFFICE: 'office',
  LEGACY_OFFICE: 'legacyOffice',
  OFFICE_EDITOR: 'officeEditor',
  WEBVIEWER_SERVER: 'webviewerServer',
  XOD: 'xod',
  CONTENT_EDIT: 'contentEdit',
  ALL: 'all',
};

export const usePageActions = () => {
  const { core } = DocumentCore;
  const { documentViewer } = DocumentViewer;
  const currentDocument = documentViewer.getDocument();

  const navigateToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const movePageUp = (pageNumber: number) => {
    if (pageNumber - 1 <= 0) return;
    currentDocument.movePages([pageNumber], pageNumber - 1);
  };

  const movePageDown = (pageNumber: number) => {
    if (pageNumber + 2 > currentDocument.getPageCount() + 1) return;
    currentDocument.movePages([pageNumber], pageNumber + 2);
  };

  const movePageToTop = (pageNumber: number) => {
    currentDocument.movePages([pageNumber], 0);
  };

  const movePageToBottom = (pageNumber: number) => {
    currentDocument.movePages([pageNumber], currentDocument.getPageCount() + 1);
  };

  const getNewRotation = (currentRotations: any, counterClockwise = false) => {
    const { E_0, E_90, E_180, E_270 } = core.PageRotation;
    switch (currentRotations) {
      case E_270:
        return counterClockwise ? E_180 : E_0;
      case E_180:
        return counterClockwise ? E_90 : E_270;
      case E_90:
        return counterClockwise ? E_0 : E_180;
      default:
        return counterClockwise ? E_270 : E_90;
    }
  };

  const canRotateLoadedDocument = () => {
    const docType = currentDocument.getType();

    return (
      workerTypes.PDF === docType ||
      workerTypes.IMAGE === docType ||
      (docType === workerTypes.WEBVIEWER_SERVER && !currentDocument.isWebViewerServerDocument())
    );
  };

  const rotatePages = (pageNumbers: number[], counterClockwise: boolean) => {
    if (canRotateLoadedDocument()) {
      const rotation = counterClockwise ? core.PageRotation.E_270 : core.PageRotation.E_90;
      pageNumbers.forEach(index => {
        currentDocument.rotatePages([index], rotation);
      });
    } else {
      const currentRotations = documentViewer.getPageRotations();
      for (const page of pageNumbers) {
        documentViewer.setRotation(getNewRotation(currentRotations[page], counterClockwise), page);
      }
    }
  };

  const insertAbove = async (pageNumber: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const width = documentViewer.getPageWidth(pageNumber);
        const height = documentViewer.getPageHeight(pageNumber);
        currentDocument.insertBlankPages([pageNumber], width, height);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const insertBelow = async (pageNumber: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const width = documentViewer.getPageWidth(pageNumber);
        const height = documentViewer.getPageHeight(pageNumber);
        currentDocument.insertBlankPages([pageNumber + 1], width, height);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const deletePages = async (pageNumbers: number[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        currentDocument.removePages(pageNumbers);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    movePageUp,
    movePageDown,
    movePageToTop,
    movePageToBottom,
    rotatePages,
    insertAbove,
    insertBelow,
    deletePages,
    navigateToPage,
  };
};
