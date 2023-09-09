import { User } from '../../../Entities';

export const createUserLS = async (user: User) => {
  const users = localStorage.getItem('users_bp') || '[]';
  const usersArray = JSON.parse(users);
  const biggestId = usersArray.reduce((acc, curr) => {
    if (acc < Number(curr.id) ) {
      return Number(curr.id);
    }
    return acc;
  }, 0);
  user.id = (biggestId + 1);
  localStorage.setItem('users_bp', JSON.stringify([...usersArray, user]));
  return { token: 'mocked_token' };
};

export const loginLS = async (user: User) => {
  const users = localStorage.getItem('users_bp') || '[]';
  const usersArray = JSON.parse(users);
  const userFound = usersArray.find((u: User) => u.email === user.email && u.password === user.password);
  if(!userFound) return undefined;
  localStorage.setItem('loggedUserId_bp', JSON.stringify(userFound.id));
  const userWithHash = { ...userFound, hash:{ token:'mocked_token' } };
  return userWithHash;
};
