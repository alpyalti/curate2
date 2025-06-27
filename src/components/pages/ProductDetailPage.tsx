import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  ShoppingBag, 
  Check,
  Share2,
  Ruler,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

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

  useEffect(() => {
    if (product?.variants?.[0]) {
      setSelectedVariant(product.variants[0]);
      
      // Set default color and size from first variant
      const colorAttr = product.variants[0].attributes.find(attr => attr.name === 'color');
      const sizeAttr = product.variants[0].attributes.find(attr => attr.name === 'size');
      
      if (colorAttr) setSelectedColor(colorAttr.value);
      if (sizeAttr) setSelectedSize(sizeAttr.value);
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        available: product.availability.inStock // Use product-level availability
      });
    }
    return sizes;
  }, []) || [];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(''); // Reset size when color changes
    
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
    if (!selectedColor || !selectedSize) {
      alert('Please select color and size');
      return;
    }
    console.log('Adding to cart:', {
      product: product?.id,
      variant: selectedVariant?.id,
      quantity: 1,
      color: selectedColor,
      size: selectedSize
    });
  };

  const canAddToCart = selectedColor && selectedSize && product?.availability.inStock;

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

  const hasDiscount = !!product.discount;
  const displayPrice = hasDiscount ? product.discount!.discountedPrice : product.price;
  const originalPrice = hasDiscount ? product.discount!.originalPrice : null;

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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImageIndex]?.url}
                alt={product.images[selectedImageIndex]?.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() => setSelectedImageIndex(prev => 
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() => setSelectedImageIndex(prev => 
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badges.slice(0, 2).map((badge, index) => (
                    <Badge key={index} variant={badge.type as any}>
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "aspect-square overflow-hidden rounded border-2 transition-all",
                    selectedImageIndex === index ? "border-primary" : "border-transparent hover:border-gray-300"
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                  <p className="text-muted-foreground mb-2">{product.brand}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={cn("h-5 w-5", isWishlisted && "fill-current text-primary")} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl font-bold">{displayPrice.formattedAmount}</span>
                {originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {originalPrice.formattedAmount}
                  </span>
                )}
                {hasDiscount && product.discount && (
                  <Badge variant="sale">
                    {product.discount.type === 'percentage' 
                      ? `${product.discount.value}% OFF` 
                      : `${product.discount.value} AED OFF`
                    }
                  </Badge>
                )}
              </div>



              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                {product.availability.inStock ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">In Stock</span>
                    {product.availability.quantity && product.availability.quantity < 5 && (
                      <span className="text-sm text-orange-600">• Only {product.availability.quantity} left</span>
                    )}
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">Out of Stock</span>
                  </>
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

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Size: {selectedSize}</span>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Ruler className="h-3 w-3 mr-1" />
                    Size Guide
                  </Button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {availableSizes.map((size) => (
                    <Button
                      key={size.value}
                      variant={selectedSize === size.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSizeChange(size.value)}
                      disabled={!size.available}
                      className={cn(
                        "text-sm",
                        !size.available && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {size.value}
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

              {(!selectedColor || !selectedSize) && (
                <p className="text-sm text-muted-foreground">
                  Please select {!selectedColor && 'color'} {!selectedColor && !selectedSize && 'and'} {!selectedSize && 'size'}
                </p>
              )}
            </div>

            {/* Product Details Accordions */}
            <div className="mt-6">
              <Accordion type="single" collapsible className="w-full">
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
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
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
    </div>
  );
}

interface RelatedProductCardProps {
  product: any;
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  const hasDiscount = !!product.discount;
  const displayPrice = hasDiscount ? product.discount!.discountedPrice : product.price;
  const originalPrice = hasDiscount ? product.discount!.originalPrice : null;

  return (
    <a href={`/product/${product.id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3">
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.title}</h3>
      <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{displayPrice.formattedAmount}</span>
        {originalPrice && (
          <span className="text-xs text-muted-foreground line-through">
            {originalPrice.formattedAmount}
          </span>
        )}
      </div>
    </a>
  );
} 