import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the path changes and there is no hash tag, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // If there is a hash (e.g. #sensitiveSection), scroll to that element
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
