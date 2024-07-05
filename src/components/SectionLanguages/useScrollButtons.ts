import { useState, useEffect, useRef } from 'react';

const useScrollButtons = () => {
  const [isScrollableLeft, setIsScrollableLeft] = useState(false);
  const [isScrollableRight, setIsScrollableRight] = useState(false);
  const scrollContainerRef = useRef(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsScrollableLeft(scrollLeft > 0);
      setIsScrollableRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return {
    scrollContainerRef,
    isScrollableLeft,
    isScrollableRight,
    scrollLeft,
    scrollRight,
    checkScrollButtons
  };
};

export default useScrollButtons;
