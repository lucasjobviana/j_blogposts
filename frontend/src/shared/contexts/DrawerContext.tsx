import React, { createContext, useCallback, useState, useContext } from 'react';
import { Home, Category, Person, Article, Info, Build } from '@mui/icons-material';

const defaultDrawerOptions = [{
  label: 'Home',
  icon: <Home />,
  path: '/'
},{
  label: 'Categorias',
  icon: <Category />,
  path: '/Categorias'
},{
  label: 'Postagens',
  icon: <Article />,
  path: '/Postagens'
},{
  label: 'Perfil',
  icon: <Person />,
  path: '/Perfil'
},{
  label: 'Configurações',
  icon: <Build />,
  path: '/Configuracoes'

},{
  label: 'Sobre o blog',
  icon: <Info />,
  path: '/Sobre'
}


];

interface IDrawerContext {
    isDrawerOpen: true | false;
    toggleDrawer: () => void;
    drawerOptions: IDrawerOptions[];
    setDrawerOptions: (newDrawerOption: IDrawerOptions[]) => void;
}

interface IDrawerProviderProps {
    children: React.ReactNode;
}

interface IDrawerOptions {
    label: string;
    icon: React.ReactElement;
    path: string;
}

const DrawerContext = createContext({} as IDrawerContext);

const DrawerProvider: React.FC<IDrawerProviderProps> = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<true | false>(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>(defaultDrawerOptions);
  
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]); 

  const handleSetDrawerOptions = useCallback((newDrawerOption: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOption);
  }, [isDrawerOpen]); 

  return (
    <DrawerContext.Provider value={{isDrawerOpen,toggleDrawer,drawerOptions,setDrawerOptions:handleSetDrawerOptions}}>
      {children}
    </DrawerContext.Provider>
  ); 
};

const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export  { 
  DrawerProvider, 
  useDrawerContext
};