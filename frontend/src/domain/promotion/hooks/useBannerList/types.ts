import type { Banner } from '../../types';

export interface UseBannerListReturn {
  banners: Banner[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
