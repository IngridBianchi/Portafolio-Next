import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../Module-CSS/index.module.css";
import { motion } from "framer-motion";
import { useGradient } from "../../context/GradientContext";

interface Texts {
  who_i_am: string[];
  about_me_title: string;
}

interface Props {
  texts: Texts;
}

const SectionAboutMe: React.FC<Props> = ({ texts }) => {
  const { isHovered, setIsHovered, setActiveImage } = useGradient();

  useEffect(() => {
    // Comunica al contexto qué imagen está activa para cambiar los colores globales
    setActiveImage(isHovered ? "dev" : "uxui");
  }, [isHovered, setActiveImage]);

  useEffect(() => {
    // Precarga la imagen para que el hover sea instantáneo
    const hoverImage = new window.Image();
    hoverImage.src = "/assets/in.dev.png";
  }, []);

  return (
    <motion.section
      id="about-me"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`${styles.section} ${styles.portfolioContainer} py-16 md:py-24`}
    >
      <div className={`${styles.sectionContainer} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <h2 className={styles.sectionTitle}>{texts.about_me_title}</h2>
        <div
          className={`${styles.cardContainer} bg-transparent rounded-lg max-w-7xl mx-auto p-8`}
          style={{ position: "relative", zIndex: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div
                className={`${styles.imageWrapper} ${isHovered ? styles.hovered : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ minHeight: "550px", width: "100%", position: "relative", zIndex: 0 }}
              >
                <Image
                  key={isHovered ? "dev" : "uxui"} // Forzar re-renderizado en cambio de imagen
                  alt="Profile Image"
                  src={`/assets/${isHovered ? "in.dev.png" : "in.uxui.png"}`}
                  fill
                  priority
                  className="rounded-lg"
                  style={{ objectFit: "cover", transition: "opacity 0.3s" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h4
                className="text-xl md:text-xl mb-4 text-[var(--color-text-dark)]"
                style={{ textShadow: "2px 2px 8px black" }} // Sombreado acentuado
              >
                {texts.who_i_am.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-lg md:text-xl mb-4 last:mb-0 ${
                      index === 0 ? "font-bold drop-shadow-md" : ""
                    } text-[var(--color-text-dark)]`}
                  >
                    {paragraph}
                  </p>
                ))}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SectionAboutMe;
