import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutBase } from '../shared/layouts';
import { J_ToolBar } from '../shared/components/tool-bar/';
import { Category } from '../shared/Entities';
// import { useCategoryContext } from '../shared/contexts';
import mapToDefaultStorage from '../shared/tools/mapToDefaultStorage';
import { useDebounce } from '../shared/tools';

const category = new Category('');

export const Posts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const toogleLoading = () => setIsLoading((loading) =>!loading);
  const saveOnMemory = mapToDefaultStorage();
  // const categoryContext = useCategoryContext();
  const { debounce } = useDebounce();

  const getDataFromStorage = async (name) => {
    debounce(async ()=>{
      toogleLoading();
      const categories = await saveOnMemory('getCategoriesByName', { search:name });
      // categoryContext.setCategories(categories);
      setTimeout(() => toogleLoading(), 1000);
      // toogleLoading();
      console.log(categories);
    });

  };

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect( () => {
    getDataFromStorage(search);

  }, [search]);

  return (
    <>
      <LayoutBase title='Postagens' toolBar={<J_ToolBar
        searchButtonEnabled={isLoading}
        addButtonEnabled={isLoading}
        addLabelText='Nova Categoria'
        searchText={search}
        handleChangeSearchText={(texto) => setSearchParams({ search: texto }, { replace: true })}
        handleClickAdd={() => saveOnMemory('createCategory', category)}
        saveButtonEnabled={isLoading}
        deleteButtonEnabled={isLoading}
      />}  >

       Conteúdo da página de Posts<br /><br />
       Finalmente<br /><br /><br />
      </LayoutBase>
    </>
  );
};
