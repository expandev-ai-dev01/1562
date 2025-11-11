import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/middleware';
import { bannerList } from '@/services/banner';

/**
 * @api {get} /api/v1/external/banner List Banners
 * @apiName ListBanners
 * @apiGroup Banner
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists active promotional banners for carousel display
 *
 * @apiSuccess {Object[]} data Array of banners
 * @apiSuccess {Number} data.idBanner Banner identifier
 * @apiSuccess {String} data.title Banner title
 * @apiSuccess {String} data.subtitle Banner subtitle (nullable)
 * @apiSuccess {String} data.imageUrl Banner image URL
 * @apiSuccess {String} data.destinationUrl Destination URL
 * @apiSuccess {String} data.startDate Banner start date
 * @apiSuccess {String} data.endDate Banner end date
 * @apiSuccess {Number} data.displayOrder Display order
 * @apiSuccess {Number} data.transitionTime Transition time in seconds
 *
 * @apiError {String} ServerError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const idAccount = 1;

    const banners = await bannerList({ idAccount });

    res.json(successResponse(banners));
  } catch (error: any) {
    next(error);
  }
}
