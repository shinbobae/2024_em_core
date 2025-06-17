import { Meta, StoryObj } from '@storybook/react';

import { SearchIcon } from '../../assets/icon';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'components/Button/story',
  component: Button,
  args: {
    loading: false,
    block: false,
    disabled: false,
  },
  argTypes: {
    ...Button,
    children: {
      description: '버튼의 내용을 작성하세요.',
      control: { type: 'text' },
    },
    color: {
      description: '버튼의 컬러 테마를 지정할 수 있습니다.',
      control: { type: 'radio' },
      table: { type: { detail: 'default, primary, danger' } },
    },
    disabled: {
      description: '버튼을 비활성화 합니다.',
      control: { type: 'boolean' },
    },
    variant: {
      description: '버튼의 형태를 지정할 수 있습니다.',
      control: { type: 'radio' },
      table: { type: { detail: 'default, float, text' } },
    },
    borderless: {
      description: '버튼의 테두리 표현 여부를 결정합니다',
      control: { type: 'boolean' },
    },
    loading: {
      description:
        '로딩 상태를 지정할 수 있습니다. 로딩 상태에서 버튼은 비활성화 됩니다.',
      table: { type: { summary: 'boolean' } },
    },
    block: {
      description: 'block 태그화 하여 너비를 꽉 채우는 버튼을 만듭니다.',
      control: { type: 'boolean' },
    },
    padding: {
      description: '버튼 padding 을 조절할 수 있습니다.',
      table: { type: { detail: '기본값 sm' } },
    },
    fontSize: {
      description: '`px` 단위로 사이즈를 입력할 수 있습니다.',
      control: { type: 'number' },
    },
    textAlign: {
      description: '`block`이 `true`일 때, 텍스트의 방향을 정할 수 있습니다.',
      control: { type: 'radio' },
      table: { type: { detail: 'left, right' } },
    },
    icon: {
      description: '등록된 svg 아이콘을 사용합니다.',
      control: { type: 'radio' },
      table: {
        category: 'icon',
      },
    },
    iconPositionRight: {
      description:
        '텍스트와 함께 있는 아이콘의 경우, 아이콘의 방향을 컨트롤 합니다.',
      table: {
        category: 'icon',
      },
    },
    style: {
      description: '기존 스타일에 덧씌울 수 있습니다.',
      table: {
        category: 'etc',
      },
    },
  },
  /*
  parameters: {
    componentSubtitle: '`Button`컴포넌트의 크기는 `children`의 내용에 의해 결정됩니다.',
    docs: {
      description: { component:`parameters-docs-description-component` },
    },
  }
  */
};
export default meta;

type Story = StoryObj<typeof Button>;
export const Default: Story = {
  args: {
    children: '버튼',
    color: 'primary',
    icon: null,
  },
  tags: ['!autodocs'],
};

const style = {
  display: 'flex',
  marginBottom: '1rem',
  justifyContent: 'space-around',
};

export const VariantDefault: Story = {
  args: {
    children: 'Button',
    color: 'primary',
  },
};
export const VariantFloat: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'float',
  },
};
export const VariantText: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'text',
  },
};

export const ColorPrimary: Story = {
  args: {
    children: 'Button',
    color: 'primary',
  },
};
export const ColorDanger: Story = {
  args: {
    children: 'Button',
    color: 'danger',
  },
};
export const ColorDefault: Story = {
  args: {
    children: 'Button',
  },
};

export const LeftIconDefault: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    icon: <SearchIcon />,
  },
};
export const LeftIconFloat: Story = {
  args: {
    children: 'Button',
    variant: 'float',
    color: 'primary',
    icon: <SearchIcon />,
  },
};
export const LeftIconText: Story = {
  args: {
    children: 'Button',
    variant: 'text',
    color: 'primary',
    icon: <SearchIcon />,
  },
};

export const RightIconDefault: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    icon: <SearchIcon />,
    iconPositionRight: true,
  },
};
export const RightIconFloat: Story = {
  args: {
    children: 'Button',
    variant: 'float',
    color: 'primary',
    icon: <SearchIcon />,
    iconPositionRight: true,
  },
};
export const RightIconText: Story = {
  args: {
    children: 'Button',
    variant: 'text',
    color: 'primary',
    icon: <SearchIcon />,
    iconPositionRight: true,
  },
};

export const Loading: Story = {
  render: () => (
    <div style={style}>
      <Button color="primary" loading>
        Default
      </Button>
      <Button variant="float" color="primary" loading>
        Float
      </Button>
      <Button variant="text" color="primary" loading>
        Text
      </Button>
      <Button color="primary" icon={<SearchIcon />} loading>
        Left icon
      </Button>
      <Button
        color="primary"
        icon={<SearchIcon />}
        iconPositionRight={true}
        loading
      >
        Right icon
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={style}>
      <Button disabled>Default</Button>
      <Button variant="float" color="primary" disabled>
        Float
      </Button>
      <Button variant="text" disabled>
        Text
      </Button>
      <Button icon={<SearchIcon />} disabled>
        Left icon
      </Button>
      <Button icon={<SearchIcon />} iconPositionRight={true} disabled>
        Right icon
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div style={style}>
      <Button color="primary" icon={<SearchIcon />} />
      <Button color="danger" icon={<SearchIcon />} />
      <Button color="default" icon={<SearchIcon />} />
      <Button variant="float" color="primary" icon={<SearchIcon />} />
      <Button variant="text" color="danger" icon={<SearchIcon />} />
      <Button variant="text" color="danger" icon={<SearchIcon />} />
    </div>
  ),
};

export const BlockButton: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    block: true,
  },
};
export const BlockLeftButton: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    block: true,
    textAlign: 'left',
  },
};
export const BlockRightButton: Story = {
  args: {
    children: 'Button',
    icon: <SearchIcon />,
    color: 'primary',
    block: true,
    textAlign: 'right',
  },
};
