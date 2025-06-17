import { Meta, StoryObj } from '@storybook/react';
import Empty from './index';

const meta: Meta<typeof Empty> = {
  title: "components/Empty/story",
  component: Empty,
  argTypes: {
    ...Empty,
    icon: {
      description: '아이콘을 넣을 수 있습니다.'
    },
    description: {
      description: '아이콘 아래 텍스트를 입력할 수 있습니다.',
      control: 'text',
    },
    iconOnly: {
      description: '텍스트 표현을 하지 않거나, 기본으로 노출되는 `No data`를 표현하고 싶지 않을 때, 활성화 합니다.'
    }
  }
};
export default meta;

type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {
    icon: "❌",
  },
};