import { css } from '@emotion/react';

import { black, blue, red } from '../../colors';
import { ButtonProps } from './index';

export type Variant = 'default' | 'float' | 'text';
export type Color = 'primary' | 'default' | 'danger'; // | 'success' | 'warning' | 'info' | 'default';
type ButtonPalette = {
  default: string;
  hover: string;
  active: string;
  disabled: string;
};
type ButtonOptions = 'background' | 'border' | 'text';
type ButtonPalettePerOption = Record<ButtonOptions, ButtonPalette>;
type ButtonVariantPerOption = Record<Variant, ButtonPalettePerOption>;
type ButtonColorSet = Record<Color, ButtonVariantPerOption>;

export const COLOR_SET: ButtonColorSet = {
  primary: {
    default: {
      background: {
        default: blue[500],
        hover: blue[400],
        active: blue[300],
        disabled: blue[200],
      },
      border: {
        default: blue[500],
        hover: blue[400],
        active: blue[300],
        disabled: blue[200],
      },
      text: {
        default: '#ffffff',
        hover: '#ffffff',
        active: '#ffffff',
        disabled: '#ffffff',
      },
    },
    float: {
      background: {
        default: 'transparent',
        hover: blue[100],
        active: blue[50],
        disabled: 'transparent',
      },
      border: {
        default: blue[500],
        hover: blue[400],
        active: blue[300],
        disabled: blue[200],
      },
      text: {
        default: blue[500],
        hover: blue[600],
        active: blue[300],
        disabled: blue[200],
      },
    },
    text: {
      background: {
        default: 'transparent',
        hover: 'transparent',
        active: 'transparent',
        disabled: 'transparent',
      },
      border: {
        default: 'transparent',
        hover: 'transparent',
        active: 'transparent',
        disabled: 'transparent',
      },
      text: {
        default: blue[500],
        hover: blue[600],
        active: blue[300],
        disabled: blue[200],
      },
    },
  },
  default: {
    default: {
      background: {
        default: black[50],
        hover: black[100],
        active: black[20],
        disabled: black[20],
      },
      border: {
        default: black[50],
        hover: black[100],
        active: black[20],
        disabled: black[20],
      },
      text: {
        default: black[900],
        hover: black[900],
        active: black[900],
        disabled: black[400],
      },
    },
    float: {
      background: {
        default: 'transparent',
        hover: black[200],
        active: black[100],
        disabled: 'transparent',
      },
      border: {
        default: black[100],
        hover: black[200],
        active: black[50],
        disabled: black[600],
      },
      text: {
        default: black[500],
        hover: black[600],
        active: black[300],
        disabled: black[600],
      },
    },
    text: {
      background: {
        default: 'transparent',
        hover: 'transparent',
        active: 'transparent',
        disabled: 'transparent',
      },
      border: {
        default: 'transparent',
        hover: 'transparent',
        active: 'transparent',
        disabled: 'transparent',
      },
      text: {
        default: black[500],
        hover: black[600],
        active: black[300],
        disabled: black[600],
      },
    },
  },
  danger: {
    default: {
      background: {
        default: red[400],
        hover: red[300],
        active: red[100],
        disabled: red[100],
      },
      border: {
        default: red[400],
        hover: red[300],
        active: red[100],
        disabled: red[100],
      },
      text: {
        default: '#ffffff',
        hover: '#ffffff',
        active: '#ffffff',
        disabled: '#ffffff',
      },
    },
    float: {
      background: {
        default: 'transparent',
        hover: red[200],
        active: red[100],
        disabled: 'transparent',
      },
      border: {
        default: red[400],
        hover: red[100],
        active: red[50],
        disabled: red[200],
      },
      text: {
        default: red[400],
        hover: red[400],
        active: red[300],
        disabled: red[200],
      },
    },
    text: {
      background: {
        default: 'transparent',
        hover: 'transparent',
        active: 'transparent',
        disabled: 'transparent',
      },
      border: {
        default: 'transparent',
        hover: 'transparent',
        active: 'transparent',
        disabled: 'transparent',
      },
      text: {
        default: red[400],
        hover: red[500],
        active: red[300],
        disabled: red[100],
      },
    },
  },
};

const getColor = (color?: Color, variant?: Variant) => {
  if (!color) color = 'default';
  if (!variant) variant = 'default';
  return COLOR_SET[color][variant];
};

export const buttonIconStyle = (props: ButtonProps) => css`
  min-width: auto !important;
  ${props.iconPositionRight && `order: 2;`};
  & svg {
    ${iconStyle(props)}
  }
`;

export const buttonStyle = (props: ButtonProps) => css`
  display: inline-flex;
  gap: 6px;
  padding: ${props.padding === 'md' ? '11px 15px' : '5px 11px'};
  font-size: ${props.fontSize ? props.fontSize + `px` : `inherit`};
  border-radius: 6px;
  transition: all 0.2s ease;
  line-height: 150%;
  font-weight: ${props.fontWeight ? props.fontWeight : 600};

  color: ${getColor(props.color, props.variant).text.default};
  stroke: ${getColor(props.color, props.variant).text.default};
  background-color: ${getColor(props.color, props.variant).background.default};
  border: 1px solid ${getColor(props.color, props.variant).border.default};
  ${props.borderless && `border-color: transparent;`}

  &:disabled {
    cursor: not-allowed;
    color: ${getColor(props.color, props.variant).text.disabled};
    stroke: ${getColor(props.color, props.variant).text.disabled};
    background-color: ${getColor(props.color, props.variant).background
      .disabled};
    border-color: ${props.borderless
      ? `transparent`
      : getColor(props.color, props.variant).border.disabled};
  }
  &:hover:not(:disabled) {
    color: ${getColor(props.color, props.variant).text.hover};
    stroke: ${getColor(props.color, props.variant).text.hover};
    background-color: ${getColor(props.color, props.variant).background.hover};
    border-color: ${props.borderless
      ? `transparent`
      : getColor(props.color, props.variant).border.hover};
  }
  &:active:not(:disabled) {
    color: ${getColor(props.color, props.variant).text.active};
    stroke: ${getColor(props.color, props.variant).text.active};
    background-color: ${getColor(props.color, props.variant).background.active};
    border-color: ${props.borderless
      ? `transparent`
      : getColor(props.color, props.variant).border.active};
  }

  ${props.loading &&
  `
        pointer-events: none;
        color: ${getColor(props.color, props.variant).text.active};
        background-color: ${getColor(props.color, props.variant).background.active};
        border-color: ${props.borderless ? `transparent` : getColor(props.color, props.variant).border.active};
    `}

  ${props.textAlign === 'left' && 'justify-content: start;'}
    ${props.textAlign === 'right' && 'justify-content: end;'}
    
    ${props.block &&
  `
      display: inline-flex;
      width: 100%; 
      overflow-wrap: break-word;
      & span { min-width: 0; word-wrap: break-word; white-space: normal; }
    `}
    
    ${props.block &&
  props.textAlign &&
  `
      & span { text-align: ${props.textAlign}; }
    `}
`;

export const iconButtonStyle = (props: ButtonProps) => css`
  ${buttonStyle(props)};
  position: relative;
  padding: 8px 11px;
  & span[aria-label='loading'] {
    position: absolute;
    margin-right: 0;
  }
  ${props.loading &&
  `
      & svg {
        position: relative;
        stroke: transparent;
      }
    `}
`;

export const iconStyle = (props: ButtonProps) => css`
  position: relative;
  top: 4px;
  stroke: inherit;
  ${props.loading &&
  `position: absolute; stroke : transparent`}// ${props.disabled &&
  `
    //   stroke : ${getColor(props.color, props.variant).text.disabled};;
    // `}
`;
export const loadingStyle = (props: ButtonProps) => css`
  ${props.iconPositionRight && `order: 2;`};
  display: block;
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-left-color: ${getColor(props.color, props.variant).text.active};
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
