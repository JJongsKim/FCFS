import { useRecoilState } from 'recoil';

import listBg from '../../assets/listBg.svg';
import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import Button from '../../components/common/Button';
import Modal from '../../components/modal';

import styles from './ListPage.module.scss';

const categoryNames = ['OTT구독', '원데이클래스', '스터디', '공모전', '맛집웨이팅', '운동'];

const ListPage = () => {
  const [writeBtn, setWriteBtn] = useRecoilState(WriteBtnAtom);
  const handleClickWriteBtn = () => {
    setWriteBtn(!writeBtn);
  };

  return (
    <div className={styles.pageWrap}>
      <div id={styles.topHr} />
      <div className={styles.categoryBox}>
        {categoryNames.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </div>
      <section className={styles.listBox}>
        <img src={listBg} />
        <div className={styles.listItems}>
          <p>카테고리</p>
          <p>제목</p>
          <p>인원</p>
          {/* 아랫부분부터 글 목록 12개 반복문 돌리기 */}
        </div>
      </section>
      <div id={styles.listBtn}>
        <Button size="small" color="blue" onClick={handleClickWriteBtn}>
          글 쓰러가기
        </Button>
        {writeBtn && <Modal />}
      </div>
    </div>
  );
};

export default ListPage;
