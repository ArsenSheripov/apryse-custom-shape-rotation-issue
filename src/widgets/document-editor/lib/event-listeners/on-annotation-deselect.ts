import { Core } from '@pdftron/webviewer';
import { dataElements } from 'entities/viewer/lib';
import { viewerActions } from 'entities/viewer/model';
import { AnnotationManager } from 'shared/libs/apryse/annotation-manager';
import { enableImmediateActionOnAnnotationSelection } from 'shared/libs/apryse/helpers/enable-immediate-action-on-annotation-selection';
import { AppDispatch } from 'shared/libs/redux';

export const onAnnotationDeselect =
  (dispatch: AppDispatch) => (annotations: Core.Annotations.Annotation[], action: string) => {
    if (action === 'selected') return;

    const { annotationManager } = AnnotationManager;

    const isReadOnlyModeEnabled = annotationManager.isReadOnlyModeEnabled();

    if (!isReadOnlyModeEnabled) {
      dispatch(viewerActions.resetFocusedAnnotation());
      dispatch(viewerActions.closeElement(dataElements.ANNOTATION_POPUP));

      enableImmediateActionOnAnnotationSelection();
    }
  };
