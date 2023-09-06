import React, { createContext, useCallback, useState, useContext } from 'react';
import { IReactRCProps } from '../tools';
import { IUser, User } from '../Entities';
import  { mapToDefaultStorage }  from '../tools';

interface ILoginUserContext  {
    user: IUser;
    create: (displayName: string, email: string, password: string, image:string ) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
}

interface ILoginUserProviderProps extends IReactRCProps {
}

const LoginUserContext = createContext({} as ILoginUserContext);

export const LoginUserProvider: React.FC<ILoginUserProviderProps> = ({ children }) => {
  const defaultStorage = mapToDefaultStorage();
  const [user, setUser] = useState<IUser>(new User('USER', 'USER@GMAIL.COM', 'USERUSER'));

  const create = useCallback( async (displayName='USER', email='USER@GMAIL.COM', password='USERUSER', image='https://i.pinimg.com/564x/51/65/bb/5165bbc3564b4296c70371b75c9774b0.jpg') => {
    const newUser = new User(displayName, email, password);
    newUser.image = image;
    const hash = await defaultStorage('createUser', newUser);
    if(hash) {
      newUser.hash = hash;
      setUser(newUser);
      console.log('Novo usuário criado: ', newUser);
      return true;
    }
    console.log('Não foi possivel criar um novo usuário:', newUser);
    return false;
  }, [user]);

  const login = useCallback( async (email, password) => {
    const newUser = new User(null, email, password);

    const hash = await defaultStorage('login', newUser);
    if(hash) {
      user.hash = hash;
      setUser(user);
      localStorage.setItem('token', JSON.stringify(hash.token));
      console.log('Usuário logado: ', user);
      return true;
    }
    console.log('Não foi possivel logar o usuário:', newUser);
    return false;
  }, [user]);

  return (
    <LoginUserContext.Provider value={{ user, create, login }}>
      {children}
    </LoginUserContext.Provider>
  );

};

export const useLoginUserContext = () => {
  return useContext(LoginUserContext);
};
