import { AnnotationManagerInstance } from '../annotation-manager';
import { createCheckAnnotation } from '../annotations/check-annotation/create-check-annotation';
import { createCrossAnnotation } from '../annotations/cross-annotation/create-cross-annotation';
import { createStarAnnotation } from '../annotations/star-annotation/create-star-annotation';
import { DocumentCoreInstance } from '../document-core';

interface RegisterAnnotationsParams {
  Annotations: DocumentCoreInstance['Annotations'];
  annotationManager: AnnotationManagerInstance;
}

export const registerAnnotations = ({ Annotations, annotationManager }: RegisterAnnotationsParams) => {
  const annotationCreators = [createCrossAnnotation, createCheckAnnotation, createStarAnnotation];

  annotationCreators.forEach(creator => {
    const Annotation = creator({ Annotations });

    annotationManager.registerAnnotationType(Annotation.prototype.elementName, Annotation);
  });
};
