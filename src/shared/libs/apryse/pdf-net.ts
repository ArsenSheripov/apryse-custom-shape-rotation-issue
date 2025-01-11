import { Core } from '@pdftron/webviewer';

export type PDFNetInstance = typeof Core.PDFNet;

class PDFNetClass {
  pdfNet: PDFNetInstance = {} as PDFNetInstance;

  setPDFNet(pdfNet: PDFNetInstance) {
    this.pdfNet = pdfNet;

    return this.pdfNet;
  }
}

export const PDFNet = new PDFNetClass();
