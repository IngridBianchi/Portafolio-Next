import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../Module-CSS/index.module.css';

interface Props {
  aboutText: string;
  welcome: string;
}

const SectionAboutMe: React.FC<Props> = ({ aboutText, welcome }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section style={{ width: '100%', marginTop: '4rem', borderRadius: '2rem' }}>
      <div className="flex justify-center items-center bg-black bg-opacity-80 rounded-lg">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className={`${styles.cardContainerBorder} relative w-full h-64 md:w-80 md:h-80 lg:w-96 lg:h-96`}>
                <Image
                  src="/assets/perfil_foto_bianchi.png"
                  alt="Profile Image"
                  layout="fill"
                  objectFit="cover"
                  className={`${styles.maskImage}`}
                />
              </div>
            </div>
            <div className="order-1 md:order-2 text-center md:text-left w-auto">
  <h4 className={`text-2xl md:text-3xl font-bold mb-4 ${styles.animateColorChange}`}>
    {!isLargeScreen && `${welcome}. `}
    {Array.isArray(aboutText) ? (
      aboutText.map((paragraph, index) => (
        <p 
          key={index}
          className={
            index === 0 // Aplicar estilo especial solo al primer párrafo
              ? "text-2xl md:text-3xl font-bold mb-4" // Tamaño grande para el primer párrafo
              : "text-lg md:text-xl mb-4 last:mb-0" // Estilo normal para los demás
          }
        >
          {paragraph}
        </p>
      ))
    ) : (
      <p>{aboutText}</p>
    )}
  </h4>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAboutMe;
