import { useSetRecoilState } from 'recoil';

import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import DropDown from '../common/Dropdown';
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
              <DropDown>카테고리</DropDown>
              <DropDown>인원</DropDown>
            </div>
            <TextArea size="small">dddd</TextArea>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
