import type { Preview } from '@storybook/react';

import ModalProvider from '../src/components/Modal/ModalProvider';
import GlobalStyle from '../src/style/GlobalStyle';

const preview: Preview = {
  parameters: {
    options: {
      showPanel: false,
      storySort: {
        order: [
          'colors',
          'Typography',
          'components',
          [
            'Button',
            'TextInput',
            'NumberInput',
            'Select',
            'Select2',
            'Table',
            'Empty',
            'Modal',
            'Popup',
            'FilePicker',
            'Tag',
          ],
          'test',
          [
            'Button',
            'TextInput',
            'NumberInput',
            'Select',
            'Select2',
            'Table',
            'Empty',
            'Modal',
            'Popup',
            'FilePicker',
            'Tag',
          ],
        ],
      },
    },
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2',
      },
    },
  },
  decorators: [
    Story => {
      return (
        <ModalProvider>
          <GlobalStyle />
          <div id="modal" />
          <Story />
        </ModalProvider>
      );
    },
  ],
};

export default preview;
