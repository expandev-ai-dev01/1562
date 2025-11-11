import { clsx } from 'clsx';

export interface PromotionCardVariantProps {
  className?: string;
}

export function getPromotionCardClassName(props: PromotionCardVariantProps): string {
  const { className } = props;

  return clsx(
    'bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105',
    className
  );
}

export function getDiscountBadgeClassName(): string {
  return 'absolute top-2 right-2 bg-red-600 text-white text-lg font-bold px-3 py-2 rounded-full';
}

export function getLastChanceBadgeClassName(): string {
  return 'bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded';
}
