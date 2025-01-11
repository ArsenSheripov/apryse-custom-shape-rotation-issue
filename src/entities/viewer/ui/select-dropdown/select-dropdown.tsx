import React, { forwardRef, MouseEvent, useEffect, useRef, useState } from 'react';
import { ICON_COLORS } from 'shared/constants/colors';
import { eventPreventDefault } from 'shared/helpers/event-prevent-default';
import { SvgChevronDown } from 'shared/icons/components/common/chevron-down';
import { SvgChevronUp } from 'shared/icons/components/common/chevron-up';
import { Maybe, SelectOptionType } from 'shared/types';
import { MenuItem } from 'shared/ui/menu-item/menu-item';
import { Popup } from 'shared/ui/popup/popup';

import { getClasses } from './styles/get-classes';

export interface SelectDropdownProps {
  dropdownItems: SelectOptionType[];
  value?: Maybe<SelectOptionType>;
  placeholder?: string;
  onValueChange?: (e: MouseEvent, value: Maybe<SelectOptionType>) => void;
  className?: string;
  classNameWrapper?: string;
  disabled?: boolean;
  applyFontByLabel?: boolean;
  renderCustomItems?: (getSingleItem: (item: SelectOptionType) => React.JSX.Element) => React.JSX.Element;
}

export const SelectDropdown = forwardRef<HTMLDivElement, SelectDropdownProps>(
  (
    {
      dropdownItems,
      value,
      onValueChange,
      className,
      applyFontByLabel,
      classNameWrapper,
      disabled,
      placeholder = '',
      renderCustomItems,
    },
    forwardedRef
  ) => {
    const activeItemRef = useRef<HTMLButtonElement>(null);

    const { cnRoot, cnWrapper, cnDropdownItem } = getClasses({ className, classNameWrapper, disabled });

    const [isOpen, setIsOpen] = useState(false);

    const handleValueChange = (e: MouseEvent, item: SelectOptionType) => {
      onValueChange?.(e, item);
      setIsOpen(false);
    };

    useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          activeItemRef.current?.scrollIntoView({ block: 'center' });
        }, 0);
      }
    }, [isOpen]);

    const getFontFamilyByKey = (value?: Maybe<SelectOptionType>) => (value ? { fontFamily: value.label } : undefined);

    const getSingleElement = (item: SelectOptionType) => {
      const isActive = item.value === value?.value;

      return (
        <MenuItem
          data-select-dropdown-item={item.value}
          text={item.label}
          key={item.value}
          onClick={e => handleValueChange(e, item)}
          tabIndex={isOpen ? undefined : -1}
          isActive={isActive}
          style={applyFontByLabel ? getFontFamilyByKey(item) : undefined}
          className={cnDropdownItem}
          ref={isActive ? activeItemRef : null}
        />
      );
    };

    const elements = dropdownItems.map(item => getSingleElement(item));

    const customElements = renderCustomItems?.(getSingleElement);

    return (
      <Popup
        className={cnRoot}
        content={customElements ?? elements}
        open={isOpen}
        onOpenChange={setIsOpen}
        contentProps={{
          onOpenAutoFocus: eventPreventDefault,
          onMouseDown: eventPreventDefault,
        }}
        ref={forwardedRef}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={cnWrapper}
          onMouseDown={e => {
            eventPreventDefault(e);
            e.stopPropagation();
          }}
        >
          <span style={applyFontByLabel ? getFontFamilyByKey(value) : undefined}>{value?.label || placeholder}</span>
          <div>
            {isOpen ? (
              <SvgChevronUp width={10} height={6} color={ICON_COLORS.GRAY90} />
            ) : (
              <SvgChevronDown width={10} height={6} color={ICON_COLORS.GRAY90} />
            )}
          </div>
        </div>
      </Popup>
    );
  }
);
