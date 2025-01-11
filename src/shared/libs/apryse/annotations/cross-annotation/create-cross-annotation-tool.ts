import { AnnotationManager } from '../../annotation-manager';
import { DocumentCore } from '../../document-core';
import { DocumentViewer, DocumentViewerInstance } from '../../document-viewer';

export const CrossCreateToolName = 'CrossCreateTool';

export const createCrossAnnotationTool = () => {
  const documentCore = DocumentCore.core;

  const { annotationManager } = AnnotationManager;

  const { documentViewer } = DocumentViewer;

  const CrossAnnotation = annotationManager.getRegisteredAnnotationTypes().cross[0];

  class CrossCreateTool extends documentCore.Tools.GenericAnnotationCreateTool {
    constructor(documentViewer: DocumentViewerInstance) {
      super(documentViewer, CrossAnnotation);

      this.name = CrossCreateToolName;
    }
  }

  // Custom tool registation
  const crossAnnotationTool = new CrossCreateTool(documentViewer);

  return { tool: crossAnnotationTool, name: CrossCreateToolName };
};
