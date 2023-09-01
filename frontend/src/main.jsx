import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index.tsx';
import { MenuLateral }  from './shared/components/menu-lateral/MenuLateral';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
