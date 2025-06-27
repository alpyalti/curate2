import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface MegaMenuProps {
  className?: string;
}

const mainCategories = [
  { name: "Sale", href: "/sale", color: "text-red-600", featured: true },
  { name: "Women", href: "/c/women", color: "text-foreground" },
  { name: "Men", href: "/c/men", color: "text-foreground" },
  { name: "Accessories", href: "/c/accessories", color: "text-foreground" },
  { name: "Handbags", href: "/c/handbags", color: "text-foreground" },
  { name: "Beauty & Skincare", href: "/c/beauty", color: "text-foreground" },
  { name: "Home Decor", href: "/c/home", color: "text-foreground" },
  { name: "Fitness & Outdoor", href: "/c/sports", color: "text-foreground" },
  { name: "Pre-Loved Luxury", href: "/c/pre-loved", color: "text-foreground" },
];

const gridCategories = [
  { name: "Kids", href: "/c/kids", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop" },
  { name: "Sportswear", href: "/c/sportswear", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop" },
  { name: "Jewellery", href: "/c/jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop" },
  { name: "Tech", href: "/c/tech", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop" },
  { name: "Gifts", href: "/c/gifts", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop" },
];

const trendingItems = [
  { name: "New Season Arrivals", href: "/new-season" },
  { name: "Designer Bags", href: "/designer-bags" },
  { name: "Luxury Watches", href: "/luxury-watches" },
  { name: "Statement Jewelry", href: "/statement-jewelry" },
  { name: "Sustainable Fashion", href: "/sustainable" },
];

export function MegaMenu({ className }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "w-screen max-w-6xl bg-background border rounded-lg shadow-lg p-6 animate-slide-in-from-top",
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Categories */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Shop by Category
          </h3>
          <nav className="space-y-2">
            {mainCategories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className={cn(
                  "flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-colors hover:bg-accent group",
                  category.color,
                  category.featured && "bg-red-50 dark:bg-red-950"
                )}
              >
                <span>{category.name}</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>
        </div>

        {/* Category Grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Explore
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {gridCategories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-lg aspect-[3/2]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-medium text-sm text-center">
                    {category.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Trending Now
          </h3>
          <div className="space-y-3">
            {trendingItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block p-3 rounded-md hover:bg-accent transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>

          {/* Featured Banner */}
          <div className="mt-6 relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-purple-600 to-pink-600">
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <h4 className="text-white font-semibold text-lg mb-1">
                Up to 75% Off
              </h4>
              <p className="text-white/90 text-sm mb-3">
                Sale items now available
              </p>
              <a
                href="/sale"
                className="inline-flex items-center text-white text-sm font-medium hover:underline"
              >
                Shop Sale
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 