import { viewerActions } from 'entities/viewer/model';
import { getAnnotationHistoryChanges } from 'shared/libs/apryse/helpers/get-annotation-history-changes';
import { getTextContentHistoryChanges } from 'shared/libs/apryse/helpers/get-text-content-history-changes';
import { AppDispatch } from 'shared/libs/redux';

export const onHistoryChange = (dispatch: AppDispatch) => () => {
  const [canAnnotationUndo, canAnnotationRedo] = getAnnotationHistoryChanges();

  const [canTextContentUndo, canTextContentRedo] = getTextContentHistoryChanges();

  const canUndo = canAnnotationUndo || canTextContentUndo;
  const canRedo = canAnnotationRedo || canTextContentRedo;

  dispatch(viewerActions.setCanUndo(canUndo));

  dispatch(viewerActions.setCanRedo(canRedo));

  dispatch(viewerActions.setHasChangesToSave(true));
};
