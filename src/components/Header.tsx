import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Switcher from './Switcher';
import useDarkMode from '../hooks/useDarkMode';

interface Props {
  theme: 'light' | 'dark'; // Agrega esta línea
  toggleTheme: () => void;
  toggleLanguage: () => void;
  language: string;
  texts: any; // Aquí se pasarán los textos del idioma seleccionado
}

const Header: React.FC<Props> = ({
  theme, // Agrega esta línea
  toggleTheme,
  toggleLanguage,
  language,
  texts,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-black text-white px-4 py-2">
      <div className="flex items-center">
        <h3 className="text-left ml-10">{texts.welcome_text}</h3>
        <Image src="/assets/next-ts.webp" alt="Next.js Logo" width={30} height={30} />
      </div>
      <div className="flex items-center">
        <div className="ml-10">{texts.contact_me.text}</div>
        <a href={`https://wa.me/${texts.contact_me.whatsapp}`} target="_blank" rel="noopener noreferrer">
          <Image src="/assets/whatsapp_logo.png" alt="WhatsApp Logo" width={30} height={30} />
        </a>
        <a href={`mailto:${texts.contact_me.email}`} target="_blank" rel="noopener noreferrer">
          <Image src="/assets/email_logo.jpg" alt="Email Logo" width={30} height={30} />
        </a>
        <a href={texts.contact_me.github} target="_blank" rel="noopener noreferrer">
          <Image src="/assets/github_logo.jpg" alt="GitHub Logo" width={30} height={30} />
        </a>
        <a href={texts.contact_me.linkedin} target="_blank" rel="noopener noreferrer">
          <Image src="/assets/linkedin_logo.webp" alt="LinkedIn Logo" width={30} height={30} />
        </a>
        <button className="ml-10" onClick={() => window.open(texts.contact_me.resume_en)}>
          {texts.contact_me.resume_language_text_en}
        </button>
        <button className="ml-10" onClick={() => window.open(texts.contact_me.resume_es)}>
          {texts.contact_me.resume_language_text_es}
        </button>
      </div>
      <div className="flex items-center">
        <Switcher
          leftLabel="🌙"
          rightLabel="🌞"
          value={theme === 'dark'}
          onChange={toggleTheme}
        />
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
