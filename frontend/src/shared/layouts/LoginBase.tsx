import React from 'react';
import { IReactRCProps } from '../tools';
import { Box, Typography, useMediaQuery, useTheme } from  '@mui/material';
import { Button } from '@mui/material';
import { useThemeContext, useDrawerContext } from '../contexts';
import { Menu, LightMode, DarkMode } from '@mui/icons-material';
// import { IToolBarProps } from '../components/tool-bar/toolBar';

interface ILoginBaseProps extends IReactRCProps {
    title: string;
}

export const LoginBase: React.FC<ILoginBaseProps> = ({ children, title, toolBar }) => {
  const { toggleTheme, themeName } = useThemeContext();
  const theme = useTheme();

  return (

    <Box color={theme.palette.text.primary}  width={'100vw'} height={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
      <Box flex={1} width={200} height={200} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <TextField  label='Usuário ou Email' variant='filled' size='small' name='email' value={email} onChange={handleChange} />
        <TextField   label='Senha' variant='filled' size='small' name='password' value={password} onChange={handleChange} />
        <Box height={10} width={'auto'}>
          <Button  size='small' variant='contained' color='primary' startIcon={<Login />} onClick={handleClick} />
          <Button size='small' variant='contained' color='primary' startIcon={<PersonAdd />} onClick={handleCreateUser} />
        </Box>
      </Box>
      {
        createUser && (<Box>create new User</Box>)
      }
    </Box>

  );
};