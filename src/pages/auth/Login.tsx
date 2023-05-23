import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import InputBase from '../../components/common/Input';
import { MediumToast } from '../../components/common/Toast';
import { SIGNIN_MSG } from '../../utils/contant';

import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const handleClickLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO api 연결하기
    e.preventDefault();
    setToast(true);

    setTimeout(() => {
      navigate('/');
    }, 1800);
  };

  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    userPassword: '',
  });

  const handleChangeInput = (name: string, value: string) => {
    setLoginInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      <div className={styles.loginWrap}>
        <span>
          <InputBase
            type="text"
            label="아이디"
            placeHolder="아이디를 입력해주세요!"
            name="userId"
            value={loginInfo.userId}
            onChange={e => handleChangeInput('userId', e.target.value)}
          />
        </span>
        <span>
          <InputBase
            type="password"
            label="비밀번호"
            placeHolder="비밀번호를 입력해주세요!"
            name="userPassword"
            value={loginInfo.userPassword}
            onChange={e => handleChangeInput('userPassword', e.target.value)}
          />
        </span>

        <div className={styles.loginBtnWrap}>
          <p onClick={() => navigate('/sign-up')}>아직 회원이 아니신가요?</p>
          <Button size="large" color="blue" onClick={e => handleClickLogin(e)}>
            로그인
          </Button>
        </div>
        {toast && <MediumToast>{SIGNIN_MSG}</MediumToast>}
      </div>
    </form>
  );
};

export default Login;
