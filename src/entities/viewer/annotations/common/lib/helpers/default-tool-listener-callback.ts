import { Core } from '@pdftron/webviewer';
import { toolNames } from 'entities/viewer/lib';
import { viewerActions } from 'entities/viewer/model';
import { AnnotationManager } from 'shared/libs/apryse/annotation-manager';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { setToolByName } from 'shared/libs/apryse/helpers/set-tool-by-name';
import { AppDispatch } from 'shared/libs/redux';

export const defaultToolListenerCallback = (dispatch: AppDispatch) => (annotation: Core.Annotations.Annotation) => {
  const { annotationManager } = AnnotationManager;

  setToolByName(DocumentCore.core.Tools.ToolNames.EDIT, toolNames.select);

  dispatch(
    viewerActions.setActiveTool({
      activeToolName: toolNames.select,
      activeTool: null,
    })
  );

  setTimeout(() => {
    annotationManager.selectAnnotation(annotation);
  }, 0);
};
