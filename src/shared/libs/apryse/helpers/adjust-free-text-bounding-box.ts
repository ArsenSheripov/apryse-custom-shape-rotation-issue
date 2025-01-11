import { Core } from '@pdftron/webviewer';

import { DocumentCore } from '../document-core';
import { DocumentViewer } from '../document-viewer';

export const adjustFreeTextBoundingBox = (annotation: Core.Annotations.FreeTextAnnotation) => {
  const { core } = DocumentCore;

  if (!core) return;

  const { FreeTextAnnotation } = core.Annotations;
  const { documentViewer } = DocumentViewer;

  if (
    annotation instanceof FreeTextAnnotation &&
    annotation.getAutoSizeType() !== FreeTextAnnotation.AutoSizeTypes.NONE
  ) {
    const doc = documentViewer.getDocument();
    const pageNumber = annotation.PageNumber;
    const pageInfo = doc.getPageInfo(pageNumber);
    const pageMatrix = doc.getPageMatrix(pageNumber);
    const pageRotation = doc.getPageRotation(pageNumber);
    annotation.fitText(pageInfo, pageMatrix, pageRotation);
  }
};
