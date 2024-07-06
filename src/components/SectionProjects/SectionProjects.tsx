import React from 'react';
import CardItem from '../CardItem/CardItem';
import styles from '../Module-CSS/index.module.css';

const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 10px; /* Ancho de la barra de desplazamiento */
  }

  ::-webkit-scrollbar-track {
    background: #e5e5e5; /* Color de fondo de la pista */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ff4d9e; /* Color del pulgar de la barra de desplazamiento (fucsia/rosa/violeta) */
    border-radius: 5px; /* Borde redondeado del pulgar */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #ff1f81; /* Color del pulgar al pasar el mouse (tono más oscuro) */
  }
`;

interface Props {
  projects: any[];
  lang?: any;
}

const SectionProjects: React.FC<Props> = ({ projects, lang }) => {
  return (
    <section style={{ padding: '2rem', color: 'white' }}>
      <style>{scrollbarStyles}</style>
      <div style={{ margin: '0 auto', maxWidth: '1200px', overflowX: 'auto' }}>
        <h2 className={styles.animateColorChange} style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {lang.my_projects}
        </h2>
        <div style={{ display: 'flex' }}>
          {projects.map((project) => (
            <div key={project.id} style={{ margin: '4px 16px' }}>
              <CardItem key={project.id} item={project} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionProjects;
