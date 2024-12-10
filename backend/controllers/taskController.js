import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient();
const app = express();

app.use(express.json())
app.use(cors())

/*Get*/
 const getUser = async (req, res) => {
    const users = await prisma.account.findMany()
    res.status(200).json(users)
}

//Criar task
const createTask = async (req, res) => {
    try{
      const newTask = await prisma.task.create({
          data: {
            name: req.body.name,
            description: req.body.description,
            userId: reqbody.userId
          }
    })
    res.status(201).json(newTask);
   } catch(error) {
    res.status(500).json({ message: 'Erro ao criar task. Tente novamente.' });
   }
}

export default{
    createTask
}