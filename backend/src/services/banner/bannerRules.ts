import { getPool } from '@/instances';
import { BannerListParams, BannerEntity } from './bannerTypes';

/**
 * @summary
 * Lists active promotional banners for carousel display.
 * Calls the stored procedure spBannerList to retrieve banners.
 *
 * @function bannerList
 * @module banner
 *
 * @param {BannerListParams} params - Banner list parameters
 * @param {number} params.idAccount - Account identifier
 *
 * @returns {Promise<BannerEntity[]>} Array of banners
 *
 * @throws {DatabaseError} When database operation fails
 *
 * @example
 * const banners = await bannerList({ idAccount: 1 });
 */
export async function bannerList(params: BannerListParams): Promise<BannerEntity[]> {
  const pool = await getPool();

  const result = await pool
    .request()
    .input('idAccount', params.idAccount)
    .execute('[functional].[spBannerList]');

  return result.recordset;
}
