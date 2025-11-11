import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseCategoryListReturn } from './types';

export const useCategoryList = (): UseCategoryListReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.listCategories(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    categories: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
