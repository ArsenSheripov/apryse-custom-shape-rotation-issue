import { Core } from '@pdftron/webviewer';

export type DocumentCoreInstance = typeof Core;

class DocumentCoreClass {
  core: DocumentCoreInstance = {} as DocumentCoreInstance;

  setCore(core: DocumentCoreInstance) {
    this.core = core;

    return this.core;
  }
}

export const DocumentCore = new DocumentCoreClass();
