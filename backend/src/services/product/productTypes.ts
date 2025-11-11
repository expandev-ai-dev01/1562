/**
 * @interface ProductEntity
 * @description Represents a product in the catalog
 *
 * @property {number} idProduct - Product identifier
 * @property {string} name - Product name
 * @property {string} mainImage - Main product image URL
 * @property {number} price - Regular price
 * @property {string} unitOfMeasure - Unit of measure
 * @property {string} categoryName - Category name
 * @property {boolean} onPromotion - Promotion flag
 * @property {number | null} promotionalPrice - Promotional price
 * @property {string} availability - Availability status
 * @property {string | null} cultivationType - Cultivation type
 * @property {boolean} featured - Featured flag
 */
export interface ProductEntity {
  idProduct: number;
  name: string;
  mainImage: string;
  price: number;
  unitOfMeasure: string;
  categoryName: string;
  onPromotion: boolean;
  promotionalPrice: number | null;
  availability: string;
  cultivationType: string | null;
  featured: boolean;
}

/**
 * @interface ProductListParams
 * @description Parameters for listing products
 *
 * @property {number} idAccount - Account identifier
 * @property {number | null} idCategory - Category filter (null for all)
 * @property {number} page - Page number
 * @property {number} pageSize - Items per page
 */
export interface ProductListParams {
  idAccount: number;
  idCategory: number | null;
  page: number;
  pageSize: number;
}

/**
 * @interface ProductListResult
 * @description Result of product list operation
 *
 * @property {ProductEntity[]} products - Array of products
 * @property {number} total - Total number of products
 */
export interface ProductListResult {
  products: ProductEntity[];
  total: number;
}
