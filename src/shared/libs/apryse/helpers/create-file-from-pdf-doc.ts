import { Core } from '@pdftron/webviewer';
import { DocumentType, Maybe } from 'shared/types';


type DoocumentInfo = {
  id: string;
  workspaceId: string;
  folderId: string;
  title: string;
  authorId: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
  fileUrl?: string;
  type: DocumentType;
  metadata?: Maybe<Record<string, any>>;
};

export const createFileFromPDFDoc = async (
  pdfDoc: Core.PDFNet.PDFDoc,
  documentInfo: DoocumentInfo
): Promise<any> => {
  // @ts-ignore
  const pdfNet = window.Core.PDFNet;

  const pdfBuffer = await pdfDoc.saveMemoryBuffer(pdfNet.SDFDoc.SaveOptions.e_linearized);

  const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

  const file = new File([pdfBlob], `${documentInfo.title}.pdf`, { type: 'application/pdf' });

  const fileUploadStatus: any = {
    sourceKey: documentInfo.id,
    id: documentInfo.id,
    status: 'success',
    file,
    workspaceId: documentInfo.workspaceId,
    title: documentInfo.title,
    type: 'application/pdf',
    folderId: documentInfo.folderId,
    size: pdfBlob.size,
  };

  return fileUploadStatus;
};
