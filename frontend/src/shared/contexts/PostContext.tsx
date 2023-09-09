import React, { createContext, useCallback, useState, useContext } from 'react';
import { IReactRCProps } from '../tools';
import {  IPost, Post } from '../Entities';
import  { mapToDefaultStorage }  from '../tools';

interface IPostContext  {
    posts: IPost[] | [];
    create: (name: string ) => Promise<boolean>;
    del: (id: number) => void;
    update: (post: Post) => void;
    getAll: () => void;
    getById: (id: number) => void;
    getByName: (name: string) => Promise<boolean>;
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | []>>;
}

interface IPostProviderProps extends IReactRCProps {
}

const PostContext = createContext({} as IPostContext);

export const PostProvider: React.FC<IPostProviderProps> = ({ children }) => {
  const defaultStorage = mapToDefaultStorage();
  const [posts, setPosts] = useState<IPost[]|[]>([]);

  const create = useCallback( async (title='Nova Postagem') => {
    const post = new Post(title);
    const newPost = await defaultStorage('createPost', post);
    if(newPost) {
      console.log('post created_____________', newPost);
      setPosts((posts) => [...posts, newPost]);
      return newPost.id;
    }
    return false;
  }, [posts]);

  const update = useCallback( async (post: Post) => {
    const hasUpdated = await defaultStorage('updatePost', post);
    console.log('post updated', hasUpdated);
  }, [posts]);

  const del = useCallback( async (id: number) => {
    const status = await defaultStorage('deletePost', id);
    if(status  === true) {
      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
      console.log('post deleted', newPosts);

    }
    console.log('del method deleted', status, status === true);
  }, [posts]);

  const getAll = useCallback( () => {
    console.log('get all posts');
  }, [posts]);

  const getByName = useCallback( async (name: string) => {
    const posts = await defaultStorage('getPostsByName', { search:name });
    if(posts) {
      setPosts(posts);
      return true;
    }
    return false;
  }, [posts]);

  const getById = useCallback( (id: number) => {
    console.log('get posts by id: ', id);
  }, [posts]);

  return (
    <PostContext.Provider value={{ posts, create, del, update, getAll, getById, getByName, setPosts  }}>
      {children}
    </PostContext.Provider>
  );

};

export const usePostContext = () => {
  return useContext(PostContext);
};
