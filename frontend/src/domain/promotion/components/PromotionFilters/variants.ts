import { clsx } from 'clsx';

export interface FilterButtonVariantProps {
  isSelected?: boolean;
  className?: string;
}

export function getFilterButtonClassName(props: FilterButtonVariantProps): string {
  const { isSelected = false, className } = props;

  return clsx(
    'px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
    {
      'bg-red-600 text-white': isSelected,
      'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300': !isSelected,
    },
    className
  );
}

export function getSelectClassName(): string {
  return 'w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500';
}
