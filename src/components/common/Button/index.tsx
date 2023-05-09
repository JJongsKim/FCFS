import classNames from 'classnames';

import './button.scss';

type buttonProps = {
  size?: 'small' | 'large';
  color?: string;
  children?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // TODO 배포하고 고치기
  onClick?: (e: any) => void;
};

const Button = ({ size, color, children, onClick }: buttonProps) => {
  return (
    <button className={classNames('buttonWrap', size, color)} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: 'babyGray',
};

export default Button;
