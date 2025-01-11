import { FileUploadStatus } from 'shared/ui/upload-zone/lib/types';

import { PDFNet } from '../pdf-net';

export const generateTemporaryDocumentPages = async (
  validFiles: FileUploadStatus[]
): Promise<{ allRenderedPages: string[] }> => {
  if (!('Core' in window)) {
    console.error('PDFNet not initializated');
    return { allRenderedPages: [] };
  }

  const { pdfNet } = PDFNet;
  const allRenderedPages: string[] = [];

  const processFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength === 0) return [];

    const pdfDoc = await pdfNet.PDFDoc.createFromBuffer(arrayBuffer);

    if (!pdfDoc) return [];

    const pageCount = await pdfDoc.getPageCount();

    if (pageCount === 0) return [];

    const pdfDraw = await pdfNet.PDFDraw.create();
    pdfDraw.setDPI(36);

    const pagePromises = Array.from({ length: pageCount }, async (_, index) => {
      const page = await pdfDoc.getPage(index + 1);
      const pngData = await pdfDraw.exportBuffer(page, 'PNG');
      return `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(pngData)))}`;
    });

    return Promise.all(pagePromises);
  };

  try {
    if (!validFiles || validFiles.length === 0) return { allRenderedPages };

    const renderedPagesList = await Promise.all(validFiles.map(({ file }) => (file ? processFile(file) : [])));

    renderedPagesList.forEach(renderedPages => {
      allRenderedPages.push(...renderedPages);
    });
  } catch (error) {
    console.error('Error processing files:', error);
  }

  return { allRenderedPages };
};
