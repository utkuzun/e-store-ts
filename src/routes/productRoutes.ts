import express from 'express';
import { getlAllProducts } from '../controllers/productController';

const router = express.Router();

router.route('/').get(getlAllProducts);

export default router;
