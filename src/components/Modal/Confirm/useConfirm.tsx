import { ModalProps } from '../type';
import useModal from '../useModal';

const useConfirm = () => {
  const { openModal, closeModal } = useModal();

  const openConfirm = (props: ModalProps) => {
    openModal({ ...props, type: "CONFIRM" });
  };

  const closeConfirm = () => {
    closeModal();
  }

  return {
    openConfirm,
    closeConfirm
  };
}
export default useConfirm;
