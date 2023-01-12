import express from 'express';
import { register } from '../controllers/authController';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.route('/register').post(register);

export default router;
