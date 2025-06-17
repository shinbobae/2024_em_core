import { Meta, StoryObj } from '@storybook/react';
import FilePicker from './index';
import { useCallback, useState } from 'react';
import Button from '../Button';
import { useAlert } from '../index';

const meta: Meta<typeof FilePicker> = {
  title: "components/FilePicker/story",
  component: FilePicker,
  argTypes: {
    ...FilePicker,
    children: {
      description: '미 지정 시 기본으로 `Upload` 버튼이 제공되며, 필요에 따라 다른 형태로 대체할 수 있습니다.   \n   `buttonText` 와 중복 사용이 불가합니다.',
    },
    buttonText: {
      description: '기본으로 제공되는 업로드 버튼의 텍스트만 변경할 수 있습니다.   \n   `children` 과 중복 사용이 불가합니다.',
    },
    accept: {
      description: '기본 input[type="file"]의 형태를 따릅니다.',
    },
    disabled: {
      description: '설정 시, 파일 선택창을 열지 않을 수 있습니다.',
    },
    multiple: {
      description: '설정 시, 여러 파일을 선택할 수 있습니다.',
    },
    maxSize: {
      description: 'MB 단위로 업로드 파일의 용량을 제한합니다.'
    },
    onChange: {
      description: '`File[]` 타입으로 반환합니다.',
      table: {
        category: 'event handler'
      }
    },
  }
}
export default meta;

type Story = StoryObj<typeof FilePicker>;

export const Default: Story = {
  args: {
    onChange: () => {}
  }
}

export const CustomChildren: Story = {
  args: {
    children: (
      <div css={{ '&:hover': { filter: 'brightness(0.7)' } }}>
        <p style={{ textAlign: 'center', color: 'white', background: 'red' }}>무</p>
        <p style={{ textAlign: 'center', color: 'white', background: 'orange' }}>지</p>
        <p style={{ textAlign: 'center', color: 'white', background: 'yellow' }}>개</p>
        <p style={{ textAlign: 'center', color: 'white', background: 'green' }}>빛</p>
        <p style={{ textAlign: 'center', color: 'white', background: 'blue' }}>업</p>
        <p style={{ textAlign: 'center', color: 'white', background: 'navy' }}>로</p>
        <p style={{ textAlign: 'center', color: 'white', background: 'purple' }}>더</p>
      </div>
    ),
    onChange: () => {},
  }
}

export const CustomButtonText: Story = {
  args: {
    buttonText: '업로드',
    onChange: () => {},
  }
}

export const AcceptExample: Story = {
  args: {
    accept: 'image/*',
    onChange: () => {}
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    onChange: () => {},
  }
}

export const Multiple: Story = {
  args: {
    multiple: true,
    onChange: () => {},
  }
}

export const MaxSize: Story = {
  args: {
    maxSize: 1,
    onChange: () => {},
  }
}

export const EventHandler: Story = {
  render: () => {
    const { openAlert } = useAlert();
    const [files, setFiles] = useState<File[]>([]);

    const onSubmit = useCallback(() => {
      if (files.length < 1) {
        openAlert({
          title: 'INFO',
          content: '파일을 선택해 주세요.'
        });
      }
      console.log('files', files);
    }, [files]);

    return (
      <div>
          <FilePicker maxSize={0.5} multiple onChange={(value) => setFiles(value)} style={{ marginBottom: '2rem' }}/>
          <Button color="primary" onClick={onSubmit}>전송</Button>
      </div>
    )
  }
}