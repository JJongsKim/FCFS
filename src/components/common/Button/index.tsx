import classNames from 'classnames';

import './button.scss';

type buttonProps = {
  size?: 'small' | 'large';
  color?: string;
  children?: string;
};

const Button = ({ size, color, children }: buttonProps) => {
  return <button className={classNames('buttonWrap', size, color)}>{children}</button>;
};

Button.defaultProps = {
  color: 'babyGray',
};

export default Button;
