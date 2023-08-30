import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/index.tsx';
import { AppThemeProvider } from './shared/contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppThemeProvider>
    <BrowserRouter>
      <AppRoutes /> 
    </BrowserRouter>
  </AppThemeProvider>
  ,
);
