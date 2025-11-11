import { useState } from 'react';
import { usePromotionList } from '@/domain/promotion/hooks/usePromotionList';
import { useCategoryList } from '@/domain/product/hooks/useCategoryList';
import { PromotionGrid } from '@/domain/promotion/components/PromotionGrid';
import { PromotionFilters } from '@/domain/promotion/components/PromotionFilters';
import { Pagination } from '@/domain/product/components/Pagination';

export const PromotionsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDiscountRange, setSelectedDiscountRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<
    'maior_desconto' | 'menor_preco' | 'maior_preco' | 'alfabetica'
  >('maior_desconto');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { categories, isLoading: categoriesLoading } = useCategoryList();

  const getDiscountRange = (range: string | null) => {
    if (!range) return { min: undefined, max: undefined };
    const [min, max] = range.split('-').map(Number);
    return { min, max };
  };

  const { min: minDiscount, max: maxDiscount } = getDiscountRange(selectedDiscountRange);

  const {
    promotions,
    isLoading: promotionsLoading,
    totalPages,
  } = usePromotionList({
    idCategory: selectedCategory || undefined,
    minDiscount,
    maxDiscount,
    sortBy,
    page: currentPage,
    pageSize,
  });

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleDiscountRangeChange = (range: string | null) => {
    setSelectedDiscountRange(range);
    setCurrentPage(1);
  };

  const handleSortChange = (
    sort: 'maior_desconto' | 'menor_preco' | 'maior_preco' | 'alfabetica'
  ) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Todas as Promoções</h2>
        <p className="text-xl text-gray-600">Aproveite as melhores ofertas em produtos frescos</p>
      </section>

      <section>
        <PromotionFilters
          categories={categories}
          selectedCategory={selectedCategory}
          selectedDiscountRange={selectedDiscountRange}
          sortBy={sortBy}
          onCategoryChange={handleCategoryChange}
          onDiscountRangeChange={handleDiscountRangeChange}
          onSortChange={handleSortChange}
          isLoading={categoriesLoading}
          className="mb-6"
        />

        <PromotionGrid promotions={promotions} isLoading={promotionsLoading} className="mb-8" />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default PromotionsPage;
