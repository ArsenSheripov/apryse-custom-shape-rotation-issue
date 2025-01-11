import { AnnotationManager } from '../../annotation-manager';
import { DocumentCore } from '../../document-core';

export const getLinkAnnotationByMouseEvent = (e: MouseEvent) => {
  const annotations = AnnotationManager.annotationManager.getAnnotationsByMouseEvent(e, true);

  const linkAnnotation = annotations.find(annot => annot instanceof DocumentCore.core.Annotations.Link);
  const originalAnnotation = annotations.find(
    annot =>
      annot instanceof DocumentCore.core.Annotations.Annotation &&
      annot instanceof DocumentCore.core.Annotations.Link === false
  );

  return {
    linkAnnotation,
    originalAnnotation,
  };
};
