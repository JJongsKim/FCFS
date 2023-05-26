import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import competition from '../../assets/competition.svg';
import eating from '../../assets/eating.svg';
import health from '../../assets/health.svg';
import onedayclass from '../../assets/onedayclass.svg';
import ott from '../../assets/ott.svg';
import study from '../../assets/study.svg';
import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import Button from '../../components/common/Button';
import { MediumToast } from '../../components/common/Toast';
import Modal from '../../components/modal';
import { LOGIN_INFO_MSG } from '../../utils/contant';

import styles from './MainPage.module.scss';

const imgSrc = [study, ott, eating, competition, health, onedayclass];
const categoryNames = ['OTT구독', '원데이클래스', '스터디', '공모전', '맛집웨이팅', '운동'];

const MainPage = () => {
  const navigate = useNavigate();
  const [token, ,] = useCookies(['userToken']);
  const [infoToast, setInfoToast] = useState(false); // 로그인 후 이용 토스트
  const [writeBtn, setWriteBtn] = useRecoilState(WriteBtnAtom);
  const handleClickWriteBtn = () => {
    {
      token.userToken ? setWriteBtn(!writeBtn) : handleShowInfoToast();
    }
  };

  const handleShowInfoToast = () => {
    setInfoToast(true);

    setTimeout(() => {
      setInfoToast(false);
    }, 1700);
  };

  const handleClickCate = (item: string) => {
    // TODO 나중에 arg 받아와서 카테고리에 따라 달라지도록 수정하기
    navigate('/list-page', {
      state: item,
    });
  };

  return (
    <div className={styles.mainPageWrap}>
      <section className={styles.animeSection}>
        <div>
          <div id={styles.animeContainer}>
            <div className={styles.animeSlide}>
              {imgSrc.map((src, idx) => (
                <span key={idx}>
                  <img src={src} />
                </span>
              ))}
              {imgSrc.map((src, idx) => (
                <span key={idx + imgSrc.length}>
                  <img src={src} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id={styles.sectionFlexColumn} className={styles.first}>
        <p id={styles.sectionTitle}>오늘의 인기 카테고리</p>
        <p>OTT구독</p>
      </section>
      <section id={styles.sectionFlexColumn} className={styles.second}>
        <p id={styles.sectionTitle}>카테고리 바로가기</p>
        <div>
          {categoryNames.map((item, idx) => (
            <Button key={idx} size="small" color="babyGray" onClick={() => handleClickCate(item)}>
              {item}
            </Button>
          ))}
        </div>
      </section>
      <section id={styles.sectionFlexColumn}>
        <p id={styles.sectionTitle}>선착순 구하러 갈래요?</p>
        <Button size="small" color="blue" onClick={handleClickWriteBtn}>
          글 쓰러가기
        </Button>
        {writeBtn && <Modal />}
      </section>
      {infoToast && <MediumToast>{LOGIN_INFO_MSG}</MediumToast>}
    </div>
  );
};

export default MainPage;
