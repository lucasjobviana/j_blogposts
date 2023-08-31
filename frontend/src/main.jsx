import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index.tsx';
// import { AppThemeProvider } from './shared/contexts/ThemeContext';
import {MenuLateral}  from './shared/components/menu-lateral/MenuLateral';
import { AppThemeProvider ,DrawerProvider } from './shared/contexts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppThemeProvider>
    <DrawerProvider>
      <BrowserRouter>
        <MenuLateral >
          <AppRoutes /> 
        </MenuLateral>
      </BrowserRouter>
    </DrawerProvider>
  </AppThemeProvider>
  ,
);
