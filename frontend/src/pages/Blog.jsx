import { useEffect } from 'react';
import { useCategoryContext, usePostContext } from '../shared/contexts';

import { LayoutBase } from '../shared/layouts';
import { Box, Paper, Typography } from '@mui/material';

export const Blog = () => {
  const { getByName: getCategories } = useCategoryContext();
  const { getByName: getPosts, posts } = usePostContext();

  const getDataFromStorage = async (name) => {
    await getCategories(name);
    await getPosts(name);
  };

  useEffect( () => {
    getDataFromStorage('');
  }, []);

  return (
    <>
      <LayoutBase title='Blog: Driver Maniac' >

        {
          posts.map( (post) => {
            const publishedDateFormated = `${new Date(post.published).toLocaleDateString('pt-BR')} - ${new Date(post.published).toLocaleTimeString('pt-BR')}`;
            const updatedDateFormated = `${new Date(post.updated).toLocaleDateString('pt-BR')} - ${new Date(post.updated).toLocaleTimeString('pt-BR')}`;
            return(
              <Box component={Paper} textAlign={'center'} margin={3} padding={1}  key={post.id}>
                <Typography variant='h6'>{post.title}</Typography>
                <Typography variant='subtitle1' textAlign={'right'} > - por {post.user.displayName}</Typography>
                <Typography variant='subtitle2' textAlign={'right'} > {post.categories[0].name}</Typography>
                <Typography variant='subtitle2' textAlign={'left'} > Criado em: {publishedDateFormated}</Typography>
                <Typography variant='subtitle2' textAlign={'left'} > Atualizado em: {updatedDateFormated}</Typography>
                <br />
                <Typography component={Paper} padding={4} letterSpacing={2} border={1} variant='body1' textAlign={'justify'}>{post.content}</Typography>
              </Box>
            );})

        }
      </LayoutBase>
    </>
  );
};
