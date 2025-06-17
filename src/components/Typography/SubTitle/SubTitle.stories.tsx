import { Meta, StoryObj } from '@storybook/react';

import SubTitle from './index';

const meta: Meta<typeof SubTitle> = {
  title: 'Typography/SubTitle',
  component: SubTitle,
  argTypes: {
    ...SubTitle,
    children: {
      description: '내용을 작성합니다.',
    },
    level: {
      description: '헤드라인의 레벨을 지정합니다.',
      control: 'radio',
    },
    color: {
      description:
        '텍스트의 색상을 지정합니다. `black900` 이 기본으로 지정되어 있습니다.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof SubTitle>;

export const Default: Story = {
  args: {
    level: 1,
    children: 'SubTitle',
  },
};
