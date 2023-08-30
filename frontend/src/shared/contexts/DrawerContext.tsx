import React, { createContext, useCallback, useState, useContext } from 'react';

interface IDrawerContext {
    isDrawerOpen: true | false;
    toggleDrawer: () => void;
}

interface IDrawerProviderProps {
    children: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContext);

const DrawerProvider: React.FC<IDrawerProviderProps> = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<true | false>(false);
  
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]); 

  return (
    <DrawerContext.Provider value={{isDrawerOpen,toggleDrawer}}>
      {children}
    </DrawerContext.Provider>
  ); 
};

const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export  { 
  DrawerProvider, 
  useDrawerContext,
  DrawerContext
};