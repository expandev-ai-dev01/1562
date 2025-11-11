import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { PromotionCardProps } from './types';
import {
  getPromotionCardClassName,
  getDiscountBadgeClassName,
  getLastChanceBadgeClassName,
} from './variants';

export const PromotionCard = ({ promotion, className }: PromotionCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (error: unknown) {
      return dateString;
    }
  };

  return (
    <div className={getPromotionCardClassName({ className })}>
      <div className="relative">
        <img
          src={promotion.mainImage}
          alt={promotion.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />

        <div className={getDiscountBadgeClassName()}>-{promotion.discountPercentage}%</div>

        {promotion.lastChance && (
          <div className="absolute top-2 left-2">
            <span className={getLastChanceBadgeClassName()}>ÚLTIMA CHANCE</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{promotion.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{promotion.categoryName}</p>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-600">
              {formatPrice(promotion.promotionalPrice)}
            </span>
            <span className="text-sm text-gray-600">/ {promotion.unitOfMeasure}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(promotion.price)}
            </span>
            <span className="text-sm font-semibold text-green-600">
              Economize {formatPrice(promotion.price - promotion.promotionalPrice)}
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <p>Válido até: {formatDate(promotion.endDate)}</p>
          {promotion.limitPerCustomer && (
            <p className="font-semibold text-orange-600">
              Limite: {promotion.limitPerCustomer} unidade(s) por cliente
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
