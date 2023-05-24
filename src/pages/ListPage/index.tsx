import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import listBg from '../../assets/listBg.svg';
import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import Button from '../../components/common/Button';
import { MediumToast } from '../../components/common/Toast';
import Modal from '../../components/modal';
import { LOGIN_INFO_MSG } from '../../utils/contant';

import styles from './ListPage.module.scss';

const categoryNames = ['OTT구독', '원데이클래스', '스터디', '공모전', '맛집웨이팅', '운동'];
const mockList = [
  {
    id: 1,
    category: '원데이클래스',
    title: '바리스타 클래스 둘이 들으실 분?',
    detail:
      '요즘 바리스타 자격증에 관심이 생겨 바리스타 클래스를 들어보고 싶은데 관심 있으신 분 있나요? 같이 들으러가요!',
    num: 0,
    totalNum: 2,
    isAdmin: false,
  },
  {
    id: 2,
    category: '공모전',
    title: '한이음 AI 프로젝트 나가실 분 구합니다!',
    detail:
      'AI공부 중인 학생입니다. 환경 주제에 관심이 생겨 참가하고자 합니다. 팀원은 총 3분 구합니다. 많은 관심과 참여부탁합니다~',
    num: 1,
    totalNum: 3,
    isAdmin: true,
  },
];

const ListPage = () => {
  const { state } = useLocation();
  const [token, ,] = useCookies(['userToken']);

  const [writeBtn, setWriteBtn] = useRecoilState(WriteBtnAtom);
  const [infoToast, setInfoToast] = useState(false); // 로그인 후 이용 토스트
  const [clickCate, setClickCate] = useState(false);
  const [clickCateName, setClickCateName] = useState('');
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

  const handleClickCate = (cateName: string) => {
    setClickCate(!clickCate);
    setClickCateName(cateName);

    // 카테고리를 한 번 더 누를 시 전체보기로 바뀌도록
    if (cateName === clickCateName) {
      setClickCateName('');
    }
  };

  useEffect(() => {
    if (state !== null && state) {
      setClickCate(true);
      setClickCateName(state);
    }
  }, []);

  return (
    <div className={styles.pageWrap}>
      <div id={styles.topHr} />
      <div className={styles.categoryBox}>
        {categoryNames.map((item, idx) => (
          <p
            key={idx}
            onClick={() => handleClickCate(item)}
            id={clickCateName === item ? styles.selectCategory : ''}
          >
            {item}
          </p>
        ))}
      </div>
      <section className={styles.listBox}>
        <img src={listBg} />
        <div className={styles.listTitleCate}>
          <p>카테고리</p>
          <p>제목</p>
          <p>인원</p>
        </div>
        <div id={styles.listItem}>
          {mockList.map(item => (
            <div key={item.id} id={styles.items}>
              <p>{item.category}</p>
              {token.userToken ? (
                <Link
                  to={`/detail-page/${item.id}`}
                  state={{
                    ...item,
                  }}
                >
                  <p>{item.title}</p>
                </Link>
              ) : (
                <p onClick={handleShowInfoToast}>{item.title}</p>
              )}
              <p>
                {item.num}/{item.totalNum}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div id={styles.listBtn}>
        <Button size="small" color="blue" onClick={handleClickWriteBtn}>
          글 쓰러가기
        </Button>
        {writeBtn && <Modal />}
        {infoToast && <MediumToast>{LOGIN_INFO_MSG}</MediumToast>}
      </div>
    </div>
  );
};

export default ListPage;
