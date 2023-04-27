import { useState } from 'react';

import close from '../../../assets/close.svg';
import menu from '../../../assets/menu.svg';
import Logo from '../Logo/Logo';

import styles from './NavBar.module.scss';

const NavBar = () => {
  const [click, setClick] = useState(false);
  const handleClickMenu = () => {
    setClick(!click);
  };
  // TODO token 받아옴에 따라 바꾸기
  const test = true;

  return (
    <>
      <div className={styles.navBarWrap}>
        <Logo size="small" />
        <span onClick={handleClickMenu}>{click ? <img src={close} /> : <img src={menu} />}</span>
      </div>
      {click && (
        <div className={styles.menuContainer}>
          {test ? (
            <ul>
              <li>로그인</li>
              <li>회원가입</li>
              <li>서비스 소개</li>
              <li>선착순 게시판</li>
            </ul>
          ) : (
            <ul>
              <li>서비스 소개</li>
              <li>선착순 게시판</li>
              <li>선착순 쓰러가기</li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default NavBar;
