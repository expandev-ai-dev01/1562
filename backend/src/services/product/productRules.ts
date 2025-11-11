import { getPool } from '@/instances';
import { ProductListParams, ProductListResult } from './productTypes';

/**
 * @summary
 * Lists products from the catalog with optional category filtering and pagination.
 * Calls the stored procedure spProductList to retrieve products.
 *
 * @function productList
 * @module product
 *
 * @param {ProductListParams} params - Product list parameters
 * @param {number} params.idAccount - Account identifier
 * @param {number | null} params.idCategory - Category filter (null for all)
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Items per page
 *
 * @returns {Promise<ProductListResult>} Product list with pagination info
 *
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const result = await productList({
 *   idAccount: 1,
 *   idCategory: null,
 *   page: 1,
 *   pageSize: 12
 * });
 */
export async function productList(params: ProductListParams): Promise<ProductListResult> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .input('idCategory', params.idCategory)
    .input('page', params.page)
    .input('pageSize', params.pageSize)
    .execute('[functional].[spProductList]');

  const products = Array.isArray(result.recordsets) ? result.recordsets[0] : [];
  const totalResult = Array.isArray(result.recordsets) ? result.recordsets[1] : [];
  const total = Array.isArray(totalResult) && totalResult[0] ? totalResult[0].total : 0;

  return {
    products,
    total,
  };
}
