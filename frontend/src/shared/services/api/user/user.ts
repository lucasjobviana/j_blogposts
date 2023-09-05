import { api } from '../';
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

export const createUser = async (user: User) => {
  try{
    const newUser = await api.post('/user', user).then((response) => {

      console.log('context.login:user enviado:');
      console.log(user);
      console.log('context.login:response.data:');
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
