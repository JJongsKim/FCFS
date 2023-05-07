import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import { UPLOAD_MSG } from '../../utils/contant';
import Button from '../common/Button';
import { CateDropDown, NumDropDown } from '../common/Dropdown';
import TextArea from '../common/TextArea';
import { MediumToast } from '../common/Toast';

import Portal from './Portal';
import styles from './modal.module.scss';

const Modal = () => {
  const [toast, setToast] = useState(false);
  const setWriteBtn = useSetRecoilState(WriteBtnAtom);
  const handleClickBackground = () => {
    setWriteBtn(false);
  };

  const handleClickUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToast(true);

    setTimeout(() => {
      setWriteBtn(false);
    }, 3000);
  };

  return (
    <Portal>
      <div className={styles.modalView} onClick={handleClickBackground}>
        <div className={styles.modalBackground}>
          <form>
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
                <Button size="large" color="blue" onClick={e => handleClickUpload(e)}>
                  업로드하기
                </Button>
              </span>
            </div>
          </form>
        </div>
        {toast && <MediumToast>{UPLOAD_MSG}</MediumToast>}
      </div>
    </Portal>
  );
};

export default Modal;
