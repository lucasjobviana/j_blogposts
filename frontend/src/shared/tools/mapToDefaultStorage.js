import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getCategoriesByName,
  createUser, login } from '../services/api';
import { createUserLS, loginLS, getCategoriesByNameLS, createCategoryLS, updateCategoryLS, deleteCategoryLS } from '../services/localStorage';

export const mapToDefaultStorage = (usingBD = false) => {

  const mapFunction = (functionName, functionParameter) => {
    if (usingBD) {
      switch (functionName) {
      case 'getAllCategories': return getAllCategories(functionParameter);
      case 'getCategoriesByName': return getCategoriesByName(functionParameter);
      case 'getCategoryById': return getCategoryById(functionParameter);
      case 'createCategory': return createCategory(functionParameter);
      case 'updateCategory': return updateCategory(functionParameter);
      case 'deleteCategory': return deleteCategory(functionParameter);
      case 'createUser': return createUser(functionParameter);
      case 'login': return login(functionParameter);
      default: return null;
      }
    }

    switch (functionName) {
    case 'createUser': return createUserLS(functionParameter);
    case 'login': return loginLS(functionParameter);
    case 'getCategoriesByName': return getCategoriesByNameLS(functionParameter);
    case 'createCategory': return createCategoryLS(functionParameter);
    case 'updateCategory': return updateCategoryLS(functionParameter);
    case 'deleteCategory': return deleteCategoryLS(functionParameter);
    default: return null;
    }
  };

  return mapFunction;
};