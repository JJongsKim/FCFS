import NavBar from '../common/NavBar';

import styles from './layoutContainer.module.scss';

interface Props {
  children?: React.ReactNode;
}

const LayoutContainer = ({ children }: Props) => {
  return (
    <div className={styles.layoutContainerWrap}>
      <NavBar />
      <div className={styles.contentsContainer}>{children}</div>
    </div>
  );
};

export default LayoutContainer;
