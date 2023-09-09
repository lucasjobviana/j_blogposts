import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Blog, About, Categories, Config, Posts, Profile, DetailCategory, DetailPost } from '../pages';
import { CategoryProvider, PostProvider } from '../shared/contexts';

export const AppRoutes = () => {
  return (
    <CategoryProvider>
      <PostProvider>
        <Routes>
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Categorias" element={<Categories />} />
          <Route path="/Postagens" element={<Posts />} />
          <Route path="/Perfil" element={<Profile />} />
          <Route path="/Configuracoes" element={<Config />} />
          <Route path="/Sobre" element={<About />} />
          <Route path="/Categorias/detalhes/:id" element={<DetailCategory />} />
          <Route path="/Postagens/detalhes/:id" element={<DetailPost />} />
          <Route path="*" element={<Navigate to="/Login"  />} />
        </Routes>
      </PostProvider>
    </CategoryProvider>
  );
};