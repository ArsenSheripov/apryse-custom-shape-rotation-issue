import { Core } from '@pdftron/webviewer';

import { StarAnnotationName } from '../create-star-annotation';
import { StarCreateToolName } from '../create-star-annotation-tool';

export const getIsStarAnnotation = (annotation: Core.Annotations.Annotation) => {
  return annotation.ToolName === StarCreateToolName || annotation.elementName === StarAnnotationName;
};
