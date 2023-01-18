import express from 'express';
import { register, login, logout } from '../controllers/authController';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

export default router;
