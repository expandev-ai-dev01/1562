import { clsx } from 'clsx';

export interface ProductCardVariantProps {
  isEsgotado?: boolean;
  className?: string;
}

export function getProductCardClassName(props: ProductCardVariantProps): string {
  const { isEsgotado = false, className } = props;

  return clsx(
    'bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105',
    {
      'opacity-60': isEsgotado,
    },
    className
  );
}

export function getProductImageClassName(isEsgotado: boolean): string {
  return clsx('w-full h-48 object-cover', {
    'opacity-50': isEsgotado,
  });
}
