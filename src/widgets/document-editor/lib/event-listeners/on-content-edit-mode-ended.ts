import { viewerActions } from 'entities/viewer/model';
import { AnnotationManager } from 'shared/libs/apryse/annotation-manager';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { DocumentViewer } from 'shared/libs/apryse/document-viewer';
import { AppDispatch } from 'shared/libs/redux';

export const onContentEditModeEnded = (dispatch: AppDispatch) => () => {
  const { core } = DocumentCore;
  const { documentViewer } = DocumentViewer;
  const { annotationManager } = AnnotationManager;

  const annotationsList = annotationManager.getAnnotationsList();

  dispatch(viewerActions.setEditContentModeStatus('disabled'));

  annotationManager.showAnnotations(annotationsList);

  const allTools = Object.values(documentViewer.getToolModeMap());

  for (const tool of allTools) {
    if (tool instanceof core.Tools.AnnotationSelectTool) {
      tool.enableImmediateActionOnAnnotationSelection();
    }
  }
};
