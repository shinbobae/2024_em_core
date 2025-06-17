import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { modal } from '../../../utils';
import Button from '../../Button';
import useModal from '../useModal';
import { Popup, PopupBody, PopupFooter, PopupHeader } from './index';

const meta: Meta<typeof Popup> = {
  title: 'components/Modal/Popup',
  component: Popup,
};
export default meta;

type Story = StoryObj<typeof Popup>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);
    return (
      <>
        <Button color="primary" variant="float" onClick={toggle}>
          팝업 열기
        </Button>
        <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <PopupHeader>타이틀이 들어갈 자리</PopupHeader>
          <PopupBody>내용이 들어갈 자리 입니다</PopupBody>
          <PopupFooter>
            <Button color="primary" variant="float" onClick={close}>
              확인
            </Button>
          </PopupFooter>
        </Popup>
      </>
    );
  },
};

export const Example: Story = {
  decorators: Default.decorators,
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);
    const { openAlert } = useModal();

    return (
      <>
        <Button variant="float" color="primary" onClick={toggle}>
          팝업 열기
        </Button>
        <Popup isOpen={isOpen} onClose={close}>
          <PopupHeader>
            <div>알림</div>
          </PopupHeader>
          <PopupBody>내용</PopupBody>
          <PopupFooter>
            <Button
              variant="float"
              onClick={() => {
                close();
                openAlert({
                  content: '취소되었습니다.',
                });
              }}
            >
              취소
            </Button>
            <Button
              color="primary"
              onClick={() => {
                openAlert({
                  content: '확인되었습니다.',
                  ok: () => close(),
                });
              }}
            >
              확인
            </Button>
          </PopupFooter>
        </Popup>
      </>
    );
  },
};

export const ActionExample: Story = {
  decorators: Default.decorators,
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const onCancel = () => {
      setIsOpen(false);
      modal.openAlert({
        content: '취소되었습니다.',
      });
    };
    const onOk = () => {
      modal.openAlert({
        content: '확인되었습니다.',
        ok: () => setIsOpen(false),
      });
    };

    return (
      <>
        <Button variant="float" color="primary" onClick={() => setIsOpen(true)}>
          팝업 열기
        </Button>
        <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <PopupHeader>
            <div>알림</div>
            <div>헤더2</div>
            <button onClick={() => setIsOpen(false)}>&#x2716;</button>
          </PopupHeader>
          <PopupBody>내용</PopupBody>
          <PopupFooter>
            <Button variant="float" onClick={onCancel}>
              취소
            </Button>
            <Button color="primary" onClick={onOk}>
              확인
            </Button>
          </PopupFooter>
        </Popup>
      </>
    );
  },
};
