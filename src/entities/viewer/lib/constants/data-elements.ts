export const dataElements = {
  // Popups
  LINK_ANNOTATION_POPUP: 'linkAnnotationPopup',
  ANNOTATION_POPUP: 'annotationPopup',
  CONTEXT_MENU_POPUP: 'contextMenuPopup',
  STAMPS_POPUP: 'stampsPopup',
  SEARCH_POPUP: 'searchPopup',

  // Sidebars
  MORE_TOOLS_SIDEBAR: 'moreToolsSidebar',
  SEARCH_SIDEBAR: 'searchSidebar',

  PAGES_SIDEBAR: 'pagesSidebar',
  BOOKMARKS_SIDEBAR: 'bookmarksSidebar',
  FILE_INFO_SIDEBAR: 'fileInfoSidebar',

  // Tools as popup
  CROP_IMAGE: 'cropImageTool',
  PASSWORD_PROTECT: 'passwordProtectTool',
  DOCUMENT_REMOVE_SECURITY: 'documentRemoveSecurityTool',
  DOCUMENT_PASSWORD_ENTER: 'documentPasswordEnterTool',

  // Modals
  SIGNATURE_CREATE_MODAL: 'signatureModal',
} as const;

export type DataElements = (typeof dataElements)[keyof typeof dataElements];
