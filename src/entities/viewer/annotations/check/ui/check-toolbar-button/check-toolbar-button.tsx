import { toolNames } from 'entities/viewer/lib';
import { viewerActions, viewerSelectors } from 'entities/viewer/model';
import { memo } from 'react';
import { CheckCreateToolName } from 'shared/libs/apryse/annotations/check-annotation/create-check-annotation-tool';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { setToolByName } from 'shared/libs/apryse/helpers/set-tool-by-name';
import { useAppDispatch, useAppSelector } from 'shared/libs/redux';
import { ToolbarButton, ToolbarButtonProps } from 'shared/ui/buttons/toolbar-button/toolbar-button';

interface CheckToolbarButtonProps extends Omit<ToolbarButtonProps, 'icon'> {}

export const CheckToolbarButton = memo<CheckToolbarButtonProps>(props => {
  const activeTool = useAppSelector(viewerSelectors.selectActiveToolName);
  const isInEditContentMode = useAppSelector(viewerSelectors.selectIsInEditContentMode);

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const isActiveTool = activeTool === toolNames.check;

    const documentCore = DocumentCore.core;

    if (isActiveTool) {
      setToolByName(documentCore.Tools.ToolNames.EDIT, toolNames.select);
      dispatch(viewerActions.resetActiveTool());
    } else {
      const tool = setToolByName(CheckCreateToolName, toolNames.check);

      dispatch(
        viewerActions.setActiveTool({
          activeToolName: toolNames.check,
          activeTool: tool,
        })
      );
    }
  };

  return (
    <ToolbarButton
      {...props}
      text='Check'
      isActive={activeTool === toolNames.check}
      onClick={handleClick}
      disabled={isInEditContentMode}
    />
  );
});
