import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Switcher from '../Switcher/Switcher';
import { useTheme } from '@mui/material/styles';
import styles from '../Module-CSS/index.module.css';
import Tooltip from './tippy';

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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audioElement = new Audio('/assets/neon-nights.mp3');
      audioElement.loop = true;
      setAudio(audioElement);
      audioRef.current = audioElement;
    }
  }, []);

  useEffect(() => {
    const handlePlay = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Failed to play audio:', error);
        });
      }
    };

    handlePlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (isLargeScreen) {
      setIsMenuOpen(false);
    }
  }, [isLargeScreen]);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsMuted(true);
      } else {
        audio.play().catch((error) => {
          console.error('Failed to play audio:', error);
        });
        setIsMuted(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderMuteIcon = () => {
    return isMuted ? (
      <Image src="/assets/mute.png" alt="Mute Icon" width={20} height={20} />
    ) : (
      <Image src="/assets/unmute.png" alt="Unmute Icon" width={20} height={20} />
    );
  };

  const en = 'Resume';
  const es = 'Curriculum Vitae';

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header
      style={{
        color: themes.palette.text.secondary,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
      className={`bg-opacity-50 bg-black ${styles.cardContainerBorderButtom} px-4 py-3 sm:px-6 sm:py-4`}
    >
      {/* Menú Sandwich para móvil */}
      {!isLargeScreen && (
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-4 z-50"
            aria-label="Abrir menú"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-40 bg-black bg-opacity-90 flex flex-col items-start p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end mb-8 text-2xl"
                aria-label="Cerrar menú"
              >
                &times;
              </button>

              <div className="w-full space-y-6">
                {/* Contactos */}
                <div className="grid grid-cols-2 gap-4">
                  <a href={`https://wa.me/${texts.contact_me.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Image src="/assets/whatsapp_logo.png" alt="WhatsApp" width={40} height={40} />
                    <span className="ml-2">WhatsApp</span>
                  </a>
                  
                  <a href={`mailto:${texts.contact_me.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Image src="/assets/email_logo.jpg" alt="Email" width={40} height={40} />
                    <span className="ml-2">Email</span>
                  </a>

                  <a href={texts.contact_me.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Image src="/assets/github_logo.png" alt="GitHub" width={40} height={40} />
                    <span className="ml-2">GitHub</span>
                  </a>

                  <a href={texts.contact_me.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Image src="/assets/linkedin_logo.webp" alt="LinkedIn" width={40} height={40} />
                    <span className="ml-2">LinkedIn</span>
                  </a>
                </div>

                {/* CVs */}
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => window.open(texts.contact_me.resume_en)}
                    className="flex items-center"
                  >
                    <Image src="/assets/CV-EN.png" alt="CV English" width={40} height={40} />
                    <span className="ml-2">CV en Inglés</span>
                  </button>

                  <button
                    onClick={() => window.open(texts.contact_me.resume_es)}
                    className="flex items-center"
                  >
                    <Image src="/assets/CV-ES.png" alt="CV Español" width={40} height={40} />
                    <span className="ml-2">CV en Español</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Texto de bienvenida */}
      {isLargeScreen && (
        <div className="flex flex-col items-start ml-4">
          <h1 className={`text-left text-xl md:text-3xl ${styles.animateColorChange}`}>
            {texts.welcome_text}
          </h1>
          <span className={`text-xs ${styles.animateColorChange}`}>Powered with Next TS</span>
        </div>
      )}

      {/* Botones de contacto (Desktop) */}
      {isLargeScreen && (
        <div className="flex items-center mx-auto space-x-4">
          <span className={`mr-5 text-xl md:text-2xl ${styles.animateColorChange}`}>
            {texts.contact_me.text}
          </span>
          <a href={`https://wa.me/${texts.contact_me.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mx-2">
            <Image src="/assets/whatsapp_logo.png" alt="WhatsApp" width={40} height={40} />
          </a>
          <a href={`mailto:${texts.contact_me.email}`} target="_blank" rel="noopener noreferrer" className="mx-2">
            <Image src="/assets/email_logo.jpg" alt="Email" width={40} height={40} />
          </a>
          <a href={texts.contact_me.github} target="_blank" rel="noopener noreferrer" className="mx-2">
            <Image src="/assets/github_logo.png" alt="GitHub" width={40} height={40} />
          </a>
          <a href={texts.contact_me.linkedin} target="_blank" rel="noopener noreferrer" className="mx-2">
            <Image src="/assets/linkedin_logo.webp" alt="LinkedIn" width={40} height={40} />
          </a>

          <Tooltip content={en}>
            <button
              onClick={() => window.open(texts.contact_me.resume_en)}
              className="ml-4"
            >
              <Image src="/assets/CV-EN.png" alt="CV EN" width={40} height={40} />
            </button>
          </Tooltip>

          <Tooltip content={es}>
            <button
              onClick={() => window.open(texts.contact_me.resume_es)}
              className="ml-4"
            >
              <Image src="/assets/CV-ES.png" alt="CV ES" width={40} height={40} />
            </button>
          </Tooltip>
        </div>
      )}

      {/* Sección derecha (audio + idioma) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {audio && (
            <button onClick={togglePlay} className="relative">
              {renderMuteIcon()}
            </button>
          )}
        </div>
        <div className={`flex items-center ${styles.animateColorChange}`}>
          <Switcher
            leftLabel="EN"
            rightLabel="ES"
            value={language === 'en'}
            onChange={toggleLanguage}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;