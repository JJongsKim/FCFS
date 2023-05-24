import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import prev from '../../assets/prev.svg';
import { DeleteInfoToast } from '../../atoms/DeleteInfoToast';
import Button from '../../components/common/Button';
import { LargeToast, MediumToast } from '../../components/common/Toast';
import { ACTIVE_MSG, API, DELETE_MSG } from '../../utils/contant';

import styles from './DetailPage.module.scss';

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, ,] = useCookies(['userToken']);
  const { Category, Title, HeadCount, CurrentCount, Content, userId, boardId } = location.state;
  const [toast, setToast] = useState(false);
  const [deleteInfoToast, setDeleteInfoToast] = useRecoilState(DeleteInfoToast);
  const [currentToastValue, setCurrentToastValue] = useState('');

  const handlePrevPage = () => {
    navigate(-1);
  };

  const handleClickDelete = () => {
    axios.delete(`${API}/${boardId}`).then(res => {
      if (res.status !== 404 && res.status !== 500) {
        setCurrentToastValue(DELETE_MSG);
        setDeleteInfoToast(false);
        setToast(true);

        setTimeout(() => {
          setToast(false);
          setCurrentToastValue('');
          navigate('/list-page');
        }, 1800);
      }
    });
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
          카테고리 : <p>{Category}</p>
        </div>
        <div id={styles.titleText}>
          인원 :
          <p>
            {CurrentCount}/{HeadCount}
          </p>
        </div>
      </section>
      <section id={styles.secondSection}>
        <p id={styles.titleText}>제목</p>
        <p>{Title}</p>
      </section>
      <section id={styles.thirdSection}>
        <p id={styles.titleText}>내용</p>
        <div className={styles.detailReadBox}>{Content}</div>
      </section>
      {userId === token.userToken ? (
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
