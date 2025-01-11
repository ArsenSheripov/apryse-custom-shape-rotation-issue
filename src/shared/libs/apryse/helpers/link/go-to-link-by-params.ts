import { DocumentViewer } from '../../document-viewer';
import { LinkParams } from '../../types';

export const goToLinkByParams = (params: LinkParams) => {
  if (params.url) {
    window.open(params.url, '_blank');
  }

  if (params.pageToLinkTo) {
    DocumentViewer.documentViewer.setCurrentPage(params.pageToLinkTo, false);
  }
};
