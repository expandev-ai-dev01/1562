import type { Promotion } from '../../types';

export interface PromotionGridProps {
  promotions: Promotion[];
  isLoading?: boolean;
  className?: string;
}
