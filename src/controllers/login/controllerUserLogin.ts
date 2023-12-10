import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export class UserLogin {

    async login (req: Request, res: Response){

        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).json({ message: "All the fields are required" });
            return;
            }
            
          try {
           const user = await prisma.user.findFirst({
                where: {
                    name: req.body.name,
                    AND: {
                        password: req.body.password
                    }
                }
            }) 
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
              } 
              res.status(200).json({message: "Login success"})
          } catch (error) {
              res.status(500).json({message: 'An error ocorried.'})
          }

    }
}