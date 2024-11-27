import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Para decodificar o JWT

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se o token não existir, redirecione para a página de login
    return <Navigate to="/" replace />;
  }

  try {
    // Decodifica e verifica se o token ainda é válido (opcional)
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      // Token expirado
      localStorage.removeItem('token');
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error('Erro ao validar o token:', error);
    return <Navigate to="/" replace />;
  }

  // Se tudo estiver OK, renderize a rota protegida
  return children;
};

export default ProtectedRoute;
