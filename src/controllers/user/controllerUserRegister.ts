import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserController {
  async create(req: Request, res: Response) {
    const { id, name, email, password, phone, isDev, github, linkedIn } = req.body;
    try {
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
      res.status(500).json({ message: 'An error occurred during user creation' });
    }
  }
}
