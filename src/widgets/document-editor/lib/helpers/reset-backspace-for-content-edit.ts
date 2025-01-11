import { DocumentCoreInstance } from 'shared/libs/apryse/document-core';

export const resetBackspaceForContentEdit = (WebViewerCore: DocumentCoreInstance) => {
  const originalKeyDown = WebViewerCore.Tools.ContentEditTool.prototype.keyDown;
  WebViewerCore.Tools.ContentEditTool.prototype.keyDown = function (e: KeyboardEvent) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return;
    }

    originalKeyDown.apply(this, [e]);
  };
};
