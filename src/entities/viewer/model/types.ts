export type Bookmark = {
  [key: string]: string;
};

export type GetDocumentBookmarksRequest = {
  workspaceId: string;
  documentId: string;
};

export type GetGuestDocumentBookmarksRequest = {
  documentId: string;
};

export type PutDocumentBookmarksRequest = GetDocumentBookmarksRequest & any;
export type PutGuestDocumentBookmarksRequest = GetGuestDocumentBookmarksRequest & any;

export type DocumentBookmarks = {
  documentId: string;
  bookmarks: object;
  createdAt?: string;
  updatedAt?: string;
};
