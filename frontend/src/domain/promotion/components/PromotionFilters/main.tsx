import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { PromotionFiltersProps } from './types';
import { getFilterButtonClassName, getSelectClassName } from './variants';

export const PromotionFilters = ({
  categories,
  selectedCategory,
  selectedDiscountRange,
  sortBy,
  onCategoryChange,
  onDiscountRangeChange,
  onSortChange,
  isLoading = false,
  className,
}: PromotionFiltersProps) => {
  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  const discountRanges = [
    { label: 'Todos os descontos', value: null, min: null, max: null },
    { label: 'Até 10%', value: '0-10', min: 0, max: 10 },
    { label: '10% a 30%', value: '10-30', min: 10, max: 30 },
    { label: '30% a 50%', value: '30-50', min: 30, max: 50 },
    { label: 'Acima de 50%', value: '50-100', min: 50, max: 100 },
  ];

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={getFilterButtonClassName({ isSelected: selectedCategory === null })}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.idCategory}
              onClick={() => onCategoryChange(category.idCategory)}
              className={getFilterButtonClassName({
                isSelected: selectedCategory === category.idCategory,
              })}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Faixa de Desconto</label>
        <div className="flex flex-wrap gap-2">
          {discountRanges.map((range) => (
            <button
              key={range.value || 'all'}
              onClick={() => onDiscountRangeChange(range.value)}
              className={getFilterButtonClassName({
                isSelected: selectedDiscountRange === range.value,
              })}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
          Ordenar por
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className={getSelectClassName()}
        >
          <option value="maior_desconto">Maior desconto</option>
          <option value="menor_preco">Menor preço</option>
          <option value="maior_preco">Maior preço</option>
          <option value="alfabetica">Ordem alfabética</option>
        </select>
      </div>
    </div>
  );
};
