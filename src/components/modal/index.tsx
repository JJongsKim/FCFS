import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { CateDropDownAtom, NumDropDownAtom } from '../../atoms/DropdownItem';
import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import { API, ERR_MSG, UPLOAD_MSG } from '../../utils/contant';
import Button from '../common/Button';
import { CateDropDown, NumDropDown } from '../common/Dropdown';
import TextArea from '../common/TextArea';
import { MediumToast } from '../common/Toast';

import Portal from './Portal';
import styles from './modal.module.scss';

const Modal = () => {
  const [token, ,] = useCookies(['userToken']);
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
      numAtom === 0 ||
      boardInfo.Title === '' ||
      boardInfo.Content === ''
    ) {
      setErrToast(true);
      setTimeout(() => {
        setErrToast(false);
      }, 1800);
    } else {
      // 업로드성공
      axios
        .post(`${API}/new`, {
          ...boardInfo,
        })
        .then(res => {
          if (res.status === 200) {
            setToast(true);
            setCategoryAtom('카테고리');
            setNumAtom(0);

            setTimeout(() => {
              setWriteBtn(false);
            }, 1800);
          }
        });
    }
  };

  const [boardInfo, setBoardInfo] = useState({
    Category: '',
    HeadCount: 0, // TODO 나중에 숫자만 들어가도록 수정
    Title: '',
    Content: '',
    userId: token.userToken, // userId 구별하도록 토큰값 넣어두기
    CurrentCount: 0,
  });

  const handleChangeTextarea = (name: string, value: string) => {
    setBoardInfo(prev => ({
      ...prev,
      Category: categoryAtom,
      HeadCount: numAtom,
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
                  value={boardInfo.Title}
                  onChange={e => handleChangeTextarea('Title', e.target.value)}
                />
              </section>
              <section>
                <p className={styles.title}>내용</p>
                <TextArea
                  size="medium"
                  value={boardInfo.Content}
                  onChange={e => handleChangeTextarea('Content', e.target.value)}
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
