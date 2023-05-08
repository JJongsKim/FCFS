import styles from './Toast.module.scss';
import ToastPortal from './ToastPortal';

interface toastProps {
  children?: string;
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
export const LargeToast = () => {
  return <ToastPortal>큰 토스트창</ToastPortal>;
};
