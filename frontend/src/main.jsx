import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppRoutes } from './routes/index.tsx';
import { ThemeProvider } from '@emotion/react';
import { LightTheme } from './shared/themes';



ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={LightTheme}>
    <BrowserRouter>
      <AppRoutes /> 
    </BrowserRouter>
  </ThemeProvider>,
);
