import type { Banner } from '../../types';

export interface BannerCarouselProps {
  banners: Banner[];
  isLoading?: boolean;
  className?: string;
}
