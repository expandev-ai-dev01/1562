import { clsx } from 'clsx';

export interface CategoryButtonVariantProps {
  isSelected?: boolean;
  className?: string;
}

export function getCategoryButtonClassName(props: CategoryButtonVariantProps): string {
  const { isSelected = false, className } = props;

  return clsx(
    'px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
    {
      'bg-green-600 text-white': isSelected,
      'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300': !isSelected,
    },
    className
  );
}
