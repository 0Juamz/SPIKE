import express from 'express' 
import userController from '../controllers/userController.js'
const router = express.Router();

// Rota para obter todos os usuários
router.get('/', userController.getUser);

router.post('/', userController.createUser);

router.put('/', userController.editUser);

router.delete('/', userController.deleteUser);

export default router;
