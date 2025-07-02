import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollTop = () => {
      const interval = setInterval(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY !== 0) {
          window.scrollTo(0, 0);
        } else {
          clearInterval(interval);
        }
      }, 16); // ~60fps
    };

    // Small delay ensures DOM has rendered
    setTimeout(scrollTop, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
