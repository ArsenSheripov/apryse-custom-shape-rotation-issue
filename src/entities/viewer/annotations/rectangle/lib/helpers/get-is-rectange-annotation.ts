import { Core } from '@pdftron/webviewer';
import { toolNames } from 'entities/viewer/lib';
import { DocumentCore } from 'shared/libs/apryse/document-core';

export const getIsRectangleAnnotation = (annotation: Core.Annotations.Annotation) => {
  const { core } = DocumentCore;

  return (
    annotation.ToolName === toolNames.rectangle || annotation.ToolName === core.Tools.ToolNames.RECTANGLE.toString()
  );
};
