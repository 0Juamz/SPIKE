import React, { useState, useEffect } from 'react';
import api  from '../services/api';

function User(){
    // Recupera os dados do usuário do localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    //dados iniciais do formulário de acordo com o usuário logado
    const [formData, setFormData] = useState({
        id   : user?.id || '',
        name : user?.name || '',
        email: user?.email || '',
    });

    const [isDataEqual, setIsDataEqual] = useState(true);
    useEffect(() => {
        const isDataEqual = formData.name === user.name && formData.email === user.email;
        setIsDataEqual(isDataEqual);
    }, [formData, user]);

    //Atualiza os campos sempre que o formulário for atualizado
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        setMessage();
      };

    //Armazena mensagem de sucesso ou erro
    const [message, setMessage] = useState('');
    const handleSubmit = async(e) => {
        e.preventDefault();
        const success = await editUser();
        if (success){
            setMessage("Dados atualizados");
            // Atualiza o localStorage com os novos dados
            localStorage.setItem('user', JSON.stringify(formData));
            setIsDataEqual(true);
        } else{
            setMessage("Erro ao atualizar dados");
        }
    }

    async function editUser() {
        try{
          const response = await api.put('/user/update', formData);
          console.log('Dados do usuário atualizados com sucesso');
          return true;
        } catch(error){
          console.log('Erro ao atualizar dados do usuário');
          return false;
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar dados</h2>
    
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Digite sua senha"
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
    
            <button
              type="submit"
              disabled={isDataEqual}
              className={`w-full ${isDataEqual? 'bg-gray-400 cursor-not-allowed': 'bg-blue-500 hover:bg-blue-500'
                        } text-white font-bold py-3 rounded-lg focus:outline-none transition duration-200`}
            >
              Salvar
            </button>
            {message && (
             <div className="text-center text-blue-500 text-sm mb-4">
              {message}
             </div>
            )}
          </form>
        </div>
    );
}

export default User;
