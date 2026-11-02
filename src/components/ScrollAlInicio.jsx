import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollAlInicio() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const seccion = hash && document.getElementById(hash.slice(1));
    if (seccion) seccion.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollAlInicio;
