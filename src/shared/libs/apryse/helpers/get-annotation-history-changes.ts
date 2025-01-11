import { DocumentViewer } from '../document-viewer';

export const getAnnotationHistoryChanges = () => {
  const { documentViewer } = DocumentViewer;

  const annotationHistoryManager = documentViewer.getAnnotationHistoryManager();

  const canUndo = annotationHistoryManager.canUndo();
  const canRedo = annotationHistoryManager.canRedo();

  return [canUndo, canRedo];
};
