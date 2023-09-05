import React from 'react';
import { IReactRCProps } from '../tools';
import { Box, Typography, useMediaQuery, useTheme } from  '@mui/material';
import { Button } from '@mui/material';
import { useThemeContext, useDrawerContext } from '../contexts';
import { Menu, LightMode, DarkMode } from '@mui/icons-material';
// import { IToolBarProps } from '../components/tool-bar/toolBar';

interface ILayoutBaseProps extends IReactRCProps {
    title: string;
    toolBar?: React.ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ children, title, toolBar }) => {
  const { toggleTheme, themeName } = useThemeContext();
  const { toggleDrawer } = useDrawerContext();
  const theme = useTheme();
  const isBiggerThanSM = !useMediaQuery(theme.breakpoints.down('sm'));
  const isBiggerThanMD = !useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box padding={2} display='flex' flexDirection='column'  color={theme.palette.text.primary} gap={2} >
      <Box display={'flex'} height={
        isBiggerThanSM ? isBiggerThanMD ? theme.spacing(6) : theme.spacing(4) : theme.spacing(2)
      }  justifyContent={'space-between'} alignItems={'center'} gap={2} >

        <Button disabled={isBiggerThanSM}  variant='contained' color='inherit'  onClick={toggleDrawer} ><Menu /></Button>

        <Typography
          component='h1'
          flex={1}
          textAlign={'center'}
          whiteSpace={'nowrap'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          variant={isBiggerThanSM ? 'h4' : 'h5'}
        >
          {title}
        </Typography>

        <Button  variant='contained' color='inherit' onClick={toggleTheme} >{themeName==='light'?<LightMode />:<DarkMode />}</Button>
      </Box>

      {
        toolBar && <Box>{toolBar}</Box>
      }
      <Box flex={1}  >{children}</Box>
    </Box>
  );
};