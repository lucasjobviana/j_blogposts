import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { LayoutBase } from '../shared/layouts';
import { J_ToolBar } from '../shared/components/tool-bar';
import { usePostContext } from '../shared/contexts';
import { FormPostDetail } from '../shared/components/form';

export const DetailPost = () => {
  const { id='nova' } = useParams<'id'>();
  const { create, posts, del } = usePostContext();
  const navigate = useNavigate();
  const post = posts.find((post) => Number(post.id) === Number(id));
  console.log('meu pooooooos:', post);
  console.log('posts do context:');
  console.log(posts);

  const handleDelete = async () => {
    if(confirm(`Deseja excluir a postagem ${id} `)) {
      await del(Number(id));
      navigate('/Postagens');
    }
  };
  return (
    <>
      <LayoutBase title='Postagens - Detalhes' toolBar={<J_ToolBar
        addButtonEnabled
        deleteButtonEnabled
        deleteLabelText='Deletar'
        saveLabelText='Salvar'
        backTo='/Postagens'
        handleClickDelete={ handleDelete}
        handleClickAdd={async () => {const id = await create('Nova Postagem');navigate(`/Postagens/detalhes/${id}`);}}
      />}  >

        <Box height={30} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} marginBottom={1} component={Paper} variant='outlined' >
          <Typography variant='h6' component='h1' >
            {
              post ?
                `${id||'nova'} - ${post.title}` :
                'Postagem não encontrada'
            }
          </Typography>
        </Box>

        <Box component={Paper} variant='outlined' sx={ { height: 'auto', width: '100%' } }>

          <FormPostDetail postId={Number(id)} post={post} user={post.user} />
        </Box>
      </LayoutBase>
    </>
  );
};
