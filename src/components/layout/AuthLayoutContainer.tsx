import Logo from '../common/Logo/Logo';

import styles from './layoutContainer.module.scss';

interface Props {
  children?: React.ReactNode;
}

const AuthLayoutContainer = ({ children }: Props) => {
  return (
    <div className={styles.layoutContainerWrap}>
      <div>
        <Logo size="large" />
      </div>
      <div className={styles.contentsContainer}>{children}</div>
    </div>
  );
};

export default AuthLayoutContainer;
