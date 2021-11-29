import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ name, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector(`#portal-${name}`))
    : null;
};

export default Portal;
