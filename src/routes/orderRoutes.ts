/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrder,
} from '../controllers/orderControllers';
import authenticate, { addPermission } from '../middleware/authenticate';

const router = express.Router();

router
  .route('/')
  .get(authenticate, addPermission(['ADMIN']), getAllOrders)
  .post(authenticate, createOrder);

router.route('/showAllMyOrders').get(authenticate, getCurrentUserOrders);

router
  .route('/:id')
  .get(authenticate, getSingleOrder)
  .patch(authenticate, updateOrder);

export default router;
