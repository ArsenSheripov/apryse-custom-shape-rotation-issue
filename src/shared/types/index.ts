import { ReactNode } from 'react';


export type CommonTypes = {
  className?: string;
};

export type Sizes = 'extraLarge' | 'large' | 'medium' | 'small' | 'normal';

export type TypeWithoutClassName<T> = Omit<T, 'className'>;

export enum InputStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type InputVariantTypes = 'default' | 'search';

export type SelectOptionType<T = string> = {
  value: T;
  label: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
};

export type Maybe<T> = T | null;

export type DocumentType = any;
export type DocumentMetadata = { ContentLength: number; isEncrypted: boolean };
