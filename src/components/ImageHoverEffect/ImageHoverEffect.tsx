import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageHoverEffect: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const initialGradient = 'linear-gradient(135deg, #4a90e2, #9013fe)'; // Colores a tono con in.uxui.png (azul y morado suaves)
  const hoverGradient = 'linear-gradient(135deg, #ff6b6b, #4ecdc4)'; // Colores a tono con in.dev.png (rojo y turquesa suaves)

  useEffect(() => {
    // Asegurar que los colores sean a tono con las imágenes (ajustar según percepción visual)
  }, []);

  return (
    <div
      className="relative w-full h-[300px] rounded-lg overflow-hidden transition-all duration-300"
      style={{
        background: isHovered ? hoverGradient : initialGradient,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`/assets/${isHovered ? 'in.dev.png' : 'in.uxui.png'}`}
        alt="Profile Image"
        layout="fill"
        objectFit="cover"
        className="transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 1 }} // Ajustar opacidad si es necesario
      />
    </div>
  );
};

export default ImageHoverEffect;