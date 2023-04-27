import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo/Logo';

import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <div className={styles.mainPageWrap}>
      <h1>메인페이지</h1>
      <Logo size="large" />
      <Button size="small">테스트</Button>
      <Button size="small" color="blue">
        테스트
      </Button>
    </div>
  );
};

export default MainPage;
