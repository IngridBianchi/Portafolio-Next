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
  
  <section  style={{ width: '80%', marginTop: '4rem',borderRadius: '2rem'  }}>
      <div className="flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
        <div className="max-w-4xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-center md:text-right">
              <div className="relative w-full h-80 md:w-80 md:h-80">
                <Image
                  src="/assets/perfil_foto_arrua.jpg"
                  alt="Profile Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="text-center md:text-left w-auto">
              <h4 className={`text-lg md:text-1xl font-bold ${styles.animateColorChange}`}>{!isLargeScreen && welcome+'. '}{aboutText}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAboutMe;
