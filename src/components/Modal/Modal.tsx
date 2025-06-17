import { useMemo } from 'react';

import Portal from './Portal';
import { modalBackground, modalBody, modalContent, modalHeader } from './style';
import { ModalProps } from './type';

const Modal = ({ title, content, close }: ModalProps) => {
  const modalId = useMemo(
    () => `emc_modal_${Math.random().toString(36).substring(2)}`,
    [],
  );
  const zIndex = useMemo(() => new Date().getTime(), []);

  return (
    <Portal>
      <div id={modalId}>
        <div css={modalBackground(zIndex)} onClick={close}></div>
        <div css={modalContent(zIndex)}>
          {title && (
            <div css={modalHeader}>
              <div>{title}</div>
              <button onClick={close}>&#10005;</button>
            </div>
          )}
          <div css={modalBody}>{content && content}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
