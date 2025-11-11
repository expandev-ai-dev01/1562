import { ProductCard } from '../ProductCard';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { ProductGridProps } from './types';

export const ProductGrid = ({ products, isLoading = false, className }: ProductGridProps) => {
  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className || ''}`}>
      {products.map((product) => (
        <ProductCard key={product.idProduct} product={product} />
      ))}
    </div>
  );
};
