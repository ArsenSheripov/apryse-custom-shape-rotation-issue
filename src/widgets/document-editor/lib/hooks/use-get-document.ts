import { useIsAuthorized } from 'entities/auth/model/hooks/use-is-authorized';
import { Document, useLazyGetDocumentByIdQuery, useLazyGetGuestDocumentByIdQuery } from 'entities/documents/model';
import { viewerActions } from 'entities/viewer/model';
import { useGetDocumentBookmarksQuery, useGetGuestDocumentBookmarksQuery } from 'entities/viewer/model/api/viewer-api';
import { useEffect, useState } from 'react';
import { handleAsyncError } from 'shared/helpers/handle-async-error';
import { useAppDispatch } from 'shared/libs/redux';

interface UseGetDocumentParams {
  documentId?: string | null;
  workspaceId?: string;
}

export const useGetDocument = ({ documentId, workspaceId }: UseGetDocumentParams) => {
  const dispatch = useAppDispatch();

  const isAuthorized = useIsAuthorized();

  const [data, setData] = useState<Document>();

  const [getOneDocumentById, { data: dataById, isFetching, isError, error, isSuccess }] = useLazyGetDocumentByIdQuery();
  const [
    getOneGuestDocumentById,
    {
      data: guestDataById,
      isFetching: isGuestFetching,
      isError: isGuestError,
      error: guestError,
      isSuccess: isGuestSuccess,
    },
  ] = useLazyGetGuestDocumentByIdQuery();

  const { isLoading: isGetBookmarksLoading } = useGetDocumentBookmarksQuery(
    {
      documentId: documentId || '',
      workspaceId: workspaceId || '',
    },
    {
      skip: !documentId || !workspaceId || !isAuthorized,
    }
  );

  const { isLoading: isGetGuestBookmarksLoading } = useGetGuestDocumentBookmarksQuery(
    {
      documentId: documentId || '',
    },
    {
      skip: !documentId || isAuthorized,
    }
  );

  const fetchDocumentData = async () => {
    try {
      await getOneDocumentById({ documentId: documentId || '', workspaceId: workspaceId || '' }, false).unwrap(); // second parametr for preferCacheValue: false
    } catch (error) {
      handleAsyncError(error);
    }
  };

  const fetchGuestDocumentData = async () => {
    try {
      await getOneGuestDocumentById({ id: documentId || '' }, false).unwrap(); // second parametr for preferCacheValue: false
    } catch (error) {
      handleAsyncError(error);
    }
  };

  useEffect(() => {
    if (data && (isSuccess || isGuestSuccess)) {
      dispatch(
        viewerActions.setDocumentInfo({
          id: data.id,
          workspaceId: data.workspaceId,
          folderId: data.folderId,
          fileUrl: data.fileUrl,
          fileKey: data.fileKey,
          metadata: data.metadata,
          title: data.title,
          description: data?.description,
          authorId: data.authorId,
          authorEmail: data.authorEmail,
          type: data.type,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
      );
    }
  }, [data, isSuccess, isGuestSuccess, isError, isGuestError, dispatch]);

  useEffect(() => {
    if (documentId && workspaceId) {
      fetchDocumentData();
    } else if (documentId) {
      fetchGuestDocumentData();
    }
  }, [documentId, workspaceId]);

  useEffect(() => {
    if (dataById || guestDataById) {
      setData(dataById || guestDataById);
    }
  }, [dataById?.fileUrl, guestDataById?.fileUrl]);

  return {
    data,
    isDocumentLoading: isFetching || isGuestFetching || isGetBookmarksLoading || isGetGuestBookmarksLoading,
    isDocumentError: isError || isGuestError,
    error: error || guestError,
    isDocumentSuccess: isSuccess || isGuestSuccess,
    fetchDocumentData,
  };
};
