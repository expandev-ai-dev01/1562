import { useState } from 'react';
import { useProductList } from '@/domain/product/hooks/useProductList';
import { useCategoryList } from '@/domain/product/hooks/useCategoryList';
import { ProductGrid } from '@/domain/product/components/ProductGrid';
import { CategoryFilter } from '@/domain/product/components/CategoryFilter';
import { Pagination } from '@/domain/product/components/Pagination';

export const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

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

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao HORTifruti</h2>
        <p className="text-xl text-gray-600">Produtos frescos e de qualidade para você</p>
      </section>

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
