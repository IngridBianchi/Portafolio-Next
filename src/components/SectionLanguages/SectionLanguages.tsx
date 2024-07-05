import React, { useEffect, useState } from 'react';
import CardItem from '../CardItem/CardItem';
import styles from '../Module-CSS/index.module.css';
import useScrollButtons from './useScrollButtons'; // Importar el hook personalizado

interface Props {
  repositories: any[]; // Array de objetos repositorio
  stackImages: any; // Objeto con las rutas a las imágenes de stack de lenguajes
  lang?: any;
}

const SectionLanguages: React.FC<Props> = ({ repositories, stackImages, lang }) => {
  const {
    scrollContainerRef,
    isScrollableLeft,
    isScrollableRight,
    scrollLeft,
    scrollRight,
    checkScrollButtons
  } = useScrollButtons();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Ajusta el valor según el punto de ruptura deseado
    };

    handleResize(); // Comprueba el tamaño inicial
    window.addEventListener('resize', handleResize); // Escucha cambios de tamaño

    return () => {
      window.removeEventListener('resize', handleResize); // Limpia el oyente al desmontar
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
    <section style={{ padding: '32px 16px', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <h2 className={styles.animateColorChange} style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '16px' }}>
          {lang.my_lang_stack}
        </h2>

        <div style={{ position: 'relative' }}>
          {isScrollableLeft && (
            <button
              onClick={scrollLeft}
              style={{
                position: 'absolute',
                left: isMobile ? '0px' : '-40px', // Ajusta la posición para que el botón esté fuera del contenedor
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              &lt;
            </button>
          )}

          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              justifyContent: 'flex-start', // Alinea al inicio
              alignItems: 'center',
              overflowX: 'auto', // Cambiado de 'hidden' a 'auto' para permitir desplazamiento
              scrollBehavior: 'smooth',
              width: isMobile ? 'calc(100% - 50px)' : '100%' // Ajusta el ancho para dispositivos móviles
            }}
          >
            {repositories.map((repo) => (
              <div key={repo.id} style={{ margin: isMobile ? '4px 8px' : '4px 26px' , display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? 'calc(50% - 16px)' : 'auto'}}>
                <CardItem item={repo} stackImages={stackImages} lang={lang} />
              </div>
            ))}
          </div>

          {isScrollableRight && (
            <button
              onClick={scrollRight}
              style={{
                position: 'absolute',
                right: isMobile ? '0px' : '-40px', // Ajusta la posición para que el botón esté fuera del contenedor
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionLanguages;

