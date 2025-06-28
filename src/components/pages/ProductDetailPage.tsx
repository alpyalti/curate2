import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  ShoppingBag, 
  Share2,
  Ruler
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SizeGuideModal } from '../ui/size-guide-modal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '../../lib/utils';
import { useDummyProduct, useDummyProducts } from '../../hooks/useDummyProducts';

export function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useDummyProduct(id || '');
  
  // Related products
  const { data: relatedProducts } = useDummyProducts({
    filters: {
      category: product ? [product.category] : undefined
    },
    size: 8
  });

  // Component state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (product?.variants?.[0]) {
      setSelectedVariant(product.variants[0]);
      
      // Set default color and size from first variant
      const colorAttr = product.variants[0].attributes.find(attr => attr.name === 'color');
      const sizeAttr = product.variants[0].attributes.find(attr => attr.name === 'size');
      
      if (colorAttr) setSelectedColor(colorAttr.value);
      
      // For bags category, don't require size selection
      if (product.category === 'bags') {
        setSelectedSize('one-size'); // Set a default value for bags
      } else if (sizeAttr) {
        setSelectedSize(sizeAttr.value);
      }
    }
  }, [product]);

  useEffect(() => {
    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isShareDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('.share-dropdown')) {
          setIsShareDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isShareDropdownOpen]);

  // Get available colors and sizes
  const availableColors = product?.variants?.reduce((colors: any[], variant) => {
    const colorAttr = variant.attributes.find(attr => attr.name === 'color');
    if (colorAttr && !colors.find(c => c.value === colorAttr.value)) {
      colors.push({
        value: colorAttr.value,
        name: colorAttr.displayName || colorAttr.value,
        available: product.availability.inStock // Use product-level availability
      });
    }
    return colors;
  }, []) || [];

  const availableSizes = product?.variants?.reduce((sizes: any[], variant) => {
    const sizeAttr = variant.attributes.find(attr => attr.name === 'size');
    const colorAttr = variant.attributes.find(attr => attr.name === 'color');
    
    if (sizeAttr && colorAttr?.value === selectedColor) {
      sizes.push({
        value: sizeAttr.value,
        name: sizeAttr.displayName || sizeAttr.value,
        available: variant.available !== undefined ? variant.available : product.availability.inStock
      });
    }
    return sizes;
  }, []) || [];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    
    // For bags category, don't reset size, keep as 'one-size'
    if (product?.category === 'bags') {
      setSelectedSize('one-size');
    } else {
      setSelectedSize(''); // Reset size when color changes for other categories
    }
    
    // Find variant with new color
    const newVariant = product?.variants?.find(variant => 
      variant.attributes.some(attr => attr.name === 'color' && attr.value === color)
    );
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    
    // Find exact variant with selected color and size
    const newVariant = product?.variants?.find(variant => 
      variant.attributes.some(attr => attr.name === 'color' && attr.value === selectedColor) &&
      variant.attributes.some(attr => attr.name === 'size' && attr.value === size)
    );
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleAddToCart = () => {
    // For bags category, only color is required
    const isBagsCategory = product?.category === 'bags';
    
    if (isBagsCategory) {
      if (!selectedColor) {
        alert('Please select color');
        return;
      }
    } else {
      if (!selectedColor || !selectedSize) {
        alert('Please select color and size');
        return;
      }
    }
    
    console.log('Adding to cart:', {
      product: product?.id,
      variant: selectedVariant?.id,
      quantity: 1,
      color: selectedColor,
      size: selectedSize
    });
  };

  const canAddToCart = product?.category === 'bags' 
    ? selectedColor && product?.availability.inStock
    : selectedColor && selectedSize && product?.availability.inStock;

  // Touch/swipe functions for image navigation
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && product && product.images.length > 1) {
      // Swipe left - next image
      setSelectedImageIndex(prev => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
    
    if (isRightSwipe && product && product.images.length > 1) {
      // Swipe right - previous image
      setSelectedImageIndex(prev => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="aspect-square bg-muted rounded-lg mb-4" />
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
                <div className="h-10 bg-muted rounded w-1/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  const displayPrice = product.price; // Always use the current price (already discounted)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>/</span>
            <a href={`/c/${product.category}`} className="hover:text-foreground capitalize">
              {product.category}
            </a>
            <span>/</span>
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Images */}
          <div className="lg:flex lg:gap-4">
            {/* Thumbnail Strip - Left Side - Desktop Only */}
            <div className="hidden lg:flex flex-col gap-2" style={{ width: '79px' }}>
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "overflow-hidden rounded border-2 transition-all",
                    selectedImageIndex === index ? "border-primary" : "border-transparent hover:border-gray-300"
                  )}
                  style={{ width: '79px', height: '118px' }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image - Mobile & Desktop */}
            <div className="flex-1">
              <div 
                className="relative overflow-hidden rounded-lg bg-muted" 
                style={{ aspectRatio: '480/720' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={product.images[selectedImageIndex]?.url}
                  alt={product.images[selectedImageIndex]?.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      onClick={() => setSelectedImageIndex(prev => 
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )}
                    >
                      <ChevronLeft className="h-6 w-6 text-black" />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      onClick={() => setSelectedImageIndex(prev => 
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )}
                    >
                      <ChevronRight className="h-6 w-6 text-black" />
                    </button>
                  </>
                )}

                {/* Mobile Wishlist & Share Buttons - Bottom Right Overlay */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-3 lg:hidden">
                  {/* Wishlist Button */}
                  <button
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={cn("h-5 w-5 text-black hover:text-red-500 transition-colors duration-200", isWishlisted && "fill-current text-red-500")} />
                  </button>

                  {/* Share Button */}
                  <div className="relative share-dropdown">
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg"
                      onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
                    >
                      <Share2 className="h-5 w-5 text-black" />
                    </button>
                    {isShareDropdownOpen && (
                      <div className="absolute bottom-full right-0 mb-2 bg-background border rounded-lg shadow-lg py-2 min-w-[180px] z-50">
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = `Check out this ${product.title} from ${product.brand}`;
                            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                            setIsShareDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                          </svg>
                          WhatsApp
                        </button>
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = `Check out this ${product.title} from ${product.brand}`;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                            setIsShareDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          Twitter
                        </button>
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                            setIsShareDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Facebook
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Image Indicators */}
              {product.images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-3 lg:hidden">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        selectedImageIndex === index ? "bg-black" : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 lg:space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                  <p className="text-muted-foreground mb-2">{product.brand}</p>
                  {/* Product Badges */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {/* Product Badges */}
                    {product.badges && product.badges.length > 0 && (
                      <>
                        {product.badges.slice(0, 2).map((badge, index) => (
                          <Badge key={index} variant={badge.type as any} className="text-xs">
                            {badge.label}
                          </Badge>
                        ))}
                      </>
                    )}
                    
                    {/* Stock Status Badge */}
                    {product.availability.inStock ? (
                      product.availability.quantity && product.availability.quantity <= 5 ? (
                        <Badge variant="low-stock-warning" className="text-xs">
                          ONLY {product.availability.quantity} LEFT
                        </Badge>
                      ) : (
                        <Badge variant="in-stock" className="text-xs">
                          IN STOCK
                        </Badge>
                      )
                    ) : (
                      <Badge variant="out-of-stock" className="text-xs">
                        OUT OF STOCK
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="hidden lg:flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3 lg:items-center">
                  <button
                    className="flex items-center justify-center transition-all duration-200 hover:scale-110"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={cn("h-6 w-6 text-black drop-shadow-md hover:text-red-500 transition-colors duration-200", isWishlisted && "fill-current text-red-500")} />
                  </button>
                  <div className="relative share-dropdown">
                    <button
                      className="flex items-center justify-center"
                      onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
                    >
                      <Share2 className="h-6 w-6 text-black drop-shadow-md" />
                    </button>
                    {isShareDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 bg-background border rounded-lg shadow-lg py-2 min-w-[180px] z-50">
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = `Check out this ${product.title} from ${product.brand}`;
                            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                            setIsShareDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                          </svg>
                          WhatsApp
                        </button>
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = `Check out this ${product.title} from ${product.brand}`;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                            setIsShareDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          Twitter
                        </button>
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                            setIsShareDropdownOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Facebook
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-3 lg:mb-4">
                <span className="text-2xl font-bold">{displayPrice.formattedAmount}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice.formattedAmount}
                  </span>
                )}
                {product.discount && (
                  <Badge className="bg-red-500 text-white">
                    -{product.discount.value}%
                  </Badge>
                )}
              </div>




            </div>

            {/* Color Selection */}
            {availableColors.length > 0 && (
              <div>
                <div className="flex items-center mb-3">
                  <span className="font-medium">Colour: {selectedColor}</span>
                </div>
                <div className="flex space-x-2">
                  {availableColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleColorChange(color.value)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all relative",
                        selectedColor === color.value 
                          ? "border-primary scale-110" 
                          : "border-gray-300 hover:border-gray-400",
                        !color.available && "opacity-50 cursor-not-allowed"
                      )}
                      style={{ backgroundColor: color.value.toLowerCase() }}
                      title={color.name}
                      disabled={!color.available}
                    >
                      {!color.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-0.5 bg-gray-500 rotate-45" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection - Hide for bags category */}
            {availableSizes.length > 0 && product?.category !== 'bags' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Size: {selectedSize}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setShowSizeGuide(true)}
                  >
                    <Ruler className="h-3 w-3 mr-1" />
                    Size Guide
                  </Button>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {availableSizes.map((size) => (
                    <Button
                      key={size.value}
                      variant={selectedSize === size.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSizeChange(size.value)}
                      disabled={!size.available}
                      className={cn(
                        "text-sm relative",
                        selectedSize === size.value ? "bg-black text-white hover:bg-black/90" : "",
                        !size.available && "opacity-50 cursor-not-allowed line-through text-muted-foreground"
                      )}
                    >
                      {size.value}
                      {!size.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-current rotate-12 opacity-75" />
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  Buy Now
                </Button>
              </div>

              {product?.category === 'bags' ? (
                !selectedColor && (
                  <p className="text-sm text-muted-foreground">
                    Please select color
                  </p>
                )
              ) : (
                (!selectedColor || !selectedSize) && (
                  <p className="text-sm text-muted-foreground">
                    Please select {!selectedColor && 'color'} {!selectedColor && !selectedSize && 'and'} {!selectedSize && 'size'}
                  </p>
                )
              )}
            </div>

            {/* Product Details Accordions */}
            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full" defaultValue="details">
                <AccordionItem value="details">
                  <AccordionTrigger>Product Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="mb-4">{product.description}</p>
                      {product.attributes && product.attributes.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Details:</h4>
                          <ul className="space-y-1">
                            {product.attributes.map((attr, index) => (
                              <li key={index} className="flex">
                                <span className="font-medium w-24">{attr.displayName}:</span>
                                <span>{attr.value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sizing">
                  <AccordionTrigger>Fit & Sizing</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>This item runs true to size. We recommend ordering your usual size.</p>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Size Guide</h4>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <div className="font-medium">Size</div>
                          <div className="font-medium">UK</div>
                          <div className="font-medium">EU</div>
                          <div className="font-medium">US</div>
                          <div>XS</div><div>6</div><div>32</div><div>2</div>
                          <div>S</div><div>8</div><div>34</div><div>4</div>
                          <div>M</div><div>10</div><div>36</div><div>6</div>
                          <div>L</div><div>12</div><div>38</div><div>8</div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delivery">
                  <AccordionTrigger>Delivery & Returns</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Delivery Options</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Standard delivery: 3-5 working days (Free on orders over 999 AED)</li>
                          <li>• Express delivery: 1-2 working days (99 AED)</li>
                          <li>• Click & Collect: Available at selected stores (Free)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Returns</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• 30-day return policy</li>
                          <li>• Items must be in original condition with tags</li>
                          <li>• Free returns via courier collection or in-store</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sustainability">
                  <AccordionTrigger>Sustainability</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>We're committed to more sustainable fashion. This product features:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>Made with organic cotton</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>Responsible manufacturing practices</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>Recyclable packaging</span>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>



        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProductsCarousel products={relatedProducts} />
        )}
      </div>

      {/* Sticky Add to Cart Bar (Mobile) */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 lg:hidden z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-lg font-bold">{displayPrice.formattedAmount}</p>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className="px-8"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={product?.category || "women"}
      />
    </div>
  );
}

interface RelatedProductsCarouselProps {
  products: any[];
}

function RelatedProductsCarousel({ products }: RelatedProductsCarouselProps) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateScrollState = () => {
      if (!scrollRef.current) return;
      
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      setScrollPosition(scrollLeft);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < maxScroll - 5);
    };

    const container = scrollRef.current;
    if (container) {
      updateScrollState();
      container.addEventListener('scroll', updateScrollState);
      
      const resizeObserver = new ResizeObserver(updateScrollState);
      resizeObserver.observe(container);
      
      return () => {
        container.removeEventListener('scroll', updateScrollState);
        resizeObserver.disconnect();
      };
    }
  }, [products]);

  const scrollProducts = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.clientWidth || 280;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;
    
    let newPosition = scrollPosition;
    
    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      const maxScroll = container.scrollWidth - container.clientWidth;
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">You might also like</h2>
      
      <div className="relative">
        {/* Products Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-bar-hide pb-4"
        >
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="flex-none w-[calc(50%-12px)] md:w-[calc(25%-18px)]">
              <RelatedProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Left Arrow - Desktop Only */}
        <button
          className={cn(
            "hidden md:block absolute left-0 top-[40%] -translate-y-1/2 -translate-x-12 z-10 text-gray-600 hover:text-gray-800 transition-colors",
            !canScrollLeft && "opacity-30 cursor-not-allowed"
          )}
          onClick={() => scrollProducts('left')}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* Right Arrow - Desktop Only */}
        <button
          className={cn(
            "hidden md:block absolute right-0 top-[40%] -translate-y-1/2 translate-x-12 z-10 text-gray-600 hover:text-gray-800 transition-colors",
            !canScrollRight && "opacity-30 cursor-not-allowed"
          )}
          onClick={() => scrollProducts('right')}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

interface RelatedProductCardProps {
  product: any;
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  const [hoveredImage, setHoveredImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const displayPrice = product.price; // Always use the current price (already discounted)

  return (
    <a href={`/product/${product.id}`} className="group block">
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
      </div>
      <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.title}</h3>
      <p className="text-xs text-muted-foreground mb-1 lg:mb-2">{product.brand}</p>
      
      {/* Mobile Price Layout */}
      <div className="lg:hidden">
        <div className="flex items-center space-x-1 flex-wrap">
          <span className="font-semibold text-sm">{displayPrice.formattedAmount}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-muted-foreground line-through">
              {product.originalPrice.formattedAmount}
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
      <div className="hidden lg:flex items-center space-x-2">
        <span className="font-semibold">{displayPrice.formattedAmount}</span>
        {product.originalPrice && (
          <span className="text-xs text-muted-foreground line-through">
            {product.originalPrice.formattedAmount}
          </span>
        )}
        {product.discount && (
          <Badge className="bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5">
            -{product.discount.value}%
          </Badge>
        )}
      </div>
    </a>
  );
} 