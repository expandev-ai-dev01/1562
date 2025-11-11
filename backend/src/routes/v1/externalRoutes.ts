import { Router } from 'express';
import * as productController from '@/api/v1/external/product/controller';
import * as categoryController from '@/api/v1/external/category/controller';

const router = Router();

router.get('/product', productController.listHandler);
router.get('/category', categoryController.listHandler);

export default router;
