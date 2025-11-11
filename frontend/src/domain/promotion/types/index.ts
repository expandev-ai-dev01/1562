export interface Promotion {
  idProduct: number;
  name: string;
  mainImage: string;
  price: number;
  promotionalPrice: number;
  unitOfMeasure: string;
  categoryName: string;
  discountPercentage: number;
  promotionTitle: string;
  startDate: string;
  endDate: string;
  limitPerCustomer: number | null;
  lastChance: boolean;
}

export interface PromotionListParams {
  idCategory?: number;
  minDiscount?: number;
  maxDiscount?: number;
  sortBy?: 'maior_desconto' | 'menor_preco' | 'maior_preco' | 'alfabetica';
  page?: number;
  pageSize?: number;
}

export interface PromotionListResponse {
  data: Promotion[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface Banner {
  idBanner: number;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  destinationUrl: string;
  startDate: string;
  endDate: string;
  displayOrder: number;
  transitionTime: number;
}

export interface BannerListResponse {
  data: Banner[];
}
