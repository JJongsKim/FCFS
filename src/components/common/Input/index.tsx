import styles from './input.module.scss';

type InputProps = {
  label?: string;
  name?: string;
  type?: string;
  placeHolder?: string;
  value?: string;
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBase = ({ label, name, type, placeHolder, value, onChange }: InputProps) => {
  return (
    <div className={styles.inputWrap}>
      <label>{label}</label>
      <input type={type} name={name} placeholder={placeHolder} value={value} onChange={onChange} />
    </div>
  );
};

export default InputBase;
