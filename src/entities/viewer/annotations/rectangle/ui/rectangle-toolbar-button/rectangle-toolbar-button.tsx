import { toolNames } from 'entities/viewer/lib';
import { viewerActions, viewerSelectors } from 'entities/viewer/model';
import { FC } from 'react';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { setToolByName } from 'shared/libs/apryse/helpers/set-tool-by-name';
import { useAppDispatch, useAppSelector } from 'shared/libs/redux';
import { ToolbarButton, ToolbarButtonProps } from 'shared/ui/buttons/toolbar-button/toolbar-button';

interface RectangleToolbarButtonProps extends Omit<ToolbarButtonProps, 'icon'> {}

export const RectangleToolbarButton: FC<RectangleToolbarButtonProps> = props => {
  const dispatch = useAppDispatch();
  const activeTool = useAppSelector(viewerSelectors.selectActiveToolName);
  const isInEditContentMode = useAppSelector(viewerSelectors.selectIsInEditContentMode);

  const handleClick = () => {
    const isActiveTool = activeTool === toolNames.rectangle;

    const documentCore = DocumentCore.core;

    if (isActiveTool) {
      setToolByName(documentCore.Tools.ToolNames.EDIT, toolNames.select);

      dispatch(viewerActions.resetActiveTool());
    } else {
      const tool = setToolByName(documentCore.Tools.ToolNames.RECTANGLE, toolNames.rectangle);

      if (tool && tool.setStyles) {
        tool.setStyles({
          StrokeColor: new documentCore.Annotations.Color(0, 0, 0),
          FillColor: new documentCore.Annotations.Color(0, 0, 0, 0),
        });
      }

      dispatch(
        viewerActions.setActiveTool({
          activeToolName: toolNames.rectangle,
          activeTool: tool,
        })
      );
    }
  };

  return (
    <ToolbarButton
      {...props}
      text='rectangle'
      isActive={activeTool === toolNames.rectangle}
      onClick={handleClick}
      disabled={isInEditContentMode}
    />
  );
};
