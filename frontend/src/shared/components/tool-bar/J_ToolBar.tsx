import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Add, Delete, Save, Search } from '@mui/icons-material';
import { J_Skeleton } from '../../tools';

export interface IJ_ToolBarProps {
    searchText?: string;
    searchButtonEnabled?: boolean;
    addLabelText?: string;
    addButtonEnabled?: boolean;
    handleChangeSearchText?: (text: string) => void;
    handleClickAdd?: (target: EventTarget | null) => void;
    saveButtonEnabled?: boolean;
    handleClickSave?: (target: EventTarget | null) => void;
    deleteButtonEnabled?: boolean;
    handleClickDelete?: (target: EventTarget | null) => void;
  }

export const J_ToolBar: React.FC<IJ_ToolBarProps> = ({
  searchText = '',
  searchButtonEnabled = false,
  handleChangeSearchText: handleChangeSearchText = (text) => console.log('HandleChangeSearch: ', text),
  addLabelText = 'Novo',
  addButtonEnabled = false,
  handleClickAdd = (target) => console.log('HandleClickAdd: ', target),
  saveButtonEnabled = false,
  handleClickSave: handleClickSave = (target) => console.log('HandleClickSave: ', target),
  deleteButtonEnabled = false,
  handleClickDelete: handleClickDelete = (target) => console.log('HandleClickDelete: ', target),
}) => {
  const theme = useTheme();

  return (
    <Box>

      <Typography variant={'h6'} whiteSpace={'nowrap'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'end'} paddingRight={1} paddingY={3} height={theme.spacing(5)} component={Paper} gap={1} >

        <Box flex={1} display={'flex'} alignItems={'center'}>
          <TextField  sx={{ marginRight:0.5, minWidth:'100px' }} label='Pesquisar' variant='filled' size='small' fullWidth value={searchText} onChange={(e) => handleChangeSearchText(e.target.value)} />
          <J_Skeleton isLoading={searchButtonEnabled} >
            <Button  size='small' variant='contained' color='primary' startIcon={<Search />} />
          </J_Skeleton>
        </Box>

        <J_Skeleton isLoading={addButtonEnabled} >
          <Box   >
            <Button size='small' variant='outlined' color='primary' startIcon={<Add />} onClick={(e)=> handleClickAdd?.(e.target)}  >
              {addLabelText}
            </Button>
          </Box>
        </J_Skeleton>

        <J_Skeleton isLoading={deleteButtonEnabled} >
          <Box   >
            <Button size='small' variant='outlined' color='primary' startIcon={<Delete />} onClick={(e)=> handleClickDelete?.(e.target)}  >
                Deletar seleção
            </Button>
          </Box>
        </J_Skeleton>

        <J_Skeleton isLoading={saveButtonEnabled} >
          <Box   >
            <Button size='small' variant='outlined' color='primary' startIcon={<Save />} onClick={(e)=> handleClickSave?.(e.target)}  >
                Salvar Tudo
            </Button>
          </Box>
        </J_Skeleton>

      </Typography>

    </Box>
  );
};
