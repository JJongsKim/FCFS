import { useState } from 'react';
import { useRecoilState } from 'recoil';

import dropdown from '../../../assets/dropdown.svg';
import dropup from '../../../assets/dropup.svg';
import { CateDropDownAtom, NumDropDownAtom } from '../../../atoms/DropdownItem';

import styles from './Dropdown.module.scss';

const category = ['OTT구독', '원데이클래스', '스터디', '공모전', '맛집웨이팅', '운동'];
const numbers = ['1명', '2명', '3명', '4명', '5명'];

export const CateDropDown = () => {
  const [currentCate, setCurrentCate] = useRecoilState(CateDropDownAtom);
  const [click, setClick] = useState(false);
  const handleClickDropBtn = () => {
    setClick(!click);
  };

  const handleClickItems = () => {
    setClick(false);
  };

  return (
    <div>
      <button type="button" onClick={handleClickDropBtn} id={styles.selectBox}>
        {currentCate}
        {click ? <img src={dropup} /> : <img src={dropdown} />}
      </button>
      {click && (
        <ul id={styles.optionBox}>
          {category.map((cate, idx) => (
            <li key={idx} onClick={() => setCurrentCate(cate)}>
              <button onClick={handleClickItems}>{cate}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const NumDropDown = () => {
  const [currentNum, setCurrentNum] = useRecoilState(NumDropDownAtom);
  const [click, setClick] = useState(false);
  const handleClickDropBtn = () => {
    setClick(!click);
  };

  const handleClickItems = () => {
    setClick(false);
  };

  return (
    <div>
      <button type="button" onClick={handleClickDropBtn} id={styles.selectBox}>
        {currentNum}
        {click ? <img src={dropup} /> : <img src={dropdown} />}
      </button>
      {click && (
        <ul id={styles.optionBox}>
          {numbers.map((num, idx) => (
            <li key={idx} onClick={() => setCurrentNum(num)}>
              <button onClick={handleClickItems}>{num}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
