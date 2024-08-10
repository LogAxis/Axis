import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail, User } from '../models/User';
import dotenv from 'dotenv';
import { log } from 'console';

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];
 
  console.log('Generated Token:', token); // Log the token
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string };
    const user = await findUserByEmail(decoded.email);
    if (!user) {
      res.status(401).json({ message: 'Access denied' });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
};
