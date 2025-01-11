import { AnnotationManager } from '../../annotation-manager';
import { DocumentCore } from '../../document-core';
import { DocumentViewer, DocumentViewerInstance } from '../../document-viewer';

export const StarCreateToolName = 'StarCreateTool';

export const createStarAnnotationTool = () => {
  const documentCore = DocumentCore.core;

  const { annotationManager } = AnnotationManager;

  const { documentViewer } = DocumentViewer;

  const StarAnnotation = annotationManager.getRegisteredAnnotationTypes().star[0];

  class StarCreateTool extends documentCore.Tools.GenericAnnotationCreateTool {
    constructor(documentViewer: DocumentViewerInstance) {
      super(documentViewer, StarAnnotation);
      this.name = StarCreateToolName;
    }
  }

  const starAnnotationTool = new StarCreateTool(documentViewer);

  return { tool: starAnnotationTool, name: StarCreateToolName };
};
