import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Switcher from '../Switcher/Switcher';
import { useTheme } from '@mui/material/styles';
import styles from '../Module-CSS/index.module.css';
import Tooltip from './tippy'; // Asumiendo que el componente se llama Tooltip

interface Props {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleLanguage: () => void;
  language: string;
  texts: any;
}

const Header: React.FC<Props> = ({
  theme,
  toggleTheme,
  toggleLanguage,
  language,
  texts,
}) => {
  const themes = useTheme();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const en = 'Resume';
  const es = 'Curriculum Vitae';

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
    <header
      style={{
        color: themes.palette.text.primary,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
      className={`bg-opacity-80 bg-black ${styles.cardContainerBorderButtom}`}
    >
      <div className='mb-6'></div>
      {/* Texto de bienvenida y Powered by Next TS */}
      { isLargeScreen && (
        <div className="flex flex-col items-start ml-4">
          <h3 className={`text-left ${styles.animateColorChange}`}>{texts.welcome_text}</h3>
          <span className={`text-xs ${styles.animateColorChange}`}>Powered with Next TS</span>
        </div>
      )}

      {/* Botones de contacto */}
      <div className="flex items-center mx-auto">
        { isLargeScreen && (
          <span className={`mr-4 ${styles.animateColorChange}`}>{texts.contact_me.text}</span>
        )}
        <a href={`https://wa.me/${texts.contact_me.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mx-2 flex items-center"> {/* Añadido flex y items-center */}
          <Image src="/assets/whatsapp_logo.png" alt="WhatsApp Logo" width={30} height={30} />
        </a>
        <a href={`mailto:${texts.contact_me.email}`} target="_blank" rel="noopener noreferrer" className="mx-2 flex items-center"> {/* Añadido flex y items-center */}
          <Image src="/assets/email_logo.jpg" alt="Email Logo" width={30} height={30} />
        </a>
        <a href={texts.contact_me.github} target="_blank" rel="noopener noreferrer" className="mx-2 flex items-center"> {/* Añadido flex y items-center */}
          <Image src="/assets/github_logo.png" alt="GitHub Logo" width={30} height={30} />
        </a>
        <a href={texts.contact_me.linkedin} target="_blank" rel="noopener noreferrer" className="mx-2 flex items-center"> {/* Añadido flex y items-center */}
          <Image src="/assets/linkedin_logo.webp" alt="LinkedIn Logo" width={30} height={30} />
        </a>

        {/* Botones de currículo con tooltips */}
        <Tooltip content={en}>
          <a href='' target="" rel="noopener noreferrer" className="flex items-center"> {/* Añadido flex y items-center */}
            <button
              className={`ml-4 relative`}
              onClick={() => window.open(texts.contact_me.resume_en)}
            >
              <Image src="/assets/resume-icon-en.png" alt="Resume Icon EN" width={30} height={30} />
            </button>
          </a>
        </Tooltip>

        <Tooltip content={es}>
          <a href='' target="" rel="noopener noreferrer" className="flex items-center"> {/* Añadido flex y items-center */}
            <button
              className={`ml-4 relative`}
              onClick={() => window.open(texts.contact_me.resume_es)}
            >
              <Image src="/assets/resume-icon.png" alt="Resume Icon ES" width={30} height={30} />
            </button>
          </a>
        </Tooltip>

      </div>

      {/* Switcher de idioma */}
      <div className={`flex items-center mr-4 ${styles.animateColorChange}`}>
        <Switcher
          leftLabel="EN"
          rightLabel="ES"
          value={language === 'en'}
          onChange={toggleLanguage}
        />
      </div>
    </header>
  );
};

export default Header;
