import { copy } from 'fs-extra';

const copyFiles = async () => {
  try {
    await copy('./node_modules/@pdftron/webviewer/public/core', './public/webviewer/');

    console.warn('WebViewer files copied over successfully');
  } catch (err) {
    console.warn(err);
  }
};

copyFiles();
