export interface ProductStats {
  name: string;
  type: string;
  id: string;
  gender: string;
  saleDate: number;
  total: number;
}

export interface RecommendationInterface {
  size: string;
  bust: number;
  waist: number;
  hips: number;
  thigh: number;
  inseam: number;
}

export interface ProductInterface {
  startDate: string;
  endDate: string;
  vendor: string;
  id: string;
  name: string;
  picture: string;
  general: {
    returns: number;
    uniqueVisitors: number;
    fmfSales: number;
  };
  recommendedSizes: {
    L: number;
    M: number;
    S: number;
    XL: number;
    XS: number;
    XXL: number;
    NoMatch: number;
  };
  recommendationsTotal: {
    count: number;
    addedToCart: number;
    purchased: number;
  };
  recommendations: Array<RecommendationInterface>;
}

export interface TopProductsStats {
  externalId: string;
  name: string;
  total: number;
  addedToCart: number;
  purchased: number;
}

export interface Product {
  createdAt: string;
  prodId: string;
  prodName: string;
  sizeName: string;
  bust: number;
  waist: number;
  hips: number;
  thigh: number;
  inseam: number;
}

export interface SelectedProductType {
  externalId: string;
  name: string;
  image: string;
}
