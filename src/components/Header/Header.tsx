import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Switcher from "../Switcher/Switcher";
import { useTheme } from "@mui/material/styles";
import styles from "../Module-CSS/index.module.css";
import Tooltip from "./tippy";

interface Props {
  theme: "light" | "dark";
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
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audioElement = new Audio("/assets/neon-nights.mp3");
      audioElement.loop = true;
      setAudio(audioElement);
      audioRef.current = audioElement;
    }
  }, []);

  useEffect(() => {
    const handlePlay = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Failed to play audio:", error);
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

  useEffect(() => {
    if (menuRef.current) {
      setTimeout(() => {
        console.log("Menu height after render:", menuRef.current.clientHeight);
      }, 0);
    }
  }, [isMenuOpen]);

  // Manejo del estado del cuerpo (desplazamiento e interacciones)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "auto";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100vh"; // Asegurar altura completa
    } else {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [isMenuOpen]);

  // Cierre del menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Detección de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width >= 768);
      console.log("Window width:", width, "isLargeScreen:", width >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsMuted(true);
      } else {
        audio.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
        setIsMuted(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderMuteIcon = () => {
    return (
      <svg
        width="15"
        height="15"
        fill="white"
        viewBox="0 0 24 24"
        className="transition-opacity duration-300"
      >
        {isMuted ? (
          <>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </>
        ) : (
          <path d="M3 9v6h4l5 5V4L7 9H3zm7 10h2V4h-2v15zm7-2.75V15h2v-2h-2v-2h2V9h-2V7.25c2.01.11 3.5 1.97 3.5 4.25s-1.49 4.14-3.5 4.25z" />
        )}
      </svg>
    );
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const en = "Resume";
  const es = "Curriculum Vitae";

  return (
    <header
      className={`${styles.cardContainer} bg-opacity-90 bg-[var(--color-bg-dark)] px-4 py-3 sm:px-6 sm:py-4 top-0 z-50 flex flex-col md:flex-row items-center justify-between w-full relative`}
    >
      {/* Íconos de contacto (arriba a la izquierda en escritorio) */}
      {isLargeScreen && (
        <div className="flex flex-col space-y-2 mb-4 md:mb-0 md:flex-row md:space-x-2 md:space-y-0 absolute top-4 left-4">
          <a
            href={`https://wa.me/${texts.contact_me.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contacticon} hover:opacity-80 transition-opacity`}
          >
            <Image
              src="/assets/whatsapp_logo.png"
              alt="WhatsApp"
              width={80}
              height={80}
            />
          </a>
          <a
            href={`mailto:${texts.contact_me.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contacticon} hover:opacity-80 transition-opacity`}
          >
            <Image
              src="/assets/email_logo.jpg"
              alt="Email"
              width={80}
              height={80}
            />
          </a>
          <a
            href={texts.contact_me.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contacticon} hover:opacity-80 transition-opacity`}
          >
            <Image
              src="/assets/github_logo.png"
              alt="GitHub"
              width={80}
              height={80}
            />
          </a>
          <a
            href={texts.contact_me.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contacticon} hover:opacity-80 transition-opacity`}
          >
            <Image
              src="/assets/linkedin_logo.webp"
              alt="LinkedIn"
              width={80}
              height={80}
            />
          </a>
        </div>
      )}

      {/* Menú hamburguesa y desplegable para móvil */}
      {!isLargeScreen && (
        <div className="flex items-center w-full justify-between relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-50 text-white hover:text-[var(--color-accent)] transition-colors"
            aria-label="Abrir menú"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="fixed inset-0 top-1 z-50 bg-[var(--color-bg-dark)] bg-opacity-100 flex flex-col justify-between p-0.5 overflow-y-auto"
              style={{
                height: "100vh",
                minHeight: "100vh",
                maxHeight: "100vh",
                opacity: 10,
                display: "flex",
                //border: "1px solid red",
              }}
            >
              {/* {console.log('Menu height:', menuRef.current?.clientHeight)} */}
              <div className="flex h-full flex-col w-full top-13">
                <button
                  onClick={() => {
                    console.log("Closing menu");
                    setIsMenuOpen(false);
                  }}
                  className="absolute top-6 right-2 p-2 text-2xl text-white hover:text-[var(--color-accent)] transition-colors z-50"
                  aria-label="Cerrar menú"
                >
                  ×
                </button>
                <div
                  className="h-full overflow-y-auto flex-1 top-13"
                  style={{ maxHeight: "100%" }}
                >
                  <div
                    className="w-full space-y-0.5"
                    style={{ minHeight: "100%" }}
                  >
                    <div className="grid grid-cols-3 gap-0.5 p-0.5">
                      <a
                        href={`https://wa.me/${texts.contact_me.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-center"
                      >
                        <Image
                          src="/assets/whatsapp_logo.png"
                          alt="WhatsApp"
                          width={30}
                          height={30}
                        />
                        <span className="text-white text-xs">WhatsApp</span>
                      </a>
                      <a
                        href={`mailto:${texts.contact_me.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-center"
                      >
                        <Image
                          src="/assets/email_logo.jpg"
                          alt="Email"
                          width={30}
                          height={30}
                        />
                        <span className="text-white text-xs">Email</span>
                      </a>
                      <a
                        href={texts.contact_me.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-center"
                      >
                        <Image
                          src="/assets/github_logo.png"
                          alt="GitHub"
                          width={30}
                          height={30}
                        />
                        <span className="text-white text-xs">GitHub</span>
                      </a>
                      <a
                        href={texts.contact_me.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-center"
                      >
                        <Image
                          src="/assets/linkedin_logo.webp"
                          alt="LinkedIn"
                          width={30}
                          height={30}
                        />
                        <span className="text-white text-xs">LinkedIn</span>
                      </a>
                      <a
                        href={texts.contact_me.resume_en}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-center"
                      >
                        <Image
                          src="/assets/CV-EN.png"
                          alt="CV English"
                          width={30}
                          height={30}
                        />
                        <span className="text-white text-xs">CV en Inglés</span>
                      </a>
                      <a
                        href={texts.contact_me.resume_es}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-center"
                      >
                        <Image
                          src="/assets/CV-ES.png"
                          alt="CV Español"
                          width={30}
                          height={30}
                        />
                        <span className="text-white text-xs">
                          CV en Español
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Texto de bienvenida centrado */}
      {isLargeScreen && (
        <div className="flex flex-col items-center w-full mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            {texts.welcome_text}
          </h1>
          <span className="text-xs text-white">Powered with Next TS</span>
        </div>
      )}

      {/* Botones de CV (solo en escritorio) */}
      {isLargeScreen && (
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Tooltip content={en}>
            <button
              onClick={() => window.open(texts.contact_me.resume_en)}
              className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] p-3 rounded-full hover:from-[var(--color-accent-hover)] hover:to-[var(--color-secondary)] transition-all"
            >
              <Image
                src="/assets/CV-EN.png"
                alt="CV EN"
                width={90}
                height={90}
              />
            </button>
          </Tooltip>
          <Tooltip content={es}>
            <button
              onClick={() => window.open(texts.contact_me.resume_es)}
              className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] p-3 rounded-full hover:from-[var(--color-accent-hover)] hover:to-[var(--color-secondary)] transition-all"
            >
              <Image
                src="/assets/CV-ES.png"
                alt="CV ES"
                width={90}
                height={90}
              />
            </button>
          </Tooltip>
        </div>
      )}

      {/* Sección derecha (audio + idioma + tema) - Ocultar en móvil cuando el menú está abierto */}
      <div
        className={`flex items-center gap-4 ${
          !isLargeScreen && isMenuOpen ? "hidden" : ""
        }`}
      >
        {audio && (
          <button
            onClick={togglePlay}
            className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] p-2 rounded-full hover:from-[var(--color-accent-hover)] hover:to-[var(--color-secondary)] transition-all border-2 border-white"
            aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
          >
            {renderMuteIcon()}
          </button>
        )}
        <Switcher
          leftLabel="EN"
          rightLabel="ES"
          value={language === "en"}
          onChange={toggleLanguage}
        />
        <button
          onClick={toggleTheme}
          className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] p-2 rounded-full hover:from-[var(--color-accent-hover)] hover:to-[var(--color-secondary)] transition-all border-2 border-white"
          aria-label={
            theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
          }
        >
          <svg
            width="15"
            height="15"
            fill="white"
            viewBox="0 0 24 24"
            className="transition-opacity duration-300"
          >
            {theme === "dark" ? (
              <path d="M12 3v2m0 16v2m8-12h-2m-14 0H4m16.06-6.44l-1.41 1.41M6.35 17.64l-1.41 1.41M17.64 6.35l1.41 1.41M6.35 6.35l1.41 1.41M17.64 17.64l-1.41 1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
            ) : (
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
