import Sobre from './components/Sobre'
import Register from './components/Register'
import Home from './components/Login'
import ProtectedRoute from './components/ProtectedRoute';
import User from './components/User';
import { BrowserRouter, Routes, Link, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navbar */}
        <nav className="bg-blue-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo ou título */}
            <h1 className="text-white text-lg font-bold">
              SPIKE
            </h1>

            {/* Links de navegação */}
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
              <li>
                <Link to="/sobre" className="text-white hover:text-blue-200 transition-colors duration-200">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Conteúdo da página */}
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/sobre" element={<ProtectedRoute><Sobre /></ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
