import express from 'express';
import { getAllUsers, getSingleUser } from '../controllers/userController';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/').get(getAllUsers);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/:id').get(getSingleUser);

export default router;
