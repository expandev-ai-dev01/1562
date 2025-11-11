import { clsx } from 'clsx';

export interface CarouselVariantProps {
  className?: string;
}

export function getCarouselClassName(props: CarouselVariantProps): string {
  const { className } = props;

  return clsx('relative overflow-hidden', className);
}

export interface IndicatorVariantProps {
  isActive?: boolean;
}

export function getIndicatorClassName(props: IndicatorVariantProps): string {
  const { isActive = false } = props;

  return clsx('w-3 h-3 rounded-full transition-colors', {
    'bg-white': isActive,
    'bg-white/50 hover:bg-white/75': !isActive,
  });
}
