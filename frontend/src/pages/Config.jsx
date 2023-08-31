import { Button } from '@mui/material';
import { useThemeContext } from '../shared/contexts';
 
export const Config = () => {
  const { toggleTheme } = useThemeContext();
  
  return (
    <>
      <Button variant='contained' color='primary' onClick={toggleTheme} >Theme</Button>
    </>
  );
};
