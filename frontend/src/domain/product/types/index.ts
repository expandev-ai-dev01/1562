export interface Product {
  idProduct: number;
  name: string;
  mainImage: string;
  price: number;
  unitOfMeasure: string;
  categoryName: string;
  onPromotion: boolean;
  promotionalPrice: number | null;
  availability: string;
  cultivationType: string;
  featured: boolean;
}

export interface ProductListParams {
  idCategory?: number;
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  data: Product[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface Category {
  idCategory: number;
  name: string;
  icon: string | null;
  displayOrder: number;
  productCount: number;
}

export interface CategoryListResponse {
  data: Category[];
}
