import classNames from 'classnames/bind';

import { ToolbarButtonProps } from '../toolbar-button';
import classes from './toolbar-button.module.scss';

const cn = classNames.bind(classes);

type PickedToolbarButtonProps = Pick<ToolbarButtonProps, 'className' | 'isLoading' | 'isActive' | 'size' | 'isOutline'>;

export const getClasses = ({ className, isLoading, isActive, size, isOutline }: PickedToolbarButtonProps) => {
  const cnRoot = cn('toolbar-button', className, `toolbar-button--${size}`, {
    loading: isLoading,
    'toolbar-button--active': isActive,
    'toolbar-button--outline': isOutline,
  });

  const cnIconWrapper = cn('toolbar-button__icon-wrapper');

  const cnContentText = cn('toolbar-button__text', {
    'toolbar-button__text--active': isActive,
  });

  const cnContentContainer = cn('toolbar-button__content-container');
  const cnRightContent = cn('toolbar-button__right-content', { 'toolbar-button__right-content--active': isActive });

  return {
    cnRoot,
    cnIconWrapper,
    cnContentText,
    cnContentContainer,
    cnRightContent,
  };
};
