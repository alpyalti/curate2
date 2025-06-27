import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Grid3x3, 
  LayoutGrid, 
  Filter, 
  X, 
  Heart,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '../../lib/utils';
import { useDummyProducts } from '../../hooks/useDummyProducts';

interface ActiveFilter {
  key: string;
  value: string;
  label: string;
}

export function ProductListingPage() {
  const { category } = useParams();
  
  // UI State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState(4);
  const [sortBy, setSortBy] = useState('featured');
  
  // Filter State
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Get products with filters
  const { data: products, total: totalProducts, isLoading } = useDummyProducts({
    filters: {
      category: category ? [category] : undefined,
      brand: selectedBrands.length > 0 ? selectedBrands : undefined,
      color: selectedColors.length > 0 ? selectedColors : undefined,
      size: selectedSizes.length > 0 ? selectedSizes : undefined,
      price: priceRange[0] > 0 || priceRange[1] < 5000 ? { min: priceRange[0], max: priceRange[1] } : undefined,
      discount: showSaleOnly || undefined,
      sortBy: sortBy as any
    },
    page: currentPage,
    size: pageSize
  });
  const totalPages = Math.ceil(totalProducts / pageSize);

  // Mock filter data
  const filterData = {
    brands: ['Nike', 'Adidas', 'Puma', 'Under Armour', 'New Balance', 'Reebok'],
    colors: ['Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Yellow'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    categories: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories']
  };

  // Update active filters when selections change
  useEffect(() => {
    const filters: ActiveFilter[] = [];
    
    selectedBrands.forEach(brand => 
      filters.push({ key: 'brand', value: brand, label: brand })
    );
    selectedColors.forEach(color => 
      filters.push({ key: 'color', value: color, label: color })
    );
    selectedSizes.forEach(size => 
      filters.push({ key: 'size', value: size, label: size })
    );
    if (showSaleOnly) {
      filters.push({ key: 'sale', value: 'true', label: 'Sale Items' });
    }
    if (priceRange[0] > 0 || priceRange[1] < 5000) {
      filters.push({ 
        key: 'price', 
        value: `${priceRange[0]}-${priceRange[1]}`, 
        label: `R${priceRange[0]} - R${priceRange[1]}` 
      });
    }
    
    setActiveFilters(filters);
  }, [selectedBrands, selectedColors, selectedSizes, showSaleOnly, priceRange]);

  const removeFilter = (filterToRemove: ActiveFilter) => {
    switch (filterToRemove.key) {
      case 'brand':
        setSelectedBrands(prev => prev.filter(b => b !== filterToRemove.value));
        break;
      case 'color':
        setSelectedColors(prev => prev.filter(c => c !== filterToRemove.value));
        break;
      case 'size':
        setSelectedSizes(prev => prev.filter(s => s !== filterToRemove.value));
        break;
      case 'sale':
        setShowSaleOnly(false);
        break;
      case 'price':
        setPriceRange([0, 5000]);
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setShowSaleOnly(false);
    setPriceRange([0, 5000]);
  };

  const FilterDrawer = () => (
    <div className="w-64 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" className="w-full">
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {filterData.categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox id={`category-${cat}`} />
                  <label htmlFor={`category-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {filterData.brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBrands(prev => [...prev, brand]);
                      } else {
                        setSelectedBrands(prev => prev.filter(b => b !== brand));
                      }
                    }}
                  />
                  <label htmlFor={`brand-${brand}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  min={0}
                  step={50}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>R{priceRange[0]}</span>
                <span>R{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-2">
              {filterData.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    if (selectedColors.includes(color)) {
                      setSelectedColors(prev => prev.filter(c => c !== color));
                    } else {
                      setSelectedColors(prev => [...prev, color]);
                    }
                  }}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    selectedColors.includes(color) ? "border-primary scale-110" : "border-gray-300 hover:border-gray-400"
                  )}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {filterData.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(prev => prev.filter(s => s !== size));
                    } else {
                      setSelectedSizes(prev => [...prev, size]);
                    }
                  }}
                  className="text-xs"
                >
                  {size}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sale Items */}
        <AccordionItem value="offers">
          <AccordionTrigger>Offers</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sale-items"
                  checked={showSaleOnly}
                  onCheckedChange={(checked) => setShowSaleOnly(checked === true)}
                />
                <label htmlFor="sale-items" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Sale Items Only
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>/</span>
            <span className="text-foreground font-medium capitalize">{category}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block flex-shrink-0">
            <FilterDrawer />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold capitalize mb-2">{category}</h1>
                <p className="text-muted-foreground">
                  Showing {products.length} of {totalProducts} results
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* Grid Toggle */}
                <div className="flex items-center border rounded-md">
                  <Button
                    variant={gridColumns === 3 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setGridColumns(3)}
                    className="rounded-r-none"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridColumns === 4 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setGridColumns(4)}
                    className="rounded-l-none"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm bg-background"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>

                </select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium">Active filters:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Remove All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="secondary" className="pr-1">
                      {filter.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFilter(filter)}
                        className="h-auto p-0 ml-1 hover:bg-transparent"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-muted rounded-lg mb-3" />
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className={cn(
                "grid gap-6 mb-8",
                gridColumns === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              )}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-10"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterDrawer />
          </div>
        </div>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: any;
}

function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(0);

  const hasDiscount = !!product.discount;
  const displayPrice = hasDiscount ? product.discount.discountedPrice : product.price;
  const originalPrice = hasDiscount ? product.discount.originalPrice : null;

  return (
    <Link to={`/product/${product.id}`} className="block">
      <Card className="group cursor-pointer overflow-hidden border-0 shadow-none hover:shadow-md transition-shadow">
      <div 
        className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3"
        onMouseEnter={() => setHoveredImage(1)}
        onMouseLeave={() => setHoveredImage(0)}
      >
        <img
          src={product.images[hoveredImage]?.url || product.images[0]?.url}
          alt={product.images[hoveredImage]?.alt || product.images[0]?.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges */}
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

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
        >
                                <Heart className={cn("h-4 w-4", isWishlisted && "fill-current text-primary")} />
        </Button>

        {/* Color Variants */}
        {product.variants?.colors && product.variants.colors.length > 1 && (
          <div className="absolute bottom-2 left-2 flex space-x-1">
            {product.variants.colors.slice(0, 4).map((color: any, index: number) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-0">
        <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{displayPrice.formattedAmount || displayPrice.amount + ' ' + displayPrice.currency}</span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {originalPrice.formattedAmount || originalPrice.amount + ' ' + originalPrice.currency}
              </span>
            )}
          </div>
          

        </div>
      </CardContent>
    </Card>
    </Link>
  );
} 