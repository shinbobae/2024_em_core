import React, {
  CSSProperties,
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Button from '../Button';
import useAlert from '../Modal/Alert/useAlert';
import Tag from '../Tag';
import {
  customLabelStyle,
  fileListStyle,
  fileListWrapStyle,
  maxSizeTextStyle,
} from './style';

type FilePickerBaseProps = {
  children?: React.ReactNode;
  buttonText?: string;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  maxSize?: number;
  style?: CSSProperties;
  onChange: (fileList: File[]) => void; // return fileList
  preview?: boolean;
};

type FilePickerProps = FilePickerBaseProps &
  (
    | { children: React.ReactNode; buttonText?: never }
    | { children?: never; buttonText: string }
    | { children?: never; buttonText?: never }
  );

const FilePicker = ({
  children,
  buttonText,
  accept,
  disabled = false,
  multiple = false,
  maxSize,
  style,
  onChange,
  preview = true,
}: FilePickerProps) => {
  const { openAlert } = useAlert();
  const inputId = useMemo(
    () => `emc_file_picker_${Math.random().toString(36).substring(2)}`,
    [],
  ); // 한 페이지 내 여러 피커가 있을 경우 대비
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);

  // 내부 fileList 가 변화하면 항상 UI 쪽에서 변화하도록 effect 처리
  useEffect(() => {
    if (onChange) onChange(fileList);
  }, [fileList]);

  // 외부 요소로 input[type=file] 열기
  const onClickUploadButton = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  // 파일 선택
  const onChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target && e.target.files;
    if (files && files[0]) {
      const tmpFile: File[] = [];
      const filteredFiles: File[] = [];
      // FileList 는 배열이지만 배열이 아님. 반복문 사용시 프로토타입 접근
      Array.prototype.forEach.call(files, function (file: File) {
        if (maxSize && maxSize * 1024 ** 2 < file.size) {
          filteredFiles.push(file);
        } else {
          tmpFile.push(file);
        }
      });

      if (filteredFiles.length > 0) {
        openAlert({
          title: 'INFO',
          content: (
            <p>
              설정 용량을 초과한 {filteredFiles.length}개 파일이 제외되었습니다.
              <br />
              제외된 파일:{' '}
              {filteredFiles.map((file, index) => (
                <span key={file.name}>
                  {file.name}
                  {index < filteredFiles.length - 1 && ','}
                </span>
              ))}
            </p>
          ),
        });
      }

      setFileList(tmpFile);
    }
  }, []);

  // 개별 파일 삭제
  const onDeleteFile = useCallback(
    (file: File) => {
      const newFileList = fileList.filter(filtered => file !== filtered);
      setFileList(newFileList);
    },
    [fileList],
  );

  return (
    <div css={fileListWrapStyle} style={style}>
      <div>
        {children ? (
          <label htmlFor={inputId} css={customLabelStyle(disabled)}>
            {children}
          </label>
        ) : (
          <Button disabled={disabled} onClick={onClickUploadButton}>
            {buttonText ? buttonText : 'Upload'}
          </Button>
        )}
        {maxSize && <span css={maxSizeTextStyle}>파일 용량: {maxSize}MB</span>}
      </div>
      <input
        type="file"
        hidden={true}
        disabled={disabled}
        id={inputId}
        accept={accept}
        multiple={multiple}
        ref={inputRef}
        onChange={onChangeFile}
      />
      {preview && (
        <div css={fileListStyle}>
          {fileList.map(file => (
            <Tag
              key={file.lastModified}
              color="primary"
              onClose={() => onDeleteFile(file)}
            >
              <a href={URL.createObjectURL(file)} download>
                {file.name}
              </a>
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilePicker;
