import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index.tsx';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import {MenuLateral}  from './shared/components/menu-lateral/MenuLateral';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppThemeProvider>
    <MenuLateral >
      <BrowserRouter>
        <AppRoutes /> 
      </BrowserRouter>
    </MenuLateral>
  </AppThemeProvider>
  ,
);
