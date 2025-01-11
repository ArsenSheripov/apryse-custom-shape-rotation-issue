import { DocumentBookmarksResponseDto } from 'shared/types/api/generated';

import { DocumentBookmarks } from '../types';

export const mapBookmarks = (data: DocumentBookmarksResponseDto): DocumentBookmarks => {
  return {
    documentId: data.documentId,
    bookmarks: data.bookmarks,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
