import { useState, useEffect, useRef } from 'react';

const useScrollButtons = () => {
  const [isScrollableLeftProject, setIsScrollableLeftProject] = useState(false);
  const [isScrollableRightProject, setIsScrollableRightProject] = useState(false);
  const scrollContainerRefProject = useRef(null);

  const checkScrollButtonsProject = () => {
    if (scrollContainerRefProject.current) {
      const { scrollLeftProject, scrollWidth, clientWidth } = scrollContainerRefProject.current;
      setIsScrollableLeftProject(scrollLeftProject > 0);
      setIsScrollableRightProject(scrollLeftProject + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollButtonsProject();
    window.addEventListener('resize', checkScrollButtonsProject);

    return () => {
      window.removeEventListener('resize', checkScrollButtonsProject);
    };
  }, []);

  const scrollLeftProject = () => {
    if (scrollContainerRefProject.current) {
      scrollContainerRefProject.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRightProject = () => {
    if (scrollContainerRefProject.current) {
      scrollContainerRefProject.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return {
    scrollContainerRefProject,
    isScrollableLeftProject,
    isScrollableRightProject,
    scrollLeftProject,
    scrollRightProject,
    checkScrollButtonsProject
  };
};

export default useScrollButtons;
