import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ msg: 'Token no proporcionado' });
    }

    const parts = (authHeader as string).split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ msg: 'Formato de token inválido' });
    }

    const token = parts[1];

    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      console.error('JWT_SECRET no definido en .env');
      return res.status(500).json({ msg: 'Error servidor (clave JWT faltante)' });
    }

    const decoded = jwt.verify(token, secret) as any;
    req.user = decoded; // puedes usar req.user en los controllers
    next();
  } catch (err) {
    console.error('authMiddleware error:', err);
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};