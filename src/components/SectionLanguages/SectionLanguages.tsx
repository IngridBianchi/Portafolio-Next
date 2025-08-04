import React, { useEffect, useState } from 'react';
import CardItem from '../CardItem/CardItem';
import styles from '../Module-CSS/index.module.css';
import useScrollButtons from './useScrollButtons';

interface Props {
  repositories: any[];
  stackImages: any;
  lang?: any;
}

const SectionLanguages: React.FC<Props> = ({ repositories, stackImages, lang }) => {
  const {
    scrollContainerRef,
    isScrollableLeft,
    isScrollableRight,
    scrollLeft,
    scrollRight,
    checkScrollButtons,
  } = useScrollButtons('languages');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      checkScrollButtons();
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollContainerRef, checkScrollButtons]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{lang.my_lang_stack}</h2>
        <div className={isMobile ? '' : styles.cardGrid} style={{ position: 'relative' }}>
          {isMobile && (
            <>
              {isScrollableLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ff4d9e] to-[#ff1f81] text-white rounded-full w-8 h-8 flex items-center justify-center z-10 hover:from-[#ff1f81] hover:to-[#d81b60] transition-all"
                  aria-label="Desplazar a la izquierda"
                >
                  &lt;
                </button>
              )}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scroll-smooth"
                style={{ padding: '16px 0', scrollbarWidth: 'thin' }}
              >
                {repositories.map((repo) => (
                  <div
                    key={repo.id}
                    className="flex-shrink-0"
                    style={{ margin: '4px 8px', width: 'calc(50% - 16px)' }}
                  >
                    <CardItem item={repo} stackImages={stackImages} lang={lang} />
                  </div>
                ))}
              </div>
              {isScrollableRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ff4d9e] to-[#ff1f81] text-white rounded-full w-8 h-8 flex items-center justify-center z-10 hover:from-[#ff1f81] hover:to-[#d81b60] transition-all"
                  aria-label="Desplazar a la derecha"
                >
                  &gt;
                </button>
              )}
            </>
          )}
          {!isMobile && repositories.map((repo) => (
            <CardItem key={repo.id} item={repo} stackImages={stackImages} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionLanguages;