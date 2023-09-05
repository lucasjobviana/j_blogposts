import React, { createContext, useCallback, useState, useContext } from 'react';
import { IReactRCProps } from '../tools';
import { ICategory, Category } from '../Entities';

interface ICategoryContext  {
    categories: ICategory[] | [];
    create: (id: number ) => void;
    del: (id: number) => void;
    update: (category: Category) => void;
    getAll: () => void;
    getById: (id: number) => void;
    getByName: (name: string) => void;
    setCategories: React.Dispatch<React.SetStateAction<ICategory[] | []>>;
}

interface ICategoryProviderProps extends IReactRCProps {
}

const CategoryContext = createContext({} as ICategoryContext);

const CategoryProvider: React.FC<ICategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]|[]>([]);

  const create = useCallback( () => {
    const category = new Category('Nova Categoria');
    setCategories((categories) => [...categories, category]);
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

  const getByName = useCallback( (name: string) => {
    console.log('get category by name: ', name);
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
