import { Request, Response } from 'express';
import { findUserByUsername } from '../services/auth.service';
import { generateToken } from '../utils/generateToken';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthRequest } from '../middlewares/auth.middleware'; // importante si usas el middleware

dotenv.config();

// 🔹 LOGIN DE USUARIO
export const login = async (req: Request, res: Response) => {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({ msg: 'Faltan datos' });
    }

    const user = await findUserByUsername(usuario);

    if (!user) {
      return res.status(401).json({ msg: 'Usuario no encontrado ❌' });
    }

    // 🔐 Comparar contraseña (si más adelante usas bcrypt)
    // const esValido = await bcrypt.compare(contrasena, user.contrasena);
    const esValido = contrasena === user.contrasena;

    if (!esValido) {
      return res.status(401).json({ msg: 'Contraseña incorrecta ❌' });
    }

    // ✅ Generar token JWT válido por 1 hora
    const token = generateToken(user.id);

    return res.status(200).json({
      msg: 'Login exitoso ✅',
      user: { id: user.id, usuario: user.usuario },
      token,
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
};

// 🔹 VERIFICAR TOKEN (Ruta protegida)
export const verifyToken = (req: AuthRequest, res: Response) => {
  try {
    // Aquí ya llega el token verificado desde el middleware
    if (!req.user) {
      return res.status(401).json({ msg: 'Token inválido o no autorizado ❌' });
    }

    return res.status(200).json({
      msg: 'Token válido ✅',
      user: req.user, // contiene { id, iat, exp }
    });
  } catch (error) {
    console.error('Error en verifyToken:', error);
    return res.status(401).json({ msg: 'Token inválido o expirado ❌' });
  }
};
