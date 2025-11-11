import type { Product } from '../../types';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  className?: string;
}
