import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Filter, 
  X, 
  Heart,
  ArrowLeft,
  ArrowRight,
  ChevronDown
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
  const location = window.location.pathname;
  const isSalePage = location === '/sale';
  const isNewInPage = location === '/new-in';
  const currentCategory = isSalePage ? 'sale' : isNewInPage ? 'new-in' : category;
  
  // UI State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState(4);
  const [sortBy, setSortBy] = useState('featured');
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  // Show more/less state for filters
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);
  const [showMoreSizes, setShowMoreSizes] = useState(false);

  // Force mobile grid to 2 columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // Mobile and tablet - always 2 columns
        setGridColumns(2);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Filter State
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [tempPriceRange, setTempPriceRange] = useState([0, 5000]);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Get products with filters
  const { data: products, total: totalProducts, isLoading } = useDummyProducts({
    filters: {
      category: selectedCategories.length > 0 ? selectedCategories : 
                (currentCategory && !isNewInPage ? [currentCategory] : undefined),
      brand: selectedBrands.length > 0 ? selectedBrands : undefined,
      color: selectedColors.length > 0 ? selectedColors : undefined,
      size: selectedSizes.length > 0 ? selectedSizes : undefined,
      price: priceRange[0] > 0 || priceRange[1] < 5000 ? { min: priceRange[0], max: priceRange[1] } : undefined,
      discount: showSaleOnly || isSalePage || undefined,
      sortBy: isNewInPage ? 'newest' : sortBy as any
    },
    page: currentPage,
    size: pageSize
  });
  const totalPages = Math.ceil(totalProducts / pageSize);

  // Mock filter data
  const filterData = {
    brands: ['Nike', 'Adidas', 'Puma', 'Under Armour', 'New Balance', 'Reebok', 'Zara', 'H&M', 'Uniqlo', 'Ralph Lauren', 'Tommy Hilfiger', 'Calvin Klein'],
    colors: ['Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Yellow', 'Purple', 'Orange', 'Brown', 'Grey', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'],
    categories: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories', 'Bags', 'Jewelry', 'Swimwear', 'Loungewear']
  };
  
  // Show more/less limits
  const INITIAL_SHOW_COUNT = 4;

  // Update active filters when selections change
  useEffect(() => {
    const filters: ActiveFilter[] = [];
    
    selectedCategories.forEach(cat => 
      filters.push({ key: 'category', value: cat, label: cat })
    );
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
        label: `AED ${priceRange[0]} - AED ${priceRange[1]}` 
      });
    }
    
    setActiveFilters(filters);
  }, [selectedCategories, selectedBrands, selectedColors, selectedSizes, showSaleOnly, priceRange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSortDropdownOpen) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSortDropdownOpen]);

  const removeFilter = (filterToRemove: ActiveFilter) => {
    switch (filterToRemove.key) {
      case 'category':
        setSelectedCategories(prev => prev.filter(c => c !== filterToRemove.value));
        break;
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
        setTempPriceRange([0, 5000]);
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setShowSaleOnly(false);
    setPriceRange([0, 5000]);
    setTempPriceRange([0, 5000]);
  };

  const FilterDrawer = () => (
    <div className="w-full lg:w-64 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium">Active filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="pr-1">
                {filter.label}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFilter(filter)}
                  className="h-auto p-0 ml-1 hover:bg-transparent group"
                >
                  <X className="h-3 w-3 text-white group-hover:text-gray-300" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Accordion type="multiple" className="w-full">
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
              {filterData.categories
                .slice(0, showMoreCategories ? filterData.categories.length : INITIAL_SHOW_COUNT)
                .map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${cat}`}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories(prev => [...prev, cat]);
                      } else {
                        setSelectedCategories(prev => prev.filter(c => c !== cat));
                      }
                    }}
                  />
                  <label htmlFor={`category-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {cat}
                  </label>
                </div>
              ))}
              {filterData.categories.length > INITIAL_SHOW_COUNT && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreCategories(!showMoreCategories);
                  }}
                  className="text-sm text-primary hover:text-primary/80 font-medium pt-2"
                >
                  {showMoreCategories ? 'Show Less' : `Show More (${filterData.categories.length - INITIAL_SHOW_COUNT} more)`}
                </button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
              {filterData.brands
                .slice(0, showMoreBrands ? filterData.brands.length : INITIAL_SHOW_COUNT)
                .map((brand) => (
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
              {filterData.brands.length > INITIAL_SHOW_COUNT && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreBrands(!showMoreBrands);
                  }}
                  className="text-sm text-primary hover:text-primary/80 font-medium pt-2"
                >
                  {showMoreBrands ? 'Show Less' : `Show More (${filterData.brands.length - INITIAL_SHOW_COUNT} more)`}
                </button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter - Custom Implementation */}
        <div className="border-b">
          <button
            className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full text-left"
            onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
          >
            Price
            <svg 
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isPriceFilterOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isPriceFilterOpen && (
            <div className="pb-4 pt-0">
              <div className="space-y-4 p-2">
                <div className="px-2">
                  <Slider
                    value={tempPriceRange}
                    onValueChange={setTempPriceRange}
                    max={5000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                  <span>AED {tempPriceRange[0]}</span>
                  <span>AED {tempPriceRange[1]}</span>
                </div>
                <div className="px-2">
                  <Button
                    onClick={() => setPriceRange([...tempPriceRange])}
                    size="sm"
                    className="w-full"
                    disabled={priceRange[0] === tempPriceRange[0] && priceRange[1] === tempPriceRange[1]}
                  >
                    Apply Price Filter
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Color Filter */}
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
              <div className="grid grid-cols-4 gap-2">
                {filterData.colors
                  .slice(0, showMoreColors ? filterData.colors.length : INITIAL_SHOW_COUNT)
                  .map((color) => (
                  <button
                    key={color}
                    onClick={(e) => {
                      e.stopPropagation();
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
              {filterData.colors.length > INITIAL_SHOW_COUNT && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreColors(!showMoreColors);
                  }}
                  className="text-sm text-primary hover:text-primary/80 font-medium pt-2"
                >
                  {showMoreColors ? 'Show Less' : `Show More (${filterData.colors.length - INITIAL_SHOW_COUNT} more)`}
                </button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
              <div className="grid grid-cols-3 gap-2">
                {filterData.sizes
                  .slice(0, showMoreSizes ? filterData.sizes.length : INITIAL_SHOW_COUNT)
                  .map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
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
              {filterData.sizes.length > INITIAL_SHOW_COUNT && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreSizes(!showMoreSizes);
                  }}
                  className="text-sm text-primary hover:text-primary/80 font-medium pt-2"
                >
                  {showMoreSizes ? 'Show Less' : `Show More (${filterData.sizes.length - INITIAL_SHOW_COUNT} more)`}
                </button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sale Items */}
        <AccordionItem value="offers">
          <AccordionTrigger>Offers</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
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
            <span className="text-foreground font-medium capitalize">
              {isSalePage ? 'Sale' : isNewInPage ? 'New In' : category}
            </span>
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
          <div className="flex-1 min-w-0">
            {/* Header - Mobile Layout */}
            <div className="mb-6">
              {/* Mobile: Top row with filters and sort */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <div className="flex items-center space-x-3">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterDrawerOpen(true)}
                  >
                    <div className="relative mr-1">
                      <Filter className="h-4 w-4" />
                      {activeFilters.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-black text-white text-[8px] font-medium flex items-center justify-center">
                          {activeFilters.length}
                        </span>
                      )}
                    </div>
                    Filters
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSortDropdownOpen(!isSortDropdownOpen);
                    }}
                    className="flex items-center space-x-2 min-w-[120px] justify-between"
                  >
                    <span className="text-sm truncate">
                      {sortBy === 'featured' && 'Curate Picks'}
                      {sortBy === 'newest' && 'Newest'}
                      {sortBy === 'price-low' && 'Price: Low to High'}
                      {sortBy === 'price-high' && 'Price: High to Low'}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isSortDropdownOpen && "rotate-180")} />
                  </Button>
                  
                  {isSortDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-background border rounded-md shadow-lg z-10">
                      {[
                        { value: 'featured', label: 'Curate Picks' },
                        { value: 'newest', label: 'Newest' },
                        { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-md last:rounded-b-md",
                            sortBy === option.value && "bg-muted font-medium"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile: Bottom row with title and results */}
              <div className="lg:hidden">
                <h1 className="text-xl font-bold capitalize mb-1">
                  {isSalePage ? 'Sale' : isNewInPage ? 'New In' : category}
                </h1>
                <p className="text-muted-foreground text-sm">
                  Showing {products.length} of {totalProducts} results
                </p>
              </div>

              {/* Desktop: Original layout */}
              <div className="hidden lg:flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <h1 className="text-2xl font-bold capitalize">
                    {isSalePage ? 'Sale' : isNewInPage ? 'New In' : category}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Showing {products.length} of {totalProducts} results
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Grid Toggle - Desktop Only */}
                  <div className="hidden md:flex items-center border rounded-md">
                    <Button
                      variant={gridColumns === 3 ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setGridColumns(3)}
                      className="rounded-r-none"
                    >
                      {/* 3 Column Icon - 3 thick vertical rectangles */}
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                        <rect x="1" y="2" width="3" height="12" rx="0.5"/>
                        <rect x="6" y="2" width="3" height="12" rx="0.5"/>
                        <rect x="11" y="2" width="3" height="12" rx="0.5"/>
                      </svg>
                    </Button>
                    <Button
                      variant={gridColumns === 4 ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setGridColumns(4)}
                      className="rounded-l-none"
                    >
                      {/* 4 Column Icon - 4 thin vertical rectangles */}
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                        <rect x="1" y="2" width="2" height="12" rx="0.5"/>
                        <rect x="4.5" y="2" width="2" height="12" rx="0.5"/>
                        <rect x="8" y="2" width="2" height="12" rx="0.5"/>
                        <rect x="11.5" y="2" width="2" height="12" rx="0.5"/>
                      </svg>
                    </Button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSortDropdownOpen(!isSortDropdownOpen);
                      }}
                      className="flex items-center space-x-2 min-w-[140px] justify-between"
                    >
                      <span className="text-sm">
                        {sortBy === 'featured' && 'Curate Picks'}
                        {sortBy === 'newest' && 'Newest'}
                        {sortBy === 'price-low' && 'Price: Low to High'}
                        {sortBy === 'price-high' && 'Price: High to Low'}
                      </span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isSortDropdownOpen && "rotate-180")} />
                    </Button>
                    
                    {isSortDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-background border rounded-md shadow-lg z-10">
                        {[
                          { value: 'featured', label: 'Curate Picks' },
                          { value: 'newest', label: 'Newest' },
                          { value: 'price-low', label: 'Price: Low to High' },
                          { value: 'price-high', label: 'Price: High to Low' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-md last:rounded-b-md",
                              sortBy === option.value && "bg-muted font-medium"
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-4 sm:gap-6">
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
                "grid gap-x-3 gap-y-4 sm:gap-6 mb-8",
                // Mobile: Always 2 columns, Desktop: Respect grid settings
                "grid-cols-2",
                gridColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4"
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
          <div className="fixed left-0 top-0 h-full w-[85vw] max-w-sm bg-background shadow-lg overflow-y-auto">
            <div className="flex items-center justify-end p-4 border-b">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <FilterDrawer />
            </div>
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

  const displayPrice = product.price; // Always use the current price (already discounted)

  return (
    <Link to={`/product/${product.id}`} className="block">
      <Card className="group cursor-pointer overflow-hidden border-0 shadow-none">
      <div 
        className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-2 lg:mb-3"
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
        <button
          className="absolute top-2 right-2 transition-all duration-200 hover:scale-110"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart className={cn("h-5 w-5 text-black drop-shadow-md hover:text-red-500 transition-colors duration-200 stroke-[1.5]", isWishlisted && "fill-current text-red-500")} />
        </button>

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
        <p className="text-xs text-muted-foreground mb-1 lg:mb-2">{product.brand}</p>
        
        {/* Mobile Price Layout */}
        <div className="lg:hidden">
          <div className="flex items-center space-x-1 flex-wrap">
            <span className="font-semibold text-sm">{displayPrice.formattedAmount || displayPrice.amount + ' ' + displayPrice.currency}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through">
                {product.originalPrice.formattedAmount || product.originalPrice.amount + ' ' + product.originalPrice.currency}
              </span>
            )}
            {product.discount && (
              <Badge className="bg-red-500 text-white text-[8px] font-semibold px-1 py-0.5 leading-none">
                -{product.discount.value}%
              </Badge>
            )}
          </div>
        </div>

        {/* Desktop Price Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{displayPrice.formattedAmount || displayPrice.amount + ' ' + displayPrice.currency}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {product.originalPrice.formattedAmount || product.originalPrice.amount + ' ' + product.originalPrice.currency}
              </span>
            )}
            {product.discount && (
              <Badge className="bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5">
                -{product.discount.value}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
} 