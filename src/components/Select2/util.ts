import React from 'react';
import { BaseSelectOption } from '../Select';

type E = React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
type SingleValue = string | number | null;
type MultiValue = SingleValue[] | null;


export const onChangeSingleValue = (e: E, value: SingleValue, option: BaseSelectOption, onChange: (e: E, value: SingleValue) => void) => {
  if (option.value === value) {
    return onChange(e, null);
  } else {
    return onChange(e, option.value)
  }
}

export const onChangeMultiValue = (e: E, value: MultiValue, option: BaseSelectOption, onChange: (e: E, value: MultiValue) => void) => {
  if (value && value.find((value) => option.value === value)) { // 지우기
    const newValues = value.filter((value) => option.value !== value);
    onChange(e, newValues.length < 1 ? null : newValues);
  } else if (value && !value.find((value) => option.value === value)) { //기존 값에 선택 안된거 추가
    onChange(e, [...value, option.value]);
  } else {  // 빈 값에 새로 추가
    onChange(e, [option.value]);
  }
}