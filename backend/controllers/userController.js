import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();
const app = express();

app.use(express.json())
app.use(cors())

/*Get*/
 const getUser = async (req, res) => {
    const users = await prisma.account.findMany()
    res.status(200).json(users)
}

//Criar usuário
const createUser = async (req, res) => {
    try{
      const passwordCpt = await bcrypt.hash(req.body.password, 10); 
      const newUser = await prisma.account.create({
          data: {
            email: req.body.email,
            name: req.body.name,
            password: passwordCpt
          }
    })
    res.status(201).json(newUser);
   } catch(error) {
    res.status(500).json({ message: 'Erro ao criar usuário. Tente novamente.', error });
   }
}

//Login de usuário
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.account.findUnique({
        where: {
            email: email
        }
    }) 
    if(!user){
        res.status(404).json({message :'Usuário não encontrado'});
    } else{
        const passwordValid = await bcrypt.compare(password, user.password);
        if (passwordValid) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.status(200).json({
                 token,
                 user:{
                    id: user.id,
                    name: user.name,
                    email: user.email
                 },
             });
        } else{
            res.status(401).json(user);
        }
    }
}

//Atualizar usuário
const updateUser = async (req, res) => {
    await prisma.account.update({
        where: {
            id: parseInt(req.body.id, 10)
        },
        data: {
            email: req.body.email,
            name:  req.body.name
        }
    })
    res.status(201).json(req.body);
}

//Deletar usuário
const deleteUser = async (req, res) => {
    try{
    await prisma.account.delete({
        where: {
            id: parseInt(req.params.id, 10)
        }
    })
    res.status(200).json(`Usuário do id ${req.params.id} deletado`);
    }
    catch
    {
        res.json('Erro ao deletar usuário');
    }
}

export default {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login
};