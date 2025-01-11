import { Core } from '@pdftron/webviewer';

import { AnnotationManager } from '../annotation-manager';
import { DocumentCore } from '../document-core';
import { LinkParams } from '../types';

export const setLinkToAnnotation = (annotation: Core.Annotations.Annotation, linkParams?: LinkParams) => {
  if (!linkParams) return;

  const { Annotations, Actions } = DocumentCore.core;
  const { annotationManager } = AnnotationManager;

  const newLink = new Annotations.Link({});
  newLink.PageNumber = annotation.PageNumber;
  newLink.X = annotation.X;
  newLink.Y = annotation.Y;
  newLink.Width = annotation.Width;
  newLink.Height = annotation.Height;

  const action = linkParams?.url
    ? new Actions.URI({
        uri: linkParams?.url,
      })
    : new Actions.GoTo({
        // @ts-ignore
        dest: new Actions.GoTo.Dest({
          page: linkParams?.pageToLinkTo,
        }),
      });

  // @ts-ignore
  newLink.addAction('U', action);

  annotationManager.addAnnotation(newLink);
  annotationManager.groupAnnotations(annotation, [newLink]);
  // Re-render annotations (requires major redraw)
  annotationManager.drawAnnotationsFromList(newLink);
};
