import React, { RefObject } from 'react';
import { BaseSelectOption } from '../Select';

export type DefaultSelect2Value = any;
export type Children = { children?: React.ReactNode }

export type E = React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement> | null;
export type SingleValue = string | number | null;
export type MultiValue = SingleValue[] | null;


export type Select2ContextType<
  T extends string | number = DefaultSelect2Value,
  K extends React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement> | null = E
> = {
  value: T;
  onChange: (e: K, value: T) => void;
  optionList: BaseSelectOption[];
  multiple: boolean;
  placeholder?: string;
  status?: 'error';
  disabled: boolean;
  isSearch: boolean;
  hideDisabled: boolean;
  searchedOptionList: BaseSelectOption[];
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>
  selectRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
}

export type Select2Props<T extends string | number = DefaultSelect2Value> = {
  value: T;
  onChange: (e: any, value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  isSearch?: boolean;
  // loading?: boolean | null;
  // hideSelected?: boolean;
  hideDisabled?: boolean;
  block?: boolean;
  optionList: BaseSelectOption[];
  status?: 'error';
  borderless?: boolean;
} & Children;

export type Select2OptionProps<T extends string | number = DefaultSelect2Value> = {
  // value: T;
  selected: boolean;
  index: number;
  option: BaseSelectOption;
} & Children;