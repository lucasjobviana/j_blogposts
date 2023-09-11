import { api } from '../';
import { User } from '../../../Entities';

export const createUser = async (user: User) => {
  try{
    const newUser = await api.post('/user', user).then((response) => {
      console.log(response.data);
      return response.data;
    });
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user: User) => {
  const { email, password } = user;
  try{
    const newUser = await api.post('/login', { email, password }).then((response) => {
      return response.data;
    });
    return newUser;
  }
  catch (error) {
    console.log(error);
  }
};
