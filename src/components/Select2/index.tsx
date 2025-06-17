import Select2Context, { useSelectContext } from './SelectContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BaseSelectOption } from '../Select';
import { Select2OptionProps, Select2Props } from './type';
import {
  searchInputStyle,
  select2OptionListStyle,
  select2OptionStyle, select2PlaceholderStyle,
  select2TriggerStyle, select2ValueWrapStyle,
  select2WrapperStyle,
} from './style';
import Empty from '../Empty';
import Tag from '../Tag';
import { onChangeMultiValue, onChangeSingleValue } from './util';
import { IcoArrow } from '../../assets';
import { black500 } from '../../colors';

export const Select2 = ({
                          value,
                          onChange,
                          placeholder,
                          optionList,
                          disabled = false,
                          block = false,
                          multiple = false,
                          status,
                          isSearch = false,
                          // loading = false,
                          hideDisabled = false,
                          // hideSelected = false,
                          borderless = false,
}: Select2Props) => {

  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false); // 옵션 목록 열림 여부
  const [tabIndex, setTabIndex] = useState<number>(-1);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchedOptionList, setSearchedOptionList] = useState<BaseSelectOption[]>([]);


  // 셀렉트 밖 마우스 클릭시 옵션 닫음
  useEffect(() => {
    const getSelectOutside = (e: globalThis.MouseEvent) => {
      if (!selectRef.current?.contains(e.target as HTMLDivElement)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("mouseup", getSelectOutside);
    return () => { window.removeEventListener("mouseup", getSelectOutside); };
  }, [selectRef]);

  // optionList 정제 후 searchedOptionList 로 변경
  useEffect(() => {
    let refinedList: BaseSelectOption[] = [];
    if (searchInput.length > 0) {
      refinedList = optionList.filter((option: BaseSelectOption) => option.label.toLowerCase().includes(searchInput.toLowerCase()));
    } else {
      refinedList= optionList
    }

    if (hideDisabled) {
      refinedList = refinedList.filter((option: BaseSelectOption) => !option.disabled);
    }
    setSearchedOptionList(refinedList);
  }, [optionList, searchInput, hideDisabled]);

  const openSelect = useCallback(() => {
    if (disabled || searchInput.length > 0) return;
    setIsOpen((value: boolean) => !value);
    setTabIndex(-1);
    inputRef.current?.focus();
  }, [disabled, searchInput]);

  return (
    <Select2Context.Provider
      value={{
        value,
        onChange,
        optionList,
        searchedOptionList,
        multiple,
        placeholder,
        status,
        hideDisabled,
        isOpen,
        setIsOpen,
        tabIndex,
        setTabIndex,
        disabled,
        selectRef,
        inputRef,
        isSearch,
        searchInput,
        setSearchInput,
    }}
    >
      <div className="wrap" ref={selectRef} css={select2WrapperStyle(block || multiple)}>
        <div
          aria-haspopup="true"  // 해당 요소가 팝업을 트리거할 수 있음
          aria-expanded={isOpen}  // aria-controls 에 해당하는 요소가 확장/축소 되었는지 여부
          aria-controls="select-list" // 이 요소가 다른 것을 제어하는 것을 나타냄
          css={select2TriggerStyle(isOpen, disabled, borderless, status)}
          onClick={openSelect}
        >
          <Select2.Value />
          <IcoArrow color={black500} />
        </div>

        {isOpen && <Select2.OptionList />}
      </div>
    </Select2Context.Provider>
  )
}

Select2.SearchInput = () => {
  const { value, inputRef, disabled, isSearch, setIsOpen, multiple, searchedOptionList, searchInput, setSearchInput, tabIndex, setTabIndex, selectRef, onChange } = useSelectContext();

  const onChangeSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTabIndex(-1);
    setIsOpen(true);
    if (isSearch) setSearchInput(e.target.value);
    if (value && !multiple) {
      onChange(e, null);
      setIsOpen(true);
    }
  }, [value, isSearch, multiple]);

  const onKeyDownAction = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const optionLength = searchedOptionList.length
    const key = e.key || e.keyCode;
    switch (key) {
      // UP KEY
      case 38:
      case 'ArrowUp':
        setTabIndex((prevState: number) => Math.max(prevState - 1, 0));
        break;
      // DOWN KEY
      case 40:
      case 'ArrowDown':
        setTabIndex((prevState: number) => Math.min(prevState + 1, optionLength - 1));
        break;
      // ENTER KEY
      case 13:
      case 'Enter':
        if (searchedOptionList[tabIndex].disabled) return;
        if (!multiple) {
          onChangeSingleValue(e, value, searchedOptionList[tabIndex], onChange);
          setSearchInput('');
          setIsOpen(false);
        } else {
          onChangeMultiValue(e, value, searchedOptionList[tabIndex], onChange);
        }
        break;
      // BACKSPACE
      case 8:
      case 'Backspace':
        if (value && searchInput.length < 1) {
          if (multiple) {
            if (value.length === 1 || value.length === 0) {
              onChange(e, null);
            } else {
              const newValues = value.slice(0, -1);
              onChange(e, newValues);
            }
          } else {
            onChange(e, null);
          }
        }
        break;
      // ESC
      case 27:
      case 'Escape':
        setIsOpen(false);
        selectRef!.current!.blur();
        setTabIndex(-1);
        setSearchInput('');
        break;
      default:
        selectRef!.current!.blur();
        setTabIndex(-1);
        break;
    }
  }, [value, multiple, tabIndex, searchedOptionList, searchInput]);

  return (
    <input
      type="text"
      ref={inputRef}
      disabled={disabled}
      css={searchInputStyle(isSearch, multiple, disabled, !value)}
      value={searchInput}
      onChange={onChangeSearchInput}
      onKeyDown={onKeyDownAction}
    />
  )
}

Select2.Value = () => {
  const { value, multiple, onChange, optionList, placeholder, searchInput } = useSelectContext();

  // set defaultValue
  // default value 에 있는 값이 옵션목록에 없을 경우 대피 최초 optionList 에서 값 비교 후 onChange 처리
  useEffect(() => {
    if (multiple) {
      if (optionList.some((option: BaseSelectOption) => value?.includes(option.value))) {
        const newValue = optionList
          .filter((option: BaseSelectOption) => value?.includes(option.value))
          .map((item: BaseSelectOption) => item.value);
        onChange(null, newValue);
      } else {
        onChange(null, null);
      }
    } else {
      if (value) {
        if (!optionList.some((option: BaseSelectOption) => option.value === value)) {
          onChange(null, null)
        }
      }
    }
  }, [optionList]);

  const findOption = useCallback(() => {
    if (!value || !optionList) return;
    if (multiple) {
      return optionList
        .filter((option: BaseSelectOption) => value
          .includes(option.value))
        .map((item: BaseSelectOption) => (
          <Tag
            key={item.value}
            size='sm'
            variant="borderless"
            color="primary"
            onClose={() => onChange(null, value.filter((value: string | number) => value !== item.value))}
          >
            {item.label}
          </Tag>
        ))
    }
    return optionList.find((option: BaseSelectOption) => option.value === value)?.label
  }, [value, multiple, optionList]);

  return (
    <div css={select2ValueWrapStyle}>
      {value
        ? findOption()
        : (
        <div aria-placeholder={placeholder} css={select2PlaceholderStyle(searchInput.trim().length < 1)}>
          {placeholder}
        </div>
      )}
      <Select2.SearchInput />
    </div>
  )
}

Select2.OptionList = () => {
  const { value, multiple, selectRef, searchedOptionList } = useSelectContext();
  const optionListRef = useRef<HTMLDivElement>(null);

  // 셀렉트 열 떄, 옵션 리스트가 스크롤 아래서 열리면 윈도우 스크롤을 내려버림
  useEffect(() => {
    if (!optionListRef || !optionListRef.current) return;
    const optionListY = selectRef!.current!.offsetTop + optionListRef.current.offsetHeight;
    const windowY = window.innerHeight;
    if (optionListY > windowY) {
      optionListRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div role="listbox" css={select2OptionListStyle} ref={optionListRef}>
      {searchedOptionList.length < 1
        ? (<Empty />)
        : (searchedOptionList.map((option: BaseSelectOption, index: number) => (
          <Select2.Option
            key={option.value}
            index={index}
            option={option}
            selected={multiple ? value?.find((item: string | number) => item === option.value) :option.value === value}
          >
            {option.label}
          </Select2.Option>
        )))}
    </div>
  )
}

Select2.Option = ({ selected, index, option }: Select2OptionProps) => {
  const { value, onChange, multiple, setSearchInput, setIsOpen, tabIndex } = useSelectContext();
  const [hovered, setHovered] = useState<BaseSelectOption | null>(null);
  const optionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    optionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [tabIndex]);

  const onChangeValue = useCallback((e: React.MouseEvent<HTMLDivElement>, option: BaseSelectOption) => {
    if (option.disabled) return;
    // onChange(e, option.value);
    if (multiple) {
      onChangeMultiValue(e, value, option, onChange);
    } else {
      onChangeSingleValue(e, value, option, onChange);
      // single 일 떄, 선택 후 검색어 초기화 및 목록 닫기
      setIsOpen(false);
      setSearchInput('');
    }
  }, [value]);

  return (
    <div
      role="option"
      ref={tabIndex === index ? optionRef : undefined}
      data-value={value}
      data-label={option.label}
      aria-disabled={option.disabled}
      aria-selected={selected}
      css={select2OptionStyle(selected, option.disabled || false, tabIndex === index, hovered?.value === option.value)}
      onMouseEnter={() => setHovered(option)}
      onMouseLeave={() => setHovered(null)}
      onClick={(e) => onChangeValue(e, option)}
    >
      {option.label ?? value}
    </div>
  )
}