import React from 'react';
import { IReactRCProps } from '../../tools';
import { Form } from '@unform/web';
import { J_TextField } from './text-field';
import { Box, Button } from '@mui/material';
import { usePostContext } from '../../contexts';
import { Post } from '../../Entities';
import { useNavigate } from 'react-router-dom';

export interface IFormPostDetailProps extends IReactRCProps {
  postId?: number;
  post?: Post;
}

export const FormPostDetail: React.FC<IFormPostDetailProps> = ({ children, postId, post, ...rest }) => {
  const {  update } = usePostContext();
  const navigate = useNavigate();
  const publishedDateFormated = `${new Date(post.published).toLocaleDateString('pt-BR')} - ${new Date(post.published).toLocaleTimeString('pt-BR')}`;
  const updatedDateFormated = `${new Date(post.updated).toLocaleDateString('pt-BR')} - ${new Date(post.updated).toLocaleTimeString('pt-BR')}`;
  alert(publishedDateFormated);

  if(post) {
    return (
      <Form {...rest} onSubmit={async (v) => {
        const post = new Post(v.title);
        post.id = postId;
        await update(post);
        navigate('/Postagens');
      }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1 }}>
          <J_TextField name='title' label='Título' value={post.title} defaultV={post.title}  />
          <J_TextField name='content' label='Texto' value={post.content} defaultV={post.content}  />
          <J_TextField name='updated' label='Atualizado em' value={post.updated} defaultV={publishedDateFormated}  />
          <J_TextField name='published' label='Criado em' value={post.published} defaultV={updatedDateFormated}  />
          <J_TextField name='userId' label='Autor' value={post.userId} defaultV={post.userId.toString()}  />
          <Button variant='outlined' type='submit'>Salvar</Button>
          {children}
        </Box>
      </Form>
    );
  }
};
