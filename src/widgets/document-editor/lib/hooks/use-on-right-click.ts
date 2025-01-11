import { useEffect } from 'react';
import { DocumentViewer } from 'shared/libs/apryse/document-viewer';

export const useOnRightClick = (handler: (e: MouseEvent) => void) => {
  useEffect(() => {
    const { documentViewer } = DocumentViewer;
    const listener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const { tagName } = target;

      const clickedOnInput = tagName === 'INPUT';
      const clickedOnTextarea = tagName === 'TEXTAREA';
      const clickedOnFreeTextarea = !!(
        target?.className === 'ql-editor' ||
        // @ts-ignore
        target?.parentNode?.className === 'ql-editor' ||
        // @ts-ignore
        target?.parentNode?.parentNode?.className === 'ql-editor'
      );

      const documentContainer = document.getElementById('document-scroll-view');
      const clickedOnDocumentContainer = documentContainer?.contains(target);

      if (
        clickedOnDocumentContainer &&
        // when clicking on these two elements we want to display the default context menu so that users can use auto-correction, look up dictionary, etc...
        !(clickedOnInput || clickedOnTextarea || clickedOnFreeTextarea)
      ) {
        e.preventDefault();

        handler(e);
      }
    };

    document.addEventListener('contextmenu', listener);

    documentViewer.addEventListener('longTap', listener);
    return () => {
      document.removeEventListener('contextmenu', listener);

      documentViewer.removeEventListener('longTap', listener);
    };
  }, [handler]);
};
