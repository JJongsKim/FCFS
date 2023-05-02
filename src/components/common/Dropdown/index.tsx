import { useState } from 'react';

import dropdown from '../../../assets/dropdown.svg';
import dropup from '../../../assets/dropup.svg';

import styles from './Dropdown.module.scss';

type DropDownProps = {
  children?: string;
};

const category = ['OTT구독', '원데이클래스', '스터디', '공모전', '맛집웨이팅', '운동'];
const numbers = [1, 2, 3, 4, 5];

const DropDown = ({ children }: DropDownProps) => {
  const [click, setClick] = useState(false);
  const handleClickDropBtn = () => {
    setClick(!click);
  };

  const handleClickItems = () => {
    setClick(false);
  };

  return (
    <div>
      <button onClick={handleClickDropBtn} id={styles.selectBox}>
        {children}
        {click ? <img src={dropup} /> : <img src={dropdown} />}
      </button>
      {children === '카테고리'
        ? click && (
            <ul id={styles.optionBox}>
              {category.map((cate, idx) => (
                <li key={idx}>
                  <button onClick={handleClickItems}>{cate}</button>
                </li>
              ))}
            </ul>
          )
        : click && (
            <ul id={styles.optionBox}>
              {numbers.map((num, idx) => (
                <li key={idx}>
                  <button onClick={handleClickItems}>{num}</button>
                </li>
              ))}
            </ul>
          )}
    </div>
  );
};

export default DropDown;
