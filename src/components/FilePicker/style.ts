import { css } from '@emotion/react';
import { black } from '../../colors';

export const fileListWrapStyle = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const fileListStyle = css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`

export const maxSizeTextStyle = css`
    color: ${black[400]};
    font-size: 0.8em;
`;

export const customLabelStyle = (disabled: boolean) => css`
    cursor: pointer;
    
    ${disabled && `
      cursor: not-allowed;
    `}
`;