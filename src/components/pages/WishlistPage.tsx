import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Trash2,
  Heart,
  Ruler,
  ShoppingBag,
  Clock
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { SizeGuideModal } from "../ui/size-guide-modal";

interface WishlistItem {
  id: string;
  title: string;
  brand: string;
  image: string;
  images: string[];
  price: {
    amount: number;
    currency: string;
    formattedAmount: string;
  };
  originalPrice?: {
    amount: number;
    currency: string;
    formattedAmount: string;
  };
  discount?: {
    type: string;
    value: number;
  };
  category: string;
  variants?: Array<{
    id: string;
    attributes: Array<{
      name: string;
      value: string;
      displayName?: string;
    }>;
    available?: boolean;
  }>;
  availability: {
    inStock: boolean;
    quantity?: number;
    isLowStock?: boolean;
  };
}

// Mock wishlist data - using some products from our fixtures
const mockWishlistItems: WishlistItem[] = [
  {
    id: "swimwear-001",
    title: "Black Let's Swim Triangle Bikini Top",
    brand: "LETS SWIM",
    image: "https://letsswim.co/cdn/shop/files/LET_SSWIM-BLACKLET_SSWIMTRIANGLEBIKINITOP-6.jpg?v=1721327749",
    images: [
      "https://letsswim.co/cdn/shop/files/LET_SSWIM-BLACKLET_SSWIMTRIANGLEBIKINITOP-6.jpg?v=1721327749",
      "https://letsswim.co/cdn/shop/files/LET_SSWIM-BLACKLET_SSWIMTRIANGLEBIKINITOP-4_a90cff19-ea1e-4b9d-b43d-a4b4f4154c50.jpg?v=1721327750"
    ],
    price: { amount: 450, currency: "AED", formattedAmount: "450 AED" },
    category: "women",
    variants: [
      {id: "var-sw001-xs", attributes: [{name: "size", value: "XS"}, {name: "color", value: "black"}], available: true},
      {id: "var-sw001-s", attributes: [{name: "size", value: "S"}, {name: "color", value: "black"}], available: true},
      {id: "var-sw001-m", attributes: [{name: "size", value: "M"}, {name: "color", value: "black"}], available: true},
      {id: "var-sw001-l", attributes: [{name: "size", value: "L"}, {name: "color", value: "black"}], available: false}
    ],
    availability: { inStock: true, quantity: 15 }
  },
  {
    id: "swimwear-002",
    title: "Red Wired Balconette Swimsuit",
    brand: "LETS SWIM",
    image: "https://letsswim.co/cdn/shop/files/LET_SSWIM-REDWIREDBALCONETTESWIMSUIT-1.jpg?v=1713187512",
    images: [
      "https://letsswim.co/cdn/shop/files/LET_SSWIM-REDWIREDBALCONETTESWIMSUIT-1.jpg?v=1713187512",
      "https://letsswim.co/cdn/shop/files/LET_SSWIM-REDWIREDBALCONETTESWIMSUIT-2.jpg?v=1713177063"
    ],
    price: { amount: 750, currency: "AED", formattedAmount: "750 AED" },
    category: "women",
    variants: [
      {id: "var-sw002-xs", attributes: [{name: "size", value: "XS"}, {name: "color", value: "red"}], available: true},
      {id: "var-sw002-s", attributes: [{name: "size", value: "S"}, {name: "color", value: "red"}], available: true},
      {id: "var-sw002-m", attributes: [{name: "size", value: "M"}, {name: "color", value: "red"}], available: true},
      {id: "var-sw002-l", attributes: [{name: "size", value: "L"}, {name: "color", value: "red"}], available: true}
    ],
    availability: { inStock: true, quantity: 2, isLowStock: true }
  },
  {
    id: "bags-001",
    title: "Mardi Matin Lemon Yellow",
    brand: "NORI ENOMOTO",
    image: "https://nori-enomoto.com/cdn/shop/files/nori_mardi-matin_lemon-yellow_main_02.png?v=1750655214&width=2400",
    images: [
      "https://nori-enomoto.com/cdn/shop/files/nori_mardi-matin_lemon-yellow_main_02.png?v=1750655214&width=2400"
    ],
    price: { amount: 1850, currency: "AED", formattedAmount: "1,850 AED" },
    category: "bags",
    variants: [
      {id: "var-b001", attributes: [{name: "color", value: "lemon yellow"}], available: true}
    ],
    availability: { inStock: true, quantity: 6 }
  },
  {
    id: "sale-001",
    title: "Silk Blouse",
    brand: "EQUIPMENT",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500",
    images: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"
    ],
    price: { amount: 650, currency: "AED", formattedAmount: "650 AED" },
    originalPrice: { amount: 850, currency: "AED", formattedAmount: "850 AED" },
    discount: { type: "percentage", value: 24 },
    category: "women",
    variants: [
      {id: "var-s001-s", attributes: [{name: "size", value: "S"}, {name: "color", value: "cream"}], available: true},
      {id: "var-s001-m", attributes: [{name: "size", value: "M"}, {name: "color", value: "cream"}], available: true},
      {id: "var-s001-l", attributes: [{name: "size", value: "L"}, {name: "color", value: "cream"}], available: false}
    ],
    availability: { inStock: true, quantity: 8 }
  },
  {
    id: "men-004",
    title: "Cashmere Sweater",
    brand: "BRUNELLO CUCINELLI",
    image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500",
    images: [
      "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500"
    ],
    price: { amount: 2100, currency: "AED", formattedAmount: "2,100 AED" },
    category: "men",
    variants: [
      {id: "var-m004-s", attributes: [{name: "size", value: "S"}, {name: "color", value: "gray"}], available: true},
      {id: "var-m004-m", attributes: [{name: "size", value: "M"}, {name: "color", value: "gray"}], available: true},
      {id: "var-m004-l", attributes: [{name: "size", value: "L"}, {name: "color", value: "gray"}], available: false}
    ],
    availability: { inStock: true, quantity: 2, isLowStock: true }
  },
  {
    id: "sports-002",
    title: "Yoga Leggings",
    brand: "LULULEMON",
    image: "https://images.pexels.com/photos/4327020/pexels-photo-4327020.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/4327020/pexels-photo-4327020.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    price: { amount: 390, currency: "AED", formattedAmount: "390 AED" },
    category: "sports",
    variants: [
      {id: "var-s002-s", attributes: [{name: "size", value: "S"}, {name: "color", value: "black"}], available: false},
      {id: "var-s002-m", attributes: [{name: "size", value: "M"}, {name: "color", value: "black"}], available: true},
      {id: "var-s002-l", attributes: [{name: "size", value: "L"}, {name: "color", value: "black"}], available: true}
    ],
    availability: { inStock: true, quantity: 30 }
  },
  {
    id: "jewellery-001",
    title: "Gold Chain Necklace",
    brand: "TIFFANY & CO.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"
    ],
    price: { amount: 2400, currency: "AED", formattedAmount: "2,400 AED" },
    category: "jewellery",
    variants: [
      {id: "var-j001", attributes: [{name: "size", value: "18inch"}, {name: "color", value: "gold"}], available: true}
    ],
    availability: { inStock: true, quantity: 8 }
  },
  {
    id: "home-002",
    title: "Scented Candle",
    brand: "DIPTYQUE",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"
    ],
    price: { amount: 340, currency: "AED", formattedAmount: "340 AED" },
    category: "home",
    variants: [
      {id: "var-h002", attributes: [{name: "size", value: "LARGE"}, {name: "color", value: "white"}], available: true}
    ],
    availability: { inStock: true, quantity: 20 }
  }
];

export function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeGuideCategory, setSizeGuideCategory] = useState<string>("women");
  
  // Auto-select "one-size" for bags on mount
  React.useEffect(() => {
    const initialSizes: Record<string, string> = {};
    wishlistItems.forEach(item => {
      if (item.category === 'bags') {
        initialSizes[item.id] = 'one-size';
      }
    });
    if (Object.keys(initialSizes).length > 0) {
      setSelectedSizes(prev => ({ ...prev, ...initialSizes }));
    }
  }, [wishlistItems]);

  // Get available sizes for a product
  const getAvailableSizes = (item: WishlistItem) => {
    if (item.category === 'bags') {
      return [{
        value: 'one-size',
        name: 'One Size',
        available: true
      }];
    }
    
    return item.variants?.reduce((sizes: any[], variant) => {
      const sizeAttr = variant.attributes.find(attr => attr.name === 'size');
      if (sizeAttr) {
        sizes.push({
          value: sizeAttr.value,
          name: sizeAttr.displayName || sizeAttr.value,
          available: variant.available !== undefined ? variant.available : item.availability.inStock
        });
      }
      return sizes;
    }, []) || [];
  };

  const handleSizeChange = (itemId: string, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddToBag = (item: WishlistItem) => {
    const selectedSize = selectedSizes[item.id];
    
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    console.log('Adding to bag:', {
      product: item.id,
      size: selectedSize,
      quantity: 1
    });
    
    // Optionally remove from wishlist after adding to bag
    // removeFromWishlist(item.id);
  };

  const openSizeGuide = (category: string) => {
    setSizeGuideCategory(category);
    setShowSizeGuide(true);
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-16">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Save items you love to view them here later</p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Size Guide Modal */}
        <SizeGuideModal
          isOpen={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          category={sizeGuideCategory}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">({wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''})</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => {
            const availableSizes = getAvailableSizes(item);
            const selectedSize = selectedSizes[item.id];
            const canAddToBag = selectedSize;

            return (
              <div key={item.id} className="group">
                <div className="relative overflow-hidden rounded-lg bg-muted/30 aspect-[3/4]">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  
                  {/* Remove from wishlist button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                    className="absolute top-2 right-2 transition-all duration-200 hover:scale-110"
                  >
                    <Trash2 className="h-5 w-5 text-black drop-shadow-md hover:text-red-500 transition-colors duration-200 stroke-[1.5]" />
                  </button>


                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <Link to={`/product/${item.id}`} className="hover:underline">
                      <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">{item.brand}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{item.price.formattedAmount}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {item.originalPrice.formattedAmount}
                      </span>
                    )}
                    {item.discount && (
                      <span className="text-xs font-medium text-red-600">
                        -{item.discount.value}%
                      </span>
                    )}
                  </div>

                  {/* Size Selection */}
                  {availableSizes.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium">Size</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs h-auto p-0"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openSizeGuide(item.category);
                          }}
                        >
                          <Ruler className="h-3 w-3 mr-1" />
                          Size Guide
                        </Button>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {availableSizes.map((size) => (
                          <Button
                            key={size.value}
                            variant={selectedSize === size.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleSizeChange(item.id, size.value)}
                            disabled={!size.available || (item.category === 'bags' && size.value === 'one-size')}
                            className={cn(
                              "h-8 px-2",
                              // Smaller font for long size names on mobile, regular size on desktop
                              size.name.length > 3 ? "text-[10px] md:text-xs" : "text-xs",
                              selectedSize === size.value ? "bg-black text-white hover:bg-black/90" : "",
                              !size.available && "opacity-50 cursor-not-allowed line-through",
                              item.category === 'bags' && size.value === 'one-size' && "cursor-default"
                            )}
                          >
                            {size.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Bag Button */}
                  <Button
                    onClick={() => handleAddToBag(item)}
                    disabled={!canAddToBag || !item.availability.inStock}
                    className="w-full text-xs h-9"
                    size="sm"
                  >
                    <ShoppingBag className="h-3 w-3 mr-2" />
                    {!item.availability.inStock ? 'Out of Stock' : 'Add to Bag'}
                  </Button>

                  {/* Low Stock Warning */}
                  {item.availability.isLowStock && item.availability.quantity && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Clock className="h-3 w-3 text-orange-600" />
                      <span className="text-xs text-orange-600 font-medium">
                        Low in stock: only {item.availability.quantity} left
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={sizeGuideCategory}
      />
    </div>
  );
} 