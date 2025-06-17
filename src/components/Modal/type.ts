import React from 'react';

export type ModalProps = {
  key?: string;
  type?: string;
  title?: string;
  close?: () => void;
  ok?: () => void;
  okText?: string;
  cancelText?: string;
  cancelColor?: 'primary' | 'danger' | 'default';
  okColor?: 'primary' | 'danger' | 'default';
  okLoading?: boolean;
  icon?: React.ReactNode | null;
  content?: React.ReactNode; // 컴포넌트 형식 콘텐츠 가능
} & (
  | { ok?: () => void; okText?: string }
  | { ok: () => void; okText?: string; cancelText?: string }
);

export type Modals = Map<string, ModalProps>;
// export type Modals = ModalProps[];
