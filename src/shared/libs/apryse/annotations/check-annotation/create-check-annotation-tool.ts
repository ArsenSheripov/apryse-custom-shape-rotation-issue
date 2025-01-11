import { AnnotationManager } from '../../annotation-manager';
import { DocumentCore } from '../../document-core';
import { DocumentViewer, DocumentViewerInstance } from '../../document-viewer';

export const CheckCreateToolName = 'CheckCreateTool';

export const createCheckAnnotationTool = () => {
  const documentCore = DocumentCore.core;

  const { annotationManager } = AnnotationManager;

  const { documentViewer } = DocumentViewer;

  const CheckAnnotation = annotationManager.getRegisteredAnnotationTypes().check[0];

  class CheckCreateTool extends documentCore.Tools.GenericAnnotationCreateTool {
    constructor(documentViewer: DocumentViewerInstance) {
      super(documentViewer, CheckAnnotation);
      this.name = CheckCreateToolName;
    }
  }

  // Custom tool registation
  const checkAnnotationTool = new CheckCreateTool(documentViewer);

  return { tool: checkAnnotationTool, name: CheckCreateToolName };
};
