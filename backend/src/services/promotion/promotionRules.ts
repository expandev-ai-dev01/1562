import { getPool } from '@/instances';
import { PromotionListParams, PromotionListResult } from './promotionTypes';

/**
 * @summary
 * Lists active promotions with product details and discount calculations.
 * Calls the stored procedure spPromotionList to retrieve promotions.
 *
 * @function promotionList
 * @module promotion
 *
 * @param {PromotionListParams} params - Promotion list parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number | null} params.idCategory - Category filter (null for all)
 * @param {number | null} params.minDiscount - Minimum discount percentage
 * @param {number | null} params.maxDiscount - Maximum discount percentage
 * @param {string} params.sortBy - Sort criteria
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Items per page
 *
 * @returns {Promise<PromotionListResult>} Promotion list with pagination info
 *
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const result = await promotionList({
 *   idAccount: 1,
 *   idCategory: null,
 *   minDiscount: null,
 *   maxDiscount: null,
 *   sortBy: 'maior_desconto',
 *   page: 1,
 *   pageSize: 12
 * });
 */
export async function promotionList(params: PromotionListParams): Promise<PromotionListResult> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('idCategory', params.idCategory)
    .input('minDiscount', params.minDiscount)
    .input('maxDiscount', params.maxDiscount)
    .input('sortBy', params.sortBy)
    .input('page', params.page)
    .input('pageSize', params.pageSize)
    .execute('[functional].[spPromotionList]');

  const promotions = Array.isArray(result.recordsets) ? result.recordsets[0] : [];
  const totalResult = Array.isArray(result.recordsets) ? result.recordsets[1] : [];
  const total = Array.isArray(totalResult) && totalResult[0] ? totalResult[0].total : 0;

  return {
    promotions,
    total,
  };
}
