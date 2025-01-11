import { Core } from '@pdftron/webviewer';

import { AnnotationManager } from '../../annotation-manager';
import { DocumentCore } from '../../document-core';
import { getLinkParams } from './get-link-params';
import { goToLinkByParams } from './go-to-link-by-params';

export const getGroupedLinkByAnnotation = (annotation: Core.Annotations.Annotation) => {
  const { annotationManager } = AnnotationManager;

  const groupAnnotations = annotationManager
    .getGroupAnnotations(annotation)
    .filter(annot => annot.Id !== annotation.Id);

  const linkAnnotation = groupAnnotations.find(annot => annot instanceof DocumentCore.core.Annotations.Link);

  const linkParams = getLinkParams(linkAnnotation);

  const goToLink = () => {
    goToLinkByParams(linkParams);
  };

  return {
    hasLinkAnnotation: !!linkAnnotation,
    linkAnnotation,
    linkParams,
    isLinkToURL: !!linkParams.url,
    isLinkToPage: !!linkParams.pageToLinkTo,
    goToLink,
  };
};
