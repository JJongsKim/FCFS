import { createPortal } from 'react-dom';

interface Props {
  children?: React.ReactNode;
}

const Portal = ({ children }: Props) => {
  const el = document.getElementById('write-modal');
  if (!el) return null;
  return createPortal(children, el);
};

export default Portal;
