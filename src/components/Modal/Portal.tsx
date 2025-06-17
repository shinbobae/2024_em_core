import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
};

const Portal = ({ children }: Props) => {
  const container = document.getElementById('modal') as HTMLElement;
  if (!container) return null;
  return createPortal(children, container);
};

export default Portal;
