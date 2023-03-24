/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { upload } from '../middleware/multer';

const router = express.Router();

router
  .route('/')
  .get(getlAllProducts)
  .post(authenticate, addPermission(['ADMIN']), createProduct);

router
  .route('/uploadImage')
  .patch(
    authenticate,
    addPermission(['ADMIN']),
    upload.single('image'),
    uploadImage
  );

router
  .route('/:id')
  .get(getSingleProduct)
  .patch(authenticate, addPermission(['ADMIN']), updateProduct)
  .delete(authenticate, addPermission(['ADMIN']), deleteProduct);

export default router;
