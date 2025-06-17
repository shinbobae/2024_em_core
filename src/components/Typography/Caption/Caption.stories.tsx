import { Meta, StoryObj } from '@storybook/react';

import Caption from './index';

const meta: Meta<typeof Caption> = {
  title: 'Typography/Caption',
  component: Caption,
  argTypes: {
    ...Caption,
    children: {
      description: '내용을 작성합니다.',
    },
    color: {
      description:
        '텍스트의 색상을 지정합니다. `black900` 이 기본으로 지정되어 있습니다.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Caption>;

export const Default: Story = {
  args: {
    children: 'Caption',
  },
};
