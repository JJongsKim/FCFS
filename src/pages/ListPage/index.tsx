import { useRecoilState } from 'recoil';

import listBg from '../../assets/listBg.svg';
import { WriteBtnAtom } from '../../atoms/WriteBtnAtom';
import Button from '../../components/common/Button';
import Modal from '../../components/modal';

import styles from './ListPage.module.scss';

const categoryNames = ['OTT구독', '원데이클래스', '스터디', '공모전', '맛집웨이팅', '운동'];
const mockList = [
  {
    id: 1,
    category: '원데이클래스',
    title: '바리스타 클래스 둘이 들으실 분?',
    num: 0,
    totalNum: 2,
  },
  {
    id: 2,
    category: '공모전',
    title: '한이음 AI 프로젝트 나가실 분 구합니다!',
    num: 1,
    totalNum: 3,
  },
];

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
        <div className={styles.listTitleCate}>
          <p>카테고리</p>
          <p>제목</p>
          <p>인원</p>
        </div>
        <div id={styles.listItem}>
          {mockList.map(item => (
            <div key={item.id} id={styles.items}>
              <p>{item.category}</p>
              <p>{item.title}</p>
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
      </div>
    </div>
  );
};

export default ListPage;
