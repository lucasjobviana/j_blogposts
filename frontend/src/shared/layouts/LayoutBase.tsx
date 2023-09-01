import React from 'react';
import { IReactRCProps } from '../tools';
import { Box, Typography, useMediaQuery, useTheme } from  '@mui/material';
import { Button } from '@mui/material';
import { useThemeContext, useDrawerContext } from '../contexts';
import { Menu, LightMode, DarkMode } from '@mui/icons-material';

interface ILayoutBaseProps extends IReactRCProps {
    title: string;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ children, title }) => {
  const { toggleTheme, themeName } = useThemeContext();
  const { toggleDrawer } = useDrawerContext();
  const theme = useTheme();
  const isBiggerThanSM = !useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box padding={2} height='100%' display='flex' flexDirection='column' color={theme.palette.text.primary}  gap={2} >
      <Box display={'flex'} height={theme.spacing(12)}  justifyContent={'space-between'} alignItems={'center'} gap={2} >

        <Button disabled={isBiggerThanSM}  variant='contained' color='inherit'  onClick={toggleDrawer} ><Menu /></Button>

        <Typography variant='h5' component='h1' flex={1} textAlign={'center'} >
          {title}
        </Typography>

        <Button variant='contained' color='primary' onClick={toggleTheme} >{themeName==='light'?<LightMode />:<DarkMode />}</Button>
      </Box>

      <Box>{'Menu de Ferramentas'}</Box>
      <Box>{children}</Box>
    </Box>
  );
};