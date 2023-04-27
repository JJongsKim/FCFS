import Logo from '../Logo/Logo';

import styles from './NavBar.module.scss';

// 로고 부분은 컴포넌트로 만들 수 있을듯? 여기도 쓰이고 로그인,회원가입에도 쓰여서

const NavBar = () => {
  return (
    <div className={styles.navBarWrap}>
      <Logo size="small" />
      <div className="menuBtn">메뉴버튼</div>
    </div>
  );
};

export default NavBar;
