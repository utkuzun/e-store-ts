/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  register,
  login,
  logout,
  verifyEmail,
} from '../controllers/authController';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/verify-email').patch(verifyEmail);

export default router;
