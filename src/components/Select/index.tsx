import React, { useCallback, useEffect, useRef, useState } from 'react';
import GlobalStyle from '../../style/GlobalStyle';
import {
  loadingStyle,
  multiValueStyle,
  optionItemStyle,
  optionTitleStyle,
  optionWrapperStyle,
  selectWrapperStyle,
  valueWrapStyle,
} from './style';
import { ChevronDownIcon, XCircleIcon } from '../../assets/icon';
import Empty from '../Empty';

/**
 * 기본 option { label: 노출 라벨명, value: 값 }
 * option 자체 disabled 포함할 경우 { label: 노출 라벨명, value: 값, disabled: true }
 * multiple 사용시 useMultiSelect 훅 사용
 * **/
export interface BaseSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [propName: string]: string | number | undefined | boolean;
}
export interface GroupSelectOption {
  title: string;
  options: BaseSelectOption[];
}

export interface SelectProps{
  value: BaseSelectOption| BaseSelectOption[] | null;   // 사용할 때 값
  optionList: BaseSelectOption[] | GroupSelectOption[]; // option 목록
  disabled?: boolean;                                   // select 자체 disabled 여부
  placeholder?: string;                                 // value가 없을 때 노출되는 안내문구
  hideSelected?: boolean;                               // 선택된 항목 옵션 목록에서 숨기기 여부
  hideDisabled?: boolean;                               // disabled 옵션 숨기기 여부
  multiple?: boolean                                    // 멀티선택 여부
  loading?: boolean;
  block?: boolean;
  onChange: (option: BaseSelectOption | null) => void;  // 셀렉트 액션
}

// 그룹옵션 타입가드
const isGroupOption = (target: BaseSelectOption[] | GroupSelectOption[]): target is GroupSelectOption[] => {
  return (target[0] as GroupSelectOption)?.title !== undefined;
};
// 멀티셀렉트 타입가드
const isMultiple = (target: BaseSelectOption | BaseSelectOption[] | null, multiple?: boolean): target is BaseSelectOption[] => {
  if (!multiple) return false;
  if (!target) return Array.isArray([] as BaseSelectOption[])
  return Array.isArray(target as BaseSelectOption[]);
};

const Select = ({ ...props }: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [optionPosTop, setOptionPosTOp] = useState<boolean>(false);
  const [multiple, setMultiple] = useState<boolean>(false);
  const [optionList, setOptionList] = useState<BaseSelectOption[] | GroupSelectOption[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [focusOption, setFocusOption] = useState<{ index: number, option: BaseSelectOption | null }>({ index: -1, option: null });

  useEffect(() => {
    if (props.multiple) {
      Array.isArray(props.value as BaseSelectOption[]);
      setMultiple(true);
    }
  }, [props.multiple, props.value]);
  // 옵션 열리는 위치
  useEffect(() => {
    const getScroll = () => {
      const scrollY = window.scrollY;
      const scrollBottom = window.innerHeight + scrollY;
      const select = document.getElementById('select');
      if (!select) return;
      const selectTop = Math.floor(scrollY + select.getBoundingClientRect().top);

      if (scrollBottom > selectTop + select.offsetHeight + 240) { // 옵션 펼칠때 스타일에서 지정한 최대 높이
        setOptionPosTOp(false);
      } else {
        setOptionPosTOp(true);
      }
    }
    // 최초 1회 실행
    getScroll();
    // 스크롤시 실행
    window.addEventListener('scroll', getScroll);
    return () => {
      window.removeEventListener('scroll', getScroll);
    }
  }, []);
  // 셀렉트 밖 마우스 클릭시 옵션 닫음
  useEffect(() => {
    const getSelectOutside = (e: globalThis.MouseEvent) => {
      if (e.target instanceof HTMLDivElement && !selectRef.current?.contains(e.target)) {
        setOpen(false);
      }
      setFocusIndex(-1);
    }
    window.addEventListener("mousedown", getSelectOutside);
    return () => { window.removeEventListener("mousedown", getSelectOutside); };
  }, [selectRef]);
  // 옵션 목록 정제
  useEffect(() => {
    let newOptionList: BaseSelectOption[] | GroupSelectOption[] = props.optionList;
    // disabled 옵션 숨기기
    const hideDisabled = (initialList: GroupSelectOption[] | BaseSelectOption[]) => {
      //그룹옵션일때
      //그룹옵션아닐때
      if (isGroupOption(initialList)) {
        const newList: GroupSelectOption[] = [];
        for (let i = 0; i <initialList.length; i++) {
          const newGroup: GroupSelectOption = { title: initialList[i].title, options: [] }
          for (let j = 0; j < initialList[i].options.length; j++) {
            if (!Object.prototype.hasOwnProperty.call(initialList[i].options[j], 'disabled')) {
              newGroup.options.push(initialList[i].options[j]);
            }
          }
          newList.push(newGroup);
        }
        return newList
      } else {
        return initialList.filter((option) => !Object.prototype.hasOwnProperty.call(option, 'disabled'));
      }
    }
    // 선택된 옵션 숨기기
    const hideSelected = (initialList: GroupSelectOption[] | BaseSelectOption[]) => {
      // 그룹옵션일때
      //    멀티선택일때
      //      초기값있을때
      //      초기값없을때
      //    멀티선택아닐때
      //      초기값있을때
      //      초기값없을때
      // 그룹옵션아닐떄
      //    멀티선택일때
      //    멀티선택아닐때

      if (isGroupOption(initialList)) { // 그룹옵션일때
        const newList: GroupSelectOption[] = [];
        for (let i = 0; i < initialList.length; i++) {
          const newGroup: GroupSelectOption = { title: initialList[i].title, options: [] }
          for (let j = 0; j < initialList[i].options.length; j++) {
            if (isMultiple(props.value, multiple)) {  // 그룹옵션-멀티선택일때
              if (!props.value || props.value.length < 1) return initialList;
              if (!props.value.some((option) => option.value === initialList[i].options[j].value)) {
                newGroup.options.push(initialList[i].options[j]);
              }
            } else {                                  // 그룹옵션-멀티선택아닐때
              if (props.value) {                        // 초기값 있
                if (props.value.value !== initialList[i].options[j].value) {
                  newGroup.options.push(initialList[i].options[j]);
                }
              } else {                                  // 초기값 없
                newGroup.options.push(initialList[i].options[j]);
              }
            }
          }
          newList.push(newGroup);
        }
        return newList;
    } else {  // 그룹옵션아닐때
        if (isMultiple(props.value, multiple)) {  // 멀티선택일때
          const newList: BaseSelectOption[] = [];
          if (!props.value || props.value.length < 1) return initialList;
          for (let i = 0; i < initialList.length; i++) {
            if (!props.value.some((option) => option.value === initialList[i].value)) {
              newList.push(initialList[i]);
            }
          }
          return newList;
        } else {  // 멀티선택아닐때
          if (props.value) {                        // 초기값 있
            const newList: BaseSelectOption[] = [];
            for (let i = 0; i < initialList.length; i++) {
              if (props.value.value !== initialList[i].value) newList.push(initialList[i]);
            }
            return newList;
          } else return initialList // 초기값 있
        }
      }
    }

    if (props.hideDisabled) newOptionList = hideDisabled(newOptionList);
    if (props.hideSelected) newOptionList = hideSelected(newOptionList);
    if (searchInput) {
      // 옵션 목록 텍스트 검색
      //    그룹옵션일때
      //      그룹타이틀에 검색어가 포함될때
      //      그룹타이틀에 검색어가 포함안될때
      //    그룹옵션아닐때
      if (isGroupOption(newOptionList)) {
        const newList: GroupSelectOption[] = [];
        for (let i = 0; i < newOptionList.length; i++) {
          if (newOptionList[i].title.toLowerCase().includes(searchInput.toLowerCase())) { // 그룹타이틀에 검색어가 포함될때
            const newGroup: GroupSelectOption = { title: newOptionList[i].title, options: [] }
            for (let j = 0; j < newOptionList[i].options.length; j++) {
              if (newOptionList[i].options[j].label.toLowerCase().includes(searchInput.toLowerCase())) {
                newGroup.options.push(newOptionList[i].options[j]);
                if (newGroup.options.length > 0) newList.push(newGroup);
              }
            }
          } else {  // 그룹타이틀에 검색어가 포함안될때
            const newGroup: GroupSelectOption = { title: newOptionList[i].title, options: [] }
            for (let j = 0; j < newOptionList[i].options.length; j++) {
              if (newOptionList[i].options[j].label.toLowerCase().includes(searchInput.toLowerCase())) {
                newGroup.options.push(newOptionList[i].options[j]);
              }
            }
            if (newGroup.options.length > 0) newList.push(newGroup);
          }
        }
        newOptionList = newList;
      } else {
        newOptionList = newOptionList.filter((option) => option.label.toLowerCase().includes(searchInput.toLowerCase()));
      }
    }

    setOptionList(newOptionList);
  }, [props.value, props.hideSelected, props.hideDisabled, multiple, props.optionList, searchInput]);

  const getOptionLength = useCallback((optionList: BaseSelectOption[] | GroupSelectOption[]) => {
    let optionLength;
    if (isGroupOption(optionList)) {
      let num = 0;
      for (let i = 0; i < optionList.length; i++) {
        num = num + optionList[i].options.filter((option) => !Object.prototype.hasOwnProperty.call(option, 'disabled')).length;
      }
      optionLength = num;
    } else {
      optionLength = optionList.filter((option) => !Object.prototype.hasOwnProperty.call(option, 'disabled')).length;
    }
    return optionLength;
  }, [props.hideDisabled, optionList])

  const onOpenSelect = useCallback(() => {
    if (props.disabled) return;
    setOpen(value => !value);
  }, [props.disabled]);
  const onKeyboardAction = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const optionLength = getOptionLength(optionList);
    const key = e.key || e.keyCode;
    switch (key) {
      // UP KEY
      case 38:
      case 'ArrowUp':
        focusIndex === 0
          ? setFocusIndex(optionLength - 1)
          : setFocusIndex((prevState) => Math.max(prevState - 1, 0));
        break;

      // DOWN KEY
      case 40:
      case 'ArrowDown':
        focusIndex === optionLength - 1
          ? setFocusIndex(0)
          : setFocusIndex((prevState) => Math.min(prevState + 1, optionLength - 1))
        break;

      // ENTER KEY
      case 13:
      case 'Enter':
        props.onChange(focusOption.option);
        break;

      // BACKSPACE
      case 8:
      case 'Backspace':
        searchInput.length === 0
          ? isMultiple(props.value, multiple)
            ? props.onChange(props.value[props.value.length - 1])
            : props.onChange(null)
          : null
        break;

      // ESC 옵션 닫기
      case 27:
      case 'Escape':
        setOpen(false);
        break;

      // 그외 초기화
      default:
        setFocusIndex(-1);
        break;
    }
  }, [focusIndex, focusOption, props.value, multiple, optionList, searchInput]);

  return (
    <>
      <GlobalStyle />
      <div role="select" id="select" ref={selectRef} css={selectWrapperStyle(props.block || multiple || false)}>
        <div css={valueWrapStyle(open, props.disabled || false)} onClick={onOpenSelect}>
          <div>
            {props.value
              ? (isMultiple(props.value, multiple))
                ? props.value.map(option => (
                  <div key={option.value} css={multiValueStyle} onClick={(e) => {
                    e.stopPropagation();
                    props.onChange(option);
                  }}>
                    <span>{option.label}</span>
                    <XCircleIcon />
                  </div>
                ))
                : <span>{props.value.label}</span>
              : searchInput === '' && <span className="placeholder">{props.placeholder}</span>}
            <input
              type="text"
              value={searchInput}
              onKeyDown={onKeyboardAction}
              onFocus={() => setOpen(true)}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div>
          {props.value &&
              <div onClick={(e) => {
                e.stopPropagation();
                props.onChange(null);
              }}
              >
                <XCircleIcon />
              </div>
            }
            <ChevronDownIcon />
          </div>
        </div>
        {props.loading && <div css={loadingStyle}><span/></div>}
        {open && (
          <div role="option_list" id="option_list" css={optionWrapperStyle(optionPosTop)}>
            <OptionList
              optionList={optionList}
              value={props.value}
              focusIndex={focusIndex}
              setFocusOption={setFocusOption}
              multiple={isMultiple(props.value, multiple)}
              onChange={props.onChange}
            />
          </div>
        )}
      </div>
    </>
  )
}
export default Select;

export interface OptionListProps {
  optionList: BaseSelectOption[] | GroupSelectOption[];
  value: BaseSelectOption | BaseSelectOption[] | null;
  focusIndex: number;
  setFocusOption: React.Dispatch<React.SetStateAction<{ index: number, option: BaseSelectOption | null }>>
  multiple: boolean;
  onChange: (option: BaseSelectOption | null) => void;
}

const OptionList = ({ ...props }: OptionListProps) => {
  const isSelected = useCallback((option: BaseSelectOption, value: BaseSelectOption | BaseSelectOption[] | null) => { // key 속성 순서가 바뀔 수 있으니 정렬 후 객체 비교
    if (!value) return false;
    if (isMultiple(value, props.multiple)) {
      return value.some((item) => item.value === option.value);
    }
    return option.value === value.value;
  }, [props.value, props.multiple, props.optionList]);

  const onClickOption = useCallback((option: BaseSelectOption) => {
    if (isSelected(option, props.value)) {
      if (props.multiple) {
        props.onChange(option);
      } else {
        props.onChange(null);
      }
    } else if (option?.disabled) {
      return;
    } else {
      props.onChange(option);
    }
  }, [props.value, props.multiple]);

  if (props.optionList.length < 1) return <Empty />;
  if (isGroupOption(props.optionList)) {  // group option
    let nowIndex = 0;
    return props.optionList.map((group) => {
      return (
        <>
          <div css={optionTitleStyle} key={group.title}>{group.title}</div>
          {group.options
            .map((option) => {
              if (!option.disabled) nowIndex+=1;
              return (
                <Option
                  key={option.value}
                  index={option.disabled ? null : nowIndex - 1}
                  focusIndex={props.focusIndex}
                  setFocusOption={props.setFocusOption}
                  option={option}
                  isGroup={isGroupOption(props.optionList)}
                  selected={isSelected(option, props.value)}
                  onClick={() => onClickOption(option)}
                />
              )
            })}
        </>
      )
    })
  } else {
    let nowIndex = 0;
    return props.optionList.map((option) => {
      if (!option.disabled) nowIndex+=1;
      return (
        <Option
          key={option.value}
          index={option.disabled ? null : nowIndex - 1}
          focusIndex={props.focusIndex}
          setFocusOption={props.setFocusOption}
          option={option}
          isGroup={isGroupOption(props.optionList)}
          selected={isSelected(option, props.value)}
          onClick={() => onClickOption(option)}
        />
      );
    })
  }
}

interface OptionsProps {
  option: BaseSelectOption;
  index: number | null;
  focusIndex: number;
  setFocusOption: React.Dispatch<React.SetStateAction<{ index: number, option: BaseSelectOption | null }>>
  isGroup: boolean;
  selected: boolean;
  onClick: (option: BaseSelectOption | null) => void;
}

const Option = ({ option, onClick, index, focusIndex, setFocusOption, ...props }: OptionsProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    if (index === focusIndex) {
      if (option.disabled) return;
      setFocused(true);
      setFocusOption({ index: index, option: option });
    }
    else {
      setFocused(false) ;
    }
  }, [focusIndex, setFocusOption]);

  return (
    <div
      role='option'
      css={optionItemStyle(props.isGroup, props.selected, option.disabled, !option.disabled && focused)}
      onClick={() => onClick(option)}
    >
      {option.label}
    </div>
  )
}