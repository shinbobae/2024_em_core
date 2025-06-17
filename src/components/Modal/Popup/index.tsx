import React, { useMemo } from 'react';

import Portal from '../Portal';
import {
  modalBackground,
  modalBody,
  modalContent,
  modalFooter,
  modalHeader,
} from '../style';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

type ChildrenType = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Popup = ({ isOpen, onClose, children }: PopupProps) => {
  const modalId = useMemo(
    () => `emc_popup_${Math.random().toString(36).substring(2)}`,
    [],
  );
  const zIndex = useMemo(() => new Date().getTime(), []);

  if (!isOpen) return null;

  return (
    <Portal>
      <div id={modalId}>
        <div css={modalBackground(zIndex)} onClick={onClose} />
        <div css={modalContent(zIndex)}>{children}</div>
      </div>
    </Portal>
  );
};

export const PopupHeader = ({ children, style }: ChildrenType) => {
  return (
    <div css={modalHeader} style={style && style}>
      {children}
    </div>
  );
};

export const PopupBody = ({ children, style }: ChildrenType) => {
  return (
    <div css={modalBody} style={style && style}>
      {children}
    </div>
  );
};

export const PopupFooter = ({ children, style }: ChildrenType) => {
  return (
    <div css={modalFooter} style={style && style}>
      {children}
    </div>
  );
};
