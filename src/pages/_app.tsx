import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { GradientProvider } from '../context/GradientContext';
import GradientUpdater from '../components/GradientUpdater/GradientUpdater';
import '../styles/global.css';
import 'tippy.js/dist/tippy.css'; // Import tippy's CSS here

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <GradientProvider>
      <ThemeProvider theme={theme}>
        <GradientUpdater />
        <div style={{ minHeight: '100vh', height: '100vh', position: 'relative' }}> {/* Añadido height y position */}
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </GradientProvider>
  );
}

export default appWithTranslation(MyApp);
