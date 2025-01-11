import { DocumentViewer } from '../document-viewer';

export const getTextContentHistoryChanges = () => {
  const { documentViewer } = DocumentViewer;

  const contentEditHistoryManager = documentViewer.getContentEditHistoryManager();

  const canUndo = contentEditHistoryManager.canUndo();
  const canRedo = contentEditHistoryManager.canRedo();

  return [canUndo, canRedo];
};
