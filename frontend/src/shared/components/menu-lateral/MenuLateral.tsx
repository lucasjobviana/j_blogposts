import React from 'react';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';
import { Avatar, Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Home, Category, Person, Article, Info, Build } from '@mui/icons-material';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { IReactRCProps } from '../../tools';

interface IListItemLinkProps {
  to: string;
  icon: React.ReactElement,
  label: string,
  onClick?: () => void | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({to, icon, label, onClick}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({path: resolvedPath.pathname, end: false});

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick} >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}; 

export const MenuLateral: React.FC<IReactRCProps> = ({children}) => {
  const {isDrawerOpen, toggleDrawer}  = useDrawerContext();
  const theme = useTheme();
  const hasSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const menuSize = 30;

  return (
    <>
      <Drawer open={isDrawerOpen} variant={hasSmDown ? 'temporary':'permanent'} onClose={toggleDrawer} >
        <Box height={'100vh'} width={theme.spacing(menuSize)} display='flex' flexDirection='column' >
          <Box height={theme.spacing(16)} display='flex' alignItems='center' justifyContent='center' >
            <Avatar sx={{ bgcolor: theme.palette.primary.light, width: theme.spacing(8), height:theme.spacing(8) }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9aSiqjy7SUZWzKFusTfV_7tDbFfqPt_pWLA&usqp=CAU' />
          </Box>
 
          <Divider />

          <Box flex={1} display='flex' flexDirection='column' width='100%' >
            <List component='nav' >
              <ListItemLink to='/Blog' icon={(<Home />)} label='Blog' onClick={toggleDrawer} />
              <ListItemLink to='/Postagens' icon={(<Article />)} label='Postagens' onClick={toggleDrawer} />
              <ListItemLink to='/Categorias' icon={(<Category />)} label='Categorias' onClick={toggleDrawer} />
              <ListItemLink to='/Perfil' icon={(<Person />)} label='Perfil' onClick={toggleDrawer} />
              <ListItemLink to='/Configuracoes' icon={(<Build />)} label='Configurações' onClick={toggleDrawer} />
              <ListItemLink to='/Sobre' icon={(<Info />)} label='Sobre o blog' onClick={toggleDrawer} />
            </List> 
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={hasSmDown? 0:theme.spacing(menuSize)} >
        {children}
      </Box>

    </>
  );

};