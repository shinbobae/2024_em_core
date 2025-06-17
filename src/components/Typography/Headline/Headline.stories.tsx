import { Meta, StoryObj } from '@storybook/react';

import Headline from './index';

const meta: Meta<typeof Headline> = {
  title: 'Typography/Headline',
  component: Headline,
  argTypes: {
    ...Headline,
    children: {
      description: '내용을 작성합니다.',
    },
    level: {
      description:
        '6단계의 구획 제목 태그를 사용합니다. h1이 제일 높고 h6가 가장 낮습니다.',
      control: 'radio',
    },
    color: {
      description:
        '텍스트의 색상을 지정합니다. `black900` 이 기본으로 지정되어 있습니다.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Headline>;

export const Default: Story = {
  args: {
    level: 1,
    children: 'Headline',
  },
};
