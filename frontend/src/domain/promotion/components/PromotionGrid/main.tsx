import { PromotionCard } from '../PromotionCard';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { PromotionGridProps } from './types';

export const PromotionGrid = ({ promotions, isLoading = false, className }: PromotionGridProps) => {
  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (promotions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Nenhuma promoção encontrada</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className || ''}`}>
      {promotions.map((promotion) => (
        <PromotionCard key={promotion.idProduct} promotion={promotion} />
      ))}
    </div>
  );
};
