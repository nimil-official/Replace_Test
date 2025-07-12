import express from 'express';
import { productDetails } from '../controllers/productDetail.js';

const router = express.Router();

router.get('/:productId', productDetails);

export default router;
