import React, { createContext, useCallback, useMemo, useState, useContext } from 'react';
import { DarkTheme, LightTheme } from '../themes';
import { Box, ThemeProvider } from '@mui/material';

interface IThemeContext {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

interface IAppThemeProviderProps {
    children: React.ReactNode;
}


const ThemeContext = createContext({} as IThemeContext);




const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({children}) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  
  const theme = useMemo(() => {
    return themeName === 'light' ? LightTheme : DarkTheme;
  }, [themeName]);
  
  const toggleTheme = useCallback(() => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  }, [themeName]); 

  return (
    <ThemeContext.Provider value={{themeName,toggleTheme}}>
      <ThemeProvider theme={theme}>
        <Box  bgcolor={theme.palette.background.default}  sx={{height: '100vh', width:'100vw' }  }>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  ); 
};

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export  { 
  AppThemeProvider, 
  useThemeContext,
  ThemeContext
};