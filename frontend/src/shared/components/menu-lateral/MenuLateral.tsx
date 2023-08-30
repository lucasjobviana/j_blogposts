import React from 'react';
import { Avatar, Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useDrawerContext } from '../../contexts/DrawerContext';

interface IMenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
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
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
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