import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import InputBase from '../../components/common/Input';
import { MediumToast } from '../../components/common/Toast';
import { API, AUTH_ERR_MSG, LOGIN_ERR_MSG, SIGNIN_MSG } from '../../utils/contant';

import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['userToken', 'userId']);
  const [toast, setToast] = useState(false);
  const [errToast, setErrToast] = useState(false);
  const [loginErrToast, setLoginErrToast] = useState(false);
  const handleClickLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 빈 칸 없이 모두 입력했을 시에만 axios 적용되도록
    if (loginInfo.userId !== '' && loginInfo.userPassword !== '') {
      axios
        .post(`${API}/user/sign_in`, {
          ...loginInfo,
        })
        .then(res => {
          // 없는 아이디일 시
          if (res.status === 404) {
            setLoginErrToast(true);

            setTimeout(() => {
              setLoginErrToast(false);
            }, 1700);
          } else {
            // 성공적으로 로그인 시 메인페이지로 이동
            setToast(true);
            setCookie('userToken', res.data.AccessToken);
            setCookie('userId', res.data.userId);

            setTimeout(() => {
              navigate('/');
            }, 1800);
          }
        });
    } else {
      setErrToast(true);

      setTimeout(() => {
        setErrToast(false);
      }, 1700);
    }
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
        {errToast && <MediumToast>{AUTH_ERR_MSG}</MediumToast>}
        {loginErrToast && <MediumToast>{LOGIN_ERR_MSG}</MediumToast>}
      </div>
    </form>
  );
};

export default Login;
