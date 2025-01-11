import { toolNames } from 'entities/viewer/lib';
import { viewerActions, viewerSelectors } from 'entities/viewer/model';
import { memo } from 'react';
import { CrossCreateToolName } from 'shared/libs/apryse/annotations/cross-annotation/create-cross-annotation-tool';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { setToolByName } from 'shared/libs/apryse/helpers/set-tool-by-name';
import { useAppDispatch, useAppSelector } from 'shared/libs/redux';
import { ToolbarButton, ToolbarButtonProps } from 'shared/ui/buttons/toolbar-button/toolbar-button';

interface CrossToolbarButtonProps extends Omit<ToolbarButtonProps, 'icon'> {}

export const CrossToolbarButton = memo<CrossToolbarButtonProps>(props => {
  const activeTool = useAppSelector(viewerSelectors.selectActiveToolName);
  const isInEditContentMode = useAppSelector(viewerSelectors.selectIsInEditContentMode);

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const isActiveTool = activeTool === toolNames.cross;

    const documentCore = DocumentCore.core;

    if (isActiveTool) {
      setToolByName(documentCore.Tools.ToolNames.EDIT, toolNames.select);

      dispatch(viewerActions.resetActiveTool());
    } else {
      const tool = setToolByName(CrossCreateToolName, toolNames.cross);

      dispatch(
        viewerActions.setActiveTool({
          activeToolName: toolNames.cross,
          activeTool: tool,
        })
      );
    }
  };

  return (
    <ToolbarButton
      {...props}
      text='cross'
      isActive={activeTool === toolNames.cross}
      onClick={handleClick}
      disabled={isInEditContentMode}
    />
  );
});
