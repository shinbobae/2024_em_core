/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';

import { black900 } from '../../../colors';
import { subTitleStyle } from './style';

export type SubTitleLevelType = 1 | 2 | 3 | 4;
type SubTitleType = {
  level: SubTitleLevelType;
  color?: string;
  children: ReactNode;
} & React.ClassAttributes<HTMLParagraphElement> &
  React.HTMLAttributes<HTMLParagraphElement>;

const SubTitle = ({ level, color = black900, children }: SubTitleType) => {
  switch (level) {
    case 1:
      return <p css={subTitleStyle(level, color ?? null)}>{children}</p>;
    case 2:
      return <p css={subTitleStyle(level, color ?? null)}>{children}</p>;
    case 3:
      return <p css={subTitleStyle(level, color ?? null)}>{children}</p>;
    case 4:
      return <p css={subTitleStyle(level, color ?? null)}>{children}</p>;
    default:
      return <p css={subTitleStyle(level, color ?? null)}>{children}</p>;
  }
};

export default SubTitle;
