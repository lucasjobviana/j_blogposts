import React from 'react';
import { Avatar, Box, Divider, Drawer, useTheme } from '@mui/material';

interface IMenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
  const theme = useTheme();
  const menuSize = 30;

  return (
    <>
      <Drawer open={true} variant='permanent' >
        <Box height={'100vh'} width={theme.spacing(menuSize)} display='flex' flexDirection='column' >
          <Box height={theme.spacing(16)} display='flex' alignItems='center' justifyContent='center' >
            <Avatar sx={{ bgcolor: theme.palette.primary.light, width: theme.spacing(8), height:theme.spacing(8) }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9aSiqjy7SUZWzKFusTfV_7tDbFfqPt_pWLA&usqp=CAU' />
          </Box>

          <Divider />

          <Box flex={1} display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
            fasd
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={theme.spacing(menuSize)} >
        {children}
      </Box>

    </>
  );

};