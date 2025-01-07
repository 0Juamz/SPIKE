import React, { useState, useEffect } from 'react';
import Tarefa from './components/TaskList';
import Register from './components/Register';
import Home from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import User from './components/User';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';

function App() {
  let user = JSON.parse(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica o login inicial baseado no localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!user?.id); // Define `true` se o usuário existir, caso contrário `false`
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        {/* Conteúdo da página */}
        <div>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/user" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/tarefa" element={<ProtectedRoute><Tarefa /></ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
