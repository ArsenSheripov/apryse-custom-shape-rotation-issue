import { Core } from '@pdftron/webviewer';
import { Maybe } from 'shared/types';

import { DocumentCore } from '../../document-core';
import { LinkParams } from '../../types';

export const getLinkParams = (linkAnnotation?: Maybe<Core.Annotations.Link>): LinkParams => {
  if (!linkAnnotation) {
    return {};
  }

  if (linkAnnotation.actions.U?.[0] instanceof DocumentCore.core.Actions.URI) {
    return {
      url: linkAnnotation.actions.U?.[0]?.uri,
    };
  }

  if (linkAnnotation.actions.U?.[0] instanceof DocumentCore.core.Actions.GoTo) {
    return {
      pageToLinkTo: linkAnnotation.actions.U?.[0]?.dest.page,
    };
  }

  return {};
};
