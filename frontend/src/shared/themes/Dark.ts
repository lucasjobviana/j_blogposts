import {  createTheme } from '@mui/material';
import { deepPurple, blueGrey } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: deepPurple[400],
      dark: deepPurple[600],
      light: deepPurple[200],
      contrastText: '#fff',
    },
    secondary: {
      main: blueGrey[400],
      dark: blueGrey[600],
      light: blueGrey[200],
      contrastText: '#fff',
    },
    background: {
      paper: '#303134',
      default: '#000',
    },
  },
});