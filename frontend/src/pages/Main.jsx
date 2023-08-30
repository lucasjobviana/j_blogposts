import { Button } from '@mui/material';
import { useThemeContext } from '../shared/contexts/ThemeContext';

export const Main = () => {
  const { toggleTheme } = useThemeContext();
  return (
    <Button variant='contained' color='primary' onClick={toggleTheme} >Theme</Button>
  );
};
