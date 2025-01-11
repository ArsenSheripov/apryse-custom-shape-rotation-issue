import classNames from 'classnames/bind';

import { SelectDropdownProps } from '../select-dropdown';
import classes from './select-dropdown.module.scss';

const cn = classNames.bind(classes);

type PickedSelectDropdownProps = Pick<SelectDropdownProps, 'className' | 'classNameWrapper' | 'disabled'>;

export const getClasses = ({ className, classNameWrapper, disabled }: PickedSelectDropdownProps) => {
  const cnRoot = cn('select-dropdown', className);
  const cnWrapper = cn('select-dropdown__wrapper', classNameWrapper, {
    'select-dropdown__wrapper--disabled': disabled,
  });
  const cnDropdownItem = cn('select-dropdown__item');

  return {
    cnRoot,
    cnDropdownItem,
    cnWrapper,
  };
};
