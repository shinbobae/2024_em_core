import { createContext, useContext } from 'react';
import { Select2ContextType } from './type';

const Select2Context = createContext<Select2ContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(Select2Context);

  if (!context) {
    throw new Error('Select.* 컴포넌트만');
  }
  return context;
};

export default Select2Context;