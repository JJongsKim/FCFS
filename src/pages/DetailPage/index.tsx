import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import prev from '../../assets/prev.svg';
import { DeleteInfoToast } from '../../atoms/DeleteInfoToast';
import { CateDropDownAtom, NumDropDownAtom } from '../../atoms/DropdownItem';
import Button from '../../components/common/Button';
import { CateDropDown, NumDropDown } from '../../components/common/Dropdown';
import TextArea from '../../components/common/TextArea';
import { LargeToast, MediumToast } from '../../components/common/Toast';
import { ACTIVE_MSG, ALREADY_ACTIVE_MSG, API, DELETE_MSG, EDIT_MSG } from '../../utils/contant';

import styles from './DetailPage.module.scss';

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, ,] = useCookies(['userId']);
  const { Category, Title, HeadCount, CurrentCount, Content, userId, boardId, CountUser } =
    location.state;

  const user = token.userId;
  const [toast, setToast] = useState(false);
  const [editToast, setEditToast] = useState(false);
  const [alreadyToast, setAlreadyToast] = useState(false);
  const [isEditBtn, setIsEditBtn] = useState(false);
  const [deleteInfoToast, setDeleteInfoToast] = useRecoilState(DeleteInfoToast);
  const [categoryAtom, setCategoryAtom] = useRecoilState(CateDropDownAtom);
  const [numAtom, setNumAtom] = useRecoilState(NumDropDownAtom);
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

  // 수정할 때 따로 변경하지 않는 자료는 그대로 가져가도록
  const [editInfo, setEditInfo] = useState({
    boardId: boardId,
    Category: Category,
    HeadCount: HeadCount,
    Title: Title,
    Content: Content,
    userId: token.userId,
    CurrentCount: CurrentCount,
    CountUser: CountUser,
  });

  const handleChangeTextarea = (name: string, value: string) => {
    setEditInfo(prev => ({
      ...prev,
      Category: categoryAtom,
      HeadCount: numAtom,
      [name]: value,
    }));
  };

  const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .put(`${API}/${boardId}`, {
        ...editInfo,
      })
      .then(res => {
        if (res.status === 200) {
          setEditToast(true);
          setIsEditBtn(false);
          setCategoryAtom('카테고리');
          setNumAtom(0);

          setTimeout(() => {
            setEditToast(false);
          }, 1700);
        }
      });
  };

  const handleClickActive = () => {
    const countUserArray = JSON.parse(CountUser);

    if (!countUserArray.includes(token.userId)) {
      axios
        .put(`${API}/count/${boardId}`, {
          CurrentCount,
          user, // 참여하기를 누르는 글쓴이 제외 아이디
        })
        .then(res => {
          if (res.status === 200) {
            setToast(true);
            setCurrentToastValue(ACTIVE_MSG);
            setTimeout(() => {
              navigate('/list-page');
            }, 1700);
          }
        });
    } else {
      setAlreadyToast(true);

      setTimeout(() => {
        setAlreadyToast(false);
      }, 1700);
    }
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
      <div style={{ width: '100%' }}>
        <section id={styles.firstSection}>
          <div id={styles.titleText}>
            카테고리 :
            {isEditBtn ? (
              <span style={{ marginLeft: '5px' }}>
                <CateDropDown />
              </span>
            ) : (
              <p>{Category}</p>
            )}
          </div>
          <div id={styles.titleText}>
            인원 :
            {isEditBtn ? (
              <span style={{ marginLeft: '5px' }}>
                <NumDropDown />
              </span>
            ) : (
              <p>
                {CurrentCount}/{HeadCount}
              </p>
            )}
          </div>
        </section>
        <section id={styles.secondSection}>
          <p id={styles.titleText}>제목</p>
          {isEditBtn ? (
            <TextArea
              size="editSmall"
              value={editInfo.Title}
              onChange={e => handleChangeTextarea('Title', e.target.value)}
            >
              {Title}
            </TextArea>
          ) : (
            <p>{Title}</p>
          )}
        </section>
        <section id={styles.thirdSection}>
          <p id={styles.titleText}>내용</p>
          {isEditBtn ? (
            <TextArea
              size="editLarge"
              value={editInfo.Content}
              onChange={e => handleChangeTextarea('Content', e.target.value)}
            >
              {Content}
            </TextArea>
          ) : (
            <div className={styles.detailReadBox}>{Content}</div>
          )}
        </section>
      </div>
      {userId === token.userId ? (
        <div className={styles.buttonWrap}>
          {isEditBtn ? (
            <>
              <Button size="small" color="blue" onClick={e => handleClickEdit(e)}>
                수정완료하기
              </Button>
              <Button size="small" color="blue" onClick={() => setIsEditBtn(false)}>
                취소하기
              </Button>
            </>
          ) : (
            <>
              <Button size="small" color="blue" onClick={() => setIsEditBtn(true)}>
                수정하기
              </Button>
              <Button size="small" color="blue" onClick={() => setDeleteInfoToast(true)}>
                삭제하기
              </Button>
            </>
          )}
        </div>
      ) : (
        <Button size="small" color="blue" onClick={handleClickActive}>
          참여하기
        </Button>
      )}
      {toast && <MediumToast>{currentToastValue}</MediumToast>}
      {editToast && <MediumToast>{EDIT_MSG}</MediumToast>}
      {alreadyToast && <MediumToast>{ALREADY_ACTIVE_MSG}</MediumToast>}
      {deleteInfoToast && <LargeToast handleFunc={handleClickDelete} />}
    </div>
  );
};

export default DetailPage;
