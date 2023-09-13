import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getCategoriesByName,
  createUser, login, getPostsByName, createPost, deletePost, updatePost } from '../services/api';

import { createUserLS, loginLS, getCategoriesByNameLS, createCategoryLS, updateCategoryLS, deleteCategoryLS } from '../services/localStorage';
import { getPostsByTitleLS, createPostLS, deletePostLS, updatePostLS } from '../services/localStorage/posts';

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
      case 'createUser': return createUser(functionParameter);
      case 'getPostsByName': return getPostsByName(functionParameter);
      case 'createPost': return createPost(functionParameter);
      case 'deletePost': return deletePost(functionParameter);
      case 'updatePost': return updatePost(functionParameter);
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
    case 'getPostsByName': return getPostsByTitleLS(functionParameter);
    case 'createPost': return createPostLS(functionParameter);
    case 'deletePost': return deletePostLS(functionParameter);
    case 'updatePost': return updatePostLS(functionParameter);
    default: return null;
    }
  };

  return mapFunction;
};