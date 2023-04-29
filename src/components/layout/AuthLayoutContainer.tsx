import Logo from '../common/Logo/Logo';

import authStyles from './authLayout.module.scss';
import styles from './layoutContainer.module.scss';

interface Props {
  children?: React.ReactNode;
}

const AuthLayoutContainer = ({ children }: Props) => {
  return (
    <div className={styles.layoutContainerWrap}>
      <div className={authStyles.logoContainer}>
        <Logo size="large" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayoutContainer;
