import express from 'express';
import { login, logout, signup } from './controllers';

const router = express.Router();

router.post('/signup', signup);
// @ts-ignore
router.post('/login', login);
router.post('/logout', logout);

export default router;
