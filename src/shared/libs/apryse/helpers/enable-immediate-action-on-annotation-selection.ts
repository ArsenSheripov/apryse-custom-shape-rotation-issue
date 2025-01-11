import { DocumentCore } from '../document-core';
import { DocumentViewer } from '../document-viewer';

export const enableImmediateActionOnAnnotationSelection = () => {
  const allTools = Object.values(DocumentViewer.documentViewer.getToolModeMap());

  allTools.forEach(tool => {
    if (tool instanceof DocumentCore.core.Tools.AnnotationSelectTool) {
      tool.enableImmediateActionOnAnnotationSelection();
    }
  });
};
