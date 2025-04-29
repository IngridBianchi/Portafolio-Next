import React from 'react';
import CardItem from '../CardItem/CardItem';
import styles from '../Module-CSS/index.module.css';

// Estilos para personalizar la barra de desplazamiento
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
  startups: any[]; // Array de objetos startup
  lang?: any;
}

const SectionStartups: React.FC<Props> = ({ startups, lang }) => {
  return (
    <section style={{ padding: '22px 10px', color: 'white' }}>
      <style>{scrollbarStyles}</style>
      <div style={{ margin: '0 auto', maxWidth: '1600px', overflowX: 'auto' }}>
        <h2 className={styles.animateColorChange} style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '16px' }}>
          {lang.my_startups}
        </h2>
        <div style={{ display: 'flex' }}>
          {startups.map((startup) => (
            <div key={startup.id} style={{ margin: '4px 10px' }}>
              <CardItem key={startup.id} item={startup} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionStartups;
