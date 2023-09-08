import { Category } from '../../../Entities';

// export const getAllCategories = async () => {
//   const categories = await api.get('/categories').then((response) => {
//     return response.data;
//   });
//   return categories;
// };

export const getCategoriesByNameLS = async ({ search }) => {
  const categories = localStorage.getItem('categories_bp') || '[]';
  const categoriesArray = JSON.parse(categories);
  const filteredCategories = categoriesArray.filter((category: Category) => category.name.toLowerCase().includes(search.toLowerCase()));
  return filteredCategories;
};

// export const getCategoryById = async (id: string) => {
//   const token = JSON.parse(localStorage.getItem('token')) ;
//   const category = await api.get(`/categories/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }).then((response) => {
//     return response.data;
//   });
//   return category;
// };

export const createCategoryLS = async (category: Category) => {
  const categories = localStorage.getItem('categories_bp') || '[]';
  const categoriesArray = JSON.parse(categories);
  const biggestId = categoriesArray.reduce((acc, curr) => {
    if (acc < Number(curr.id) ) {
      return Number(curr.id);
    }
    return acc;
  }, 0);
  category.id = (biggestId + 1);
  localStorage.setItem('categories_bp', JSON.stringify([...categoriesArray, category]));
  return category;
};

export const updateCategoryLS = async (category: Category) => {
  const categories = localStorage.getItem('categories_bp') || '[]';
  const categoriesArray = JSON.parse(categories);
  const categoryIndex = categoriesArray.findIndex((c: Category) => c.id == category.id);
  categoriesArray[categoryIndex] = category;
  categoriesArray[categoryIndex].id = Number(categoriesArray[categoryIndex].id);
  localStorage.setItem('categories_bp', JSON.stringify(categoriesArray));
  return category;
};

export const deleteCategoryLS = async (id: string) => {
  const categories = localStorage.getItem('categories_bp') || '[]';
  const categoriesArray = JSON.parse(categories);
  const categoryIndex = categoriesArray.findIndex((c: Category) => c.id == id);
  categoriesArray.splice(categoryIndex, 1);
  localStorage.setItem('categories_bp', JSON.stringify(categoriesArray));
  return new Promise((resolve) => resolve(true));
};
