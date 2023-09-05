import { api } from '../';
import { Category } from '../../../Entities';

export const getAllCategories = async () => {
  const categories = await api.get('/categories').then((response) => {
    return response.data;
  });
  return categories;
};

export const getCategoriesByName = async ({ search }) => {
  const categories = await api.get(`/categories/name?search=${search}`).then((response) => {
    return response.data;
  });
  return categories;
};

export const getCategoryById = async (id: string) => {
  const category = await api.get(`/categories/${id}`).then((response) => {
    return response.data;
  });
  return category;
};

export const createCategory = async (category: Category) => {
  try{
    const newCategory = await api.post('/categories', category).then((response) => {
      return response.data;
    });
    return newCategory;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (id: string, category: number) => {
  const updatedCategory = await api.put(`/categories/${id}`, category).then((response) => {
    return response.data;
  });
  return updatedCategory;
};

export const deleteCategory = async (id: string) => {
  const deletedCategory = await api.delete(`/categories/${id}`).then((response) => {
    return response.data;
  });
  return deletedCategory;
};
