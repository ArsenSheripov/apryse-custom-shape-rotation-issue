import { Core } from '@pdftron/webviewer';
import { viewerActions } from 'entities/viewer/model';
import { AppDispatch } from 'shared/libs/redux';

export const onPagesUpdated = (dispatch: AppDispatch) => (changes: Core.DocumentViewer.pagesUpdatedChanges) => {
  dispatch(viewerActions.setPagesUpdated(changes));
  dispatch(viewerActions.setHasChangesToSave(true));
};
