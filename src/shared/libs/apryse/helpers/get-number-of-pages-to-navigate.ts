import { DocumentViewer } from '../document-viewer';

const mapDisplayModeToNumberOfPages = {
  Single: 1,
  Continuous: 1,
  Facing: 2,
  FacingContinuous: 2,
  CoverFacing: 2,
  Cover: 2,
};

export const getNumberOfPagesToNavigate = () => {
  const { mode } = DocumentViewer.documentViewer.getDisplayModeManager().getDisplayMode();

  return mapDisplayModeToNumberOfPages[mode as keyof typeof mapDisplayModeToNumberOfPages] || 1;
};
