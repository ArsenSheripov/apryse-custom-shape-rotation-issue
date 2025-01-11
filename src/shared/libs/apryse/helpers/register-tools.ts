import { createCheckAnnotationTool } from '../annotations/check-annotation/create-check-annotation-tool';
import { createCrossAnnotationTool } from '../annotations/cross-annotation/create-cross-annotation-tool';
import { createStarAnnotationTool } from '../annotations/star-annotation/create-star-annotation-tool';
import { DocumentViewerInstance } from '../document-viewer';

interface RegisterToolsParams {
  documentViewer: DocumentViewerInstance;
}

export const registerTools = ({ documentViewer }: RegisterToolsParams) => {
  const customToolCreators = [createCheckAnnotationTool, createCrossAnnotationTool, createStarAnnotationTool];

  const toolModeMap = documentViewer.getToolModeMap();

  customToolCreators.forEach(creator => {
    const { tool, name } = creator();

    toolModeMap[tool.name || name] = tool;
  });
};
