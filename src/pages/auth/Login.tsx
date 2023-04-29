import Button from '../../components/common/Button';
import InputBase from '../../components/common/Input';

import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.loginWrap}>
      <span>
        <InputBase type="text" label="아이디" placeHolder="아이디를 입력해주세요!" />
      </span>
      <span>
        <InputBase type="password" label="비밀번호" placeHolder="비밀번호를 입력해주세요!" />
      </span>

      <div className={styles.loginBtnWrap}>
        <p>아직 회원이 아니신가요?</p>
        <Button size="large" color="blue">
          로그인
        </Button>
      </div>
    </div>
  );
};

export default Login;
