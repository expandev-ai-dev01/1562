/**
 * @interface CategoryEntity
 * @description Represents a product category
 *
 * @property {number} idCategory - Category identifier
 * @property {string} name - Category name
 * @property {string | null} icon - Category icon URL
 * @property {number} displayOrder - Display order
 * @property {number} productCount - Number of active products
 */
export interface CategoryEntity {
  idCategory: number;
  name: string;
  icon: string | null;
  displayOrder: number;
  productCount: number;
}

/**
 * @interface CategoryListParams
 * @description Parameters for listing categories
 *
 * @property {number} idAccount - Account identifier
 */
export interface CategoryListParams {
  idAccount: number;
}
