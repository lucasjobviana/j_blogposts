import React from 'react';
import { IReactRCProps } from '../../tools';
import { Form } from '@unform/web';
import { J_TextField } from './';
import { Box, Button } from '@mui/material';
import { usePostContext } from '../../contexts';
import { Post, User } from '../../Entities';
import { useNavigate } from 'react-router-dom';
import { AutoCompleteCategories } from '../auto-complete-categories/AutoCompleteCategories';

export interface IFormPostDetailProps extends IReactRCProps {
  postId?: number;
  post?: Post;
  user?: User;
}

export const FormPostDetail: React.FC<IFormPostDetailProps> = ({ children, postId, post, user={ displayName:'' }, ...rest }) => {
  const {  update } = usePostContext();
  const navigate = useNavigate();

  if(post) {
    const publishedDateFormated = `${new Date(post.published).toLocaleDateString('pt-BR')} - ${new Date(post.published).toLocaleTimeString('pt-BR')}`;
    const updatedDateFormated = `${new Date(post.updated).toLocaleDateString('pt-BR')} - ${new Date(post.updated).toLocaleTimeString('pt-BR')}`;

    return (
      <Form  {...rest} onSubmit={async (v) => {
        const newPost = new Post(v.title);
        newPost.id = postId;
        newPost.content = v.content;
        newPost.categories = v.categoryIds;
        newPost.published = post.published;
        await update(newPost);
        navigate('/Postagens');
      }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1 }}>
          <J_TextField  name='title' label='Título' value={post.title} defaultV={post.title} />
          <AutoCompleteCategories id={post.categories[0].id}  />
          <J_TextField name='content' label='Texto' value={post.content} defaultV={post.content} multiline maxRows={50} rows={15}  />
          <J_TextField name='updated' label='Atualizado em' value={post.updated} defaultV={updatedDateFormated} disabled />
          <J_TextField name='published' label='Criado em' value={post.published} defaultV={publishedDateFormated} disabled />
          <J_TextField name='userName' label='Autor' value={user.displayName } defaultV={user.displayName} disabled  />
          <Button variant='outlined' type='submit'>Salvar</Button>
          {children}
        </Box>
      </Form>
    );

  }
};
