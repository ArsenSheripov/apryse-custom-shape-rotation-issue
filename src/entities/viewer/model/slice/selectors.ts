import { createSelector } from '@reduxjs/toolkit';
import { DataElements } from 'entities/viewer/lib/constants/data-elements';
import { AppState } from 'shared/libs/redux';

const selectActiveTool = createSelector([(state: AppState) => state.viewer], ({ activeTool, activeToolName }) => ({
  activeTool,
  activeToolName,
}));

const selectActiveToolName = createSelector(
  [(state: AppState) => state.viewer],
  ({ activeToolName }) => activeToolName
);

const selectIsApryseLoading = createSelector(
  [(state: AppState) => state.viewer],
  ({ isApryseLoading }) => isApryseLoading
);

const selectIsInEditContentMode = createSelector(
  [(state: AppState) => state.viewer],
  ({ isInEditContentMode }) => isInEditContentMode
);

const selectEditContentModeStatus = createSelector(
  [(state: AppState) => state.viewer],
  ({ editContentModeStatus }) => editContentModeStatus
);

const selectFocusedAnnotation = createSelector(
  [(state: AppState) => state.viewer],
  ({ focusedAnnotation }) => focusedAnnotation
);

const selectCurrentDocumentPassword = createSelector(
  [(state: AppState) => state.viewer],
  ({ currentDocumentPassword }) => currentDocumentPassword
);

const selectCropToolModeFocusedAnnotation = createSelector(
  [(state: AppState) => state.viewer],
  ({ cropToolModeFocusedAnnotation }) => cropToolModeFocusedAnnotation
);

const selectZoomFactor = createSelector([(state: AppState) => state.viewer], ({ zoomFactor }) => zoomFactor);

const selectPageInfo = createSelector([(state: AppState) => state.viewer], ({ currentPage, pageCount }) => ({
  currentPage,
  pageCount,
}));

const selectOpenElements = createSelector([(state: AppState) => state.viewer], ({ openElements }) => openElements);

const isOpenElement = createSelector(
  [selectOpenElements, (openElements, element: DataElements) => element],
  (openElements, element) => !!openElements[element]
);

const selectCanUndo = createSelector([(state: AppState) => state.viewer], ({ canUndo }) => canUndo);

const selectCanRedo = createSelector([(state: AppState) => state.viewer], ({ canRedo }) => canRedo);

const selectHistoryState = createSelector([selectCanUndo, selectCanRedo], (canUndo, canRedo) => ({ canUndo, canRedo }));


const standardStamps = createSelector([(state: AppState) => state.viewer], ({ standardStamps }) => standardStamps);

const selectDocumentInfo = createSelector([(state: AppState) => state.viewer], ({ documentInfo }) => documentInfo);

const selectHasChangesToSave = createSelector(
  [(state: AppState) => state.viewer],
  ({ hasChangesToSave }) => hasChangesToSave
);

const selectIsSavingDocument = createSelector(
  [(state: AppState) => state.viewer],
  ({ isSavingDocument }) => isSavingDocument
);

const selectChangedPage = createSelector([(state: AppState) => state.viewer], ({ changedPage }) => changedPage);

const selectPagesUpdated = createSelector([(state: AppState) => state.viewer], ({ pagesUpdated }) => pagesUpdated);

const selectAnnotationChanged = createSelector(
  [(state: AppState) => state.viewer],
  ({ changedAnnotations }) => changedAnnotations
);

const selectRedactionAnnotationsList = createSelector(
  [(state: AppState) => state.viewer],
  ({ redactionAnnotationsList }) => redactionAnnotationsList
);

const selectBookmarks = createSelector([(state: AppState) => state.viewer], ({ bookmarks }) => bookmarks);

const selectActiveBookmark = createSelector(
  [(state: AppState) => state.viewer],
  ({ activeBookmark }) => activeBookmark
);

const selectIsPDFNetInitialized = createSelector(
  [(state: AppState) => state.viewer],
  ({ isPDFNetInitialized }) => isPDFNetInitialized
);


export const viewerSelectors = {
  selectActiveTool,
  selectActiveToolName,
  selectIsApryseLoading,
  selectIsInEditContentMode,
  selectEditContentModeStatus,
  selectFocusedAnnotation,
  selectCropToolModeFocusedAnnotation,
  selectZoomFactor,
  selectPageInfo,
  selectOpenElements,
  isOpenElement,
  selectCanUndo,
  selectCanRedo,
  selectHistoryState,
  selectDocumentInfo,
  selectHasChangesToSave,
  standardStamps,
  selectChangedPage,
  selectPagesUpdated,
  selectCurrentDocumentPassword,
  selectAnnotationChanged,
  selectRedactionAnnotationsList,
  selectBookmarks,
  selectActiveBookmark,
  selectIsSavingDocument,
  selectIsPDFNetInitialized
};
