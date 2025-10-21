import React from 'react';
import CardItem from '../CardItem/CardItem';
import styles from '../Module-CSS/index.module.css';

const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ff4d9e, #ff1f81);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #ff1f81, #ff4d9e);
  }
`;

interface Props {
  startups: any[];
  lang?: any;
}

const SectionStartups: React.FC<Props> = ({ startups, lang }) => {
  return (
    <section className={styles.section}>
      <style>{scrollbarStyles}</style>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{lang.startups_title}</h2>
        <div className={styles.cardGrid}>
          {startups.map((startup) => (
            <CardItem key={startup.id} item={startup} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionStartups;