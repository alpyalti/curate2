import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import {
  MiraklApiResponse,
  MiraklApiListResponse,
  MiraklProduct,
  MiraklOffer,
  MiraklShop,
  MiraklOrder,
  SearchParams,
  ProductFilters,
  Cart,
  CartItem,
  Wishlist,
  Category,
  Brand,
} from "../types/mirakl";

interface MiraklClientConfig {
  baseURL: string;
  apiKey: string;
  timeout?: number;
}

interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class MiraklClient {
  private client: AxiosInstance;
  private retryCount = 3;
  private retryDelay = 1000;

  constructor(config: MiraklClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        "X-API-Key": config.apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add timestamp to prevent caching
        if (config.params) {
          config.params._t = Date.now();
        } else {
          config.params = { _t: Date.now() };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // Handle 401 - Unauthorized
        if (error.response?.status === 401) {
          // Trigger sign-in modal
          window.dispatchEvent(new CustomEvent("auth:required"));
          return Promise.reject(this.handleError(error));
        }

        // Handle 429 - Rate Limiting with exponential backoff
        if (error.response?.status === 429 && !originalRequest._retry) {
          originalRequest._retry = true;
          const delay = this.calculateRetryDelay(originalRequest._retryCount || 0);
          await this.sleep(delay);
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
          
          if (originalRequest._retryCount < this.retryCount) {
            return this.client(originalRequest);
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    const status = error.response?.status || 500;
    const responseData = error.response?.data as any;
    const message = responseData?.message || error.message || "An error occurred";
    const code = responseData?.code;

    return { message, status, code };
  }

  private calculateRetryDelay(retryCount: number): number {
    return this.retryDelay * Math.pow(2, retryCount);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Products API
  async getProducts(params: SearchParams = {}): Promise<MiraklApiListResponse<MiraklProduct>> {
    const response: AxiosResponse<MiraklApiListResponse<MiraklProduct>> = 
      await this.client.get("/products", { params });
    return response.data;
  }

  async getProduct(id: string): Promise<MiraklApiResponse<MiraklProduct>> {
    const response: AxiosResponse<MiraklApiResponse<MiraklProduct>> = 
      await this.client.get(`/products/${id}`);
    return response.data;
  }

  async searchProducts(query: string, filters?: ProductFilters): Promise<MiraklApiListResponse<MiraklProduct>> {
    const params = { query, ...filters };
    const response: AxiosResponse<MiraklApiListResponse<MiraklProduct>> = 
      await this.client.get("/products/search", { params });
    return response.data;
  }

  // Offers API
  async getOffers(productId: string): Promise<MiraklApiListResponse<MiraklOffer>> {
    const response: AxiosResponse<MiraklApiListResponse<MiraklOffer>> = 
      await this.client.get(`/products/${productId}/offers`);
    return response.data;
  }

  async getOffer(id: string): Promise<MiraklApiResponse<MiraklOffer>> {
    const response: AxiosResponse<MiraklApiResponse<MiraklOffer>> = 
      await this.client.get(`/offers/${id}`);
    return response.data;
  }

  // Shops API
  async getShops(): Promise<MiraklApiListResponse<MiraklShop>> {
    const response: AxiosResponse<MiraklApiListResponse<MiraklShop>> = 
      await this.client.get("/shops");
    return response.data;
  }

  async getShop(id: string): Promise<MiraklApiResponse<MiraklShop>> {
    const response: AxiosResponse<MiraklApiResponse<MiraklShop>> = 
      await this.client.get(`/shops/${id}`);
    return response.data;
  }

  // Categories API
  async getCategories(): Promise<MiraklApiListResponse<Category>> {
    const response: AxiosResponse<MiraklApiListResponse<Category>> = 
      await this.client.get("/categories");
    return response.data;
  }

  async getCategory(id: string): Promise<MiraklApiResponse<Category>> {
    const response: AxiosResponse<MiraklApiResponse<Category>> = 
      await this.client.get(`/categories/${id}`);
    return response.data;
  }

  // Brands API
  async getBrands(): Promise<MiraklApiListResponse<Brand>> {
    const response: AxiosResponse<MiraklApiListResponse<Brand>> = 
      await this.client.get("/brands");
    return response.data;
  }

  async getBrand(id: string): Promise<MiraklApiResponse<Brand>> {
    const response: AxiosResponse<MiraklApiResponse<Brand>> = 
      await this.client.get(`/brands/${id}`);
    return response.data;
  }

  // Cart API
  async getCart(): Promise<MiraklApiResponse<Cart>> {
    const response: AxiosResponse<MiraklApiResponse<Cart>> = 
      await this.client.get("/cart");
    return response.data;
  }

  async addToCart(item: Omit<CartItem, "id">): Promise<MiraklApiResponse<Cart>> {
    const response: AxiosResponse<MiraklApiResponse<Cart>> = 
      await this.client.post("/cart/items", item);
    return response.data;
  }

  async updateCartItem(itemId: string, updates: Partial<CartItem>): Promise<MiraklApiResponse<Cart>> {
    const response: AxiosResponse<MiraklApiResponse<Cart>> = 
      await this.client.patch(`/cart/items/${itemId}`, updates);
    return response.data;
  }

  async removeFromCart(itemId: string): Promise<MiraklApiResponse<Cart>> {
    const response: AxiosResponse<MiraklApiResponse<Cart>> = 
      await this.client.delete(`/cart/items/${itemId}`);
    return response.data;
  }

  async clearCart(): Promise<MiraklApiResponse<Cart>> {
    const response: AxiosResponse<MiraklApiResponse<Cart>> = 
      await this.client.delete("/cart");
    return response.data;
  }

  // Wishlist API
  async getWishlist(): Promise<MiraklApiResponse<Wishlist>> {
    const response: AxiosResponse<MiraklApiResponse<Wishlist>> = 
      await this.client.get("/wishlist");
    return response.data;
  }

  async addToWishlist(productId: string, variantId?: string): Promise<MiraklApiResponse<Wishlist>> {
    const response: AxiosResponse<MiraklApiResponse<Wishlist>> = 
      await this.client.post("/wishlist/items", { productId, variantId });
    return response.data;
  }

  async removeFromWishlist(itemId: string): Promise<MiraklApiResponse<Wishlist>> {
    const response: AxiosResponse<MiraklApiResponse<Wishlist>> = 
      await this.client.delete(`/wishlist/items/${itemId}`);
    return response.data;
  }

  // Orders API
  async getOrders(): Promise<MiraklApiListResponse<MiraklOrder>> {
    const response: AxiosResponse<MiraklApiListResponse<MiraklOrder>> = 
      await this.client.get("/orders");
    return response.data;
  }

  async getOrder(id: string): Promise<MiraklApiResponse<MiraklOrder>> {
    const response: AxiosResponse<MiraklApiResponse<MiraklOrder>> = 
      await this.client.get(`/orders/${id}`);
    return response.data;
  }

  async createOrder(orderData: any): Promise<MiraklApiResponse<MiraklOrder>> {
    const response: AxiosResponse<MiraklApiResponse<MiraklOrder>> = 
      await this.client.post("/orders", orderData);
    return response.data;
  }
}

// Create client instance
const createMiraklClient = (): MiraklClient | null => {
  const baseURL = process.env.REACT_APP_MIRAKL_BASE_URL;
  const apiKey = process.env.REACT_APP_MIRAKL_API_KEY;

  if (!baseURL || !apiKey) {
    console.warn("Mirakl API configuration missing. Using dummy data.");
    return null;
  }

  return new MiraklClient({
    baseURL,
    apiKey,
    timeout: 15000,
  });
};

export const miraklClient = createMiraklClient();
export { MiraklClient };
export type { ApiError, MiraklClientConfig }; 