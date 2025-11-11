import { clsx } from 'clsx';

export interface PaginationButtonVariantProps {
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export function getPaginationButtonClassName(props: PaginationButtonVariantProps): string {
  const { isActive = false, isDisabled = false, className } = props;

  return clsx(
    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
    {
      'bg-green-600 text-white': isActive,
      'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300': !isActive && !isDisabled,
      'bg-gray-100 text-gray-400 cursor-not-allowed': isDisabled,
    },
    className
  );
}
