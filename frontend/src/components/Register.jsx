import React, { useState } from 'react';
import api from '../services/api'
import { useNavigate } from 'react-router-dom'; // Importa o hook


function Register() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
   
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      const sucess = await createUser();
      if (sucess) {
        navigate('/login');
      } else {
        setErrorMessage("Este e-mail já está sendo utilizado");
      }
    };

    async function createUser() {
      try {
        const response = await api.post('/user/create', formData);
        setFormData({ name: '', email: '', password: '' }); // Limpa o formulário
        console.log('Usuário criado com sucesso:', response.data);
        return true;
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return false;
      }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro de Usuário</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Digite seu nome"
                required
              />
            </div>
    
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
    
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Digite sua senha"
                required
              />
            </div>
    
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200"
            >
              Cadastrar
            </button>
            {errorMessage && (
             <div className="text-center text-red-500 text-sm mb-4">
              {errorMessage}
             </div>
            )}
          </form>
        </div>
      );
    }

export default Register;