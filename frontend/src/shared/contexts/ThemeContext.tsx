import React, { createContext, useCallback, useMemo, useState, useContext } from 'react';
import { DarkTheme, LightTheme } from '../themes';
import { Box, ThemeProvider } from '@mui/material';

interface IThemeContext {
    themeName: 'dark' | 'light';
    toggleTheme: () => void;
}

interface IAppThemeProviderProps {
    children: React.ReactNode;
}

const ThemeContext = createContext({} as IThemeContext);

const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'dark' | 'light'>('light');

  const theme = useMemo(() => {
    return themeName === 'dark' ? LightTheme : DarkTheme;
  }, [themeName]);

  const toggleTheme = useCallback(() => {
    setThemeName(themeName === 'dark' ? 'light' : 'dark');
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box overflow={'auto'}  bgcolor={theme.palette.background.default}  sx={{ height: '100vh', width:'100vw', paddingBottom:'0px' }  }>
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