/**
 * @interface BannerEntity
 * @description Represents a promotional banner
 *
 * @property {number} idBanner - Banner identifier
 * @property {string} title - Banner title
 * @property {string | null} subtitle - Banner subtitle
 * @property {string} imageUrl - Banner image URL
 * @property {string} destinationUrl - Destination URL
 * @property {Date} startDate - Banner start date
 * @property {Date} endDate - Banner end date
 * @property {number} displayOrder - Display order
 * @property {number} transitionTime - Transition time in seconds
 */
export interface BannerEntity {
  idBanner: number;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  destinationUrl: string;
  startDate: Date;
  endDate: Date;
  displayOrder: number;
  transitionTime: number;
}

/**
 * @interface BannerListParams
 * @description Parameters for listing banners
 *
 * @property {number} idAccount - Account identifier
 */
export interface BannerListParams {
  idAccount: number;
}
