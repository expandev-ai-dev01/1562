import { getPool } from '@/instances';
import { CategoryListParams, CategoryEntity } from './categoryTypes';

/**
 * @summary
 * Lists active categories with product counts.
 * Calls the stored procedure spCategoryList to retrieve categories.
 *
 * @function categoryList
 * @module category
 *
 * @param {CategoryListParams} params - Category list parameters
 * @param {number} params.idAccount - Account identifier
 *
 * @returns {Promise<CategoryEntity[]>} Array of categories
 *
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const categories = await categoryList({ idAccount: 1 });
 */
export async function categoryList(params: CategoryListParams): Promise<CategoryEntity[]> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .execute('[functional].[spCategoryList]');

  return result.recordset;
}
