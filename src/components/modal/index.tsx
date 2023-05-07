import { useSetRecoilState } from 'recoil';

import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import Button from '../common/Button';
import { CateDropDown, NumDropDown } from '../common/Dropdown';
import TextArea from '../common/TextArea';

import Portal from './Portal';
import styles from './modal.module.scss';

const Modal = () => {
  const setWriteBtn = useSetRecoilState(WriteBtnAtom);
  const handleClickBackground = () => {
    setWriteBtn(false);
  };

  return (
    <Portal>
      <div className={styles.modalView} onClick={handleClickBackground}>
        <div className={styles.modalBackground}>
          <div id={styles.modalContainer} onClick={e => e.stopPropagation()}>
            <div className={styles.dropdownBox}>
              <CateDropDown />
              <NumDropDown />
            </div>
            <section>
              <p className={styles.title}>제목</p>
              <TextArea size="small" />
            </section>
            <section>
              <p className={styles.title}>내용</p>
              <TextArea size="medium" />
            </section>
            <span>
              <Button size="large" color="blue">
                업로드하기
              </Button>
            </span>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
