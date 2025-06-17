import { css } from '@emotion/react';
import { blue, black } from '../../colors';

const activeColor = blue[400];

export const selectWrapperStyle = (block: boolean) => css`
    display: inline-block;
    position: relative;
    width: ${block ? '100%' : '280px'};
    cursor: pointer;
`

export const valueWrapStyle = (open: boolean, disabled: boolean) => css`
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 8px 20px;
    border: 1px solid ${open ? activeColor : black[400]};
    border-radius: 4px;
    transition: all 0.2s ease;
    background-color: #ffffff;
    
    ${disabled && `
        cursor: not-allowed;
        background-color: ${black[100]};
        
        & > svg { stroke: ${black[400]}};    //화살표
    `}
    
    &:hover {
        border-color: ${activeColor};
    };
    
    
    & > div {
        display: flex;
        position: relative;
        flex-wrap: wrap;
        align-items: center;
        width: calc(100% - 50px);
        
        & > .placeholder {
            position: absolute;
            z-index: 1;
            color: ${black[400]}
        }
        
        & > div {
            display: flex;
            align-items: center;
        }
        
        & svg {
            margin-left: 0.5rem;
            stroke: ${black[400]}
        }
        
        & > input {
            position: relative;
            max-width: 100%;
            background-color: transparent;
            z-index: 2;
        }
    }
    
    & > div:last-of-type {
        flex-wrap: nowrap;
        justify-content: end;
        flex-basis: 50px;
    }
`

export const multiValueStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    padding: 2px 4px;
    background-color: ${blue[100]};
    border-radius: 8px;
    white-space: nowrap;
    font-size: 0.8em;
    
    & > span {
        margin-right: 4px;
    }
    & > svg {
        stroke: ${black[900]};
    }
`;

export const optionWrapperStyle = (isPosTop: boolean) => css`
    position: absolute;
    left: 0;
    ${isPosTop ? `bottom: calc(100% + 4px);` : `top: calc(100% + 4px);`}
    width: 100%;
    max-height: 240px;
    padding: 4px;
    overflow-y: auto;
    box-shadow: rgba(99, 99, 99, 0.25) 0 2px 16px 0;
    background-color: #ffffff;
    z-index: 100;
`

export const optionTitleStyle = css`
    padding: 8px 12px;
    color: ${black[400]};
    font-size: 0.7em;
    cursor: default;
`;
export const optionItemStyle = (isGroup: boolean, selected: boolean, disabled?: boolean, focused?: boolean) => css`
    padding: ${isGroup ? '4px 12px 4px 20px' : '6px 12px'};
    font-size: 0.9em;
    border-radius: 4px;
    border: 1px solid ${focused ? black[400] : 'transparent'};
    &:hover {
        background-color: ${selected ? blue[500] : black[100]};
    }
    
    ${selected && `
        font-weight: 500;
        background-color: ${activeColor};
    `};
    
    ${disabled && `
        cursor: not-allowed;
        color: ${black[500]};
        $:hover {background-color: unset;}
    `};
`;

export const loadingStyle = css`
    display: block;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.1);
    & > span {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 18px;
        height: 18px;
        margin-top: -9px;
        margin-left: -9px;
        border: 2px solid transparent;
        border-left-color: ${black[600]};
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
    }
`