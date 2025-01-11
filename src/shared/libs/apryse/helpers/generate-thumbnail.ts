import { AnnotationManager } from '../annotation-manager';
import { DocumentViewer } from '../document-viewer';

interface GenerateThumbnailsProps {
  pageNumber: number;
  setThumbnail: (thumbnail: string) => void;
}

export const generateThumbnail = async ({ pageNumber, setThumbnail }: GenerateThumbnailsProps) => {
  const { documentViewer } = DocumentViewer;
  const doc = documentViewer.getDocument();
  const { annotationManager } = AnnotationManager;
  const zoom = 2;

  doc.loadCanvas({
    pageNumber,
    zoom,
    drawComplete: async thumbnail => {
      const corePageRotation = (doc.getPageRotation(pageNumber) / 90) % 4;
      annotationManager.setAnnotationCanvasTransform(thumbnail.getContext('2d'), zoom, corePageRotation);

      await documentViewer.getAnnotationManager().drawAnnotations({ pageNumber, overrideCanvas: thumbnail });
      setThumbnail(thumbnail.toDataURL());
    },
  });
};
