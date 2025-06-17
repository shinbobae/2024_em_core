import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components';
import modal from '../../utils/modal';

const meta: Meta<typeof modal> = {
  title: 'components/Modal/util',
};
export default meta;

type Story = StoryObj<typeof modal>;

export const UtilModal: Story = {
  render: () => {
    const open = () => {
      modal.openModal({ content: <div>Modal component2</div> });
    };

    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="float" color="primary" onClick={open}>
          util modal 열기
        </Button>
      </div>
    );
  },
};

export const UtilAlert: Story = {
  render: () => {
    const open = () => {
      modal.openAlert({
        title: '알립니다',
        content: '알림 메시지 입니다.',
        okText: '확인텍스트',
        ok: () => window.alert('확인했음'),
      });
    };
    const open2 = () => {
      modal.openAlert({
        title: '알립니다',
        content: '에러 아이콘이 있는 알림 메시지 입니다.',
        okText: '확인텍스트',
        icon: 'error',
        ok: () => window.alert('확인했음'),
      });
    };

    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="float" color="primary" onClick={open}>
          util alert 열기
        </Button>
        <Button variant="float" color="primary" onClick={open2}>
          util alert 열기
        </Button>
      </div>
    );
  },
};
