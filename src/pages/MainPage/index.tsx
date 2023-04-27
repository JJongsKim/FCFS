import Logo from '../../components/common/Logo/Logo';

import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={styles.mainPageWrap}>
      <h1>메인페이지</h1>
      <Logo size="large" />
    </div>
  );
};

export default MainPage;
