import { Core } from '@pdftron/webviewer';

export type AnnotationManagerInstance = Core.AnnotationManager;

class AnnotationManagerClass {
  annotationManager: AnnotationManagerInstance = {} as AnnotationManagerInstance;

  setAnnotationManager(annotationManager: AnnotationManagerInstance) {
    this.annotationManager = annotationManager;

    return this.annotationManager;
  }
}

export const AnnotationManager = new AnnotationManagerClass();
