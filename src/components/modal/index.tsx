import { useRecoilState } from 'recoil';

import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';

import Portal from './Portal';
import styles from './modal.module.scss';

const Modal = () => {
  const [writeBtn, setWriteBtn] = useRecoilState(WriteBtnAtom);
  const handleClickBackground = () => {
    setWriteBtn(false);
  };

  return (
    <Portal>
      <div className={styles.modalView} onClick={handleClickBackground}>
        <div className={styles.modalBackground}>
          <div id={styles.modalContainer} onClick={e => e.stopPropagation()}>
            모달
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
