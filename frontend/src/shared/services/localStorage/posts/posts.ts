import { Post } from '../../../Entities';

export const getPostsByTitleLS = async ({ search }) => {
  const posts = localStorage.getItem('posts_bp') || '[]';
  const postsArray = JSON.parse(posts);
  const userId = JSON.parse(localStorage.getItem('loggedUserId_bp'));
  const filteredPosts = postsArray.filter((post: Post) => post.userId === userId && post.title.toLowerCase().includes(search.toLowerCase()));
  return filteredPosts;
};

export const createPostLS = async (post: Post) => {
  const now = new Date().toString();
  const posts = localStorage.getItem('posts_bp') || '[]';
  const postsArray = JSON.parse(posts);
  const biggestId = postsArray.reduce((acc, curr) => {
    if (acc < Number(curr.id) ) {
      return Number(curr.id);
    }
    return acc;
  }, 0);
  post.id = (biggestId + 1);
  post.userId = JSON.parse(localStorage.getItem('loggedUserId_bp'));
  post.published = now;
  post.updated = now;
  localStorage.setItem('posts_bp', JSON.stringify([...postsArray, post]));
  return post;
};

export const updatePostLS = async (post: Post) => {
  const now = new Date().toString();
  const posts = localStorage.getItem('posts_bp') || '[]';
  const postsArray = JSON.parse(posts);
  const postIndex = postsArray.findIndex((c: Post) => c.id == post.id);
  post.updated = now;
  post.userId = JSON.parse(localStorage.getItem('loggedUserId_bp'));
  postsArray[postIndex] = post;
  postsArray[postIndex].id = Number(postsArray[postIndex].id);
  localStorage.setItem('posts_bp', JSON.stringify(postsArray));
  return post;
};

export const deletePostLS = async (id: number) => {
  const posts = localStorage.getItem('posts_bp') || '[]';
  const postsArray = JSON.parse(posts);
  const newPosts = postsArray.filter((c: Post) => c.id !== id);
  localStorage.setItem('posts_bp', JSON.stringify(newPosts));
  return new Promise((resolve) => resolve(true));
};
