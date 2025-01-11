import { Core } from '@pdftron/webviewer';

import { PDFNet } from '../pdf-net';
import { FileSource } from '../types';

export const createPdfDocFromSource = async (fileSource: FileSource): Promise<Core.PDFNet.PDFDoc | undefined> => {
  const { pdfNet } = PDFNet;

  let pdfDoc;
  if (fileSource instanceof pdfNet.PDFDoc) {
    pdfDoc = fileSource;
  } else {
    const url = typeof fileSource === 'string' ? fileSource : URL.createObjectURL(fileSource);
    pdfDoc = await pdfNet.PDFDoc.createFromURL(url);
  }

  return pdfDoc;
};
