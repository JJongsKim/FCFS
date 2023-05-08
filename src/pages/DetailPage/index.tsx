import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import prev from '../../assets/prev.svg';
import { DeleteInfoToast } from '../../atoms/DeleteInfoToast';
import Button from '../../components/common/Button';
import { LargeToast, MediumToast } from '../../components/common/Toast';
import { ACTIVE_MSG, DELETE_MSG } from '../../utils/contant';

import styles from './DetailPage.module.scss';

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, title, detail, num, totalNum, isAdmin } = location.state;
  const [toast, setToast] = useState(false);
  const [deleteInfoToast, setDeleteInfoToast] = useRecoilState(DeleteInfoToast);
  const [currentToastValue, setCurrentToastValue] = useState('');

  const handlePrevPage = () => {
    navigate(-1);
  };

  const handleClickDelete = () => {
    // TODO api 연결
    setCurrentToastValue(DELETE_MSG);
    setDeleteInfoToast(false);
    setToast(true);

    setTimeout(() => {
      setToast(false);
      setCurrentToastValue('');
      // TODO 삭제 api 연결 후 리스트페이지로 이동하도록 수정
    }, 1800);
  };

  // 테스트용 동작
  const handleClickActive = () => {
    setToast(true);
    setCurrentToastValue(ACTIVE_MSG);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
        setCurrentToastValue('');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className={styles.pageWrap}>
      <span id={styles.prevBtn} onClick={handlePrevPage}>
        <img src={prev} />
        뒤로가기
      </span>
      <div id={styles.topHr} />
      <section id={styles.firstSection}>
        <div id={styles.titleText}>
          카테고리 : <p>{category}</p>
        </div>
        <div id={styles.titleText}>
          인원 :
          <p>
            {num}/{totalNum}
          </p>
        </div>
      </section>
      <section id={styles.secondSection}>
        <p id={styles.titleText}>제목</p>
        <p>{title}</p>
      </section>
      <section id={styles.thirdSection}>
        <p id={styles.titleText}>내용</p>
        <div className={styles.detailReadBox}>{detail}</div>
      </section>
      {isAdmin ? (
        <div className={styles.buttonWrap}>
          <Button size="small" color="blue">
            수정하기
          </Button>
          <Button size="small" color="blue" onClick={() => setDeleteInfoToast(true)}>
            삭제하기
          </Button>
        </div>
      ) : (
        <Button size="small" color="blue" onClick={handleClickActive}>
          참여하기
        </Button>
      )}
      {toast && <MediumToast>{currentToastValue}</MediumToast>}
      {deleteInfoToast && <LargeToast handleFunc={handleClickDelete} />}
    </div>
  );
};

export default DetailPage;
