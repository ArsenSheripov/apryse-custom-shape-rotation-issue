import { DocumentViewer } from '../document-viewer';

export const setCurrentPage = (nextPageNumber: number) => {
  const totalPages = DocumentViewer.documentViewer.getPageCount();
  const currentPage = DocumentViewer.documentViewer.getCurrentPage();

  let nextPage = Math.min(totalPages, nextPageNumber);
  nextPage = Math.max(1, nextPage);

  if (nextPage !== currentPage) {
    DocumentViewer.documentViewer.setCurrentPage(nextPageNumber, false);
  }
};
