import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  console.log('Authentication:', localStorage.getItem('authenticated'));
  return isAuthenticated ? <Outlet /> : <Navigate to="/"  />;
};

export default ProtectedRoute;