import { useQuery } from '@tanstack/react-query';
import { promotionService } from '../../services/promotionService';
import type { UseBannerListReturn } from './types';

export const useBannerList = (): UseBannerListReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['banners'],
    queryFn: () => promotionService.listBanners(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    banners: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
