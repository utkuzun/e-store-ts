/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from '../controllers/reviewController';
import authenticate, {
  addPermission,
  isOwner,
} from '../middleware/authenticate';

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(authenticate, addPermission(['USER', 'ADMIN']), createReview);

router
  .route('/:id')
  .get(getSingleReview)
  .delete(authenticate, addPermission(['USER', 'ADMIN']), isOwner, deleteReview)
  .patch(authenticate, addPermission(['USER', 'ADMIN']), isOwner, updateReview);

export default router;
