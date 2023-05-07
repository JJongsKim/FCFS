import { Link } from 'react-router-dom';
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
              <Link
                to={`/detail-page/${item.id}`}
                state={{
                  id: item.id,
                  category: item.category,
                  title: item.title,
                  detail: item.detail,
                  num: item.num,
                  totalNum: item.totalNum,
                  isAdmin: item.isAdmin,
                }}
              >
                <p>{item.title}</p>
              </Link>
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
