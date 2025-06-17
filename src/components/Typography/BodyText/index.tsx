/** @jsxImportSource @emotion/react */
import React, { CSSProperties, ReactNode } from 'react';

import { black900 } from '../../../colors';
import { BodyTextStyle } from './style';

export type BodyTextLevelType = 1 | 2 | 3;
type BodyTextType = {
  level: BodyTextLevelType;
  color?: string;
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  style?: CSSProperties;
} & React.ClassAttributes<HTMLParagraphElement> &
  React.HTMLAttributes<HTMLParagraphElement>;

const BodyText = ({
  level,
  color = black900,
  align,
  children,
  style,
}: BodyTextType) => {
  switch (level) {
    case 1:
      return (
        <p css={BodyTextStyle(level, color ?? null, align)} style={style}>
          {children}
        </p>
      );
    case 2:
      return (
        <p css={BodyTextStyle(level, color ?? null, align)} style={style}>
          {children}
        </p>
      );
    case 3:
      return (
        <p css={BodyTextStyle(level, color ?? null, align)} style={style}>
          {children}
        </p>
      );
    default:
      return (
        <p css={BodyTextStyle(level, color ?? null, align)} style={style}>
          {children}
        </p>
      );
  }
};

export default BodyText;
