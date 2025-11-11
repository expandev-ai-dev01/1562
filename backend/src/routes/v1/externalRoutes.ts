import { Router } from 'express';
import * as productController from '@/api/v1/external/product/controller';
import * as categoryController from '@/api/v1/external/category/controller';
import * as promotionController from '@/api/v1/external/promotion/controller';
import * as bannerController from '@/api/v1/external/banner/controller';

const router = Router();

router.get('/product', productController.listHandler);
router.get('/category', categoryController.listHandler);
router.get('/promotion', promotionController.listHandler);
router.get('/banner', bannerController.listHandler);

export default router;
