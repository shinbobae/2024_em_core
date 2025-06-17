import { css } from '@emotion/react';

import { TagSizeType, TagVariantType } from './index';

export const tagWrapStyle = (size: TagSizeType, hasTagClick: boolean) => css`
  display: inline-block;
  position: relative;
  padding: ${size === 'sm'
    ? '3px 7px'
    : size === 'lg'
      ? '6px 12px'
      : '3px 7px'};
  border-radius: 4px;
  box-sizing: border-box;
  ${hasTagClick && 'cursor: pointer;'}

  font-size: ${size === 'sm' ? '12px' : size === 'lg' ? '15px' : '14px'};

  & button {
    margin-left: 8px;
    border-radius: 50%;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

export const tagBackgroundStyle = (
  variant: TagVariantType | undefined,
  color: string,
) => css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  border-radius: inherit;
  background-color: ${color};
`;

export const tagHoverBackgroundStyle = () => css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.08);
`;

export const tagBorderStyle = (
  variant: TagVariantType | undefined,
  color: string,
) => css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: inherit;
  border: 1px solid ${variant !== 'outlined' ? 'transparent' : color};
  white-space: nowrap;
`;

export const tagTextStyle = (
  variant: TagVariantType | undefined,
  color: string,
) => css`
  display: inline-flex;
  position: relative;
  z-index: 1;
  justify-content: space-between;
  color: ${color};
  align-items: center;
`;
