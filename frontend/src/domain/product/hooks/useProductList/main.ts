import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductListOptions, UseProductListReturn } from './types';

export const useProductList = (options: UseProductListOptions = {}): UseProductListReturn => {
  const { idCategory, page = 1, pageSize = 12 } = options;

  const queryKey = ['products', { idCategory, page, pageSize }];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.list({ idCategory, page, pageSize }),
    staleTime: 2 * 60 * 1000,
  });

  const products = data?.data || [];
  const total = data?.metadata?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  return {
    products,
    isLoading,
    error: error as Error | null,
    total,
    page,
    pageSize,
    totalPages,
    refetch,
  };
};
