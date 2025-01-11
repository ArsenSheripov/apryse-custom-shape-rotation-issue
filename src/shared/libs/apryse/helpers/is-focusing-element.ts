import { AnnotationManager } from '../annotation-manager';
import { DocumentCore } from '../document-core';

export const isFocusingElement = () => {
  const freetextAnnots = AnnotationManager.annotationManager
    .getAnnotationsList()
    .filter(annot => annot instanceof DocumentCore.core.Annotations.FreeTextAnnotation);
  const isEditingFreetext = freetextAnnots.some(annot => annot.getEditor()?.hasFocus());
  const { activeElement } = document;

  return (
    activeElement instanceof window.HTMLInputElement ||
    activeElement instanceof window.HTMLTextAreaElement ||
    activeElement?.className.includes('ql-editor') ||
    isEditingFreetext ||
    (activeElement?.tagName?.toLowerCase() === 'input' && activeElement?.getAttribute('type') === 'text') ||
    activeElement?.tagName?.toLowerCase() === 'textarea'
  );
};
