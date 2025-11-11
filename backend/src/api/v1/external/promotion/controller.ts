import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/middleware';
import { HTTP_STATUS } from '@/constants';
import { promotionList } from '@/services/promotion';

const querySchema = z.object({
  idCategory: z.coerce.number().int().positive().optional(),
  minDiscount: z.coerce.number().int().min(0).max(100).optional(),
  maxDiscount: z.coerce.number().int().min(0).max(100).optional(),
  sortBy: z
    .enum(['maior_desconto', 'menor_preco', 'maior_preco', 'alfabetica'])
    .optional()
    .default('maior_desconto'),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce
    .number()
    .int()
    .refine((val) => [12, 24, 36].includes(val))
    .optional()
    .default(12),
});

/**
 * @api {get} /api/v1/external/promotion List Promotions
 * @apiName ListPromotions
 * @apiGroup Promotion
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists active promotions with product details and discount calculations
 *
 * @apiParam {Number} [idCategory] Category identifier for filtering
 * @apiParam {Number} [minDiscount] Minimum discount percentage (0-100)
 * @apiParam {Number} [maxDiscount] Maximum discount percentage (0-100)
 * @apiParam {String} [sortBy=maior_desconto] Sort criteria (maior_desconto, menor_preco, maior_preco, alfabetica)
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=12] Items per page (12, 24, or 36)
 *
 * @apiSuccess {Object[]} data Array of promotions
 * @apiSuccess {Number} data.idProduct Product identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String} data.mainImage Main product image URL
 * @apiSuccess {Number} data.price Regular price
 * @apiSuccess {Number} data.promotionalPrice Promotional price
 * @apiSuccess {String} data.unitOfMeasure Unit of measure
 * @apiSuccess {String} data.categoryName Category name
 * @apiSuccess {Number} data.discountPercentage Discount percentage
 * @apiSuccess {String} data.promotionTitle Promotion title
 * @apiSuccess {String} data.startDate Promotion start date
 * @apiSuccess {String} data.endDate Promotion end date
 * @apiSuccess {Number} data.limitPerCustomer Limit per customer (nullable)
 * @apiSuccess {Boolean} data.lastChance Last chance flag
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

    const result = await promotionList({
      idAccount,
      idCategory: validated.idCategory || null,
      minDiscount: validated.minDiscount || null,
      maxDiscount: validated.maxDiscount || null,
      sortBy: validated.sortBy,
      page: validated.page,
      pageSize: validated.pageSize,
    });

    res.json(
      successResponse(result.promotions, {
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
