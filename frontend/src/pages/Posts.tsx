import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LayoutBase } from '../shared/layouts';
import { J_ToolBar } from '../shared/components/tool-bar/';
import { Category } from '../shared/Entities';
import { useCategoryContext } from '../shared/contexts';
import { useDebounce } from '../shared/tools';

const category = new Category('');

export const Posts = () => {
  const headersNovo = [
    { label: 'ID', name: 'id' },
    { label: 'Nome', name: 'name' },
  ];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const categoryContext = useCategoryContext();
  const categories = categoryContext.categories;

  const getDataFromStorage = async (name) => {
    debounce(async ()=>{
      setIsLoading(true);
      const querySuccess =  await categoryContext.getByName(name);
      setTimeout(() => setIsLoading(!querySuccess), 1000);
      console.log(categories);
    });

  };

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect( () => {
    getDataFromStorage(search);

  }, [search]);

  const newHeaders = headersNovo.map((header) => ({
    field: header.name, headerName: header.label, editable: true,
  }));

  const newHeadersWithButtons = [...newHeaders,

    { field: 'btnEdit',
      headerName: 'Editar',
      type: 'button',
      renderCell: (expense) => (
        <Button
          variant="contained"
          color="primary"
          onClick={ () => { alert('clickei no editar'); } }
        >
          editar

        </Button>
      ) },
    { field: 'btnDeletar',
      headerName: 'Deletar',
      type: 'button',
      renderCell: (expense) => (
        <Button
          variant="contained"
          color="primary"
          onClick={ () => { alert('clickei nooooooo'); } }
        >
          Deletar

        </Button>
      ) },
  ];

  console.log('miiiiiiiiiiinhas categorias:');
  console.log(categories);
  const expenses = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  const newExpenses = [...expenses.map((expense) => ({
    id: expense.id,
    name: expense.name,
  }))];

  return (
    <>
      <LayoutBase title='Postagens' toolBar={<J_ToolBar
        searchButtonEnabled={isLoading}
        addButtonEnabled={isLoading}
        addLabelText='Nova Categoria'
        searchText={search}
        handleChangeSearchText={(texto) => setSearchParams({ search: texto }, { replace: true })}
        // handleClickAdd={() => saveOnMemory('createCategory', category)}
        handleClickAdd={() => categoryContext.create('Nova Categoria')}
        saveButtonEnabled={isLoading}
        deleteButtonEnabled={isLoading}
      />}  >

        <Box component={Paper} variant='outlined' sx={ { height: 'auto', width: '100%' } }>
          <DataGrid
            rows={ newExpenses }
            loading={ isLoading }
            columns={ newHeadersWithButtons }
            rowHeight={ 45 }

            initialState={ {
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            } }
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </LayoutBase>
    </>
  );
};
