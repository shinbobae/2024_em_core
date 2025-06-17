import { useContext } from "react";
import { ModalContext } from './ModalProvider';
import { ModalProps, Modals } from './type';

let tmpModals: Modals;

const useModal = () => {
  const { modals, setModals } = useContext(ModalContext);
  tmpModals = modals;

  const openModal = (props: ModalProps) => {
    const hashMapA: Map<string, ModalProps> = new Map(tmpModals);
    const key = Math.random().toString(36).substring(2);
    props.key = props.key || key;
    props.close = async () => {
      const hashMapB = new Map(hashMapA);
      if (props.key) {
        hashMapB.delete(props.key!);
        setModals(new Map(hashMapB));
      }
    };
    hashMapA.set(props.key, props);
    setModals(hashMapA);
  };

  const closeModal = (key?: string) => {
    const hashMap: Map<string, ModalProps> = new Map(tmpModals);
    if (key) {
      const props = hashMap.get(key);
      if (props) {
        hashMap.delete(key);
        setModals(new Map(hashMap));
      }
      return;
    }
  };

  const closeAllModal = () => {
    tmpModals.clear();
  }

  const openConfirm = (props: ModalProps) => {
    openModal({ ...props, type: "CONFIRM" });
  };

  const openAlert = (props: ModalProps) => {
    openModal({ ...props, type: "ALERT" });
  };

  return {
    openModal,
    closeModal,
    closeAllModal,
    openConfirm,
    openAlert,
  };
};

export default useModal;
