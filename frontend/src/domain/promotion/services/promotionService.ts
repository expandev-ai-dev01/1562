import { publicClient } from '@/core/lib/api';
import type {
  Promotion,
  PromotionListParams,
  PromotionListResponse,
  Banner,
  BannerListResponse,
} from '../types';

export const promotionService = {
  async list(params: PromotionListParams): Promise<PromotionListResponse> {
    const response = await publicClient.get<PromotionListResponse>('/promotion', { params });
    return response.data;
  },

  async listBanners(): Promise<Banner[]> {
    const response = await publicClient.get<BannerListResponse>('/banner');
    return response.data.data;
  },
};
