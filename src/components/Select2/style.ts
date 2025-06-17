import { css } from '@emotion/react';
import { blue, black } from '../../colors';
import { danger } from '../../style';

const activeColor = blue[400];

export const select2WrapperStyle = (block: boolean) => css`
    display: inline-block;
    position: relative;
    width: ${block ? '100%' : 'auto'};
    min-width: 280px;
    cursor: pointer;
`

export const select2TriggerStyle = (open: boolean, disabled: boolean, borderless?: boolean, status?: 'error') => css`
    //position: absolute;
    //left: 0;
    //top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 6px 8px 6px 12px;
    border: 1px solid ${borderless ? `transparent` :status === 'error' ? danger :open ? activeColor : black[50]};
    border-radius: 4px;
    background-color: #ffffff;
    
    &:focus-visible {
        outline-color: ${activeColor};
    }
    
    
    & > svg { stroke: ${black[400]}};

    ${disabled && `
        cursor: not-allowed;
        background-color: ${black[100]};
        
        & > svg { stroke: ${black[400]}};
    `}
`

export const select2ValueWrapStyle = css`
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    position: relative;
`;

export const select2PlaceholderStyle = (noText: boolean) => css`
    position: absolute;
    inset: 0;
    color: ${noText ? black[400] : 'transparent'};
`

export const searchInputStyle = (isSearch: boolean, multiple: boolean, disabled: boolean, blank: boolean) => css`
    position: relative;
    max-width: ${blank ? 'auto' : '140px'};
    background-color: transparent;
    z-index: 1;
    
    ${!isSearch && `
        caret-color: transparent;
        cursor: default;    
    `}
    
    ${disabled && `cursor: not-allowed;`}
`

export const select2OptionListStyle = () => css`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    max-height: 340px;
    overflow-y: auto;
    box-shadow: rgba(99, 99, 99, 0.25) 0 2px 8px 0;
    border-radius: 6px;
    background-color: #ffffff;
    z-index: 100;
`;

export const select2OptionStyle = (selected: boolean, disabled: boolean, focused: boolean, hovered: boolean) => css`
    padding: 6px 12px;
    color: ${disabled ? black[600] : black[900]};
    border: 2px solid ${focused ? activeColor : 'transparent'};
    border-radius: 6px;
    
    background-color: ${disabled ? black[300] : selected ? blue[300] : hovered ? blue[100] : 'transparent'};
    cursor: ${disabled ? 'not-allowed' : 'default'};
`