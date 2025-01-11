import { Core } from '@pdftron/webviewer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toolNames } from 'entities/viewer/lib';
import { AnnotationsChanged } from 'shared/libs/apryse/types';
import { DocumentMetadata, DocumentType, Maybe } from 'shared/types';

import { DataElements } from '../../lib/constants/data-elements';

type ViewerState = {
  documentInfo: {
    id: string;
    workspaceId: string;
    folderId: string;
    title: string;
    authorId: string;
    description?: string;
    authorEmail: string;
    createdAt: string;
    updatedAt: string;
    fileUrl?: string;
    type: DocumentType;
    metadata?: Maybe<DocumentMetadata>;
    fileKey?: string;
  };

  currentDocumentPassword?: string;

  isApryseLoading: boolean;

  isInEditContentMode: boolean;
  editContentModeStatus?: 'loading' | 'enabled' | 'disabled';

  activeTool: Maybe<Core.Tools.Tool>;
  activeToolName: string;

  focusedAnnotation: Maybe<Core.Annotations.Annotation>;
  cropToolModeFocusedAnnotation: Maybe<Core.Annotations.Annotation>;

  zoomFactor: number;

  currentPage: number;
  pageCount: number;

  openElements: Record<DataElements, boolean>;

  canUndo: boolean;
  canRedo: boolean;

  hasChangesToSave: boolean;
  isSavingDocument: boolean;

  standardStamps:
    | {
        annotation: Core.Annotations.StampAnnotation;
        imgSrc: string;
      }[]
    | null;
  changedPage?: number;

  pagesUpdated: {
    added: number[];
    removed: number[];
    moved: { [key: number]: number };
    contentChanged: number[];
    annotationsChanged: number[];
    rotationChanged: number[];
    linearizedUpdate: boolean;
  };

  changedAnnotations: AnnotationsChanged;
  bookmarks: { [key: string]: string };
  activeBookmark?: {
    pageNumber: number;
    isTemporary: boolean;
  };
  redactionAnnotationsList: Core.Annotations.RedactionAnnotation[];
  isPDFNetInitialized: boolean;
};

const initialState = {
  activeTool: null,
  activeToolName: toolNames.select,

  isApryseLoading: true,

  isInEditContentMode: false,
  editContentModeStatus: 'disabled',

  focusedAnnotation: null,
  cropToolModeFocusedAnnotation: null,
  zoomFactor: 100,
  currentPage: 1,
  pageCount: 1,
  openElements: {},
  canUndo: false,
  canRedo: false,
  documentInfo: {
    id: '',
    workspaceId: '',
    folderId: '',
    title: '',
    updatedAt: '',
    type: 'document',
    metadata: {
      ContentLength: 0,
      isEncrypted: false,
    },
  },

  currentDocumentPassword: undefined,

  hasChangesToSave: false,
  isSavingDocument: false,

  standardStamps: null,
  changedPage: undefined,

  bookmarks: {},
  activeBookmark: undefined,
  isPDFNetInitialized: false
} as ViewerState;

const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    setActiveTool(
      state,
      {
        payload,
      }: PayloadAction<{
        activeTool: Maybe<Core.Tools.Tool>;
        activeToolName: string;
      }>
    ) {
      state.activeToolName = payload.activeToolName;
      state.activeTool = payload.activeTool;
    },
    resetActiveTool(state) {
      state.activeToolName = toolNames.select;
      state.activeTool = null;
    },
    setApryseLoading(state, action: PayloadAction<boolean>) {
      state.isApryseLoading = action.payload;
    },

    setEditContentMode(state, action: PayloadAction<boolean>) {
      state.isInEditContentMode = action.payload;
    },
    setCurrentDocumentPassword(state, action: PayloadAction<string>) {
      state.currentDocumentPassword = action.payload;
    },
    setEditContentModeStatus(state, action: PayloadAction<ViewerState['editContentModeStatus']>) {
      state.editContentModeStatus = action.payload;
    },
    setFocusedAnnotation(state, action: PayloadAction<Core.Annotations.Annotation>) {
      state.focusedAnnotation = action.payload;
    },
    resetFocusedAnnotation(state) {
      state.focusedAnnotation = null;
    },

    setCropToolModeFocusedAnnotation(state, action: PayloadAction<Core.Annotations.Annotation>) {
      state.cropToolModeFocusedAnnotation = action.payload;
    },
    resetCropToolModeFocusedAnnotation(state) {
      state.cropToolModeFocusedAnnotation = null;
    },

    setZoomFactor(state, action: PayloadAction<number>) {
      state.zoomFactor = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },

    openElement(state, action: PayloadAction<DataElements>) {
      state.openElements[action.payload] = true;
    },
    closeElement(state, action: PayloadAction<DataElements>) {
      state.openElements[action.payload] = false;
    },
    closeElements(state, action: PayloadAction<DataElements[]>) {
      action.payload.forEach(element => {
        state.openElements[element] = false;
      });
    },
    setCanUndo(state, action: PayloadAction<boolean>) {
      state.canUndo = action.payload;
    },

    setCanRedo(state, action: PayloadAction<boolean>) {
      state.canRedo = action.payload;
    },

    setStandardStamps(state, action) {
      state.standardStamps = action.payload;
    },

    setDocumentInfo(state, action: PayloadAction<ViewerState['documentInfo']>) {
      state.documentInfo = action.payload;
    },

    setHasChangesToSave(state, action: PayloadAction<boolean>) {
      state.hasChangesToSave = action.payload;
    },
    setIsSavingDocument(state, action: PayloadAction<boolean>) {
      state.isSavingDocument = action.payload;
    },
    setChangedPage(state, action: PayloadAction<number>) {
      state.changedPage = action.payload;
    },
    setPagesUpdated(state, action: PayloadAction<ViewerState['pagesUpdated']>) {
      state.pagesUpdated = action.payload;
    },
    setAnnotationChanged(state, action: PayloadAction<ViewerState['changedAnnotations']>) {
      state.changedAnnotations = action.payload;
    },
    setRedactionAnnotationsList(state, action: PayloadAction<ViewerState['redactionAnnotationsList']>) {
      state.redactionAnnotationsList = action.payload;
    },
    setBookmarks: (state, action: PayloadAction<ViewerState['bookmarks']>) => {
      state.bookmarks = action.payload;
    },
    setActiveBookmark: (state, action: PayloadAction<ViewerState['activeBookmark']>) => {
      state.activeBookmark = action.payload;
    },
    setIsPDFNetInitialized(state, action: PayloadAction<boolean>) {
      state.isPDFNetInitialized = action.payload;
    },


    resetViewer() {
      return initialState;
    },
  },
});

export const { reducer: viewerReducer, actions: viewerActions } = viewerSlice;
