import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/middleware';
import { categoryList } from '@/services/category';

/**
 * @api {get} /api/v1/external/category List Categories
 * @apiName ListCategories
 * @apiGroup Category
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists active categories with product counts for filtering
 *
 * @apiSuccess {Object[]} data Array of categories
 * @apiSuccess {Number} data.idCategory Category identifier
 * @apiSuccess {String} data.name Category name
 * @apiSuccess {String} data.icon Category icon URL (nullable)
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {Number} data.productCount Number of active products
 *
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const idAccount = 1;

    const categories = await categoryList({ idAccount });

    res.json(successResponse(categories));
  } catch (error: any) {
    next(error);
  }
}
