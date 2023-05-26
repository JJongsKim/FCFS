import classNames from 'classnames';

import './TextArea.scss';

type textAreaProps = {
  size?: 'small' | 'medium' | 'large' | 'editSmall' | 'editLarge';
  type?: 'readOnly'; // 글 조회 페이지에서와 같이 읽기만 가능하도록 할 때 사용
  children?: string;
  value?: string;
  onChange?: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({ size, type, children, value, onChange }: textAreaProps) => {
  return (
    <textarea className={classNames('textAreaWrap', size, type)} value={value} onChange={onChange}>
      {children}
    </textarea>
  );
};

export default TextArea;
