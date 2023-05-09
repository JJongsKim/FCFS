import classNames from 'classnames';

import './button.scss';

type buttonProps = {
  size?: 'small' | 'large';
  color?: string;
  children?: string;
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void;
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
