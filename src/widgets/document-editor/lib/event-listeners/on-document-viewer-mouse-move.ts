import { DocumentCore } from 'shared/libs/apryse/document-core';
import { getLinkAnnotationByMouseEvent } from 'shared/libs/apryse/helpers/link/get-link-annotation-by-mouse-event';

export const onDocumentViewerMouseMove = () => (e: MouseEvent) => {
  const { core } = DocumentCore;

  const { originalAnnotation } = getLinkAnnotationByMouseEvent(e);

  if (originalAnnotation) {
    core.Tools.Tool.disableTextSelection();
  } else {
    core.Tools.Tool.enableTextSelection();
  }
};
