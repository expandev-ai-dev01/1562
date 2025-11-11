/**
 * @interface PromotionEntity
 * @description Represents a product in promotion
 *
 * @property {number} idProduct - Product identifier
 * @property {string} name - Product name
 * @property {string} mainImage - Main product image URL
 * @property {number} price - Regular price
 * @property {number} promotionalPrice - Promotional price
 * @property {string} unitOfMeasure - Unit of measure
 * @property {string} categoryName - Category name
 * @property {number} discountPercentage - Discount percentage
 * @property {string} promotionTitle - Promotion title
 * @property {Date} startDate - Promotion start date
 * @property {Date} endDate - Promotion end date
 * @property {number | null} limitPerCustomer - Limit per customer
 * @property {boolean} lastChance - Last chance flag
 */
export interface PromotionEntity {
  idProduct: number;
  name: string;
  mainImage: string;
  price: number;
  promotionalPrice: number;
  unitOfMeasure: string;
  categoryName: string;
  discountPercentage: number;
  promotionTitle: string;
  startDate: Date;
  endDate: Date;
  limitPerCustomer: number | null;
  lastChance: boolean;
}

/**
 * @interface PromotionListParams
 * @description Parameters for listing promotions
 *
 * @property {number} idAccount - Account identifier
 * @property {number | null} idCategory - Category filter (null for all)
 * @property {number | null} minDiscount - Minimum discount percentage
 * @property {number | null} maxDiscount - Maximum discount percentage
 * @property {string} sortBy - Sort criteria
 * @property {number} page - Page number
 * @property {number} pageSize - Items per page
 */
export interface PromotionListParams {
  idAccount: number;
  idCategory: number | null;
  minDiscount: number | null;
  maxDiscount: number | null;
  sortBy: string;
  page: number;
  pageSize: number;
}

/**
 * @interface PromotionListResult
 * @description Result of promotion list operation
 *
 * @property {PromotionEntity[]} promotions - Array of promotions
 * @property {number} total - Total number of promotions
 */
export interface PromotionListResult {
  promotions: PromotionEntity[];
  total: number;
}
