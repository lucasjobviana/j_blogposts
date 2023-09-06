import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Blog, About, Categories, Config, Posts, Profile, DetailCategory } from '../pages';
import { CategoryProvider } from '../shared/contexts';

export const AppRoutes = () => {
  return (
    <CategoryProvider>
      <Routes>
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Categorias" element={<Categories />} />
        <Route path="/Postagens" element={<Posts />} />
        <Route path="/Perfil" element={<Profile />} />
        <Route path="/Configuracoes" element={<Config />} />
        <Route path="/Sobre" element={<About />} />
        <Route path="/Categorias/detalhes/:id" element={<DetailCategory />} />
        <Route path="*" element={<Navigate to="/Blog"  />} />
      </Routes>
    </CategoryProvider>
  );
};