import styles from './input.module.scss';

type InputProps = {
  label?: string;
  type?: string;
  placeHolder?: string;
  value?: string;
  onChange?: () => void;
};

const InputBase = ({ label, type, placeHolder, value }: InputProps) => {
  return (
    <div className={styles.inputWrap}>
      <label>{label}</label>
      <input type={type} placeholder={placeHolder} value={value} />
    </div>
  );
};

export default InputBase;
