import classNames from 'classnames';
import './logo.scss';
import { useNavigate } from 'react-router-dom';

import fcfs from '../../../assets/fcfs.svg';

type LogoProps = {
  size?: 'small' | 'large';
};

const Logo = ({ size }: LogoProps) => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate('/');
  };
  return (
    <div className={classNames('logoWrap', size)} onClick={handleClickLogo}>
      <span>
        <img src={fcfs} />
      </span>
      <p>선착순</p>
    </div>
  );
};

export default Logo;
