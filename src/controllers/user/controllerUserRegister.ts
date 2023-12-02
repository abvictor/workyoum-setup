import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserController {

  async create(req: Request, res: Response) {
    const { id, name, email, password, phone, isDev, github, linkedIn } = req.body;

    if (!name || !email || !password || !phone || !isDev || !github || !linkedIn) {
      res.status(400).json({ message: "All the fields are required" });
      return;
    }
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (existingUser) {
        res.status(400).json({ message: "Email is already in use" });
        return;
      }

      const newUser = await prisma.user.create({
        data: {
          id,
          name,
          email,
          password,
          phone,
          isDev,
          github,
          linkedIn,
        },
      });
             
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'An error occurred during user creation' });
    }
  }


  async list(req: Request, res: Response){
    try {
      const listUsers = await prisma.user.findMany({})
        res.status(200).json({ listUsers });
        return
    } catch (error) {
      res.status(500).json({ message: "It wasn't possible list the users" });
    }
  }

  async update(req: Request, res: Response){
    try {
      const { name, email, password, phone, isDev, github, linkedIn } = req.body;
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(req.params.id)
        },
        data: {
          name,
          email,
          password,
          phone,
          isDev,
          github,
          linkedIn,
        }
      })
      res.status(200).json({updatedUser})
    } catch (error) {

      res.status(400).json({message: `Failed to update user ${req.params.id}`})
    }
  }

  async delete(req: Request, res: Response){
    try {
      await prisma.user.delete({
        where: {
          id: parseInt(req.params.id)
        }
      })
      res.status(200).json({message: `Deleted user ${req.params.id} with success`})
    } catch (error) {
        res.status(400).json({message: `Failed to delete user ${req.params.id}`})
    }
  }
}

