import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userController';

import authenticate, { addPermission } from '../middleware/authenticate';

const router = express.Router();

router
  .route('/')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get(authenticate, addPermission(['ADMIN']), getAllUsers);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/showMe').get(authenticate, showCurrentUser);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/updateUserPassword').patch(authenticate, updateUserPassword);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/updateUser').patch(authenticate, updateUser);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/:id').get(getSingleUser);

export default router;
