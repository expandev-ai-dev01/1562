import type { Category } from '../../types';

export interface UseCategoryListReturn {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
