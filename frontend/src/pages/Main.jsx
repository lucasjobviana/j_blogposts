import { Button } from '@mui/material';
import { useThemeContext, useDrawerContext } from '../shared/contexts';

export const Main = () => {
  const { toggleTheme } = useThemeContext();
  const { toggleDrawer } = useDrawerContext();
  return (
    <>
      <Button variant='contained' color='primary' onClick={toggleTheme} >Theme</Button>
      <Button variant='contained' color='primary' onClick={toggleDrawer} >Menu</Button>
    </>
  );
};
