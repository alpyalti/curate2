import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import { useDummyProducts } from "../../hooks/useDummyProducts";

const categoryTiles = [
  {
    id: "sale",
    title: "Up to",
    subtitle: "75% off",
    description: "Sale",
    href: "/sale",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    className: "col-span-2 row-span-2 bg-gradient-to-br from-red-500 to-red-600 text-white",
    featured: true
  },
  {
    id: "women",
    title: "Women",
    href: "/c/women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "men",
    title: "Men",
    href: "/c/men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "sports",
    title: "Sports",
    href: "/c/sports",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "home",
    title: "Home",
    href: "/c/home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "kids",
    title: "Kids",
    href: "/c/kids",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "beauty",
    title: "Beauty",
    href: "/c/beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "jewellery",
    title: "Jewellery",
    href: "/c/jewellery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "tech",
    title: "Tech",
    href: "/c/tech",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop",
    className: "col-span-1 row-span-1"
  }
];

const brands = [
  { 
    name: "Lets Swim", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-.png?context=bWFzdGVyfGltYWdlc3w2Mzk0fGltYWdlL3BuZ3xhREpsTDJnd1pTODVNRFV5TXpVek5EWXlNekF5TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BMbkJ1Wnd8ZmE1ZjRiZGNkMzA4MGU3YTIwMWQyMDU5ZjZmNjliOTA4MDQ3OGFiZDViY2Y3MTRhMzcyMDNiMmFhMjljYWVhOA" 
  },
  { 
    name: "Nori Enomoto", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-6-.png?context=bWFzdGVyfGltYWdlc3w5OTI1fGltYWdlL3BuZ3xhR0l5TDJnMFpDODVNRFV5TXpVM016azBORFl5TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2cyS1M1d2JtY3wxNjBlMzY5Y2QzN2Y1ODFiYzE4YjYwYWE2OWEzMDZkOTljY2ZjYWFkNzJhYjI3ZWI0MTMzODlkOTg4ZDcwOTcw" 
  },
  { 
    name: "Capello", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-4-.png?context=bWFzdGVyfGltYWdlc3w5MzM2fGltYWdlL3BuZ3xhR1F5TDJoaFpDODVNRFV5TXpVMk5qUXdOems0TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2cwS1M1d2JtY3xjZGQ4NmExNWEyMDUwNWIxOWZmY2ZlOWQxYmQ1YzkyYjY2NjQ3Y2FkYWJkZmQ5YTczYTY0NTMzOGIyNThiMTU0" 
  },
  { 
    name: "Muse for All", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-7-.png?context=bWFzdGVyfGltYWdlc3wzMzk2fGltYWdlL3BuZ3xhR0kxTDJnMFlTODVNRFV5TXpVM05EVTVPVGs0TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2czS1M1d2JtY3xmYzAzZDI3YjY0ZmQyZDU5MDgxOGE1NzZmYjMyODIzOTU2Y2M0OTBiMjU1YjQyNDJhNWQzNWU3NmU0N2I1ZTMw" 
  },
  { 
    name: "Tay Candles", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Tay.png?context=bWFzdGVyfGltYWdlc3w2MTM4fGltYWdlL3BuZ3xhR1ZoTDJneVppODVNRFV5TXpVNE9UTTBOVFU0TDFSaGVTNXdibWN8YmNiM2IzMmFjZjAwNDg5ODdmNWJkMzRhM2MwOTQ1NmM5ZWFjYmI5YWFmZGQ2NWNhNTgyMmVmOTQ2MzAwNzhhZA" 
  },
  { 
    name: "Iconic London", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-8-.png?context=bWFzdGVyfGltYWdlc3w1Mjg2fGltYWdlL3BuZ3xhREUyTDJnellTODVNRFV5TXpVM09URTROelV3TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2c0S1M1d2JtY3w5ZGJkNjkxNWY5Mjc4N2E0NzBlYmRmMzZmM2E2NDgxOTllZTM5MTBkNDg2Mzk3ZjFjODlhODQwNWM2ZWJjMzhh" 
  },
  { 
    name: "İbrou", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Ibrou.png?context=bWFzdGVyfGltYWdlc3w4NzI5fGltYWdlL3BuZ3xhREUwTDJnM1ppODVNRFV5TXpVNU1UazJOekF5TDBsaWNtOTFMbkJ1Wnd8ODI5YjYyNGM3Y2NjYjNkNTMwYWUxOWM2NmUyNzNjZmY3NGE0NmFkNjExYWYxYTlmNjgzZTE1MDRlMmY3ODljNQ" 
  },
  { 
    name: "Mixsoon", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/mixsoon.png?context=bWFzdGVyfGltYWdlc3w1MTIyfGltYWdlL3BuZ3xhR1V5TDJnNE9HODVNRFV5TXpVNU5EVTRPRFEyTDIxcGVITnZiMjR1Y0c1bnw3NGI4NzMwOGMwZTFkZjgxMTJiMzBjNzUzZDIzMzUzMjFiZTgwNzliYmRiOTAzYTViMjkyOWVhNjdhNDc1ZmJl" 
  },
  { 
    name: "Georgini", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-9-.png?context=bWFzdGVyfGltYWdlc3w0NTAwfGltYWdlL3BuZ3xhREUzTDJnMk1HODVNRFV5TXpZd05EQTVNVEU0TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2c1S1M1d2JtY3xmN2M5MDU4MTEwNzM1M2FlZDg5YzY0MTEyMmY3MGVlOTk3ZDdiNzNkMGI1ZTg1ZjdjODZhYzI0Yjc2OWZjODk1" 
  }
];

export function HomePage() {
  const [brandScrollPosition, setBrandScrollPosition] = React.useState(0);
  const brandScrollRef = React.useRef<HTMLDivElement>(null);

  const { data: newInProducts } = useDummyProducts({ 
    filters: { sortBy: "newest" }, 
    page: 1, 
    size: 8 
  });
  
  const { data: trendingProducts } = useDummyProducts({ 
    filters: { sortBy: "popularity" }, 
    page: 1, 
    size: 8 
  });
  
  const { data: curatePicksProducts } = useDummyProducts({ 
    filters: { sortBy: "newest" }, 
    page: 1, 
    size: 8 
  });

  const scrollBrands = (direction: 'left' | 'right') => {
    if (!brandScrollRef.current) return;
    
    const scrollAmount = 280; // Width of brand card + gap
    const container = brandScrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    let newPosition = brandScrollPosition;
    
    if (direction === 'left') {
      newPosition = Math.max(0, brandScrollPosition - scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, brandScrollPosition + scrollAmount);
    }
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setBrandScrollPosition(newPosition);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Bento Grid */}
      <section className="container-padding section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {categoryTiles.map((tile) => (
              <Link
                key={tile.id}
                to={tile.id === "sale" ? "/sale" : `/c/${tile.id}`}
                className={cn(
                  "group relative overflow-hidden rounded-lg hover-lift transition-all duration-300 hover:shadow-lg",
                  tile.className
                )}
              >
                {!tile.featured && (
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className={cn(
                  "absolute inset-0 transition-opacity",
                  tile.featured ? "bg-gradient-to-br from-red-500/90 to-red-600/90" : "bg-black/40 group-hover:bg-black/50"
                )} />
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                  {tile.featured ? (
                    <div className="text-white">
                      <div className="text-lg md:text-xl font-light">{tile.title}</div>
                      <div className="text-3xl md:text-5xl font-bold mb-2">{tile.subtitle}</div>
                      <div className="flex items-center text-sm md:text-base font-medium">
                        {tile.description}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-white">
                      <div className="text-lg md:text-xl font-semibold mb-1">{tile.title}</div>
                      <div className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Shop now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="container-padding bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by brand</h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => scrollBrands('left')}
                disabled={brandScrollPosition === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => scrollBrands('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div 
            ref={brandScrollRef}
            className="flex space-x-6 overflow-x-auto scroll-bar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-32 bg-background rounded-lg border flex flex-col items-center justify-center cursor-pointer p-3 hover:border-primary/50 transition-colors duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 mb-1"
                  loading="lazy"
                />
                <span className="text-xs font-medium text-center text-muted-foreground">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Sliders */}
      <ProductSlider 
        title="New In" 
        products={newInProducts} 
        viewAllHref="/new-in"
      />
      
      <ProductSlider 
        title="Trending" 
        products={trendingProducts} 
        viewAllHref="/trending"
        className="bg-muted/20"
      />
      
      <ProductSlider 
        title="Curate Picks" 
        products={curatePicksProducts} 
        viewAllHref="/curate-picks"
      />

      {/* Editorial Banner */}
      <section className="container-padding">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-lg aspect-[21/9] bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-2xl px-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Discover Luxury Fashion
                </h2>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  Curated collections from the world's finest designers
                </p>
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Explore Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ProductSliderProps {
  title: string;
  products: any[];
  viewAllHref: string;
  className?: string;
}

function ProductSlider({ title, products, viewAllHref, className }: ProductSliderProps) {
  return (
    <section className={cn("container-padding section-padding", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <a
            href={viewAllHref}
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: any;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = !!product.discount;
  const displayPrice = hasDiscount ? product.discount.discountedPrice : product.price;
  const originalPrice = hasDiscount ? product.discount.originalPrice : null;

  return (
    <Link to={`/product/${product.id}`} className={cn("group cursor-pointer block", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3 hover-lift">
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badges.slice(0, 2).map((badge: any, index: number) => (
              <Badge
                key={index}
                variant={badge.type as any}
                className="text-xs"
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </Button>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground font-medium">{product.brand}</div>
        <h3 className="text-sm font-medium line-clamp-2 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">{displayPrice.formattedAmount}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {originalPrice.formattedAmount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
} 