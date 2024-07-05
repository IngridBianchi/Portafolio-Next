
// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000',
    },
    text: {
      primary: '#fff',
    },
  },
  // Añade aquí otras configuraciones de MUI
});

export default theme;
