import React from 'react';

export type IconProps = {
  size?: number;
} & React.SVGAttributes<SVGElement>;

export { Search as SearchIcon } from './Search';
export { XCircle as XCircleIcon } from './XCircle';
export { ChevronDown as ChevronDownIcon } from './ChevronDown';