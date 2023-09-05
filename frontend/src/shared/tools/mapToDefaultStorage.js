import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getCategoriesByName } from '../services/api';

export const mapToDefaultStorage = (usingBD = true) => {

  const mapFunction = (functionName, functionParameter) => {
    if (usingBD) {
      switch (functionName) {
      case 'getAllCategories': return getAllCategories(functionParameter);
      case 'getCategoriesByName': return getCategoriesByName(functionParameter);
      case 'getCategoryById': return getCategoryById(functionParameter);
      case 'createCategory': return createCategory(functionParameter);
      case 'updateCategory': return updateCategory(functionParameter);
      case 'deleteCategory': return deleteCategory(functionParameter);
      default: return null;
      }
    }

    switch (functionName) {
    // case 'getWorks': return getWorksLS(functionParameter);
    default: return null;
    }
  };

  return mapFunction;
};