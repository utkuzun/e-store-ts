/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from '../controllers/reviewController';
import authenticate, { addPermission } from '../middleware/authenticate';

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(authenticate, addPermission(['USER', 'ADMIN']), createReview);

router
  .route('/:id')
  .get(getSingleReview)
  .delete(authenticate, addPermission(['USER', 'ADMIN']), deleteReview)
  .patch(authenticate, addPermission(['USER', 'ADMIN']), updateReview);

export default router;
