import { Post } from '../../../Entities';

// export const getAllCategories = async () => {
//   const categories = await api.get('/categories').then((response) => {
//     return response.data;
//   });
//   return categories;
// };

export const getPostsByTitleLS = async ({ search }) => {
  const posts = localStorage.getItem('posts_bp') || '[]';
  const postsArray = JSON.parse(posts);
  const filteredPosts = postsArray.filter((post: Post) => post.title.toLowerCase().includes(search.toLowerCase()));
  return filteredPosts;
};

// export const getCategoryById = async (id: string) => {
//   const token = JSON.parse(localStorage.getItem('token')) ;
//   const category = await api.get(`/categories/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }).then((response) => {
//     return response.data;
//   });
//   return category;
// };

export const createPostLS = async (post: Post) => {
  const posts = localStorage.getItem('posts_bp') || '[]';
  const postsArray = JSON.parse(posts);
  const biggestId = postsArray.reduce((acc, curr) => {
    if (acc < Number(curr.id) ) {
      return Number(curr.id);
    }
    return acc;
  }, 0);
  post.id = (biggestId + 1);
  localStorage.setItem('posts_bp', JSON.stringify([...postsArray, post]));
  return post;
};

export const updatePostLS = async (post: Post) => {
  const posts = localStorage.getItem('posts_bp') || '[]';
  const postsArray = JSON.parse(posts);
  const postIndex = postsArray.findIndex((c: Post) => c.id == post.id);
  postsArray[postIndex] = post;
  postsArray[postIndex].id = Number(postsArray[postIndex].id);
  localStorage.setItem('posts_bp', JSON.stringify(postsArray));
  return post;
};

export const deletePostLS = async (id: string) => {
  const posts = localStorage.getItem('posts_bp') || '[]';
  const postsArray = JSON.parse(posts);
  const postIndex = postsArray.findIndex((c: Post) => c.id === Number(id));
  postsArray.splice(postIndex, 1);
  localStorage.setItem('categories_bp', JSON.stringify(postsArray));
  return new Promise((resolve) => resolve(true));
};
