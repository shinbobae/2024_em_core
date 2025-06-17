import { Meta, StoryObj } from '@storybook/react';

import BodyText from './index';

const meta: Meta<typeof BodyText> = {
  title: 'Typography/BodyText',
  component: BodyText,
  argTypes: {
    ...BodyText,
    children: {
      description: '내용을 작성합니다.',
    },
    level: {
      description: '텍스트의 크기를 지정합니다.',
      table: { type: { detail: '1: 16px, 2: 15px, 3: 14px' } },
    },
    color: {
      description:
        '텍스트의 색상을 지정합니다. `black900` 이 기본으로 지정되어 있습니다.',
    },
    align: {
      description: '정렬을 지정합니다.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof BodyText>;

export const Default: Story = {
  args: {
    level: 1,
    children: '내용이 들어갑니다.',
  },
};

export const IncludedNewline: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        개행은
        <br />
        노드 태그로 씁니다
      </>
    ),
  },
};
