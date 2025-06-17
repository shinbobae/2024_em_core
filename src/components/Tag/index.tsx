import React, { useState } from 'react';

import { black, blue, green, mandarin, red, yellow } from '../../colors';
import {
  tagBackgroundStyle,
  tagBorderStyle,
  tagHoverBackgroundStyle,
  tagTextStyle,
  tagWrapStyle,
} from './style';

type ColorValueHex = `#${string}`;

export type TagSizeType = 'sm' | 'md' | 'lg';
export type TagVariantType = 'filled' | 'outlined' | 'borderless';
export type TagColorType =
  | 'blue'
  | 'green'
  | 'mandarin'
  | 'red'
  | 'yellow'
  | 'black'
  | 'white'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'info'
  | ColorValueHex
  | null
  | undefined;

type TagBaseProps = {
  children: React.ReactNode;
  variant?: TagVariantType;
  color?: TagColorType;
  size?: TagSizeType;
  style?: React.CSSProperties;
  onClick?: (() => void) | null;
  onClose?: (() => void) | null;
};

// type TagProps = TagBaseProps  & (
//   | { onClick: () => void; onClose?: never | undefined; }
//   | { onClick?: never | undefined; onClose: () => void; }
//   | { onClick?: never | undefined; onClose?: never | undefined; }
//   )

const Tag = ({
  children,
  onClose,
  onClick,
  variant = 'outlined',
  color = 'blue',
  size = 'md',
  style,
}: TagBaseProps) => {
  const [mouseEntered, setMouseEntered] = useState(false);

  const getThemeColor = (
    colorProps: TagColorType,
  ): { text: string; background: string; border: string } => {
    switch (colorProps) {
      case 'blue':
      case 'primary':
        return { text: blue[700], background: blue[50], border: blue[500] };
      case 'green':
      case 'secondary':
        return { text: green[700], background: green[50], border: green[500] };
      case 'mandarin':
      case 'warning':
        return {
          text: mandarin[700],
          background: mandarin[50],
          border: mandarin[500],
        };
      case 'red':
      case 'danger':
        return { text: red[700], background: red[50], border: red[500] };
      case 'yellow':
      case 'info':
        return {
          text: yellow[700],
          background: yellow[50],
          border: yellow[500],
        };
      case 'black':
        return { text: black[0], background: black[800], border: black[800] };
      case 'white':
        return { text: black[700], background: black[20], border: black[700] };
      default:
        return {
          text: colorProps ? colorProps : black[0],
          background: colorProps ? hexToRgb(colorProps) : black[800],
          border: colorProps ?? black[800],
        };
    }
  };

  function hexToRgb(hexType: any) {
    /* 맨 앞의 "#" 기호를 삭제하기. */
    const hex = hexType.trim().replace('#', '');

    /* rgb로 각각 분리해서 배열에 담기. */
    const rgb =
      3 === hex.length ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

    rgb!.forEach(function (str: any, x: any, arr: any) {
      /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */
      if (str.length === 1) str = str + str;

      /* 10진수로 변환하기. */
      arr[x] = parseInt(str, 16);
    });

    return 'rgba(' + rgb.join(', ') + ', 0.1)';
  }

  // hexToRgb(color).r, hexToRgb(color).g, hexToRgb(color).b

  return (
    <div
      css={tagWrapStyle(size, !!onClick)}
      style={style}
      onClick={onClick ? onClick : () => null}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
    >
      {mouseEntered && <div css={!!onClick && tagHoverBackgroundStyle} />}

      <div css={tagBorderStyle(variant, getThemeColor(color).border)} />

      <div
        css={tagBackgroundStyle(
          variant,
          color === 'black' || color === 'white'
            ? getThemeColor(color).background
            : variant === 'filled'
              ? getThemeColor(color).text
              : getThemeColor(color).background,
        )}
      />

      <div
        css={tagTextStyle(
          variant,
          color === 'black' || color === 'white'
            ? getThemeColor(color).text
            : variant === 'filled'
              ? black[0]
              : getThemeColor(color).text,
        )}
      >
        {children}
        {onClose && (
          <button
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
          >
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
};

export default Tag;
