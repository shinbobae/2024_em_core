import React from 'react';
import { createRoot } from 'react-dom/client';

import Alert from '../../components/Modal/Alert/Alert';
import Modal from '../../components/Modal/Modal';
import { ModalProps } from '../../components/Modal/type';

type Props = {
  isOpen?: boolean;
  title?: string;
  message?: string;
  btnText?: string;
  component?: () => React.ReactNode;
};

const modal = {
  open: (Component: (props: Props) => React.ReactNode, props: ModalProps) => {
    const defaultProps = {
      isOpen: true,
      close: () => {},
    };
    const newContainer = document.createElement('div');
    // newContainer.setAttribute('id', 'util');
    // const newContainer = document.getElementById('modal');
    // document.body.appendChild(newContainer);

    if (!newContainer) return;
    const root = createRoot(newContainer);

    // const container = document.getElementById('modal');
    // if (!container) return;
    // const root = createRoot(container);

    defaultProps.close = () => {
      defaultProps.isOpen = false;
      root.unmount();
      newContainer.remove();
    };

    defaultProps.isOpen = true;
    root.render(<Component {...defaultProps} {...props}></Component>);
  },

  // modal
  openModal: (props: ModalProps) => {
    modal.open(Modal, props);
  },
  // alert
  openAlert: (props: ModalProps) => {
    modal.open(Alert, props);
  },
};

export default modal;
