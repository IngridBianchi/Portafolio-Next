import React from 'react';
import CardItem from '../CardItem/CardItem';
import styles from '../Module-CSS/index.module.css';

const scrollbarStyles = `
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(229, 229, 229, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ff4d9e;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #ff1f81;
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
    <section style={{ padding: '32px 16px', color: 'white', position: 'relative' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
        <h2 className={styles.animateColorChange} style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px', paddingLeft: '16px' }}>
          {lang.my_projects}
        </h2>

        <style>{scrollbarStyles}</style>

        <div style={{
          position: 'relative',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          padding: '16px 0',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: '#ff4d9e rgba(229, 229, 229, 0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'minmax(300px, 1fr)',
            gap: '24px',
            padding: '0 16px',
            width: 'fit-content'
          }}>
            {filteredProjects.map(project => (
              <CardItem
                key={project.id}
                item={project}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProjects;
