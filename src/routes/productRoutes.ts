import express from 'express';
import {
  createProduct,
  deleteProduct,
  getlAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from '../controllers/productController';
import authenticate, { addPermission } from '../middleware/authenticate';

const router = express.Router();

router
  .route('/')
  .get(getlAllProducts)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post(authenticate, addPermission(['ADMIN']), createProduct);

router
  .route('/uploadImage')
  .patch(authenticate, addPermission(['ADMIN']), uploadImage);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch(authenticate, addPermission(['ADMIN']), updateProduct)
  .delete(authenticate, addPermission(['ADMIN']), deleteProduct);

export default router;
