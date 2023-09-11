import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Button, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { LayoutBase } from '../shared/layouts';
import { J_ToolBar } from '../shared/components/tool-bar';
import { usePostContext, useLoginUserContext } from '../shared/contexts';
import { useDebounce } from '../shared/tools';

export const Posts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const { posts, create, del, getByName } = usePostContext();
  const { user } = useLoginUserContext();
  console.log('este eh meu           user');
  console.log(user);
  const navigate = useNavigate();
  const tableHeaderProps = [
    { label: 'ID', name: 'id' },
    { label: 'Title', name: 'title' },
  ];
  const tableHeaders = tableHeaderProps.map((header) => ({
    field: header.name, headerName: header.label, editable: true,
  }));
  const tableHeadersWithButtons = [...tableHeaders,
    { field: 'btnEdit',
      headerName: 'Editar',
      type: 'button',
      renderCell: (expense) => (
        <Button
          variant="contained"
          color="primary"
          onClick={ () => { navigate(`detalhes/${expense.row.id}`);} }
        > <Edit />
        </Button>
      ) },
    { field: 'btnDeletar',
      headerName: 'Deletar',
      type: 'button',
      renderCell: (expense) => (
        <Button
          variant="contained"
          color="primary"
          onClick={ async () => {
            if(confirm(`Deseja excluir a postagem ${expense.row.name} `)) {
              await del(expense.row.id);
            } }
          }
        > <Delete />
        </Button>
      ) },
  ];

  const tableRowProps = posts.map((post) => ({
    id: post.id,
    title: post.title,
  }));

  const getDataFromStorage = async (name) => {
    debounce(async ()=>{
      setIsLoading(true);
      const querySuccess =  await getByName(name);
      setTimeout(() => setIsLoading(!querySuccess), 1000);
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
        searchButtonEnabled
        addButtonEnabled
        deleteButtonEnabled
        saveButtonEnabled
        searchButtonLoading={isLoading}
        addButtonLoading={isLoading}
        saveButtonLoading={isLoading}
        deleteButtonLoading={isLoading}
        addLabelText='Nova Postagem'
        searchText={search}
        handleChangeSearchText={(texto) => setSearchParams({ search: texto }, { replace: true })}
        handleClickAdd={async () => {const id = await create('Nova Postagem');navigate(`detalhes/${id}`);}}
      />}  > {posts.length}

        <Box component={Paper} variant='outlined' sx={ { height: 'auto', width: '100%' } }>
          <DataGrid
            rows={ tableRowProps }
            loading={ isLoading }
            columns={ tableHeadersWithButtons }
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
