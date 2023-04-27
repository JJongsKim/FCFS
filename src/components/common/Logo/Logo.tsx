import classNames from 'classnames';
import './logo.scss';

import fcfs from '../../../assets/fcfs.svg';

type LogoProps = {
  size?: 'small' | 'large';
};

const Logo = ({ size }: LogoProps) => {
  return (
    <div className={classNames('logoWrap', size)}>
      <span>
        <img src={fcfs} />
      </span>
      <p>선착순</p>
    </div>
  );
};

export default Logo;
