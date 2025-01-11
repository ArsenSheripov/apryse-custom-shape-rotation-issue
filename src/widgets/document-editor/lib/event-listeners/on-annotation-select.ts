import { Core } from '@pdftron/webviewer';
import { dataElements } from 'entities/viewer/lib';
import { viewerActions } from 'entities/viewer/model';
import { AnnotationManager } from 'shared/libs/apryse/annotation-manager';
import { disableImmediateActionOnAnnotationSelection } from 'shared/libs/apryse/helpers/disable-immediate-action-on-annotation-selection';
import { AppDispatch } from 'shared/libs/redux';

export const onAnnotationSelect =
  (dispatch: AppDispatch) => (annotations: Core.Annotations.Annotation[], action: string) => {
    if (action !== 'selected') return;

    const lastAnnotation = annotations[annotations.length - 1];

    const { annotationManager } = AnnotationManager;
    const isReadOnlyModeEnabled = annotationManager.isReadOnlyModeEnabled();

    if (!lastAnnotation) return;

    if (!isReadOnlyModeEnabled) {
      dispatch(viewerActions.openElement(dataElements.ANNOTATION_POPUP));
    }
    dispatch(viewerActions.setFocusedAnnotation(lastAnnotation));

    disableImmediateActionOnAnnotationSelection();
  };
