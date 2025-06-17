import React from 'react';
import { IconProps } from './index';
export const ChevronDown = React.memo<IconProps>(({ size = 18 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});