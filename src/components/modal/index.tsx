import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { CateDropDownAtom, NumDropDownAtom } from '../../atoms/DropdownItem';
import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import { ERR_MSG, UPLOAD_MSG } from '../../utils/contant';
import Button from '../common/Button';
import { CateDropDown, NumDropDown } from '../common/Dropdown';
import TextArea from '../common/TextArea';
import { MediumToast } from '../common/Toast';

import Portal from './Portal';
import styles from './modal.module.scss';

const Modal = () => {
  const [toast, setToast] = useState(false);
  const [errToast, setErrToast] = useState(false);
  const [categoryAtom, setCategoryAtom] = useRecoilState(CateDropDownAtom);
  const [numAtom, setNumAtom] = useRecoilState(NumDropDownAtom);
  const setWriteBtn = useSetRecoilState(WriteBtnAtom);
  const handleClickBackground = () => {
    setWriteBtn(false);
  };

  const handleClickUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      categoryAtom === '카테고리' ||
      numAtom === '인원' ||
      boardInfo.title === '' ||
      boardInfo.content === ''
    ) {
      setErrToast(true);
      setTimeout(() => {
        setErrToast(false);
      }, 1800);
    } else {
      setToast(true);
      setCategoryAtom('카테고리');
      setNumAtom('인원');

      setTimeout(() => {
        setWriteBtn(false);
      }, 1800);
    }
  };

  const [boardInfo, setBoardInfo] = useState({
    category: '',
    number: '', // TODO 나중에 숫자만 들어가도록 수정
    title: '',
    content: '',
  });

  const handleChangeTextarea = (name: string, value: string) => {
    setBoardInfo(prev => ({
      ...prev,
      category: categoryAtom,
      number: numAtom,
      [name]: value,
    }));
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
                <TextArea
                  size="small"
                  value={boardInfo.title}
                  onChange={e => handleChangeTextarea('title', e.target.value)}
                />
              </section>
              <section>
                <p className={styles.title}>내용</p>
                <TextArea
                  size="medium"
                  value={boardInfo.content}
                  onChange={e => handleChangeTextarea('content', e.target.value)}
                />
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
        {errToast && <MediumToast>{ERR_MSG}</MediumToast>}
      </div>
    </Portal>
  );
};

export default Modal;
