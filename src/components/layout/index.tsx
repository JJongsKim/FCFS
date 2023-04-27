import LayoutContainer from './LayoutContainer';
import styles from './layout.module.scss';

interface layoutProps {
  children?: React.ReactNode;
}

// 배경에 감싸진 LayoutContainer(상단바와 콘텐츠 내용이 들어갈 예정)
const Layout = ({ children }: layoutProps) => {
  return (
    <div className={styles.layoutWrap}>
      <LayoutContainer>{children}</LayoutContainer>
    </div>
  );
};

export default Layout;
