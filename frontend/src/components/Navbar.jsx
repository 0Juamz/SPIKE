import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';

function Navbar  ({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      console.log('logout');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/login'); // Redireciona para a página de login
    };
  
    return (
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo ou título */}
          <h1 className="text-white text-lg font-bold">SPIKE</h1>
  
          {/* Links de navegação */}
          {isLoggedIn ? (
            <ul className="flex space-x-4">        
              <li>
                <Link to="/tarefa" className="text-white hover:text-blue-200 transition-colors duration-200">
                  Tarefas
                </Link>
              </li>
              <li>
                <Link to="/user" className="text-white hover:text-blue-200 transition-colors duration-200">
                  Perfil
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Sair
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li>
                <Link to="/login" className="text-white hover:text-blue-200 transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-blue-200 transition-colors duration-200">
                  Cadastrar
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  };

  export default Navbar;