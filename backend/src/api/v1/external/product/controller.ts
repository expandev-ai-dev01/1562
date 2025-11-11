import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/middleware';
import { HTTP_STATUS } from '@/constants';
import { productList } from '@/services/product';

const querySchema = z.object({
  idCategory: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce
    .number()
    .int()
    .refine((val) => [12, 24, 36].includes(val))
    .optional()
    .default(12),
});

/**
 * @api {get} /api/v1/external/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists products from the catalog with optional category filtering and pagination
 *
 * @apiParam {Number} [idCategory] Category identifier for filtering
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=12] Items per page (12, 24, or 36)
 *
 * @apiSuccess {Object[]} data Array of products
 * @apiSuccess {Number} data.idProduct Product identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String} data.mainImage Main product image URL
 * @apiSuccess {Number} data.price Regular price
 * @apiSuccess {String} data.unitOfMeasure Unit of measure
 * @apiSuccess {String} data.categoryName Category name
 * @apiSuccess {Boolean} data.onPromotion Promotion flag
 * @apiSuccess {Number} data.promotionalPrice Promotional price (nullable)
 * @apiSuccess {String} data.availability Availability status
 * @apiSuccess {String} data.cultivationType Cultivation type
 * @apiSuccess {Boolean} data.featured Featured flag
 * @apiSuccess {Object} metadata Pagination metadata
 * @apiSuccess {Number} metadata.page Current page
 * @apiSuccess {Number} metadata.pageSize Items per page
 * @apiSuccess {Number} metadata.total Total items
 *
 * @apiError {String} ValidationError Invalid query parameters
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validated = querySchema.parse(req.query);

    const idAccount = 1;

    const result = await productList({
      idAccount,
      idCategory: validated.idCategory || null,
      page: validated.page,
      pageSize: validated.pageSize,
    });

    res.json(
      successResponse(result.products, {
        page: validated.page,
        pageSize: validated.pageSize,
        total: result.total,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Invalid query parameters', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
