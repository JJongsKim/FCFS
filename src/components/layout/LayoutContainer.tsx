import NavBar from '../common/NavBar';

import styles from './layoutContainer.module.scss';

interface Props {
  children?: React.ReactNode;
}

const LayoutContainer = ({ children }: Props) => {
  return (
    <div className={styles.layoutContainerWrap}>
      <NavBar />
      {children}
    </div>
  );
};

export default LayoutContainer;
