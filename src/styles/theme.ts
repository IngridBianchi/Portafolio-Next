import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
    default: '#000',
    },
    text: {
      primary: '#ffffff',
    },
  },
  // Añade aquí otras configuraciones de MUI
});

export default theme;
