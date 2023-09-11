import { Category } from '../../../Entities';

export const getCategoriesByNameLS = async ({ search }) => {
  const categories = localStorage.getItem('categories_bp') || '[]';
  const categoriesArray = JSON.parse(categories);
  const userId = JSON.parse(localStorage.getItem('loggedUserId_bp'));
  const filteredCategories = categoriesArray.filter((category: Category) => category.userId == userId && category.name.toLowerCase().includes(search.toLowerCase()));
  return filteredCategories;
};

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
  category.userId = JSON.parse(localStorage.getItem('loggedUserId_bp'));
  localStorage.setItem('categories_bp', JSON.stringify([...categoriesArray, category]));
  return category;
};

export const updateCategoryLS = async (category: Category) => {
  const categories = localStorage.getItem('categories_bp') || '[]';
  const categoriesArray = JSON.parse(categories);
  const categoryIndex = categoriesArray.findIndex((c: Category) => c.id == category.id);
  category.userId = JSON.parse(localStorage.getItem('loggedUserId_bp'));
  categoriesArray[categoryIndex] = category;
  categoriesArray[categoryIndex].id = Number(categoriesArray[categoryIndex].id);
  localStorage.setItem('categories_bp', JSON.stringify(categoriesArray));
  return category;
};

export const deleteCategoryLS = async (id: number) => {
  const categories = localStorage.getItem('categories_bp') || '[]';
  const categoriesArray = JSON.parse(categories);
  const categoryIndex = categoriesArray.findIndex((c: Category) => c.id === id);
  categoriesArray.splice(categoryIndex, 1);
  localStorage.setItem('categories_bp', JSON.stringify(categoriesArray));
  return new Promise((resolve) => resolve(true));
};
