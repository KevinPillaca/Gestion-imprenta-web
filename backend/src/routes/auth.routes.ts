import { Router } from 'express';
import { login, verifyToken } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);

// protegemos la ruta verify con el middleware
router.get('/verify', authMiddleware, verifyToken);

export default router;