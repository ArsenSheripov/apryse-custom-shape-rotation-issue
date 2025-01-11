import { viewerSelectors } from 'entities/viewer/model';
import { useEffect } from 'react';
import { useAppSelector } from 'shared/libs/redux';

interface UseAutoSaveParams {
  documentId?: string;
  workspaceId?: string;
  documentUrl?: string;
  isApryseLoading: boolean;
  onSaveDocument: (params: { documentId: string; workspaceId: string }) => void;
}

export const useAutoSave = ({
  documentId,
  workspaceId,
  documentUrl,
  isApryseLoading,
  onSaveDocument,
}: UseAutoSaveParams) => {
  const hasChangesToSave = useAppSelector(viewerSelectors.selectHasChangesToSave);
  const isInEditContentMode = useAppSelector(viewerSelectors.selectIsInEditContentMode);

  useEffect(() => {
    if (!documentUrl || isApryseLoading || !documentId || !workspaceId) return;

    const saveDocument = () => {
      if (isInEditContentMode) return;

      onSaveDocument({
        documentId,
        workspaceId,
      });
    };

    const intervalId = setInterval(saveDocument, 15000);

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasChangesToSave) return;

      e.preventDefault();
      e.returnValue = '';
    };

    if (hasChangesToSave) {
      window.addEventListener('beforeunload', onBeforeUnload);
    }

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [documentUrl, isApryseLoading, documentId, workspaceId, hasChangesToSave, isInEditContentMode, onSaveDocument]);
};
