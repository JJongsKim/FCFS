import { createPortal } from 'react-dom';

interface Props {
  children?: React.ReactNode;
}

const ToastPortal = ({ children }: Props) => {
  const el = document.getElementById('toast-message');
  if (!el) return null;
  return createPortal(children, el);
};

export default ToastPortal;
