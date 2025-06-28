// Mirakl API v3 TypeScript interfaces

export interface MiraklProduct {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  sku: string;
  images: ProductImage[];
  variants: ProductVariant[];
  price: Price;
  originalPrice?: Price;
  discount?: Discount;
  badges?: ProductBadge[];
  rating?: ProductRating;
  availability: ProductAvailability;
  attributes: ProductAttribute[];
  seo: SEOData;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  attributes: VariantAttribute[];
  price: Price;
  stock: Stock;
  images?: ProductImage[];
  available?: boolean; // For simplified variant availability
}

export interface VariantAttribute {
  name: string;
  value: string;
  displayName: string;
}

export interface Price {
  amount: number;
  currency: string;
  formattedAmount: string;
}

export interface Discount {
  type: "percentage" | "fixed";
  value: number;
  originalPrice?: Price;
  discountedPrice?: Price;
  validFrom?: string;
  validTo?: string;
}

export interface ProductBadge {
  type: "new-season" | "sale" | "exclusive" | "low-stock" | "further-reduction";
  label: string;
  color: string;
  textColor: string;
}

export interface ProductRating {
  average: number;
  count: number;
  distribution: RatingDistribution[];
}

export interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

export interface ProductAvailability {
  inStock: boolean;
  quantity: number;
  lowStockThreshold: number;
  restockDate?: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
  displayName: string;
  group: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}

export interface Stock {
  quantity: number;
  available: boolean;
  lowStock: boolean;
  restockDate?: string;
}

// Mirakl Shop/Seller interfaces
export interface MiraklShop {
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  rating: ShopRating;
  location: ShopLocation;
  policies: ShopPolicies;
  createdAt: string;
}

export interface ShopRating {
  average: number;
  count: number;
}

export interface ShopLocation {
  country: string;
  city: string;
  address?: string;
}

export interface ShopPolicies {
  shipping: string;
  returns: string;
  privacy: string;
}

// Mirakl Offer interfaces
export interface MiraklOffer {
  id: string;
  productId: string;
  shopId: string;
  price: Price;
  originalPrice?: Price;
  stock: Stock;
  shipping: ShippingInfo;
  condition: "new" | "used" | "refurbished";
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingInfo {
  cost: Price;
  estimatedDelivery: string;
  freeShippingThreshold?: Price;
  methods: ShippingMethod[];
}

export interface ShippingMethod {
  id: string;
  name: string;
  cost: Price;
  estimatedDays: number;
}

// Mirakl Order interfaces
export interface MiraklOrder {
  id: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  shipping: OrderShipping;
  billing: OrderBilling;
  payment: PaymentInfo;
  totals: OrderTotals;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  offerId: string;
  shopId: string;
  title: string;
  image: string;
  price: Price;
  quantity: number;
  total: Price;
}

export interface OrderShipping {
  address: Address;
  method: ShippingMethod;
  trackingNumber?: string;
  estimatedDelivery: string;
}

export interface OrderBilling {
  address: Address;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface PaymentInfo {
  method: string;
  status: PaymentStatus;
  transactionId: string;
  processedAt: string;
}

export interface OrderTotals {
  subtotal: Price;
  shipping: Price;
  tax: Price;
  discount?: Price;
  total: Price;
}

export type OrderStatus = 
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus = 
  | "pending"
  | "authorized"
  | "captured"
  | "failed"
  | "refunded";

// API Response interfaces
export interface MiraklApiResponse<T> {
  data: T;
  meta: ResponseMeta;
}

export interface MiraklApiListResponse<T> {
  data: T[];
  meta: ResponseMeta & PaginationMeta;
}

export interface ResponseMeta {
  timestamp: string;
  requestId: string;
}

export interface PaginationMeta {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Filter and Search interfaces
export interface ProductFilters {
  category?: string[];
  brand?: string[];
  price?: PriceRange;
  color?: string[];
  size?: string[];
  rating?: number;
  availability?: "in-stock" | "all";
  discount?: boolean;
  sortBy?: ProductSortOption;
}

export interface PriceRange {
  min: number;
  max: number;
}

export type ProductSortOption = 
  | "relevance"
  | "featured"
  | "price-asc"
  | "price-desc"
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "popularity";

export interface SearchParams {
  query?: string;
  filters?: ProductFilters;
  page?: number;
  size?: number;
}

// Shopping Cart interfaces
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  offerId: string;
  title: string;
  brand: string;
  image: string;
  price: Price;
  quantity: number;
  maxQuantity: number;
  attributes: VariantAttribute[];
}

export interface Cart {
  id: string;
  items: CartItem[];
  totals: CartTotals;
  updatedAt: string;
}

export interface CartTotals {
  subtotal: Price;
  shipping?: Price;
  tax?: Price;
  discount?: Price;
  total: Price;
  itemCount: number;
}

// Wishlist interfaces
export interface WishlistItem {
  id: string;
  productId: string;
  variantId?: string;
  addedAt: string;
}

export interface Wishlist {
  id: string;
  items: WishlistItem[];
  updatedAt: string;
}

// Category interfaces
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
  level: number;
  order: number;
}

// Brand interfaces
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  productCount: number;
} 