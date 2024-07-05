// src/pages/_app.tsx
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import '../styles/global.css'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
