import { ReactNode, createContext, useState } from 'react';

import Alert from './Alert/Alert';
import Confirm from './Confirm/Confirm';
import Modal from './Modal';
import { ModalProps, Modals } from './type';

export const ModalContext = createContext({
  modals: new Map(),
  setModals: (state: Modals) => {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modals>(new Map());

  // const alertList: ModalProps[] = [];
  const alertList: ModalProps[] = [];
  const confirmList: ModalProps[] = [];
  const modalList: ModalProps[] = [];
  const list: ModalProps[] = [];

  modals.forEach(value => {
    list.push(value);
    switch (value.type) {
      case 'ALERT':
        alertList.push(value);
        break;
      case 'CONFIRM':
        confirmList.push(value);
        break;
      default:
        modalList.push(value);
        break;
    }
  });

  return (
    <ModalContext.Provider value={{ modals, setModals }}>
      {list.map(modal => {
        switch (modal.type) {
          case 'ALERT':
            return <Alert {...modal} key={modal.key} />;
          case 'CONFIRM':
            return <Confirm {...modal} key={modal.key} />;
          default:
            return <Modal {...modal} key={modal.key} />;
        }
      })}

      {/*<div id="emc-alert">*/}
      {/*  {alertList.map(modal => (*/}
      {/*    <Alert {...modal} key={modal.key} />*/}
      {/*  ))}*/}
      {/*</div>*/}
      {/*<div id="emc-confirm">*/}
      {/*  {confirmList.map(modal => (*/}
      {/*    <Confirm {...modal} key={modal.key} />*/}
      {/*  ))}*/}
      {/*</div>*/}
      {/*<div id="emc-modal">*/}
      {/*  {modalList.map(modal => (*/}
      {/*    <Modal {...modal} key={modal.key} />*/}
      {/*  ))}*/}
      {/*</div>*/}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
