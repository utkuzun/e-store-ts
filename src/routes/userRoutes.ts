import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
} from '../controllers/userController';

import authenticate from '../middleware/authenticate';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/').get(authenticate, getAllUsers);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/currentUser').get(authenticate, showCurrentUser);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/:id').get(getSingleUser);

export default router;
