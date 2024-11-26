import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();
const app = express();

app.use(express.json())
app.use(cors())

/*Get*/
 const getUser = async (req, res) => {
    const users = await prisma.account.findMany()
    res.status(200).json(users)
}

/*Post*/
const createUser = async (req, res) => {
    const passwordCpt = await bcrypt.hash(req.body.password, 10); 
    const newUser = await prisma.account.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: passwordCpt
        }
    })
    res.status(201).json(newUser);
}


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
            res.status(201).json(user);
        } else{
            res.status(401).json(user);
        }
    }
}
/*put*/
const editUser = async (req, res) => {
    await prisma.account.update({
        where: {
            id: parseInt(req.params.id, 10)
        },
        data: {
            email: req.body.email,
            name:  req.body.name
        }
    })
    res.status(201).json(req.body);
}

/*delete*/
const deleteUser =  async (req, res) => {
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
    editUser,
    deleteUser,
    login
};