import { toolNames } from 'entities/viewer/lib';
import { viewerActions, viewerSelectors } from 'entities/viewer/model';
import { FC } from 'react';
import { StarCreateToolName } from 'shared/libs/apryse/annotations/star-annotation/create-star-annotation-tool';
import { DocumentCore } from 'shared/libs/apryse/document-core';
import { setToolByName } from 'shared/libs/apryse/helpers/set-tool-by-name';
import { useAppDispatch, useAppSelector } from 'shared/libs/redux';
import { ToolbarButton, ToolbarButtonProps } from 'shared/ui/buttons/toolbar-button/toolbar-button';

interface StarToolbarButtonProps extends Omit<ToolbarButtonProps, 'icon'> {}

export const StarToolbarButton: FC<StarToolbarButtonProps> = props => {
  const dispatch = useAppDispatch();
  const activeTool = useAppSelector(viewerSelectors.selectActiveToolName);
  const isInEditContentMode = useAppSelector(viewerSelectors.selectIsInEditContentMode);

  const handleClick = () => {
    const isActiveTool = activeTool === toolNames.star;

    const documentCore = DocumentCore.core;

    if (isActiveTool) {
      setToolByName(documentCore.Tools.ToolNames.EDIT, toolNames.select);

      dispatch(viewerActions.resetActiveTool());
    } else {
      const tool = setToolByName(StarCreateToolName, toolNames.star);

      if (tool && tool.setStyles) {
        tool.setStyles({
          StrokeColor: new documentCore.Annotations.Color(0, 0, 0),
          FillColor: new documentCore.Annotations.Color(0, 0, 0, 0),
        });
      }

      dispatch(
        viewerActions.setActiveTool({
          activeToolName: toolNames.star,
          activeTool: tool,
        })
      );
    }
  };

  return (
    <ToolbarButton
      {...props}
      text='star'
      isActive={activeTool === toolNames.star}
      onClick={handleClick}
      disabled={isInEditContentMode}
    />
  );
};
