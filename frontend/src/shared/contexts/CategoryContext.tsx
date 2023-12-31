import React, { createContext, useCallback, useState, useContext } from 'react';
import { IReactRCProps } from '../tools';
import { ICategory, Category } from '../Entities';
import  { mapToDefaultStorage }  from '../tools';

interface ICategoryContext  {
    categories: ICategory[] | [];
    create: (name: string ) => Promise<boolean>;
    del: (id: number) => void;
    update: (category: Category) => void;
    getAll: () => void;
    getById: (id: number) => void;
    getByName: (name: string) => Promise<boolean>;
    setCategories: React.Dispatch<React.SetStateAction<ICategory[] | []>>;
}

interface ICategoryProviderProps extends IReactRCProps {
}

const CategoryContext = createContext({} as ICategoryContext);

export const CategoryProvider: React.FC<ICategoryProviderProps> = ({ children }) => {
  const defaultStorage = mapToDefaultStorage();
  const [categories, setCategories] = useState<ICategory[]|[]>([]);

  const create = useCallback( async (name='Nova Categoria') => {
    const category = new Category(name);
    const newCategory = await defaultStorage('createCategory', category);
    if(newCategory) {
      setCategories((categories) => [...categories, newCategory]);
      return newCategory.id;
    }
    return false;
  }, [categories]);

  const update = useCallback( async (category: Category) => {
    const hasUpdated = await defaultStorage('updateCategory', category);
    console.log('category updated', hasUpdated);
  }, [categories]);

  const del = useCallback( async (id: number) => {
    const status = await defaultStorage('deleteCategory', id);
    if(status  === true) {
      const newCategories = categories.filter((category) => Number(category.id) !== id);
      setCategories(newCategories);
      console.log('category deleted', newCategories);

    }
    console.log('del method deleted', status, status === true);
  }, [categories]);

  const getAll = useCallback( () => {
    console.log('get all categories');
  }, [categories]);

  const getByName = useCallback( async (name: string) => {
    const categories = await defaultStorage('getCategoriesByName', { search:name });
    if(categories) {
      setCategories(categories);
      return true;
    }
    return false;
  }, [categories]);

  const getById = useCallback( (id: number) => {
    console.log('get category by id: ', id);
  }, [categories]);

  return (
    <CategoryContext.Provider value={{ categories, create, del, update, getAll, getById, getByName, setCategories  }}>
      {children}
    </CategoryContext.Provider>
  );

};

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};
