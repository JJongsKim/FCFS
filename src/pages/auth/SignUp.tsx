import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import InputBase from '../../components/common/Input';
import { MediumToast } from '../../components/common/Toast';
import { API, AUTH_ERR_MSG, SIGNUP_MSG } from '../../utils/contant';

import styles from './SignUp.module.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [errToast, setErrToast] = useState(false);
  const [valid, isValid] = useState(false); // 비밀번호, 비밀번호 확인이 일치하지 않을 시 true로
  const handleClickSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (userInfo.pwdCheck === '' || userInfo.pwdCheck !== userInfo.userPassword) {
      isValid(true);
    }
    // 모든 형식칸을 작성하고, 비밀번호가 맞을 때(valid false일 시) 회원가입 api 연결
    if (userInfo.userId !== '' && userInfo.userName !== '' && userInfo.userPassword !== '') {
      if (!valid) {
        axios
          .post(`${API}/user/sign_up`, {
            ...userInfo,
          })
          .then(res => {
            if (res.status === 200) {
              setToast(true);

              setTimeout(() => {
                navigate('/sign-in');
              }, 1800);
            }
          });
      }
    } else {
      setErrToast(true);

      setTimeout(() => {
        setErrToast(false);
      }, 1700);
    }
  };

  const [userInfo, setUserInfo] = useState({
    userId: '',
    userName: '',
    userPassword: '',
    pwdCheck: '',
  });

  const handleChangeInput = (name: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      <div className={styles.signUpWrap}>
        <span>
          <InputBase
            type="text"
            label="이름"
            placeHolder="이름을 입력해주세요!"
            name="userName"
            value={userInfo.userName}
            onChange={e => handleChangeInput('userName', e.target.value)}
          />
        </span>
        <span>
          <InputBase
            type="text"
            label="아이디"
            placeHolder="아이디를 입력해주세요!"
            name="userId"
            value={userInfo.userId}
            onChange={e => handleChangeInput('userId', e.target.value)}
          />
        </span>
        <span>
          <InputBase
            type="password"
            label="비밀번호"
            placeHolder="비밀번호를 입력해주세요!"
            name="userPassword"
            value={userInfo.userPassword}
            onChange={e => handleChangeInput('userPassword', e.target.value)}
          />
        </span>
        <span className={styles.pwCheckBox}>
          <InputBase
            type="password"
            label="비밀번호 확인"
            name="pwdCheck"
            value={userInfo.pwdCheck}
            onChange={e => handleChangeInput('pwdCheck', e.target.value)}
          />
          {valid ? <p id={styles.validMsg}>비밀번호를 다시 확인해주세요!</p> : ''}
        </span>

        <div className={styles.loginBtnWrap}>
          <p onClick={() => navigate('/sign-in')}>이미 가입하셨나요? 로그인하기</p>
          <Button size="large" color="blue" onClick={e => handleClickSignUp(e)}>
            회원가입
          </Button>
        </div>
        {toast && <MediumToast>{SIGNUP_MSG}</MediumToast>}
        {errToast && <MediumToast>{AUTH_ERR_MSG}</MediumToast>}
      </div>
    </form>
  );
};

export default SignUp;
