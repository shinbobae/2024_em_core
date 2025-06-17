import { Meta, StoryObj } from '@storybook/react';
import Tag from './index';

const meta: Meta<typeof Tag> = {
  title: "components/Tag/story",
  component: Tag,
  argTypes: {
    ...Tag,
    children: {
      description: '태그의 내용을 입력합니다.'
    },
    variant: {
      description: '태그의 형태를 결정합니다.  \n  `outlined`, `filled`, `borderless` 3가지 형태로 표현되며, 기본값은 `outlined`입니다.`.',
    },
    color: {
      description: '`primary`  `secondary`  `danger`  `warning`  `info`, `blue`, `green`, `red`, `mandarin`, `yellow`, `black`, `white`,   \n 또는 `색상명(#000000)` 입력',
      control: { type: 'color' },

    },
    size: {
      description: '태그의 크기를 결정합니다.  \n   `sm`, `md`, `lg` 3가지 크기가 제공되며, 기본값은 `md`입니다.`.',
      table: {
        type: { detail: '`sm`, `md`, `lg`' },
        defaultValue: { summary: 'md' },
      }
    },
    onClick: {
      description: '태그 클릭 이벤트를 지정할 수 있습니다.',
      table: {
        category: 'event handler',
      }
    },
    onClose: {
      description: '태그 닫기버튼 활성화 및 닫기버튼 클릭 이벤트를 지정할 수 있습니다.',
      table: {
        category: 'event handler',
      }
    }
  },

};
export default meta;


type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: '내용',
    onClose: null,
    onClick: null
  },
};

export const Variant = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tag>
        outlined
      </Tag>
      <Tag variant="filled">
        filled
      </Tag>
      <Tag variant="borderless">
        borderless
      </Tag>
    </div>
  )
}

export const Size = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Tag color="#00ff4c" size="sm">small</Tag>
      <Tag color="#00ff4c" size="md">medium</Tag>
      <Tag color="#00ff4c" size="lg">large</Tag>
    </div>
  )
}

export const onClose: Story = {
  args: {
    ...Default.args,
    children: 'close action',
    onClose: () => window.alert('닫기 버튼 클릭 동작'),
  },
}
export const onClick: Story = {
  args: {
    ...Default.args,
    children: 'tag click action',
    onClick: () => window.alert('태그 클릭 동작'),
  },
}
export const AllEventHandler: Story = {
  args: {
    ...Default.args,
    children: 'all event handler',
    onClick: () => window.alert('태그 클릭 동작'),
    onClose: () => window.alert('닫기 버튼 클릭 동작'),
  },
}

export const VariantOutlined: Story = {
  args: {
    ...Default.args,
    children: 'outlined',
    variant: 'outlined',
  }
}

export const VariantFilled: Story = {
  args: {
    ...Default.args,
    children: 'filled',
    variant: 'filled',
  }
}

export const VariantBorderless: Story = {
  args: {
    ...Default.args,
    children: 'borderless',
    variant: 'borderless',
  }
}

export const ColorVariation: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Tag color="blue">blue</Tag>
        <Tag color="green">green</Tag>
        <Tag color="mandarin">mandarin</Tag>
        <Tag color="red">red</Tag>
        <Tag color="yellow">yellow</Tag>
        <Tag color="black">black</Tag>
        <Tag color="white">white</Tag>
        <Tag color="#00ff4c">#00ff4c</Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Tag color="blue" variant="filled">blue</Tag>
        <Tag color="green" variant="filled">green</Tag>
        <Tag color="mandarin" variant="filled">mandarin</Tag>
        <Tag color="red" variant="filled">red</Tag>
        <Tag color="yellow" variant="filled">yellow</Tag>
        <Tag color="black" variant="filled">black</Tag>
        <Tag color="white" variant="filled">white</Tag>
        <Tag color="#00ff4c" variant="filled">#00ff4c</Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Tag variant="borderless" color="blue">blue</Tag>
        <Tag variant="borderless" color="green">green</Tag>
        <Tag variant="borderless" color="mandarin">mandarin</Tag>
        <Tag variant="borderless" color="red">red</Tag>
        <Tag variant="borderless" color="yellow">yellow</Tag>
        <Tag variant="borderless" color="black">black</Tag>
        <Tag variant="borderless" color="white">white</Tag>
        <Tag variant="borderless" color="#00ff4c">#00ff4c</Tag>
      </div>
    </div>
  )
}