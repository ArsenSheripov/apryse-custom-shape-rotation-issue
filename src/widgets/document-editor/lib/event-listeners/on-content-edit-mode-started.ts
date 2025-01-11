import { viewerActions } from 'entities/viewer/model';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { DocumentViewer } from 'shared/libs/apryse/document-viewer';
import { AppDispatch } from 'shared/libs/redux';

export const onContentEditModeStarted = (dispatch: AppDispatch) => () => {
  const { core } = DocumentCore;
  const { documentViewer } = DocumentViewer;

  dispatch(viewerActions.setEditContentModeStatus('enabled'));

  const allTools = Object.values(documentViewer.getToolModeMap());

  for (const tool of allTools) {
    if (tool instanceof core.Tools.AnnotationSelectTool) {
      tool.disableImmediateActionOnAnnotationSelection();
    }
  }
};
