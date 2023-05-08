import { useSetRecoilState } from 'recoil';

import { DeleteInfoToast } from '../../../atoms/DeleteInfoToast';

import styles from './Toast.module.scss';
import ToastPortal from './ToastPortal';

interface toastProps {
  children?: string;
}

interface deleteToastProps {
  handleFunc?: () => void;
}

export const MediumToast = ({ children }: toastProps) => {
  return (
    <ToastPortal>
      <div className={styles.toastBackground}>
        <div className={styles.toastWrap}>{children}</div>
      </div>
    </ToastPortal>
  );
};

// 삭제하기 전 토스트창에서만 사용
export const LargeToast = ({ handleFunc }: deleteToastProps) => {
  const deleteInfoToast = useSetRecoilState(DeleteInfoToast);

  return (
    <ToastPortal>
      <div className={styles.toastBackground}>
        <div className={styles.largeToastWrap}>
          <p>글을 정말 삭제하시겠습니까?</p>
          <p>삭제 후 복구할 수 없습니다.</p>
          <div className={styles.buttonWrap}>
            <button onClick={handleFunc}>삭제할게요</button>
            <button onClick={() => deleteInfoToast(false)}>취소</button>
          </div>
        </div>
      </div>
    </ToastPortal>
  );
};
