import { api } from '../';
import { Category } from '../../../Entities';

export const getAllCategories = async () => {
  const categories = await api.get('/categories').then((response) => {
    return response.data;
  });
  return categories;
};

export const getCategoriesByName = async ({ search }) => {
  const token = JSON.parse(localStorage.getItem('token')) ;
  const categories = await api.get(`/categories/name?search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    return response.data;
  });
  return categories;
};

export const getCategoryById = async (id: number) => {
  const token = JSON.parse(localStorage.getItem('token')) ;
  const category = await api.get(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    return response.data;
  });
  return category;
};

export const createCategory = async (category: Category) => {
  try{
    const token = JSON.parse(localStorage.getItem('token')) ;
    const newCategory = await api.post('/categories', category, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      return response.data;
    });
    return newCategory;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (category: Category) => {
  const token = JSON.parse(localStorage.getItem('token')) ;
  const updatedCategory = await api.put(`/categories/${category.id}`, category, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    return response.data;
  });
  return updatedCategory;
};

export const deleteCategory = async (id: number) => {
  console.log('id para deletar no api . delete;', id);
  const token = JSON.parse(localStorage.getItem('token')) ;
  const deletedCategory = await api.delete(`/categories/${id}`,  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if (response.status === 204) {
      return true;
    }
    return response.data;
  });
  console.log('category deleted:', deletedCategory);
  return deletedCategory;
};
