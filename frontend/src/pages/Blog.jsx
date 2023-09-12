import { useEffect } from 'react';
import { useCategoryContext } from '../shared/contexts';

import { LayoutBase } from '../shared/layouts';

export const Blog = () => {
  const { getByName } = useCategoryContext();

  const getDataFromStorage = async (name) => {
    await getByName(name);
  };

  useEffect( () => {
    getDataFromStorage('');
  }, []);

  return (
    <>
      <LayoutBase title='Blog: Coisas do Laiho' >
       Conteúdo da página de Blog
      </LayoutBase>
    </>
  );
};
