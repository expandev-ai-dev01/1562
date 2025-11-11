import type { Category } from '../../types';

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  isLoading?: boolean;
  className?: string;
}
