import { Core } from '@pdftron/webviewer';
import { Maybe } from 'shared/types';

import { DocumentCore } from '../../document-core';

export const getLinkDestination = (linkAnnotation?: Maybe<Core.Annotations.Link>) => {
  if (!linkAnnotation) {
    return;
  }

  if (linkAnnotation.actions.U?.[0] instanceof DocumentCore.core.Actions.URI) {
    return linkAnnotation.actions.U?.[0]?.uri;
  }

  if (linkAnnotation.actions.U?.[0] instanceof DocumentCore.core.Actions.GoTo) {
    return `Page ${linkAnnotation.actions.U?.[0]?.dest.page}`;
  }
};
