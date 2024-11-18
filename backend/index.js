import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient();
const app = express();

app.use(express.json())
app.use(cors())

/*Get*/
app.get('/user', async (req, res) => {
    const users = await prisma.account.findMany()
    res.status(200).json(users)
})

/*Post*/
app.post('/user', async (req, res) => {
    const newUser = await prisma.account.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })
    res.status(201).json(newUser);
})

/*put*/
app.put('/user/:id', async (req, res) => {
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
})

/*delete*/
app.delete('/user/:id', async (req, res) => {
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
})

app.listen(3000)