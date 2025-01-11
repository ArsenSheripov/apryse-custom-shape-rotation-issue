import { Core } from '@pdftron/webviewer';

import { CrossAnnotationName } from '../../create-cross-annotation';
import { CrossCreateToolName } from '../../create-cross-annotation-tool';

export const getIsCrossAnnotation = (annotation: Core.Annotations.Annotation) => {
  return annotation.ToolName === CrossCreateToolName || annotation.elementName === CrossAnnotationName;
};
