import { Core } from '@pdftron/webviewer';

import { AnnotationManager } from '../../annotation-manager';

export const deleteLinkFromAnnotation = (
  linkAnnotation: Core.Annotations.Link,
  originalAnnotation: Core.Annotations.Annotation
) => {
  const { annotationManager } = AnnotationManager;

  annotationManager.ungroupAnnotations([linkAnnotation, originalAnnotation]);

  annotationManager.deleteAnnotation(linkAnnotation, { source: 'unlink' });
};
