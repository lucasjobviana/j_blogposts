import React, { useEffect, useState } from 'react';
import { LayoutBase } from '../shared/layouts';
import { J_ToolBar } from '../shared/components/tool-bar/';

export const Posts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toogleLoading = () => setIsLoading((loading) =>!loading);
  useEffect(() => {
    setInterval(() => {
      toogleLoading();
    }
    , 3000);

  }, []);
  return (
    <>
      <LayoutBase title='Postagens' toolBar={<J_ToolBar
        searchButtonEnabled={isLoading}
        addButtonEnabled={isLoading}
        saveButtonEnabled={isLoading}
        deleteButtonEnabled={isLoading}
      />}  >
       Conteúdo da página de Posts<br />
       Conteúdo da página de Posts<br /><br />
       Conteúdo da página de Posts<br /><br /><br />
       Conteúdo da página de Posts<br />
       Conteúdo da página de Posts<br /><br />
       Conteúdo da página de Posts<br /><br /><br />
       Conteúdo da página de Posts<br />
       Conteúdo da página de Posts<br /><br />
       Conteúdo da página de Posts<br /><br /><br />
       Conteúdo da página de Posts<br />
       Conteúdo da página de Posts<br /><br />
       Conteúdo da página de Posts<br /><br /><br />
       Conteúdo da página de Posts<br />
       Conteúdo da página de Posts<br /><br />
       Conteúdo da página de Posts<br />
       Conteúdo da página de Posts<br /><br />
       Finalmente<br /><br /><br />
      </LayoutBase>
    </>
  );
};
