import Select, { BaseSelectOption, GroupSelectOption } from './index';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import useMultiSelect from '../../hooks/useMultiSelect';

const meta: Meta<typeof Select> = {
  title: "components/Select/Select-Deprecated",
  component: Select,
  argTypes: {
    ...Select,
    placeholder: {
      description: '값이 없을 때, 나타나는 문구를 작성해 주세요.'
    },
  }
};
export default meta;

const OPTION_LIST: BaseSelectOption[] = [
  { label: '5인데', value: 5 },
  { label: '6', value: 6 , disabled: true},
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '55', value: 55 },
  { label: '565', value: 565 },
  { label: '255', value: 255 },
];

const GROUP_OPTION_LIST: GroupSelectOption[] = [
  {
    title: '그룹1',
    options: [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3, disabled: true }
    ]
  },
  {
    title: '그룹2',
    options: [
      { label: '51', value: 5 },
      { label: '61', value: 6 },
    ]
  }
];


type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    placeholder: '값을 선택해 주세요.',
    value: null,
    optionList: [],
  },
  decorators: [(Story) => (
    <div style={{ height: '280px' }}>
      <Story />
    </div>
  )],
};

export const OptionList: Story = {
  args: {
    placeholder: '값을 선택해 주세요.',
    value: null,
    optionList: OPTION_LIST,
  },
  decorators: [(Story) => (
    <div style={{ height: '280px' }}>
      <Story />
    </div>
  )],
};
export const GroupOptionList: Story = {
  args: {
    placeholder: 'placeholder',
    value: null,
    optionList: GROUP_OPTION_LIST,
  },
  decorators: Default.decorators,
};

export const DisabledSelect: Story = {
  args: {
    placeholder: 'placeholder',
    value: null,
    optionList: GROUP_OPTION_LIST,
    disabled: true,
  },
}

export const SingleValueSelect: Story = {
  decorators: Default.decorators,
  render: () => {
    const [value, setValue] = useState<BaseSelectOption | null>(null);
    return (
      <Select
        placeholder={'placeholder'}
        optionList={OPTION_LIST}
        value={value}
        onChange={(option) => setValue(option)}
      />
    )
  }
}

export const MultipleValueSelect: Story = {
  decorators: Default.decorators,
  render: () => {
    const [value, onChangeValue] = useMultiSelect(null);
    return (
      <Select
        placeholder={'placeholder'}
        optionList={OPTION_LIST}
        multiple
        value={value}
        onChange={(option) => onChangeValue(option)}
      />
    )
  }
}

export const HideDisabled = () => (
  <div style={{ height: '260px', display: 'flex' }}>
    <div style={{ marginRight: '3rem' }}>
      <Select
        placeholder={'placeholder'}
        hideDisabled
        optionList={OPTION_LIST}
        value={null}
        onChange={() => {}}
      />
    </div>
    <div>
      <Select
        placeholder={'placeholder'}
        hideDisabled
        optionList={GROUP_OPTION_LIST}
        value={null}
        onChange={() => {}}
      />
  </div>
  </div>
)

export const HideSelectedSingle: Story = {
  decorators: Default.decorators,
  render: () => {
    const [value, setValue] = useState<BaseSelectOption | null>({ label: '7', value: 7 });
    return (
      <Select
        placeholder={'placeholder'}
        value={value}
        hideSelected={true}
        optionList={GROUP_OPTION_LIST}
        onChange={(option) => setValue(option)}
      />
    );
  }
};

export const HideSelectedMulti: Story = {
  decorators: Default.decorators,
  render: () => {
    const [multiValues, onChangeMulti] = useMultiSelect([{ label: '1', value: 1 }, { label: '2', value: 2 }]);
    return (
      <Select
        placeholder={'placeholder'}
        value={multiValues}
        multiple
        hideSelected={true}
        optionList={OPTION_LIST}
        onChange={(option) => onChangeMulti(option)}
      />
    );
  }
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Block: Story = {
  args: {
    placeholder: '값을 선택해 주세요.',
    block: true,
    value: null,
    optionList: [],
  },
  decorators: [(Story) => (
    <div style={{ height: '140px' }}>
      <Story />
    </div>
  )],
};

export const Sample = () => {
  const [value, setValue] = useState<BaseSelectOption | null>({ label: '7', value: 7 });
  const [multiValues, onChangeMulti] = useMultiSelect([{ label: '7', value: 7 }, { label: '8', value: 8 }]);

  return (
    <div>
      <div>
        <Select
          placeholder={'placeholder'}
          value={value}
          // hideDisabled={true}
          hideSelected={true}
          optionList={GROUP_OPTION_LIST}
          onChange={(option) => setValue(option)}
        />
      </div>
      <div>
        {JSON.stringify(value)}
        <br/>
        <Select
          placeholder={'placeholder'}
          value={multiValues}
          multiple
          hideSelected={true}
          // hideDisabled={true}
          optionList={OPTION_LIST}
          onChange={(option) => onChangeMulti(option)}
        />
      </div>
    </div>

  );
};


