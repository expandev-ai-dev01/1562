import { useQuery } from '@tanstack/react-query';
import { promotionService } from '../../services/promotionService';
import type { UsePromotionListOptions, UsePromotionListReturn } from './types';

export const usePromotionList = (options: UsePromotionListOptions = {}): UsePromotionListReturn => {
  const {
    idCategory,
    minDiscount,
    maxDiscount,
    sortBy = 'maior_desconto',
    page = 1,
    pageSize = 12,
  } = options;

  const queryKey = ['promotions', { idCategory, minDiscount, maxDiscount, sortBy, page, pageSize }];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      promotionService.list({ idCategory, minDiscount, maxDiscount, sortBy, page, pageSize }),
    staleTime: 2 * 60 * 1000,
  });

  const promotions = data?.data || [];
  const total = data?.metadata?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  return {
    promotions,
    isLoading,
    error: error as Error | null,
    total,
    page,
    pageSize,
    totalPages,
    refetch,
  };
};
