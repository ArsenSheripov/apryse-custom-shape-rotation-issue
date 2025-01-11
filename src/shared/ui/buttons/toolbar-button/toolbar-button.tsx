import { ComponentPropsWithoutRef, forwardRef, MouseEventHandler, ReactNode } from 'react';
import { CommonTypes } from 'shared/types';

import { getClasses } from './styles/get-classes';

type Size = 'big' | 'medium' | 'small';

type RootComponentProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

export interface ToolbarButtonProps extends CommonTypes, RootComponentProps {
  icon?: ReactNode;
  text?: string;
  isLoading?: boolean;
  isOutline?: boolean;
  color?: string;
  isActive?: boolean;
  toolName?: string;
  size?: Size;
  rightContent?: ReactNode;
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    {
      size = 'big',
      className,
      icon,
      disabled,
      isLoading = false,
      isOutline,
      type = 'button',
      onClick,
      text,
      isActive,
      toolName,
      rightContent,
      ...props
    },
    forwardedRef
  ) => {
    const { cnRoot, cnContentText, cnIconWrapper, cnRightContent, cnContentContainer } = getClasses({
      className,
      isLoading,
      isActive,
      size,
      isOutline,
    });

    const isDisabled = disabled || isLoading;

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = event => {
      event.currentTarget.blur();
      onClick?.(event);
    };

    return (
      <button
        data-tool-name={toolName}
        className={cnRoot}
        type={type}
        disabled={isDisabled}
        onClick={onClickHandler}
        {...props}
        ref={forwardedRef}
      >
        {!isLoading && <span className={cnIconWrapper}>{icon}</span>}

        <div className={cnContentContainer}>
          {!isLoading && text && <span className={cnContentText}>{text}</span>}
          {!isLoading && rightContent && <span className={cnRightContent}>{rightContent}</span>}
        </div>
      </button>
    );
  }
);
