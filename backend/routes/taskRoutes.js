import express from 'express' 
import taskController from '../controllers/taskController.js'
const router = express.Router();

// Rota para obter todos os usuários
router.post('/', taskController.getTask);

router.post('/create', taskController.createTask);

//router.post('/login', taskController.login);

//router.put('/update', taskController.updateUser);

router.delete('/delete/:name', taskController.deleteTask);

export default router;
