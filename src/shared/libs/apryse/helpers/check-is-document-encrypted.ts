import { PDFNet } from '../pdf-net';

export const checkIsDocumentEncrypted = async (file?: File) => {
  if (!file) return;

  try {
    const { pdfNet } = PDFNet;

    const url = URL.createObjectURL(file);

    const pdfDoc = await pdfNet.PDFDoc.createFromURL(url);

    const isSecurityHandlerInitialized = await pdfDoc.initSecurityHandler();

    const isEncrypted = await pdfDoc.isEncrypted();

    return isEncrypted && !isSecurityHandlerInitialized;
  } catch (error) {
    console.error(error);
  }
};
