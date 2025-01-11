import { Core } from '@pdftron/webviewer';
import { viewerActions } from 'entities/viewer/model';
import { AnnotationManager } from 'shared/libs/apryse/annotation-manager';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { AnnotationsChangedActions } from 'shared/libs/apryse/types';
import { AppDispatch } from 'shared/libs/redux';

export const onAnnotationChanged =
  (dispatch: AppDispatch) => (annotations: Core.Annotations.Annotation[], action: AnnotationsChangedActions) => {
    const { annotationManager } = AnnotationManager;
    const { core } = DocumentCore;

    const redactionsList = annotationManager
      .getAnnotationsList()
      .filter(annot => annot instanceof core.Annotations.RedactionAnnotation);

    dispatch(viewerActions.setRedactionAnnotationsList(redactionsList));

    dispatch(viewerActions.setAnnotationChanged({ annotations, action }));
  };
