import { Meta, StoryObj } from '@storybook/react';
import { Select2 } from './index';
import { useState } from 'react';
import { BaseSelectOption } from '../Select';

const meta: Meta<typeof Select2> = {
  title: "components/Select/Select2",
  component: Select2,
  argTypes: {
    ...Select2,
    value: {
      description: '값을 지정합니다.',
      table: {
        type: { detail: 'single value : number | string | null,     \nmulti value: number[] | string[] | null'}
      }
    },
    optionList: {
      description: '옵션 목록을 지정합니다.',
      table: {
        type: { detail: 'optionList: { label: string; value: string | number; disabled?: boolean }[]' }
      }
    },
    placeholder: {
      description: '값이 없을 때, 노출되는 텍스트 입니다.',
      control: 'text',
    },
    disabled: {
      description: 'select 의 선택을 막습니다.',
    },
    multiple: {
      description: '여러 옵션을 선택할 수 있습니다.  \n선택된 옵션은 태그 형태로 값이 표현됩니다.   \n 활성화 시, block 태그화 되어 전체 너비를 차지합니다.',
    },
    isSearch: {
      description: '텍스트 입력창을 활성화해, option list 내 label 을 검색할 수 있습니다.',
    },
    block: {
      description: '활성화 시, block 태그화 되어 전체 너비를 차지합니다.    \n  `multiple: true` 상태에서 자동으로 표현됩니다.',
    },
    status: {
      description: '테두리 색상으로 현재 상태를 표현할 수 있습니다.   \n  현재 `error`만 지정되어 있으며, 지정 시 붉은 색 테두리로 error 상태를 표현합니다.',
      table: {
        type: { summary: 'string', detail: '`error`' }
      },
      control: 'text'
    },
    onChange: {
      description: 'onChange 동작을 지정합니다.',
      table: {
        category: 'event handler',
        type: { detail: 'e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement> | null'}
      }
    },
  },
};
export default meta;

type Story = StoryObj<typeof Select2>;

const OPTION_LIST2: BaseSelectOption[] = [
  { label: '5의 라벨', value: 5 },
  { label: '6라벨', value: 6 , disabled: true},
  { label: '7라벨', value: 7 },
  { label: '8라벨', value: 8 },
  { label: '9라벨', value: 55 },
  { label: '565라벨', value: 565 },
  { label: '255라벨', value: 255 },
];


export const Default: Story = {
  args: {
    placeholder: 'placeholder',
    value: null,
    optionList: [],
    onChange: () => {},
  },
  decorators: [(Story) => <div style={{ height: '160px' }}><Story /></div>],
};

export const OptionList: Story = {
  args: {
    ...Default.args,
    optionList: OPTION_LIST2,
  },
  decorators: [(Story) => <div style={{ height: '360px' }}><Story /></div>],
}

export const Disabled: Story = {
  args: {
    ...OptionList.args,
    disabled: true,
  },
}

export const HideDisabled: Story = {
  args: {
    ...OptionList.args,
    hideDisabled: true,
  },
  decorators: OptionList.decorators,
}

export const Block: Story = {
  args: {
    ...Default.args,
    block: true,
  },
  decorators: Default.decorators,
}

export const StatusError: Story = {
  args: {
    ...Default.args,
    status: 'error',
  },
  decorators: Default.decorators,
}

export const SingleSelect: Story = {
  args: {},
  decorators: [(Story) => <div style={{ height: '360px' }}><Story /></div>],
  render: () => {
    const [value, setValue] = useState(1);

    return (
      <div>
        <Select2
          value={value}
          placeholder="선택"
          optionList={OPTION_LIST2}
          onChange={(e, newValue) => setValue(newValue)}
        />
      </div>
    )
  }
}

export const SearchableSingleSelect: Story = {
  args: {},
  decorators: [(Story) => <div style={{ height: '360px' }}><Story /></div>],
  render: () => {
    const [value, setValue] = useState(1);

    return (
      <div>
        <Select2
          value={value}
          isSearch
          placeholder="검색도 할 수 있어요"
          optionList={OPTION_LIST2}
          onChange={(e, newValue) => setValue(newValue)}
        />
      </div>
    )
  }
}

export const MultiValueSelect: Story = {
  args: {},
  decorators: SearchableSingleSelect.decorators,
  render: () => {
    const [values, setValues] = useState<any[] | null>([]);

    return (
      <div>
        <Select2
          value={values}
          multiple
          placeholder="많이 선택할 수 있어요"
          optionList={OPTION_LIST2}
          onChange={(e, newValue) => setValues(newValue)}
        />
      </div>
    )
  }
}

export const Searchable: Story = {
  decorators: SearchableSingleSelect.decorators,
  render: () => {
    const [value, setValue] = useState<any | null>(null);
    const [values, setValues] = useState<any[] | null>([]);

    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <Select2
          value={value}
          isSearch
          placeholder="검색도 할 수 있어요"
          optionList={OPTION_LIST2}
          onChange={(e, newValue) => setValue(newValue)}
        />
        <Select2
          value={values}
          multiple
          isSearch
          placeholder="검색도 할 수 있어요"
          optionList={OPTION_LIST2}
          onChange={(e, newValue) => setValues(newValue)}
        />
      </div>
    )
  }
}

export const SearchableMultiValueSelect: Story = {
  args: {},
  decorators: SearchableSingleSelect.decorators,
  render: () => {
    const [values, setValues] = useState<any[] | null>([]);

    return (
      <div>
        <Select2
          value={values}
          multiple
          isSearch
          placeholder="검색도 할 수 있어요"
          optionList={OPTION_LIST2}
          onChange={(e, newValue) => setValues(newValue)}
        />
      </div>
    )
  }
}