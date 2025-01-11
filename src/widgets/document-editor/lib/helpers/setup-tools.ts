import { DocumentCoreInstance } from 'shared/libs/apryse/document-core';
import { DocumentViewerInstance } from 'shared/libs/apryse/document-viewer';

interface SetupToolsParams {
  documentViewer: DocumentViewerInstance;
  documentCore: DocumentCoreInstance;
}

export const setupTools = ({ documentViewer, documentCore }: SetupToolsParams) => {
  const allTools = Object.values(documentViewer.getToolModeMap());

  for (const tool of allTools) {
    if (tool instanceof documentCore.Tools.AnnotationSelectTool) {
      tool.enableImmediateActionOnAnnotationSelection();
    }
  }
};
