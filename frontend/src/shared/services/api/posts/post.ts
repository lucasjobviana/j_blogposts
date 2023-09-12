import { api } from '..';
import { Post } from '../../../Entities';

export const getAllPosts = async () => {
  const posts = await api.get('/post').then((response) => {
    return response.data;
  });
  return posts;
};

export const getPostsByName = async ({ search }) => {
  console.log('getPostsByName search:', search);
  const token = JSON.parse(localStorage.getItem('token')) ;
  const posts = await api.get(`/post/name?search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    return response.data;
  });
  return posts;
};

export const getPostById = async (id: number) => {
  const token = JSON.parse(localStorage.getItem('token')) ;
  const post = await api.get(`/post/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    return response.data;
  });
  return post;
};

export const createPost = async (post: Post) => {
  try{
    const token = JSON.parse(localStorage.getItem('token')) ;
    const newPost = await api.post('/post', { ...post }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      return response.data;
    });
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (post: Post) => {
  const token = JSON.parse(localStorage.getItem('token')) ;
  const updatedPost = await api.put(`/post/${post.id}`, post, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    return response.data;
  });
  return updatedPost;
};

export const deletePost = async (id: number) => {
  console.log('id para deletar no api .post: delete;', id);
  const token = JSON.parse(localStorage.getItem('token')) ;
  const deletedPost = await api.delete(`/post/${id}`,  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if (response.status === 204) {
      return true;
    }
    return response.data;
  });
  console.log('post deleted:', deletedPost);
  return deletedPost;
};
