import { Core } from '@pdftron/webviewer';
import { defaultToolListenerCallback } from 'entities/viewer/annotations/common/lib/helpers/default-tool-listener-callback';
import { rectangleToolListenerCallback } from 'entities/viewer/annotations/rectangle/lib/helpers/rectangle-tool-listener-callback';
import { toolNames } from 'entities/viewer/lib';
import { OnlyLibraryToolNamesValues } from 'entities/viewer/lib/constants/tool-names';
import { CheckCreateToolName } from 'shared/libs/apryse/annotations/check-annotation/create-check-annotation-tool';
import { CrossCreateToolName } from 'shared/libs/apryse/annotations/cross-annotation/create-cross-annotation-tool';
import { StarCreateToolName } from 'shared/libs/apryse/annotations/star-annotation/create-star-annotation-tool';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { AppDispatch } from 'shared/libs/redux';

interface ToolListenerParams {
  originalToolName: string | Core.Tools.ToolNames;
  callback?: (annotation: Core.Annotations.Annotation) => void;
}

export const getToolListeners = (dispatch: AppDispatch): Record<OnlyLibraryToolNamesValues, ToolListenerParams> => {
  const { core } = DocumentCore;

  return {
    [toolNames.check]: {
      originalToolName: CheckCreateToolName,
      callback: defaultToolListenerCallback(dispatch),
    },
    [toolNames.cross]: {
      originalToolName: CrossCreateToolName,
      callback: defaultToolListenerCallback(dispatch),
    },
    [toolNames.rectangle]: {
      originalToolName: core.Tools.ToolNames.RECTANGLE,
      callback: rectangleToolListenerCallback(dispatch),
    },
    [toolNames.star]: {
      originalToolName: StarCreateToolName,
      callback: defaultToolListenerCallback(dispatch),
    },
  };
};
