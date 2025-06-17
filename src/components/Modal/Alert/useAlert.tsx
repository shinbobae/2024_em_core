import { ModalProps } from '../type';
import useModal from '../useModal';

const useAlert = () => {
  const { openModal, closeModal } = useModal();

  const openAlert = (props: ModalProps) => {
    openModal({ ...props, type: "ALERT" });
  };

  const closeAlert = () => {
    closeModal();
  }

  return {
    openAlert,
    closeAlert
  };
}
export default useAlert;
