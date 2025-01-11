import { Core } from '@pdftron/webviewer';
import { defaultToolListenerCallback } from 'entities/viewer/annotations/common/lib/helpers/default-tool-listener-callback';
import { AppDispatch } from 'shared/libs/redux';

export const rectangleToolListenerCallback = (dispatch: AppDispatch) => (annotation: Core.Annotations.Annotation) => {
  defaultToolListenerCallback(dispatch)(annotation);
};
