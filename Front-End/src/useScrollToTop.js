import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the route changes
  }, [location.pathname]);

  // You can return additional logic or data if needed

  return null;
}

export default useScrollToTop;
