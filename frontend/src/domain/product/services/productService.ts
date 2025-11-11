import { publicClient } from '@/core/lib/api';
import type {
  Product,
  ProductListParams,
  ProductListResponse,
  Category,
  CategoryListResponse,
} from '../types';

export const productService = {
  async list(params: ProductListParams): Promise<ProductListResponse> {
    const response = await publicClient.get<ProductListResponse>('/product', { params });
    return response.data;
  },

  async listCategories(): Promise<Category[]> {
    const response = await publicClient.get<CategoryListResponse>('/category');
    return response.data.data;
  },
};
