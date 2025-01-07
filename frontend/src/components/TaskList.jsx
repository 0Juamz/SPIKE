import React, { useEffect, useState } from 'react';
import api from '../services/api';


const TaskList = () => {
  // Recupera os dados do usuário do localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar tasks do backend usando Axios
  const fetchTasks = async () => {
    try {
      const task = await api.post('/task', { userId: user.id });
      setTasks(task.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <p>Carregando tasks...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  if (tasks.length === 0) {
    return <p>Nenhuma task disponível</p>;
  }

  return (
    <div style={styles.taskList}>
      {tasks.map((task) => (
        <div key={task.id} style={styles.taskItem}>
          <h4 style={styles.taskTitle}>{task.name}</h4>
          <p style={styles.taskDescription}>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

// Estilos básicos
const styles = {
  taskList: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  taskItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  taskTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#333',
  },
  taskDescription: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    color: '#666',
  },
};

export default TaskList;
