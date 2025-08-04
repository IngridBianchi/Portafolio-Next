import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../Module-CSS/index.module.css";
import { useGradient } from "../../context/GradientContext";

interface Props {
  aboutText: string;
  welcome: string;
}

const SectionAboutMe: React.FC<Props> = ({ aboutText, welcome }) => {
  const { setActiveImage, isHovered, setIsHovered } = useGradient();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    console.log("Setting activeImage to:", isHovered ? "dev" : "uxui");
    setActiveImage(isHovered ? "dev" : "uxui");
  }, [isHovered, setActiveImage]);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.section}>
      <div
        className={`${styles.cardContainer} bg-transparent rounded-lg max-w-7xl mx-auto p-8`}
        style={{ position: 'relative', zIndex: 0 }} // Asegurar que esté debajo del menú
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div
              className={`${styles.imageWrapper} ${
                isHovered ? styles.hovered : ""
              }`}
              style={{
                minHeight: "550px",
                width: "100%",
                position: "relative",
                zIndex: 0, // Asegurar que la imagen no interfiera
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                key={isHovered ? "dev" : "uxui"}
                src={`/assets/${isHovered ? "in.dev.png" : "in.uxui.png"}`}
                alt="Profile Image"
                width={550}
                height={450}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{
                  objectFit: "cover",
                  opacity: isHovered ? 0.6 : 1,
                  transition: "opacity 0.3s ease",
                }}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <h4 className="text-xl md:text-xl mb-4 text-[var(--color-text-dark)]" style={{ textShadow: '1px 1px 3px black' }}>
              {!isLargeScreen && `${welcome}. `}
              {Array.isArray(aboutText) ? (
                aboutText.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? "text-xl md:text-xl font-bold mb-4 drop-shadow-md text-[var(--color-text-dark)]"
                        : "text-lg md:text-xl mb-4 last:mb-0 text-[var(--color-text-dark)]"
                    }
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-lg md:text-xl drop-shadow-2xl mb-4 text-[var(--color-text-dark)]" style={{ textShadow: '12px 12px 16px black' }}>
                  {aboutText}
                </p>
              )}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAboutMe;