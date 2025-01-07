import express from 'express' 
import userController from '../controllers/userController.js'
const router = express.Router();

// Rota para obter todos os usuários
router.get('/', userController.getUser);

router.post('/create', userController.createUser);

router.post('/login', userController.login);

router.put('/update', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

export default router;
