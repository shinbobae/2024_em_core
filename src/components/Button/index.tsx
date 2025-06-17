import React, { ButtonHTMLAttributes, CSSProperties } from 'react';

import GlobalStyle from '../../style/GlobalStyle';
import { fontWeight } from '../../style/font';
import {
  Color,
  Variant,
  buttonIconStyle,
  buttonStyle,
  iconButtonStyle,
  loadingStyle,
} from './style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: Variant;
  loading?: boolean;
  color?: Color;
  icon?: React.ReactNode;
  iconPositionRight?: boolean;
  block?: boolean;
  padding?: 'sm' | 'md';
  borderless?: boolean;
  fontSize?: number;
  fontWeight?: fontWeight;
  textAlign?: 'left' | 'right';
  style?: CSSProperties;
}

const checkChildNull = (children: React.ReactNode) => {
  return !(
    children === null ||
    children === undefined ||
    children.toString().trim() === ''
  );
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <>
      <GlobalStyle />
      <button
        css={children ? buttonStyle(props) : iconButtonStyle(props)}
        disabled={props.disabled}
        style={props.style}
        onClick={props.onClick}
      >
        {props.loading && (
          <span css={loadingStyle(props)} aria-label="loading" />
        )}
        {props.icon && <span css={buttonIconStyle(props)}>{props.icon}</span>}
        {checkChildNull(children) && <span>{children}</span>}
      </button>
    </>
  );
};

export default Button;
