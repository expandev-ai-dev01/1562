import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductList } from '@/domain/product/hooks/useProductList';
import { useCategoryList } from '@/domain/product/hooks/useCategoryList';
import { usePromotionList } from '@/domain/promotion/hooks/usePromotionList';
import { useBannerList } from '@/domain/promotion/hooks/useBannerList';
import { ProductGrid } from '@/domain/product/components/ProductGrid';
import { CategoryFilter } from '@/domain/product/components/CategoryFilter';
import { Pagination } from '@/domain/product/components/Pagination';
import { BannerCarousel } from '@/domain/promotion/components/BannerCarousel';
import { PromotionGrid } from '@/domain/promotion/components/PromotionGrid';

export const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { banners, isLoading: bannersLoading } = useBannerList();
  const { categories, isLoading: categoriesLoading } = useCategoryList();
  const {
    products,
    isLoading: productsLoading,
    totalPages,
  } = useProductList({
    idCategory: selectedCategory || undefined,
    page: currentPage,
    pageSize,
  });

  const { promotions, isLoading: promotionsLoading } = usePromotionList({
    page: 1,
    pageSize: 6,
    sortBy: 'maior_desconto',
  });

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-12">
      <section>
        <BannerCarousel banners={banners} isLoading={bannersLoading} />
      </section>

      {promotions.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Ofertas do Dia</h2>
            <button
              onClick={() => navigate('/promocoes')}
              className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
            >
              Ver todas as promoções
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <PromotionGrid promotions={promotions} isLoading={promotionsLoading} />
        </section>
      )}

      <section>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossos Produtos</h3>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          isLoading={categoriesLoading}
          className="mb-6"
        />

        <ProductGrid products={products} isLoading={productsLoading} className="mb-8" />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default HomePage;
