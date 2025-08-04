// src/components/GradientUpdater/GradientUpdater.tsx
import React, { useEffect, useRef } from "react";
import { useGradient } from "../../context/GradientContext";

const GradientUpdater: React.FC = () => {
  const { activeImage, isHovered } = useGradient();
  const [progress, setProgress] = React.useState(isHovered ? 1 : 0);
  const animationRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(isHovered ? 1 : 0);

  useEffect(() => {
    const updateGradients = () => {
      const root = document.documentElement;
      const interpolateColor = (start: string, end: string, p: number) => {
        const r = Math.round(parseInt(start.slice(1, 3), 16) * (1 - p) + parseInt(end.slice(1, 3), 16) * p);
        const g = Math.round(parseInt(start.slice(3, 5), 16) * (1 - p) + parseInt(end.slice(3, 5), 16) * p);
        const b = Math.round(parseInt(start.slice(5, 7), 16) * (1 - p) + parseInt(end.slice(5, 7), 16) * p);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      };

      if (activeImage === "uxui") {
        root.style.setProperty("--gradient-initial-1", "#FDD400");
        root.style.setProperty("--gradient-initial-2", "#692646");
        root.style.setProperty("--gradient-initial-3", "#000111");
        root.style.setProperty("--gradient-color-1", interpolateColor("#FDD400", "#033A7A", progress));
        root.style.setProperty("--gradient-color-2", interpolateColor("#692646", "#00193D", progress));
        root.style.setProperty("--gradient-color-3", interpolateColor("#000111", "#1199ED", progress));
      } else if (activeImage === "dev") {
        root.style.setProperty("--gradient-initial-1", "#033A7A");
        root.style.setProperty("--gradient-initial-2", "#00193D");
        root.style.setProperty("--gradient-initial-3", "#1199ED");
        root.style.setProperty("--gradient-color-1", interpolateColor("#033A7A", "#FDD400", progress));
        root.style.setProperty("--gradient-color-2", interpolateColor("#00193D", "#692646", progress));
        root.style.setProperty("--gradient-color-3", interpolateColor("#1199ED", "#000111", progress));
      }
      console.log('Updating gradients for activeImage:', activeImage, 'isHovered:', isHovered, 'progress:', progress.toFixed(2));
    };

    const animate = (startTime: number) => {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const duration = 500; // 0.5 segundos
      const newProgress = Math.min(elapsed / duration, 1);
      const targetProgress = isHovered ? 1 : 0;
      const interpolatedProgress = isHovered ? newProgress : 1 - newProgress;

      if (newProgress < 1 && lastProgressRef.current !== interpolatedProgress) {
        setProgress(interpolatedProgress);
        lastProgressRef.current = interpolatedProgress;
        animationRef.current = requestAnimationFrame(() => animate(startTime));
      } else {
        setProgress(targetProgress);
        lastProgressRef.current = targetProgress;
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    };

    // Convertimos lastProgressRef.current a boolean para la comparación
    const lastProgressAsBoolean = lastProgressRef.current >= 0.5;
    if (isHovered !== lastProgressAsBoolean) {
      const startTime = performance.now();
      animationRef.current = requestAnimationFrame(() => animate(startTime));
    }

    updateGradients();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeImage, isHovered]);

  return null;
};

export default GradientUpdater;