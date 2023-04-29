import { Outlet } from 'react-router-dom';

import AuthLayoutContainer from './AuthLayoutContainer';
import styles from './layout.module.scss';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

// 로그인, 회원가입 페이지 전용 레이아웃
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.layoutWrap}>
      <AuthLayoutContainer>{children || <Outlet />}</AuthLayoutContainer>
    </div>
  );
};

export default AuthLayout;
