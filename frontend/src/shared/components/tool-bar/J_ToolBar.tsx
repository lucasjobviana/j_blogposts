import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Add, ArrowBack, Delete, Save, Search } from '@mui/icons-material';
import { J_Skeleton } from '../../tools';

export interface IJ_ToolBarProps {
    searchText?: string;
    searchButtonLoading?: boolean;
    searchButtonEnabled?: boolean;
    backButtonEnabled?: boolean;
    backTo?: string;
    addLabelText?: string;
    saveLabelText?: string;
    deleteLabelText?: string;
    addButtonLoading?: boolean;
    addButtonEnabled?: boolean;
    handleChangeSearchText?: (text: string) => void;
    handleClickAdd?: (target: EventTarget | null) => void;
    saveButtonLoading?: boolean;
    saveButtonEnabled?: boolean;
    handleClickSave?: (target: EventTarget | null) => void;
    deleteButtonLoading?: boolean;
    deleteButtonEnabled?: boolean;
    handleClickDelete?: (target: EventTarget | null) => void;
  }

export const J_ToolBar: React.FC<IJ_ToolBarProps> = ({
  searchText = '',
  searchButtonLoading = false,
  searchButtonEnabled = false,
  backButtonEnabled = true,
  handleChangeSearchText: handleChangeSearchText = (text) => console.log('HandleChangeSearch: ', text),
  addLabelText = 'Novo Categoria',
  saveLabelText = 'Salvar todos',
  deleteLabelText = 'Deletar seleção',
  backTo = '/',
  addButtonLoading = false,
  addButtonEnabled = false,
  handleClickAdd = (target) => console.log('HandleClickAdd: ', target),
  saveButtonLoading = false,
  saveButtonEnabled = false,
  handleClickSave: handleClickSave = (target) => console.log('HandleClickSave: ', target),
  deleteButtonLoading = false,
  deleteButtonEnabled = false,
  handleClickDelete: handleClickDelete = (target) => console.log('HandleClickDelete: ', target),
}) => {

  const navigate = useNavigate();

  return (
    <Box >

      <Typography variant={'h6'} whiteSpace={'nowrap'} paddingBottom ={1} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'end'} flexWrap={'wrap'} paddingRight={1}  component={Paper} gap={1} >

        {
          searchButtonEnabled &&
        <Box flex={1} display={'flex'} alignItems={'center'}>
          <TextField  sx={{ marginRight:0.5, minWidth:'200px' }} label='Pesquisar' variant='filled' size='small' fullWidth value={searchText} onChange={(e) => handleChangeSearchText(e.target.value)} />
          <J_Skeleton isLoading={searchButtonLoading} >
            <Button size='small' variant='contained' color='primary' startIcon={<Search />} />
          </J_Skeleton>
        </Box>
        }

        {
          addButtonEnabled &&
        <J_Skeleton isLoading={addButtonLoading} >
          <Box   >
            <Button size='small' variant='outlined' color='primary' startIcon={<Add />} onClick={(e)=> handleClickAdd?.(e.target)}  >
              {addLabelText}
            </Button>
          </Box>
        </J_Skeleton>
        }

        {
          deleteButtonEnabled &&
        <J_Skeleton isLoading={deleteButtonLoading} >
          <Box   >
            <Button size='small' variant='outlined' color='primary' startIcon={<Delete />} onClick={(e)=> handleClickDelete?.(e.target)}  >
              {deleteLabelText}
            </Button>
          </Box>
        </J_Skeleton>
        }

        {
          saveButtonEnabled &&
        <J_Skeleton isLoading={saveButtonLoading} >
          <Box   >
            <Button size='small' variant='outlined' color='primary' startIcon={<Save />} onClick={(e)=> handleClickSave?.(e.target)}  >
              {saveLabelText}
            </Button>
          </Box>
        </J_Skeleton>
        }

        {
          backButtonEnabled &&
          <Box >
            <Button size='small' variant='outlined' color='primary' startIcon={<ArrowBack />} onClick={()=> navigate(backTo)}  >
              {'Voltar'}
            </Button>
          </Box>
        }

      </Typography>

    </Box>
  );
};
