import { useState, useMemo } from "react";
import { MiraklProduct, SearchParams } from "../types/mirakl";
import productsData from "../fixtures/products.json";

const dummyProducts = productsData as MiraklProduct[];

interface UseDummyProductsResult {
  data: MiraklProduct[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLoading: boolean;
  error: null;
}

export function useDummyProducts(params: SearchParams = {}): UseDummyProductsResult {
  const [isLoading] = useState(false);
  
  const {
    query = "",
    filters = {},
    page = 1,
    size = 12
  } = params;

  const filteredProducts = useMemo(() => {
    let filtered = [...dummyProducts];

    // Search filter
    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(product => 
        filters.category!.includes(product.category)
      );
    }

    // Brand filter
    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter(product => 
        filters.brand!.includes(product.brand)
      );
    }

    // Price filter
    if (filters.price) {
      filtered = filtered.filter(product => {
        // Use the current price (already discounted if discount exists)
        const price = product.price?.amount;
        if (price === undefined || price === null) return false;
        return price >= filters.price!.min && price <= filters.price!.max;
      });
    }

    // Color filter
    if (filters.color && filters.color.length > 0) {
      filtered = filtered.filter(product => 
        product.variants.some(variant =>
          variant.attributes.some(attr =>
            attr.name === "color" && filters.color!.includes(attr.value)
          )
        )
      );
    }

    // Size filter
    if (filters.size && filters.size.length > 0) {
      filtered = filtered.filter(product => 
        product.variants.some(variant =>
          variant.attributes.some(attr =>
            attr.name === "size" && filters.size!.includes(attr.value)
          )
        )
      );
    }

    // Rating filter
    if (filters.rating && filters.rating > 0) {
      filtered = filtered.filter(product => 
        product.rating && product.rating.average >= filters.rating!
      );
    }

    // Availability filter
    if (filters.availability === "in-stock") {
      filtered = filtered.filter(product => product.availability.inStock);
    }

    // Discount filter
    if (filters.discount) {
      filtered = filtered.filter(product => !!product.discount);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
        case "price-low":
          filtered.sort((a, b) => {
            const priceA = a.price?.amount || 0;
            const priceB = b.price?.amount || 0;
            return priceA - priceB;
          });
          break;
        case "price-desc":
        case "price-high":
          filtered.sort((a, b) => {
            const priceA = a.price?.amount || 0;
            const priceB = b.price?.amount || 0;
            return priceB - priceA;
          });
          break;
        case "rating":
          filtered.sort((a, b) => {
            const ratingA = a.rating?.average || 0;
            const ratingB = b.rating?.average || 0;
            return ratingB - ratingA;
          });
          break;
        case "newest":
          filtered.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "popularity":
          filtered.sort((a, b) => {
            const reviewsA = a.rating?.count || 0;
            const reviewsB = b.rating?.count || 0;
            return reviewsB - reviewsA;
          });
          break;
        case "featured":
        default:
          // Featured/Relevance - no specific sorting for dummy data
          break;
      }
    }

    return filtered;
  }, [query, filters]);

  const paginatedResult = useMemo(() => {
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / size);
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    
    const data = filteredProducts.slice(startIndex, endIndex);
    
    return {
      data,
      total,
      page,
      size,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
      isLoading,
      error: null
    };
  }, [filteredProducts, page, size, isLoading]);

  return paginatedResult;
}

export function useDummyProduct(id: string) {
  const product = useMemo(() => 
    dummyProducts.find(p => p.id === id) || null,
    [id]
  );

  return {
    data: product,
    isLoading: false,
    error: product ? null : new Error("Product not found")
  };
}

export function getDummyCategories() {
  const categories = Array.from(new Set(dummyProducts.map(p => p.category)));
  return categories.map((category, index) => ({
    id: `cat-${index}`,
    name: category.charAt(0).toUpperCase() + category.slice(1),
    slug: category,
    productCount: dummyProducts.filter(p => p.category === category).length,
    level: 1,
    order: index
  }));
}

export function getDummyBrands() {
  const brands = Array.from(new Set(dummyProducts.map(p => p.brand)));
  return brands.map((brand, index) => ({
    id: `brand-${index}`,
    name: brand,
    slug: brand.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    productCount: dummyProducts.filter(p => p.brand === brand).length
  }));
}

export function getDummyColors() {
  const colors = new Set<string>();
  dummyProducts.forEach(product => {
    product.variants.forEach(variant => {
      variant.attributes.forEach(attr => {
        if (attr.name === "color") {
          colors.add(attr.value);
        }
      });
    });
  });
  return Array.from(colors);
}

export function getDummySizes() {
  const sizes = new Set<string>();
  dummyProducts.forEach(product => {
    product.variants.forEach(variant => {
      variant.attributes.forEach(attr => {
        if (attr.name === "size") {
          sizes.add(attr.value);
        }
      });
    });
  });
  return Array.from(sizes);
}

export function getDummyPriceRange() {
  const prices = dummyProducts.map(p => p.price.amount).filter(price => price != null);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
} 