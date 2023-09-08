import React from 'react';
import { IReactRCProps } from '../../tools';
import { Form } from '@unform/web';
import { J_TextField } from './text-field';
import { Box, Button } from '@mui/material';
import { useCategoryContext } from '../../contexts';
import { Category } from './../../Entities';
import { useNavigate } from 'react-router-dom';

export interface IFormCategoryDetailProps extends IReactRCProps {
  categoryId?: string;
  category?: Category;
}

export const FormCategoryDetail: React.FC<IFormCategoryDetailProps> = ({ children, categoryId, category, ...rest }) => {
  const {  update } = useCategoryContext();
  const navigate = useNavigate();

  if(category) {
    return (
      <Form {...rest} onSubmit={async (v) => {
        const category = new Category(v.name);
        category.id = categoryId;
        await update(category);
        navigate('/Categorias');
      }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1 }}>
          <J_TextField name='name' label='Nome' value={category.name} defaultV={'Nova Categoria'}  />
          <Button variant='outlined' type='submit'>Salvar</Button>
          {children}
        </Box>
      </Form>
    );
  }
};
