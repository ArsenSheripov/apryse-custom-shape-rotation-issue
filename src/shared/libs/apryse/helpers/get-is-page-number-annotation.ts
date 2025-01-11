import { Core } from '@pdftron/webviewer';
import { Maybe } from 'shared/types';

import { NAMES } from '../constants/common';

export const getIsPageNumberAnnotation = (annotation?: Maybe<Core.Annotations.Annotation>) => {
  if (!annotation) return false;

  return annotation.Subject === NAMES.PAGE_NUMBER_ANNOTATION;
};
