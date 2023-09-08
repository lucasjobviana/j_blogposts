import { User } from '../../../Entities';

// export const getAllCategories = async () => {
//   const categories = await api.get('/categories').then((response) => {
//     return response.data;
//   });
//   return categories;
// };

// export const getCategoriesByName = async ({ search }) => {
//   const categories = await api.get(`/categories/name?search=${search}`).then((response) => {
//     return response.data;
//   });
//   return categories;
// };

// export const getCategoryById = async (id: string) => {
//   const category = await api.get(`/categories/${id}`).then((response) => {
//     return response.data;
//   });
//   return category;
// };

export const createUserLS = async (user: User) => {
  const users = localStorage.getItem('users_bp') || '[]';
  const usersArray = JSON.parse(users);
  localStorage.setItem('users_bp', JSON.stringify([...usersArray, user]));
  return { token: 'mocked_token' };
};

export const loginLS = async (user: User) => {
  const users = localStorage.getItem('users_bp') || '[]';
  const usersArray = JSON.parse(users);
  const userFound = usersArray.find((u: User) => u.email === user.email && u.password === user.password);
  if(!userFound) return undefined;
  const userWithHash = { ...userFound, hash:{ token:'mocked_token' } };
  return userWithHash;
};

// export const updateCategory = async (id: string, category: number) => {
//   const updatedCategory = await api.put(`/categories/${id}`, category).then((response) => {
//     return response.data;
//   });
//   return updatedCategory;
// };

// export const deleteCategory = async (id: string) => {
//   const deletedCategory = await api.delete(`/categories/${id}`).then((response) => {
//     return response.data;
//   });
//   return deletedCategory;
// };
