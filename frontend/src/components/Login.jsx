//Imports defaults do componente
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
  
    //Atualiza os campos sempre que o formulário for atualizado
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    //variavel que armazena mensagem de erro caso o login esteja errado
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      const success = await LoginUser(); //Chama a LoginUser, caso o usuário exista redireciona para a página "sobre"
      if (success){
        navigate('/user');
      } else{
        setErrorMessage("Usuário e/ou senha incorretos");
      }
    }

    async function LoginUser() {
      try {
        const response = await api.post('/user/login', formData);
        setFormData({email: '', password: '' }); // Limpa o formulário
        localStorage.setItem('token', response.data.token); //Cria o token de acesso para outras rotas
        localStorage.setItem('user', JSON.stringify(response.data.user)); //Salva os dados do usuário logado
        console.log('Usuário logado:', response.data);
        return true;
      } catch (error) {
        console.error('Erro ao logar:', error);
        return false;
      }
    };

    //Tela de login
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
    
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
              Entrar
            </button>
            {/* Exibindo a mensagem de erro, se houver */}
           {errorMessage && (
             <div className="text-center text-red-500 text-sm mb-4">
              {errorMessage}
             </div>
            )}
          </form>
        </div>
      );
    }

export default Login;
