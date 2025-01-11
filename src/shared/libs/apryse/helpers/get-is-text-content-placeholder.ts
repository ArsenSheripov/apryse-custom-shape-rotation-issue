import { Core } from '@pdftron/webviewer';
import { Maybe } from 'shared/types';

import { DocumentCore } from '../document-core';

export const getIsTextContentPlaceholder = (annotation: Maybe<Core.Annotations.Annotation>) => {
  if (!annotation) return false;

  const { core } = DocumentCore;

  return (
    annotation.isContentEditPlaceholder() && annotation.getContentEditType() === core.ContentEdit.Types.TEXT.toString()
  );
};
