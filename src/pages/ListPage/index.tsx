import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import listBg from '../../assets/listBg.svg';
import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import Button from '../../components/common/Button';
import { MediumToast } from '../../components/common/Toast';
import Modal from '../../components/modal';
import { API, LOGIN_INFO_MSG } from '../../utils/contant';

import styles from './ListPage.module.scss';

const categoryNames = ['OTT구독', '원데이클래스', '스터디', '공모전', '맛집웨이팅', '운동'];

const ListPage = () => {
  const { state } = useLocation();
  const [token, ,] = useCookies(['userToken']);
  const [boards, setBoards] = useState<getBoardType[]>([]);

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

  const showBoards = () => {
    axios.get(`${API}/title`).then(res => {
      setBoards(res.data);
    });
  };

  useEffect(() => {
    if (state !== null && state) {
      setClickCate(true);
      setClickCateName(state);
    }
    showBoards();
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
          {boards.map(item => (
            <div key={item.boardId} id={styles.items}>
              <p>{item.Category}</p>
              {token.userToken ? (
                <Link
                  to={`/detail-page/${item.boardId}`}
                  state={{
                    ...item,
                  }}
                >
                  <p>{item.Title}</p>
                </Link>
              ) : (
                <p onClick={handleShowInfoToast}>{item.Title}</p>
              )}
              <p>
                {item.CurrentCount}/{item.HeadCount}
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
