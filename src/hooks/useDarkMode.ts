import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../styles/theme_hook';

const useDarkMode = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [themeStyles, setThemeStyles] = useState(darkTheme);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme as 'light' | 'dark');
      setThemeStyles(localTheme === 'light' ? lightTheme : darkTheme);
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDarkMode ? 'dark' : 'light';
      setTheme(initialTheme);
      setThemeStyles(initialTheme === 'light' ? lightTheme : darkTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setThemeStyles(newTheme === 'light' ? lightTheme : darkTheme);
    window.localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, themeStyles, toggleTheme };
};

export default useDarkMode;
