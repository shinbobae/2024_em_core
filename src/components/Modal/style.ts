import { css } from '@emotion/react';

import { black0 } from '../../colors';

export const modalBackground = (zIndex: number) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: ${zIndex};
`;

export const modalContent = (zIndex: number) => css`
  position: fixed;
  display: grid;
  gap: 20px;
  top: 50%;
  left: 50%;
  padding: 16px;
  width: 70%;
  max-width: 480px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  transform: translate(-50%, -50%);
  z-index: ${zIndex};
`;

export const modalHeader = css`
  display: flex;
  justify-content: space-between;
`;

export const modalBody = css`
  word-break: break-word;
  font-weight: 400;
`;

export const modalFooter = css`
  display: flex;
  justify-content: end;
  gap: 8px;
`;

export const dialogWrap = (zIndex: number) => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;

  width: 340px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 16px;
  background: ${black0};
  z-index: ${zIndex};
`;

export const dialogContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

export const dialogButtonWrap = css`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;
