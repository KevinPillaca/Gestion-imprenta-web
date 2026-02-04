import { pool } from '../config/db';
import bcrypt from 'bcrypt';

export const findUserByUsername = async (usuario: string) => {
  const [rows] = await pool.query('SELECT * FROM administrador WHERE usuario = ?', [usuario]);
  const users = rows as any[];
  return users[0];
};
