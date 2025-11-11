import type { Promotion } from '../../types';

export interface UsePromotionListOptions {
  idCategory?: number;
  minDiscount?: number;
  maxDiscount?: number;
  sortBy?: 'maior_desconto' | 'menor_preco' | 'maior_preco' | 'alfabetica';
  page?: number;
  pageSize?: number;
}

export interface UsePromotionListReturn {
  promotions: Promotion[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  refetch: () => void;
}
