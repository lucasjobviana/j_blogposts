import React from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Add, Save, Search } from '@mui/icons-material';

export interface IJ_ToolBarProps {
    searchText?: string;
    searchButtonEnabled?: boolean;
    addLabelText?: string;
    addButtonEnabled?: boolean;
    handleChangeSearchText?: (text: string) => void;
    handleClickAdd?: (target: EventTarget | null) => void;
    saveButtonEnabled?: boolean;
    handleClickSave?: (target: EventTarget | null) => void;
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
}) => {
  const theme = useTheme();

  return (
    <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} display={'flex'} alignItems={'center'} justifyContent={'end'} paddingX={1} paddingY={3} height={theme.spacing(5)} component={Paper} gap={1} >

      {
        searchButtonEnabled && <Box flex={1} display={'flex'}  alignItems={'center'} >
          <TextField sx={{ marginRight:0.5 }} label='Pesquisar' size='small' fullWidth value={searchText} onChange={(e) => handleChangeSearchText(e.target.value)} />
          <Button size='small' variant='contained' color='primary' endIcon={<Search />} >
            Pesquisar
          </Button>
        </Box>
      }

      {
        addButtonEnabled && <Box   >
          <Button size='small' variant='contained' color='primary' endIcon={<Add />} onClick={(e)=> handleClickAdd?.(e.target)}  >
            {addLabelText}
          </Button>
        </Box>
      }

      {
        saveButtonEnabled && <Box   >
          <Button size='small' variant='contained' color='primary' endIcon={<Save />} onClick={(e)=> handleClickSave?.(e.target)}  >
            Salvar Tudo
          </Button>
        </Box>
      }
    </Box>
  );
};
