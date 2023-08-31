import { Button } from '@mui/material';
import { useThemeContext } from '../shared/contexts';
 
export const Blog = () => {
  const { toggleTheme } = useThemeContext();
  
  return (
    <>
      <Button variant='contained' color='primary' onClick={toggleTheme} >Theme</Button>
    </>
  );
};
