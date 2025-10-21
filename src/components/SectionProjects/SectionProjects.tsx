import React from 'react';
import CardItem from '../CardItem/CardItem';
import styles from '../Module-CSS/index.module.css';

const scrollbarStyles = `
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
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
  projects: any[];
  lang?: any;
}

const SectionProjects: React.FC<Props> = ({ projects, lang }) => {
  const filteredProjects = projects.filter(project =>
    project &&
    Object.values(project).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
      return value !== null && value !== '';
    })
  );

  return (
    <section className={styles.section}>
      <style>{scrollbarStyles}</style>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>{lang.projects_title}</h2>
        <div className={styles.cardGrid}>
          {filteredProjects.map(project => (
            <CardItem
              key={project.id}
              item={project}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionProjects;