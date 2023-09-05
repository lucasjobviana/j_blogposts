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

const CategoryProvider: React.FC<ICategoryProviderProps> = ({ children }) => {
  const saveOnMemory = mapToDefaultStorage();
  const [categories, setCategories] = useState<ICategory[]|[]>([]);

  const create = useCallback( async (name='Nova Categoria') => {
    const category = new Category(name);
    const newCategory = await saveOnMemory('createCategory', category);
    if(newCategory) {
      setCategories((categories) => [...categories, { ...newCategory }]);
      return true;
    }
    return false;
  }, [categories]);

  const update = useCallback( (category: Category) => {
    console.log('update category: ', category);
  }, [categories]);

  const del = useCallback( (id: number) => {
    console.log('delete category: ', id);
  }, [categories]);

  const getAll = useCallback( () => {
    console.log('get all categories');
  }, [categories]);

  const getByName = useCallback( async (name: string) => {
    const categories = await saveOnMemory('getCategoriesByName', { search:name });
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

const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export  {
  CategoryProvider,
  useCategoryContext
};
