import {  createTheme } from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[400],
      dark: blue[600],
      light: blue[200],
      contrastText: '#fff',
    },
    secondary: {
      main: blueGrey[400],
      dark: blueGrey[600],
      light: blueGrey[200],
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#7f6f3',
    },
  },
});