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
            userId: req.body.userId
          }
    })
    res.status(201).json(newTask);
   } catch(error) {
    console.error(error); // Log no console para diagnóstico
    res.status(500).json({
        message: 'Erro ao criar task.',
        error: error.message, // Inclui a mensagem do erro
    });
}
}

const deleteTask = async (req, res) => {
  try{
    const task = await prisma.task.findFirst({
      where: {
        name: req.params.name
      }
    })
    await prisma.task.delete({
      where: {
          id: task.id
      }
  })
  res.status(200).json(`Task ${task.name} deletada`);
  } catch(error){
    console.error(error); // Log no console para diagnóstico
    res.status(500).json({
        message: 'Erro ao deletar task.',
        error: error.message, // Inclui a mensagem do erro
    });
  }
}

export default{
  createTask,
  deleteTask
}