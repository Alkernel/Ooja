export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string; // Dynamic Jumia-style categories
  images: string[];
  sizes?: string[];
  specs?: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stock?: number; // Real e-commerce inventory stock count
}

export interface CartItem {
  product: Product;
  selectedSize?: string;
  quantity: number;
}

export interface User {
  email: string;
  name: string;
  phone?: string;
  shippingAddress?: string;
  city?: string;
  zipCode?: string;
  createdAt: string;
  preferredRoute?: 'NG_TO_NG' | 'AFRICA_EXP' | 'US_AIR_CARGO';
  isBlocked?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    price: number;
    quantity: number;
    size?: string;
    image: string;
  }[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'received' | 'disputed';
  disputeReason?: string;
  disputeDescription?: string;
  disputeStatus?: 'pending' | 'under_review' | 'resolved';
  logisticsRoute?: 'NG_TO_NG' | 'AFRICA_EXP' | 'US_AIR_CARGO';
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  rate: number;
  label: string;
  flag: string;
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'NGN', symbol: '₦', name: 'Nigeria (NGN)', rate: 1500, label: 'Nigeria', flag: '🇳🇬' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghana (GHS)', rate: 15, label: 'Ghana', flag: '🇬🇭' },
  { code: 'USD', symbol: '$', name: 'United States (USD)', rate: 1, label: 'United States', flag: '🇺🇸' },
  { code: 'ZAR', symbol: 'R', name: 'South Africa (ZAR)', rate: 18.5, label: 'South Africa', flag: '🇿🇦' },
  { code: 'KES', symbol: 'KSh', name: 'Kenya (KES)', rate: 130, label: 'Kenya', flag: '🇰🇪' },
  { code: 'XOF', symbol: 'CFA', name: 'Mali (CFA)', rate: 600, label: 'Mali', flag: '🇲🇱' },
];

export interface StoreSettings {
  shippingThresholdText: string;
  shippingThresholdUSD: number;
  promoBannerTitle: string;
  promoBannerSeason: string;
  promoBannerSubtitle: string;
  promoBannerDescription: string;
  promoBannerImage: string;
  showPromoBanner: boolean;
  showTrendingShowcase: boolean;
  trendingProductId: string;
  boldStoreLogo: boolean;
}


