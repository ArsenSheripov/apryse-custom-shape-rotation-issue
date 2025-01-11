import { Core } from '@pdftron/webviewer';
import { AnnotationManager } from 'shared/libs/apryse/annotation-manager';

export const onToolModeUpdated = (newToolObject: Core.Tools.Tool, oldToolObject: Core.Tools.Tool) => {
  const { annotationManager } = AnnotationManager;
  if (
    newToolObject.name === 'PolylineTool' ||
    newToolObject.name === 'PolygonTool' ||
    newToolObject.name === 'CloudTool'
  ) {
    annotationManager.enableReadOnlyMode();
    return;
  }

  annotationManager.disableReadOnlyMode();
};
