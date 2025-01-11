import { DocumentViewer } from '../document-viewer';

export const copyText = () => {
  // The copyText function should works for 2 cases:
  // 1. User copies from the side panel (window.getSelection())
  // 2. User copies text from the document (core.getSelectedText())
  // We manually to clear the value of #copy-textarea, and this will reset window.getSelection().toString() to ""
  const textarea = document.querySelector('#copy-textarea') as HTMLTextAreaElement;
  if (textarea) {
    textarea.value = '';
  }
  if (window.getSelection()?.toString()) {
    // if we are selecting some text in the UI (i.e. text in note panel) just let it do the normal behaviour
    return;
  }

  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(DocumentViewer.documentViewer.getSelectedText());
  } else {
    const textarea = document.querySelector('#copy-textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = DocumentViewer.documentViewer.getSelectedText();
      textarea.select();
      textarea.setSelectionRange(0, 99999); // this is necessary for iOS
      textarea.focus();
    }
    try {
      document.execCommand('copy');
      textarea.blur();
    } catch (e) {
      console.error(`Copy is not supported by browser. ${e}`);
    }
  }
};
