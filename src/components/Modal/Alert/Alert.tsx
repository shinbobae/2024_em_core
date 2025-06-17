import { useMemo } from 'react';

import SvgIcoError from '../../../assets/icon/IcoError';
import { black700 } from '../../../colors';
import Button from '../../Button';
import BodyText from '../../Typography/BodyText';
import Headline from '../../Typography/Headline';
import Portal from '../Portal';
import {
  dialogButtonWrap,
  dialogContent,
  dialogWrap,
  modalBackground,
} from '../style';
import { ModalProps } from '../type';

const Alert = ({
  title = '알림',
  icon,
  content,
  ok,
  close,
  cancelText = '확인',
  cancelColor,
}: ModalProps) => {
  const modalId = useMemo(
    () => `emc_alert_${Math.random().toString(36).substring(2)}`,
    [],
  );
  const zIndex = useMemo(() => new Date().getTime(), []);

  const onClickConfirm = () => {
    if (ok) ok();
    if (close) close();
  };

  return (
    <Portal>
      <div id={modalId}>
        <div css={modalBackground(zIndex)} />
        <div css={dialogWrap(zIndex)}>
          <div css={dialogContent}>
            {icon ? (
              icon === 'error' ? (
                <SvgIcoError width={32} height={32} />
              ) : (
                icon
              )
            ) : null}
            <Headline level={5}>{title}</Headline>
            {content && (
              <BodyText
                level={2}
                color={black700}
                align={'center'}
                style={{ wordBreak: 'break-word' }}
              >
                {content}
              </BodyText>
            )}
          </div>
          {/*<button onClick={close}>&#x2716;</button>*/}
          <div css={dialogButtonWrap}>
            <Button
              block
              padding={'md'}
              color={cancelColor}
              onClick={onClickConfirm}
            >
              {cancelText}
            </Button>
            {/*{ok && (*/}
            {/*  <Button*/}
            {/*    block*/}
            {/*    padding={'md'}*/}
            {/*    color={okColor ? okColor : 'primary'}*/}
            {/*    loading={okLoading}*/}
            {/*    onClick={onClickConfirm}*/}
            {/*  >*/}
            {/*    {okText}*/}
            {/*  </Button>*/}
            {/*)}*/}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Alert;
