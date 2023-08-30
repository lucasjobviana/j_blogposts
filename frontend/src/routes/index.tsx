import { Navigate, Route, Routes } from 'react-router-dom';
 
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<p>Main</p>} />
      <Route path="*" element={<Navigate to="/"  />} />
    </Routes>
  );  
};