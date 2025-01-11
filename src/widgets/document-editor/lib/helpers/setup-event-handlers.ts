import { AnnotationManager } from 'shared/libs/apryse/annotation-manager';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { DocumentViewer } from 'shared/libs/apryse/document-viewer';
import { AppDispatch } from 'shared/libs/redux';
import { throttle } from 'throttle-debounce';

import * as eventListeners from '../event-listeners';
import { getToolListeners } from './tool-listeners';

export const setupEventHandlers = (dispatch: AppDispatch, isAuthorized?: boolean) => {
  const { documentViewer } = DocumentViewer;
  const { annotationManager } = AnnotationManager;

  const annotationHistoryManager = documentViewer.getAnnotationHistoryManager();

  const contentEditManager = documentViewer.getContentEditManager();

  const { core } = DocumentCore;

  // Tools
  const toolListeners = getToolListeners(dispatch);

  // DocumentViewer

  const onDocumentViewerMouseMove = eventListeners.onDocumentViewerMouseMove();

  const onPagesUpdated = eventListeners.onPagesUpdated(dispatch);


  // AnnotationManager
  const onAnnotationSelect = eventListeners.onAnnotationSelect(dispatch);
  const onAnnotationDeselect = eventListeners.onAnnotationDeselect(dispatch);
  const onAnnotationChanged = eventListeners.onAnnotationChanged(dispatch);
  const { onToolModeUpdated } = eventListeners;

  // AnnotationHistoryManager
  const onHistoryChange = eventListeners.onHistoryChange(dispatch);

  // ContentEdit
  const onUndoRedoStatusChanged = eventListeners.onUndoRedoStatusChanged(dispatch);

  // ContentEditManager
  const onContentEditModeEnded = eventListeners.onContentEditModeEnded(dispatch);
  const onContentEditModeStarted = eventListeners.onContentEditModeStarted(dispatch);

  const scrollViewElementResizeObserver = new ResizeObserver(throttle(300, () => documentViewer.scrollViewUpdated()));

  return {
    addEventHandlers: () => {
      // DocumentViewer

      documentViewer.addEventListener('mouseMove', onDocumentViewerMouseMove);

      scrollViewElementResizeObserver.observe(documentViewer.getScrollViewElement());

      documentViewer.addEventListener('pagesUpdated', onPagesUpdated);

      documentViewer.addEventListener('toolModeUpdated', onToolModeUpdated);

      Object.values(toolListeners).forEach(({ originalToolName, callback }) => {
        const tool = documentViewer.getTool(originalToolName);

        if (!tool || !callback) return;

        tool.addEventListener('annotationAdded', callback);
      });

      // AnnotationManager
      annotationManager.addEventListener('annotationSelected', onAnnotationSelect);
      annotationManager.addEventListener('annotationDeselected', onAnnotationDeselect);
      annotationManager.addEventListener('annotationChanged', onAnnotationChanged);

      // AnnotationHistoryManager
      annotationHistoryManager.addEventListener('historyChanged', onHistoryChange);

      // ContentEdit
      // @ts-ignore
      core.ContentEdit.addEventListener('undoRedoStatusChanged', onUndoRedoStatusChanged);

      // ContentEditManager
      contentEditManager.addEventListener('contentEditModeEnded', onContentEditModeEnded);
      contentEditManager.addEventListener('contentEditModeStarted', onContentEditModeStarted);
    },

    removeEventHandlers: () => {
      // DocumentViewer

      documentViewer.removeEventListener('mouseMove', onDocumentViewerMouseMove);

      scrollViewElementResizeObserver.unobserve(documentViewer.getScrollViewElement());

      documentViewer.removeEventListener('pagesUpdated', onPagesUpdated);

      Object.values(toolListeners).forEach(({ originalToolName, callback }) => {
        const tool = documentViewer.getTool(originalToolName);

        if (!tool) return;

        tool.removeEventListener('annotationAdded', callback);
      });

      // AnnotationManager
      annotationManager.removeEventListener('annotationSelected', onAnnotationSelect);
      annotationManager.removeEventListener('annotationDeselected', onAnnotationDeselect);
      annotationManager.removeEventListener('annotationChanged', onAnnotationChanged);

      // AnnotationHistoryManager
      annotationHistoryManager.removeEventListener('historyChanged', onHistoryChange);

      // ContentEdit
      // @ts-ignore
      core.ContentEdit.removeEventListener('undoRedoStatusChanged', onUndoRedoStatusChanged);

      // ContentEditManager
      contentEditManager.removeEventListener('contentEditModeEnded', onContentEditModeEnded);
      contentEditManager.removeEventListener('contentEditModeStarted', onContentEditModeStarted);
    },
  };
};
