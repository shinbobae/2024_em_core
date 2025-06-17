import { useCallback, useEffect, useState } from 'react';
import { BaseSelectOption } from '../components/Select';

const useMultiSelect = <T extends BaseSelectOption[] | null>(initialValue: T) => {
  const [values, setValues] = useState<BaseSelectOption[] | null>(initialValue);
  const handler = useCallback((option: BaseSelectOption | null) => {
    if (!option) {
      setValues(null);
      return;
    }
    if (values) {
      if (values.find((value) => option.value === value.value)) {
        const newValues = [...values];
        setValues(newValues.filter((item) => item.value !== option.value));
      } else {
        setValues([...values, option]);
      }
    } else {
      setValues([option]);
    }
  }, [values]);
  useEffect(() => {
    if (values?.length === 0) {
      setValues(null);
    }
  }, [values]);
  return [values, handler, setValues] as const;
};

export default useMultiSelect;
