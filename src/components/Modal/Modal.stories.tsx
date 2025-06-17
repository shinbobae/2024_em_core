import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../index';
import Alert from './Alert/Alert';
import useAlert from './Alert/useAlert';
import Confirm from './Confirm/Confirm';
import useConfirm from './Confirm/useConfirm';
import Modal from './Modal';
import useModal from './useModal';

const meta: Meta<typeof Modal> = {
  title: 'components/Modal/story',
  component: Modal,
  argTypes: {
    ...Modal,
    type: {
      description: '사용할 API 내부에서 작동됩니다.',
      table: { type: { detail: 'null(default), ALERT, CONFIRM' } },
    },
    title: {
      description:
        '모달 헤더에 들어갈 문구입니다.   \n 기본 모달에는 빈 텍스트, alert 에는 `알림`, confirm 에는 `확인`의 기본 텍스트가 지정되어 있으며 해당 키로 변경 가능합니다.',
    },
    content: {
      description:
        '모달 콘텐츠에 들어갈 내용입니다.    \n 기본 `<p>`태그가 지정되어 있어 jsx 사용 시 `<></>` 프래그런스 태그로 묶어 사용합니다.',
    },
    okText: {
      description:
        '확인 버튼이 포함된 alert 와 confirm 의 확인 버튼 텍스트를 변경할 수 있습니다.',
      table: {
        category: 'ok button',
        type: {
          detail:
            '글자 수 제한은 두지 않았지만    \n긴 텍스트를 넣지는 않도록 합니다.',
        },
      },
    },
    okColor: {
      description:
        '확인 버튼의 색상을 지정된 테마의 색상으로 이용할 수 있습니다.',
      table: {
        category: 'ok button',
        type: { detail: 'primary, danger, default' },
      },
    },
    okLoading: {
      description: '확인 버튼을 로딩 상태로 지정할 수 있습니다.',
      table: { category: 'ok button' },
    },
    cancelText: {
      description:
        '취소 버튼이 포함된 confirm 의 취소 버튼 텍스트를 변경할 수 있습니다.',
      table: {
        category: 'cancel button',
        type: {
          detail:
            '글자 수 제한은 두지 않았지만    \n긴 텍스트를 넣지는 않도록 합니다.',
        },
      },
    },
    cancelColor: {
      description:
        '취소 버튼의 색상을 지정된 테마의 색상으로 이용할 수 있습니다.',
      table: {
        category: 'cancel button',
        type: { detail: 'primary, danger, default' },
      },
    },
    close: {
      table: { category: 'event handler' },
      description:
        '모달을 닫는 동작입니다.    \n  API 사용에서는 기본으로 적재되어 있으며, UI 컴포넌트 사용 시 props를 추가해 사용합니다.',
    },
    ok: {
      table: { category: 'event handler' },
      description:
        '`ALERT` `CONFIRM`에서 사용하는 확인 버튼 동작을 추가할 수 있습니다.    \n `ok` 동작 후 `close`가 동작됩니다.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const modal = useModal();

    const openModal = () => {
      modal.openModal({
        title: '모달',
        content: <div>모달 콘텐츠</div>,
      });
    };

    return (
      <Button variant="float" color="primary" onClick={openModal}>
        Modal 열기
      </Button>
    );
  },
};

export const AlertConfirm: Story = {
  render: () => {
    const { openAlert } = useAlert();

    const { openConfirm } = useConfirm();

    const openDefaultAlert = () => {
      openAlert({
        content: (
          <>
            안내 내용 작성 <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </>
        ),
        ok: () => console.log('확인'),
      });
    };
    const openAlert2 = () => {
      openAlert({
        content: (
          <>
            안내 내용 작성 <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </>
        ),
        cancelColor: 'primary',
        ok: () => console.log('확인'),
      });
    };

    const openDefaultConfirm = () => {
      openConfirm({
        content: (
          <>
            확인 내용 작성 <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </>
        ),
        ok: () => console.log('확인'),
      });
    };
    const openConfirm2 = () => {
      openConfirm({
        content: (
          <>
            확인 내용 작성 <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </>
        ),
        okColor: 'danger',
        ok: () => console.log('확인'),
      });
    };

    return (
      <>
        <Button variant="float" color="primary" onClick={openDefaultAlert}>
          안내창 열기
        </Button>
        <Button variant="float" color="primary" onClick={openAlert2}>
          파란 안내창 열기
        </Button>
        <Button variant="float" color="primary" onClick={openDefaultConfirm}>
          확인창 열기
        </Button>
        <Button variant="float" color="primary" onClick={openConfirm2}>
          붉은 확인창 열기
        </Button>
      </>
    );
  },
};

export const ModalUI: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState([false, false, false]);

    const onClockBtn = (i: number) => {
      const newState = [...isOpen];
      newState[i] = true;
      setIsOpen(newState);
    };

    return (
      <>
        <Button color="primary" onClick={() => onClockBtn(0)}>
          modal
        </Button>
        <Button color="primary" onClick={() => onClockBtn(1)}>
          alert
        </Button>
        <Button color="primary" onClick={() => onClockBtn(2)}>
          confirm
        </Button>
        {isOpen[0] && (
          <Modal
            title="타이틀"
            content={
              <>
                모달은 이렇게도 쓸 수 있습니다. <br />
                코드를 함께 보면 좋습니다.
              </>
            }
            close={() => setIsOpen([false, false, false])}
          />
        )}
        {isOpen[1] && (
          <Alert
            title="알림 타이틀"
            content={
              <>
                모달은 이렇게도 쓸 수 있습니다. <br />
                코드를 함께 보면 좋습니다.
              </>
            }
            close={() => setIsOpen([false, false, false])}
          />
        )}
        {isOpen[2] && (
          <Confirm
            title="확인 타이틀"
            content={
              <>
                모달은 이렇게도 쓸 수 있습니다. <br />
                코드를 함께 보면 좋습니다.
              </>
            }
            close={() => setIsOpen([false, false, false])}
          />
        )}
      </>
    );
  },
};

export const MultiModal: Story = {
  render: () => {
    const { openModal, openConfirm, closeAllModal } = useModal();

    const openTwoModal = () => {
      openModal({
        content: <div style={{ padding: '50px' }}>Modal component1</div>,
      });
      setTimeout(() => {
        openModal({
          content: <div>뱅뱅뱅</div>,
        });
      }, 100);
      setTimeout(() => {
        openConfirm({
          content: <div>Modal component2</div>,
          okText: '전체 닫기',
          ok: () => closeAllModal(),
        });
      }, 200);
    };

    return (
      <Button variant="float" color="primary" onClick={openTwoModal}>
        열기
      </Button>
    );
  },
};

// test
// Modal Default
export const TEST0108: Story = {
  render: () => {
    const modal = useModal();

    const openModal = () => {
      modal.openModal({});
    };

    return (
      <Button color="primary" onClick={openModal}>
        Modal 열기
      </Button>
    );
  },
};
export const TEST0109: Story = {
  render: () => {
    const modal = useModal();

    const openModal = () => {
      modal.openModal({ title: '모달' });
    };

    return (
      <Button color="primary" onClick={openModal}>
        Modal 열기
      </Button>
    );
  },
};
export const TEST0110: Story = {
  render: () => {
    const modal = useModal();

    const openModal = () => {
      modal.openModal({});
    };

    return (
      <Button color="primary" onClick={openModal}>
        Modal 열기
      </Button>
    );
  },
};
export const TEST0111: Story = {
  render: () => {
    const modal = useModal();

    const openModal = () => {
      modal.openModal({ content: <div>Modal component</div> });
    };

    return (
      <Button color="primary" onClick={openModal}>
        Modal 열기
      </Button>
    );
  },
};

// Alert
export const TEST0112: Story = {
  render: () => {
    const { openAlert } = useAlert();

    return (
      <Button color="primary" onClick={() => openAlert({})}>
        Alert 열기
      </Button>
    );
  },
};

export const TEST0113: Story = {
  render: () => {
    const { openAlert } = useAlert();

    return (
      <Button color="primary" onClick={() => openAlert({ title: '안내 모달' })}>
        Alert 열기
      </Button>
    );
  },
};

export const TEST0114: Story = {
  render: () => {
    const { openAlert } = useAlert();

    return (
      <Button color="primary" onClick={() => openAlert({})}>
        Alert 열기
      </Button>
    );
  },
};

export const TEST0115: Story = {
  render: () => {
    const { openAlert } = useAlert();

    return (
      <Button
        color="primary"
        onClick={() => openAlert({ content: <div>Modal component</div> })}
      >
        Alert 열기
      </Button>
    );
  },
};

export const TEST0116: Story = {
  render: () => {
    const { openAlert } = useAlert();

    return (
      <Button
        color="primary"
        onClick={() => openAlert({ content: <div>Modal component</div> })}
      >
        Alert 열기
      </Button>
    );
  },
};

export const TEST0117: Story = {
  render: () => {
    const { openAlert } = useAlert();

    return (
      <Button
        color="primary"
        onClick={() => openAlert({ okText: '확인 버튼 텍스트 ' })}
      >
        Alert 열기
      </Button>
    );
  },
};

export const TEST0118: Story = {
  render: () => {
    const { openAlert } = useAlert();

    return (
      <Button color="primary" onClick={() => openAlert({})}>
        Alert 열기
      </Button>
    );
  },
};

export const TEST0119: Story = {
  render: () => {
    const { openAlert } = useAlert();

    return (
      <Button
        color="primary"
        onClick={() =>
          openAlert({
            ok: () => alert('확인'),
          })
        }
      >
        Alert 열기
      </Button>
    );
  },
};

// Confirm
export const TEST0120: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button color="primary" onClick={() => openConfirm({})}>
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0121: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button
        color="primary"
        onClick={() => openConfirm({ title: '확인 모달' })}
      >
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0122: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button color="primary" onClick={() => openConfirm({})}>
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0123: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button
        color="primary"
        onClick={() => openConfirm({ content: <div>Modal component</div> })}
      >
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0124: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button color="primary" onClick={() => openConfirm({})}>
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0125: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button
        color="primary"
        onClick={() => openConfirm({ okText: '확인 버튼 텍스트' })}
      >
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0126: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button color="primary" onClick={() => openConfirm({ ok: () => {} })}>
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0127: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button
        color="primary"
        onClick={() => openConfirm({ ok: () => alert('확인') })}
      >
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0128: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button color="primary" onClick={() => openConfirm({})}>
        Confirm 열기
      </Button>
    );
  },
};
export const TEST0129: Story = {
  render: () => {
    const { openConfirm } = useConfirm();

    return (
      <Button
        color="primary"
        onClick={() => openConfirm({ cancelText: '취소 버튼 텍스트' })}
      >
        Confirm 열기
      </Button>
    );
  },
};
