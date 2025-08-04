// src/context/GradientContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GradientContextType {
  activeImage: string;
  setActiveImage: (image: string) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

const GradientContext = createContext<GradientContextType | undefined>(undefined);

export const GradientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeImage, setActiveImage] = useState('uxui');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <GradientContext.Provider value={{ activeImage, setActiveImage, isHovered, setIsHovered }}>
      {children}
    </GradientContext.Provider>
  );
};

export const useGradient = () => {
  const context = useContext(GradientContext);
  if (context === undefined) {
    throw new Error('useGradient must be used within a GradientProvider');
  }
  return context;
};

export default GradientContext; // Exportamos el contexto explícitamente