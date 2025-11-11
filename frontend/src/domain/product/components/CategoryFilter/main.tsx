import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { CategoryFilterProps } from './types';
import { getCategoryButtonClassName } from './variants';

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isLoading = false,
  className,
}: CategoryFilterProps) => {
  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      <div className="flex gap-2 pb-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={getCategoryButtonClassName({ isSelected: selectedCategory === null })}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.idCategory}
            onClick={() => onCategoryChange(category.idCategory)}
            className={getCategoryButtonClassName({
              isSelected: selectedCategory === category.idCategory,
            })}
          >
            {category.name} ({category.productCount})
          </button>
        ))}
      </div>
    </div>
  );
};
