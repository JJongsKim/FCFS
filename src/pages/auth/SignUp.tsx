import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import InputBase from '../../components/common/Input';

import styles from './SignUp.module.scss';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <form>
      <div className={styles.signUpWrap}>
        <span>
          <InputBase type="text" label="이름" placeHolder="이름을 입력해주세요!" />
        </span>
        <span>
          <InputBase type="text" label="아이디" placeHolder="아이디를 입력해주세요!" />
        </span>
        <span>
          <InputBase type="password" label="비밀번호" placeHolder="비밀번호를 입력해주세요!" />
        </span>
        <span>
          <InputBase type="password" label="비밀번호 확인" />
        </span>

        <div className={styles.loginBtnWrap}>
          <p onClick={() => navigate('/sign-in')}>이미 가입하셨나요? 로그인하기</p>
          <Button size="large" color="blue">
            회원가입
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
