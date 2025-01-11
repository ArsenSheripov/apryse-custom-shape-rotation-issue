import { Core } from '@pdftron/webviewer';

import { DocumentCore } from '../document-core';
import { DocumentViewer } from '../document-viewer';

export const setToolByName = (toolName: string | Core.Tools.ToolNames, associatedName?: string) => {
  const { core } = DocumentCore;

  const { documentViewer } = DocumentViewer;

  if (!documentViewer || !core) return null;

  const tool = documentViewer.getTool(toolName);

  tool.name = associatedName || tool.name || '';

  documentViewer.setToolMode(tool);

  return tool;
};
