import { Core } from '@pdftron/webviewer';

import { CheckAnnotationName } from '../../create-check-annotation';
import { CheckCreateToolName } from '../../create-check-annotation-tool';

export const getIsCheckAnnotation = (annotation: Core.Annotations.Annotation) => {
  return annotation.ToolName === CheckCreateToolName || annotation.elementName === CheckAnnotationName;
};
