import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Paper } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
import { LayoutBase } from '../shared/layouts';
import { J_ToolBar } from '../shared/components/tool-bar';
import { useCategoryContext } from '../shared/contexts';

export const DetailCategory = () => {
  const { id='nova' } = useParams<'id'>();
  const { create, } = useCategoryContext();
  const navigate = useNavigate();

  return (
    <>
      <LayoutBase title='Categoria - Detalhes' toolBar={<J_ToolBar
        addButtonEnabled
        deleteButtonEnabled
        saveButtonEnabled
        deleteLabelText='Deletar'
        saveLabelText='Salvar'
        backTo='/Categorias'
        handleClickAdd={async () => {const id = await create('Nova Categoria');navigate(`/Categorias/detalhes/${id}`);}}
      />}  >

        <Box component={Paper} variant='outlined' sx={ { height: 'auto', width: '100%' } }>
          { `Detalhes da Categoria ${id}`}
        </Box>
      </LayoutBase>
    </>
  );
};
