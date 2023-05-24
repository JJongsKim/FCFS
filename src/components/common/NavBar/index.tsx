import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import close from '../../../assets/close.svg';
import menu from '../../../assets/menu.svg';
import { WriteBtnAtom } from '../../../atoms/WriteBtnAtom';
import Logo from '../Logo/Logo';

import styles from './NavBar.module.scss';

const NavBar = () => {
  const navigate = useNavigate();
  const writeBtn = useRecoilValue(WriteBtnAtom);
  const [click, setClick] = useState(false);
  const handleClickMenu = () => {
    setClick(!click);
  };

  const handleClickService = () => {
    navigate('/introduction');
    setClick(!click);
  };

  const handleClickNotice = () => {
    navigate('/list-page');
    setClick(!click);
  };

  const [token, , removeCookie] = useCookies(['userToken']);
  const handleRemoveToken = () => {
    removeCookie('userToken');
  };

  useEffect(() => {
    if (writeBtn) {
      setClick(false);
    }
  }, [writeBtn]);

  return (
    <>
      <div className={styles.navBarWrap}>
        <Logo size="small" />
        <span onClick={handleClickMenu}>{click ? <img src={close} /> : <img src={menu} />}</span>
      </div>
      {click && (
        <div className={styles.menuContainer}>
          {token.userToken ? (
            <ul>
              <li onClick={handleClickService}>서비스 소개</li>
              <li onClick={handleClickNotice}>선착순 게시판</li>
              <li onClick={handleRemoveToken}>로그아웃</li>
            </ul>
          ) : (
            <ul>
              <li onClick={() => navigate('/sign-in')}>로그인</li>
              <li onClick={() => navigate('sign-up')}>회원가입</li>
              <li onClick={handleClickService}>서비스 소개</li>
              <li onClick={handleClickNotice}>선착순 게시판</li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default NavBar;
