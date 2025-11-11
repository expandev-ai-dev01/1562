import type { Product, ProductListParams } from '../../types';

export interface UseProductListOptions {
  idCategory?: number;
  page?: number;
  pageSize?: number;
}

export interface UseProductListReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  refetch: () => void;
}
