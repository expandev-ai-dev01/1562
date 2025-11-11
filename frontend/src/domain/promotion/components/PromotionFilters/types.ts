import type { Category } from '@/domain/product/types';

export interface PromotionFiltersProps {
  categories: Category[];
  selectedCategory: number | null;
  selectedDiscountRange: string | null;
  sortBy: 'maior_desconto' | 'menor_preco' | 'maior_preco' | 'alfabetica';
  onCategoryChange: (categoryId: number | null) => void;
  onDiscountRangeChange: (range: string | null) => void;
  onSortChange: (sort: 'maior_desconto' | 'menor_preco' | 'maior_preco' | 'alfabetica') => void;
  isLoading?: boolean;
  className?: string;
}
