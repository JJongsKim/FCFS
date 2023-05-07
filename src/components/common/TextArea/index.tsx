import classNames from 'classnames';

import './TextArea.scss';

type textAreaProps = {
  size?: 'small' | 'medium' | 'large';
  type?: 'readOnly'; // 글 조회 페이지에서와 같이 읽기만 가능하도록 할 때 사용
  children?: string;
};

const TextArea = ({ size, type, children }: textAreaProps) => {
  return <textarea className={classNames('textAreaWrap', size, type)}>{children}</textarea>;
};

export default TextArea;
