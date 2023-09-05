import { api } from '../';
import { ICategory } from '../../../Entities';

// export interface ICategoryProps {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
// }

export class Category implements ICategory {
  id: string;
  name: string;
  description: string;
  image: string;

  constructor (name: string) {
    this.name = name;
  }
}

export const getAllCategories = async () => {
  const categories = await api.get('/categories').then((response) => {
    console.log(response.data);
    return response.data;
  });
  return categories;
};

export const getCategoriesByName = async ({ search }) => {
  const categories = await api.get(`/categories/name?search=${search}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
  return categories;
};

export const getCategoryById = async (id: string) => {
  const category = await api.get(`/categories/${id}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
  return category;
};

export const createCategory = async (category: Category) => {
  try{
    const newCategory = await api.post('/categories', category).then((response) => {
      console.log(response.data);
      return response.data;
    });
    return newCategory;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (id: string, category: number) => {
  const updatedCategory = await api.put(`/categories/${id}`, category).then((response) => {
    console.log(response.data);
    return response.data;
  });
  return updatedCategory;
};

export const deleteCategory = async (id: string) => {
  const deletedCategory = await api.delete(`/categories/${id}`).then((response) => {
    console.log(response.data);
    return response.data;
  });
  return deletedCategory;
};
