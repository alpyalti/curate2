import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Minus, 
  Plus, 
  Trash2, 
  Heart, 
  HelpCircle,
  Tag,
  ShoppingBag,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Clock
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";

interface CartItem {
  id: string;
  productId: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  formattedPrice: string;
  color: string;
  size?: string;
  quantity: number;
  inStock: boolean;
  stockCount?: number;
  isLowStock?: boolean;
}

interface CheckoutStep {
  id: string;
  title: string;
  completed: boolean;
  active: boolean;
}

interface SavedAddress {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  emirate: string;
  postalCode?: string;
  isDefault?: boolean;
}

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: "cart-1",
    productId: "swimwear-001",
    title: "Black Triangle Bikini Top",
    brand: "LETS SWIM",
    image: "https://letsswim.co/cdn/shop/files/LET_SSWIM-BLACKLET_SSWIMTRIANGLEBIKINITOP-6.jpg?v=1721327749",
    price: 450,
    formattedPrice: "450 AED",
    color: "Black",
    size: "M",
    quantity: 1,
    inStock: true
  },
  {
    id: "cart-2",
    productId: "swimwear-002", 
    title: "Red Wired Balconette Swimsuit",
    brand: "LETS SWIM",
    image: "https://letsswim.co/cdn/shop/files/LET_SSWIM-REDWIREDBALCONETTESWIMSUIT-1.jpg?v=1713187512",
    price: 750,
    formattedPrice: "750 AED",
    color: "Red",
    size: "S",
    quantity: 2,
    inStock: true,
    stockCount: 2,
    isLowStock: true
  },
  {
    id: "cart-3",
    productId: "bags-001",
    title: "Mardi Matin Lemon Yellow",
    brand: "NORI ENOMOTO",
    image: "https://nori-enomoto.com/cdn/shop/files/nori_mardi-matin_lemon-yellow_main_02.png?v=1750655214&width=2400",
    price: 1850,
    formattedPrice: "1,850 AED",
    color: "Lemon Yellow",
    quantity: 1,
    inStock: true
  }
];

const checkoutSteps: CheckoutStep[] = [
  { id: "shipping", title: "Shipping Address", completed: false, active: false },
  { id: "delivery", title: "Delivery Mode", completed: false, active: false },
  { id: "payment", title: "Payment", completed: false, active: false },
  { id: "review", title: "Review Order", completed: false, active: false }
];

export function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Checkout form states
  const [shippingAddress, setShippingAddress] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+971',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United Arab Emirates',
    isDefault: false
  });

  const [billingAddress, setBillingAddress] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+971',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United Arab Emirates'
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Mock saved addresses
  const [savedAddresses] = useState<SavedAddress[]>([
    {
      id: '1',
      name: 'Home',
      firstName: 'Ahmed',
      lastName: 'Al Mansouri',
      email: 'ahmed@example.com',
      phone: '+971 50 123 4567',
      address: '123 Sheikh Zayed Street',
      apartment: 'Apt 15B',
      city: 'Abu Dhabi',
      emirate: 'abu-dhabi',
      postalCode: '12345',
      isDefault: true
    },
    {
      id: '2',
      name: 'Office',
      firstName: 'Ahmed',
      lastName: 'Al Mansouri',
      email: 'ahmed@example.com',
      phone: '+971 50 123 4567',
      address: '456 Business Bay',
      city: 'Dubai',
      emirate: 'dubai',
      postalCode: '67890'
    },
    {
      id: '3',
      name: 'Summer House',
      firstName: 'Ahmed',
      lastName: 'Al Mansouri',
      email: 'ahmed@example.com',
      phone: '+971 50 123 4567',
      address: '789 Palm Jumeirah',
      apartment: 'Villa 12',
      city: 'Dubai',
      emirate: 'dubai',
      postalCode: '11111'
    }
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showCountryDropdown && !target.closest('.country-dropdown-container')) {
        setShowCountryDropdown(false);
        setCountrySearch('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCountryDropdown]);

  // Country codes data
  const countryCodes = [
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', name: 'Belgium', flag: '🇧🇪' },
    { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', name: 'Austria', flag: '🇦🇹' },
    { code: '+46', name: 'Sweden', flag: '🇸🇪' },
    { code: '+47', name: 'Norway', flag: '🇳🇴' },
    { code: '+45', name: 'Denmark', flag: '🇩🇰' },
    { code: '+358', name: 'Finland', flag: '🇫🇮' },
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
    { code: '+36', name: 'Hungary', flag: '🇭🇺' },
    { code: '+30', name: 'Greece', flag: '🇬🇷' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+353', name: 'Ireland', flag: '🇮🇪' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
    { code: '+27', name: 'South Africa', flag: '🇿🇦' },
    { code: '+52', name: 'Mexico', flag: '🇲🇽' },
    { code: '+55', name: 'Brazil', flag: '🇧🇷' },
    { code: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: '+57', name: 'Colombia', flag: '🇨🇴' },
    { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
    { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
    { code: '+51', name: 'Peru', flag: '🇵🇪' },
    { code: '+591', name: 'Bolivia', flag: '🇧🇴' },
    { code: '+595', name: 'Paraguay', flag: '🇵🇾' },
    { code: '+598', name: 'Uruguay', flag: '🇺🇾' },
    { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
    { code: '+507', name: 'Panama', flag: '🇵🇦' },
    { code: '+506', name: 'Costa Rica', flag: '🇨🇷' },
    { code: '+502', name: 'Guatemala', flag: '🇬🇹' },
    { code: '+503', name: 'El Salvador', flag: '🇸🇻' },
    { code: '+504', name: 'Honduras', flag: '🇭🇳' },
    { code: '+505', name: 'Nicaragua', flag: '🇳🇮' },
    { code: '+501', name: 'Belize', flag: '🇧🇿' },
    { code: '+509', name: 'Haiti', flag: '🇭🇹' },
    { code: '+1-809', name: 'Dominican Republic', flag: '🇩🇴' },
    { code: '+1-876', name: 'Jamaica', flag: '🇯🇲' },
    { code: '+1-868', name: 'Trinidad and Tobago', flag: '🇹🇹' },
    { code: '+1-246', name: 'Barbados', flag: '🇧🇧' },
    { code: '+1-473', name: 'Grenada', flag: '🇬🇩' },
    { code: '+1-784', name: 'Saint Vincent', flag: '🇻🇨' },
    { code: '+1-758', name: 'Saint Lucia', flag: '🇱🇨' },
    { code: '+1-767', name: 'Dominica', flag: '🇩🇲' },
    { code: '+1-664', name: 'Montserrat', flag: '🇲🇸' },
    { code: '+1-649', name: 'Turks and Caicos', flag: '🇹🇨' },
    { code: '+1-284', name: 'British Virgin Islands', flag: '🇻🇬' },
    { code: '+1-340', name: 'U.S. Virgin Islands', flag: '🇻🇮' },
    { code: '+1-242', name: 'Bahamas', flag: '🇧🇸' },
    { code: '+1-441', name: 'Bermuda', flag: '🇧🇲' },
    { code: '+1-345', name: 'Cayman Islands', flag: '🇰🇾' },
    { code: '+1-809', name: 'Dominican Republic', flag: '🇩🇴' },
    { code: '+1-876', name: 'Jamaica', flag: '🇯🇲' },
    { code: '+1-868', name: 'Trinidad and Tobago', flag: '🇹🇹' },
    { code: '+1-246', name: 'Barbados', flag: '🇧🇧' },
    { code: '+1-473', name: 'Grenada', flag: '🇬🇩' },
    { code: '+1-784', name: 'Saint Vincent', flag: '🇻🇨' },
    { code: '+1-758', name: 'Saint Lucia', flag: '🇱🇨' },
    { code: '+1-767', name: 'Dominica', flag: '🇩🇲' },
    { code: '+1-664', name: 'Montserrat', flag: '🇲🇸' },
    { code: '+1-649', name: 'Turks and Caicos', flag: '🇹🇨' },
    { code: '+1-284', name: 'British Virgin Islands', flag: '🇻🇬' },
    { code: '+1-340', name: 'U.S. Virgin Islands', flag: '🇻🇮' },
    { code: '+1-242', name: 'Bahamas', flag: '🇧🇸' },
    { code: '+1-441', name: 'Bermuda', flag: '🇧🇲' },
    { code: '+1-345', name: 'Cayman Islands', flag: '🇰🇾' }
  ];
  
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Vendor-specific shipping methods
  const [vendorShipping, setVendorShipping] = useState<Record<string, {
    method: string;
    cost: string;
    description: string;
  }>>({});

  // Group items by brand
  const groupedItems = cartItems.reduce((groups, item) => {
    const brand = item.brand;
    if (!groups[brand]) {
      groups[brand] = [];
    }
    groups[brand].push(item);
    return groups;
  }, {} as Record<string, CartItem[]>);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate total delivery fee from all vendors
  const deliveryFee = Object.values(vendorShipping).reduce((sum, shipping) => {
    return sum + parseFloat(shipping.cost || '0');
  }, 0);
  
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0; // 10% discount
  const total = subtotal + deliveryFee - promoDiscount;

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
    }
  };

  const proceedToCheckout = () => {
    setIsCheckout(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < checkoutSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const backToCart = () => {
    setIsCheckout(false);
    setCurrentStep(0);
  };

  const handleVendorShippingChange = (vendor: string, method: string, cost: string, description: string) => {
    setVendorShipping(prev => ({
      ...prev,
      [vendor]: { method, cost, description }
    }));
  };

  const handlePlaceOrder = () => {
    // Generate order number
    const orderNumber = Math.random().toString().substr(2, 8);
    
    // Prepare order data
    const orderData = {
      orderNumber,
      total,
      items: cartItems,
      shippingAddress,
      billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      vendorShipping,
      paymentMethod: paymentMethod === 'card' ? 'Payment online' : paymentMethod
    };

    // Navigate to confirmation page with order data
    navigate('/order-confirmation', { state: { orderData } });
  };

  const selectAddress = (address: SavedAddress) => {
    setSelectedAddressId(address.id);
    setShippingAddress({
      title: '',
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      countryCode: '+971',
      phone: address.phone,
      address: address.address,
      apartment: address.apartment || '',
      city: address.city,
      country: 'United Arab Emirates',
      isDefault: address.isDefault || false
    });
    setShowNewAddressForm(false);
  };

  const handleAddNewAddress = () => {
    setSelectedAddressId(null);
    setShowNewAddressForm(true);
    setShippingAddress({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+971',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      country: 'United Arab Emirates',
      isDefault: false
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">My Bag</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your bag is empty</h2>
            <p className="text-muted-foreground mb-8 text-lg">Start shopping to add items to your bag</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/new-in">Start Shopping</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to="/sale">View Sale Items</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
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
            {isCheckout ? (
              <>
                <button onClick={backToCart} className="hover:text-foreground">My Bag</button>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">Checkout</span>
              </>
            ) : (
              <span className="text-foreground font-medium">My Bag</span>
            )}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!isCheckout ? (
          /* Cart View */
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold">My Bag</h1>
              <p className="text-muted-foreground">({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Products List */}
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                {Object.entries(groupedItems).map(([brand, items]) => (
                  <div key={brand} className="space-y-4">
                    <div className="border-b pb-2">
                      <h2 className="text-base lg:text-lg font-semibold">
                        Sold by{' '}
                        <Link 
                          to={`/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-primary hover:underline"
                        >
                          {brand}
                        </Link>
                      </h2>
                    </div>

                    {items.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-3 md:p-4">
                          <div className="flex gap-3 md:gap-4">
                            <Link to={`/product/${item.productId}`} className="relative flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-20 md:w-20 md:h-28 object-cover rounded-lg hover:opacity-90 transition-opacity"
                              />
                              {!item.inStock && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                  <span className="text-white text-xs font-medium">Out of Stock</span>
                                </div>
                              )}
                            </Link>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                                <div className="min-w-0 flex-1">
                                  <Link to={`/product/${item.productId}`} className="hover:underline">
                                    <h3 className="font-medium text-sm md:text-base truncate">{item.title}</h3>
                                  </Link>
                                  <p className="text-xs md:text-sm text-muted-foreground">{item.brand}</p>
                                </div>
                                <p className="font-semibold text-sm md:text-base whitespace-nowrap">{item.formattedPrice}</p>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 mb-3 text-xs md:text-sm">
                                <span>Color: {item.color}</span>
                                {item.size && <span>Size: {item.size}</span>}
                              </div>

                              {item.isLowStock && item.stockCount && (
                                <div className="mb-3">
                                  <span className="text-xs md:text-sm text-orange-600 font-medium flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    Low in stock: only {item.stockCount} left.
                                  </span>
                                </div>
                              )}

                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>

                                <div className="flex items-center gap-1 sm:gap-2">
                                  <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
                                    <Heart className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                    <span className="hidden sm:inline">Move to wishlist</span>
                                    <span className="sm:hidden">Wishlist</span>
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="lg:sticky lg:top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{subtotal.toLocaleString()} AED</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">Estimated delivery fee</span>
                        <div className="relative">
                          <HelpCircle 
                            className="h-4 w-4 text-muted-foreground cursor-help"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          />
                          {showTooltip && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
                              Delivery fee is an estimated cost and will be calculated more accurately when you checkout your purchases.
                            </div>
                          )}
                        </div>
                      </div>
                      <span>{deliveryFee === 0 ? 'Free' : `${deliveryFee} AED`}</span>
                    </div>

                    {deliveryFee === 0 && (
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Free shipping selected
                      </div>
                    )}

                    {/* Promo Code */}
                    <div className="border-t pt-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={promoApplied}
                          className="h-10 md:h-auto"
                        />
                        <Button 
                          variant="outline"
                          onClick={applyPromoCode}
                          disabled={promoApplied || !promoCode}
                          className="h-10 w-10 p-0 md:h-auto md:w-auto md:p-2"
                        >
                          <Tag className="h-4 w-4" />
                        </Button>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between mt-2 text-green-600">
                          <span>Promo discount (WELCOME10)</span>
                          <span>-{promoDiscount} AED</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>{total.toLocaleString()} AED</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={proceedToCheckout}
                    >
                      Proceed to Checkout
                    </Button>

                    <div className="text-center">
                      <Button variant="ghost" asChild className="h-10 md:h-auto">
                        <Link to="/">Continue Shopping</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          /* Checkout View */
          <>
            <div className="flex flex-col gap-4 mb-6 md:mb-8">
              <Button variant="ghost" size="sm" onClick={backToCart} className="self-start w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bag
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 order-1">
                {/* Checkout Steps - Left column only */}
                <div className="mb-6 lg:mb-8">
                  <div className="flex justify-between overflow-x-auto pb-2 px-1 -mx-1">
                                          {checkoutSteps.map((step, index) => (
                        <div key={step.id} className="flex items-center min-w-0 flex-shrink-0 px-1">
                        <div className="flex flex-col items-center md:flex-row md:items-center">
                          <div className={cn(
                            "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium",
                            index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            {index < currentStep ? <CheckCircle className="h-3 w-3 md:h-4 md:w-4" /> : index + 1}
                          </div>
                          <span className={cn(
                            "mt-1 md:mt-0 md:ml-2 text-xs md:text-sm font-medium whitespace-nowrap",
                            index <= currentStep ? "text-foreground" : "text-muted-foreground"
                          )}>
                            <span className="hidden sm:inline">{step.title}</span>
                            <span className="sm:hidden">
                              {step.title.split(' ')[0]}
                            </span>
                          </span>
                        </div>
                        {index < checkoutSteps.length - 1 && (
                          <div className={cn(
                            "hidden md:block h-px w-4 md:w-8 mx-2 md:mx-4 flex-shrink-0",
                            index < currentStep ? "bg-primary" : "bg-muted"
                          )} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      {currentStep === 0 && <MapPin className="h-4 w-4 md:h-5 md:w-5" />}
                      {currentStep === 1 && <Truck className="h-4 w-4 md:h-5 md:w-5" />}
                      {currentStep === 2 && <CreditCard className="h-4 w-4 md:h-5 md:w-5" />}
                      {currentStep === 3 && <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />}
                      {currentStep === 1 ? 'Shipping Method' : checkoutSteps[currentStep].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-4">
                    {/* Shipping Address Form */}
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        {/* Select Shipping Address Section */}
                        {!showNewAddressForm && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">Select your Shipping Address</h3>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAddNewAddress}
                                className="text-sm"
                              >
                                + Add New Address
                              </Button>
                            </div>
                            
                            {/* Saved Addresses - 2x2 Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {savedAddresses.map((address) => (
                                <div
                                  key={address.id}
                                  className={cn(
                                    "border rounded-lg p-4 cursor-pointer transition-all",
                                    selectedAddressId === address.id 
                                      ? "border-primary bg-primary/5" 
                                      : "border-muted hover:border-gray-300"
                                  )}
                                  onClick={() => selectAddress(address)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-medium">{address.firstName} {address.lastName}</h4>
                                        {address.isDefault && (
                                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                            Default
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-sm space-y-1 text-muted-foreground">
                                        <p>{address.address}</p>
                                        {address.apartment && <p>{address.apartment}</p>}
                                        <p>{address.city}, {address.emirate}</p>
                                        <p className="flex items-center gap-2">
                                          <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                                            <div className="w-full h-full relative">
                                              {/* Sol dikey kırmızı şerit */}
                                              <div className="absolute left-0 top-0 w-1/4 h-full bg-red-600"></div>
                                              {/* Sağ tarafta yatay şeritler */}
                                              <div className="absolute left-1/4 top-0 w-3/4 h-1/3 bg-green-600"></div>
                                              <div className="absolute left-1/4 top-1/3 w-3/4 h-1/3 bg-white"></div>
                                              <div className="absolute left-1/4 top-2/3 w-3/4 h-1/3 bg-black"></div>
                                            </div>
                                          </div>
                                          {address.phone}
                                        </p>
                                      </div>
                                    </div>
                                    <div className={cn(
                                      "w-5 h-5 rounded-full border-2 ml-4",
                                      selectedAddressId === address.id 
                                        ? "border-primary bg-primary" 
                                        : "border-muted"
                                    )} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* New Address Form */}
                        {showNewAddressForm && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">Add New Address</h3>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowNewAddressForm(false)}
                                className="text-sm"
                              >
                                ← Back
                              </Button>
                            </div>
                            {/* Title Dropdown */}
                            <div>
                              <Label htmlFor="title">Title (Optional)</Label>
                              <Select value={shippingAddress.title} onValueChange={(value) => setShippingAddress(prev => ({...prev, title: value}))}>
                                <SelectTrigger className="h-12 md:h-10">
                                  <SelectValue placeholder="Select title" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Mr.">Mr.</SelectItem>
                                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                                  <SelectItem value="Ms.">Ms.</SelectItem>
                                  <SelectItem value="Miss">Miss</SelectItem>
                                  <SelectItem value="Rev.">Rev.</SelectItem>
                                  <SelectItem value="Dr.">Dr.</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input
                                  id="firstName"
                                  value={shippingAddress.firstName}
                                  onChange={(e) => setShippingAddress(prev => ({...prev, firstName: e.target.value}))}
                                  placeholder="Enter first name"
                                  className="h-12 md:h-10"
                                />
                              </div>
                              <div>
                                <Label htmlFor="lastName">Last Name *</Label>
                                <Input
                                  id="lastName"
                                  value={shippingAddress.lastName}
                                  onChange={(e) => setShippingAddress(prev => ({...prev, lastName: e.target.value}))}
                                  placeholder="Enter last name"
                                  className="h-12 md:h-10"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={shippingAddress.email}
                                onChange={(e) => setShippingAddress(prev => ({...prev, email: e.target.value}))}
                                placeholder="Enter email address"
                                className="h-12 md:h-10"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="phone">Phone Number *</Label>
                              <div className="flex gap-2">
                                {/* Country Code Selector */}
                                <div className="relative country-dropdown-container">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowCountryDropdown(!showCountryDropdown);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 border border-input bg-background rounded-md h-12 md:h-10 min-w-[100px] hover:bg-accent"
                                  >
                                    <span className="text-lg">{countryCodes.find(c => c.code === shippingAddress.countryCode)?.flag || '🇦🇪'}</span>
                                    <span className="text-sm font-medium">{shippingAddress.countryCode}</span>
                                    <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                  
                                  {/* Country Dropdown */}
                                  {showCountryDropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-80 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                                      {/* Search Input */}
                                      <div className="p-3 border-b">
                                        <input
                                          type="text"
                                          placeholder="Search countries..."
                                          value={countrySearch}
                                          onChange={(e) => setCountrySearch(e.target.value)}
                                          onClick={(e) => e.stopPropagation()}
                                          className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                      </div>
                                      
                                      {/* Country List */}
                                      <div className="py-1">
                                        {countryCodes
                                          .filter(country => 
                                            country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
                                            country.code.includes(countrySearch)
                                          )
                                          .map((country) => (
                                            <button
                                              key={country.code}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setShippingAddress(prev => ({...prev, countryCode: country.code}));
                                                setShowCountryDropdown(false);
                                                setCountrySearch('');
                                              }}
                                              className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-accent"
                                            >
                                              <span className="text-lg">{country.flag}</span>
                                              <span className="text-sm font-medium">{country.code}</span>
                                              <span className="text-sm text-muted-foreground">{country.name}</span>
                                            </button>
                                          ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Phone Number Input */}
                                <Input
                                  id="phone"
                                  value={shippingAddress.phone}
                                  onChange={(e) => setShippingAddress(prev => ({...prev, phone: e.target.value}))}
                                  placeholder="XX XXX XXXX"
                                  className="h-12 md:h-10 flex-1"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="address">Address *</Label>
                              <Input
                                id="address"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress(prev => ({...prev, address: e.target.value}))}
                                placeholder="Street address"
                                className="h-12 md:h-10"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                              <Input
                                id="apartment"
                                value={shippingAddress.apartment}
                                onChange={(e) => setShippingAddress(prev => ({...prev, apartment: e.target.value}))}
                                placeholder="Apartment, suite, unit, building, floor, etc."
                                className="h-12 md:h-10"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="city">City *</Label>
                              <Select value={shippingAddress.city} onValueChange={(value) => setShippingAddress(prev => ({...prev, city: value}))}>
                                <SelectTrigger className="h-12 md:h-10">
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                                  <SelectItem value="Dubai">Dubai</SelectItem>
                                  <SelectItem value="Sharjah">Sharjah</SelectItem>
                                  <SelectItem value="Ajman">Ajman</SelectItem>
                                  <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                                  <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                                  <SelectItem value="Fujairah">Fujairah</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {/* Set as Default Checkbox */}
                            <div className="flex items-center space-x-2 pt-2">
                              <Checkbox
                                id="isDefault"
                                checked={shippingAddress.isDefault}
                                onCheckedChange={(checked) => 
                                  setShippingAddress(prev => ({...prev, isDefault: checked as boolean}))
                                }
                              />
                              <Label htmlFor="isDefault" className="text-sm font-normal">
                                Set as default address
                              </Label>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Delivery Mode Form */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        {/* Group items by vendor */}
                        {Object.entries(
                          cartItems.reduce((acc, item) => {
                            if (!acc[item.brand]) {
                              acc[item.brand] = [];
                            }
                            acc[item.brand].push(item);
                            return acc;
                          }, {} as Record<string, CartItem[]>)
                                                 ).map(([vendor, items], index) => (
                           <div key={vendor} className={cn("space-y-4", index > 0 && "pt-8 border-t")}>
                            {/* Vendor Header */}
                            <div className="text-sm text-muted-foreground">
                              Sold by <span className="font-medium text-foreground">{vendor}</span>
                            </div>
                            
                            {/* Vendor Products */}
                            <div className="space-y-3">
                              {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                                                <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-16 h-20 object-cover rounded-lg"
                              />
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">{item.title}</h4>
                                    <div className="text-sm text-muted-foreground">
                                      Color: {item.color}
                                      {item.size && `, Size: ${item.size}`}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm">QTY: {item.quantity}</div>
                                    <div className="font-semibold">{item.formattedPrice}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Shipping Options for this Vendor */}
                            <div className="space-y-3">
                              <div 
                                className={cn(
                                  "border rounded-lg p-4 cursor-pointer transition-all",
                                  vendorShipping[vendor]?.method === 'international' ? "border-primary bg-primary/5" : "border-muted hover:border-gray-300"
                                )}
                                onClick={() => handleVendorShippingChange(
                                  vendor, 
                                  'international', 
                                  vendor === 'LETS SWIM' ? '167.71' : '1,053.91',
                                  'International shipping'
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={cn(
                                      "w-5 h-5 rounded-full border-2",
                                      vendorShipping[vendor]?.method === 'international' ? "border-primary bg-primary" : "border-muted"
                                    )} />
                                    <div>
                                      <h3 className="font-medium">Ships Internationally</h3>
                                      <p className="text-sm text-muted-foreground">International shipping</p>
                                    </div>
                                  </div>
                                  <span className="font-medium">
                                    AED {vendor === 'LETS SWIM' ? '167.71' : '1,053.91'}
                                  </span>
                                </div>
                              </div>
                              
                              <div 
                                className={cn(
                                  "border rounded-lg p-4 cursor-pointer transition-all",
                                  vendorShipping[vendor]?.method === 'express' ? "border-primary bg-primary/5" : "border-muted hover:border-gray-300"
                                )}
                                onClick={() => handleVendorShippingChange(
                                  vendor, 
                                  'express', 
                                  vendor === 'LETS SWIM' ? '200.00' : '1,200.00',
                                  'Express shipping (1-2 days)'
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={cn(
                                      "w-5 h-5 rounded-full border-2",
                                      vendorShipping[vendor]?.method === 'express' ? "border-primary bg-primary" : "border-muted"
                                    )} />
                                    <div>
                                      <h3 className="font-medium">Express Shipping</h3>
                                      <p className="text-sm text-muted-foreground">1-2 business days</p>
                                    </div>
                                  </div>
                                  <span className="font-medium">
                                    AED {vendor === 'LETS SWIM' ? '200.00' : '1,200.00'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Payment Form */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        {/* Payment Method Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div 
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all touch-manipulation",
                              paymentMethod === 'card' ? "border-primary bg-primary/5" : "border-muted hover:border-gray-300"
                            )}
                            onClick={() => setPaymentMethod('card')}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-5 h-5 rounded-full border-2",
                                paymentMethod === 'card' ? "border-primary bg-primary" : "border-muted"
                              )} />
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                <span className="font-medium">Pay online</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <img src="/Container.png" alt="Payment Methods" className="h-8" />
                            </div>
                          </div>
                        </div>

                        {/* Billing Address Section */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Billing address</h4>
                          
                          {/* Same as Shipping Checkbox */}
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="sameAsShipping"
                              checked={sameAsShipping}
                              onCheckedChange={(checked) => {
                                setSameAsShipping(checked as boolean);
                                if (checked) {
                                  setBillingAddress(shippingAddress);
                                }
                              }}
                            />
                            <Label htmlFor="sameAsShipping" className="text-sm font-normal">
                              Same as shipping address
                            </Label>
                          </div>

                          {/* Billing Address Display */}
                          {sameAsShipping && (
                            <div className="bg-muted/30 p-4 rounded-lg">
                              <div className="text-sm space-y-1">
                                <p className="font-medium">Ahmed Al Mansouri</p>
                                <p>123 Sheikh Zayed Street</p>
                                <p>Abu Dhabi, UAE</p>
                              </div>
                            </div>
                          )}

                          {/* Billing Address Form */}
                          {!sameAsShipping && (
                            <div className="space-y-4 border rounded-lg p-4">
                              {/* Title Dropdown */}
                              <div>
                                <Label htmlFor="billingTitle">Title (Optional)</Label>
                                <Select value={billingAddress.title} onValueChange={(value) => setBillingAddress(prev => ({...prev, title: value}))}>
                                  <SelectTrigger className="h-12 md:h-10">
                                    <SelectValue placeholder="Select title" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Mr.">Mr.</SelectItem>
                                    <SelectItem value="Mrs.">Mrs.</SelectItem>
                                    <SelectItem value="Ms.">Ms.</SelectItem>
                                    <SelectItem value="Miss">Miss</SelectItem>
                                    <SelectItem value="Rev.">Rev.</SelectItem>
                                    <SelectItem value="Dr.">Dr.</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="billingFirstName">First Name *</Label>
                                  <Input
                                    id="billingFirstName"
                                    value={billingAddress.firstName}
                                    onChange={(e) => setBillingAddress(prev => ({...prev, firstName: e.target.value}))}
                                    placeholder="Enter first name"
                                    className="h-12 md:h-10"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="billingLastName">Last Name *</Label>
                                  <Input
                                    id="billingLastName"
                                    value={billingAddress.lastName}
                                    onChange={(e) => setBillingAddress(prev => ({...prev, lastName: e.target.value}))}
                                    placeholder="Enter last name"
                                    className="h-12 md:h-10"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="billingEmail">Email *</Label>
                                <Input
                                  id="billingEmail"
                                  type="email"
                                  value={billingAddress.email}
                                  onChange={(e) => setBillingAddress(prev => ({...prev, email: e.target.value}))}
                                  placeholder="Enter email address"
                                  className="h-12 md:h-10"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="billingPhone">Phone Number *</Label>
                                <div className="flex gap-2">
                                  <div className="relative">
                                    <button
                                      type="button"
                                      className="flex items-center gap-2 px-3 py-2 border border-input bg-background rounded-md h-12 md:h-10 min-w-[100px] hover:bg-accent"
                                    >
                                      <span className="text-lg">🇦🇪</span>
                                      <span className="text-sm font-medium">+971</span>
                                    </button>
                                  </div>
                                  <Input
                                    id="billingPhone"
                                    value={billingAddress.phone}
                                    onChange={(e) => setBillingAddress(prev => ({...prev, phone: e.target.value}))}
                                    placeholder="XX XXX XXXX"
                                    className="h-12 md:h-10 flex-1"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="billingAddress">Address *</Label>
                                <Input
                                  id="billingAddress"
                                  value={billingAddress.address}
                                  onChange={(e) => setBillingAddress(prev => ({...prev, address: e.target.value}))}
                                  placeholder="Street address"
                                  className="h-12 md:h-10"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="billingApartment">Apartment, suite, etc. (optional)</Label>
                                <Input
                                  id="billingApartment"
                                  value={billingAddress.apartment}
                                  onChange={(e) => setBillingAddress(prev => ({...prev, apartment: e.target.value}))}
                                  placeholder="Apartment, suite, unit, building, floor, etc."
                                  className="h-12 md:h-10"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="billingCity">City *</Label>
                                <Select value={billingAddress.city} onValueChange={(value) => setBillingAddress(prev => ({...prev, city: value}))}>
                                  <SelectTrigger className="h-12 md:h-10">
                                    <SelectValue placeholder="Select city" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                                    <SelectItem value="Dubai">Dubai</SelectItem>
                                    <SelectItem value="Sharjah">Sharjah</SelectItem>
                                    <SelectItem value="Ajman">Ajman</SelectItem>
                                    <SelectItem value="Umm Al Quwain">Umm Al Quwain</SelectItem>
                                    <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                                    <SelectItem value="Fujairah">Fujairah</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>
                        

                      </div>
                    )}

                    {/* Review Order */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Shipping Address</h4>
                            <div className="text-sm space-y-1">
                              <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                              <p>{shippingAddress.address}</p>
                              {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                              <p>{shippingAddress.city}</p>
                              <p>{shippingAddress.country}</p>
                              <p>{shippingAddress.phone}</p>
                              <p>{shippingAddress.email}</p>
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Billing Address</h4>
                            <div className="text-sm space-y-1">
                              {sameAsShipping ? (
                                <>
                                  <p>Ahmed Al Mansouri</p>
                                  <p>123 Sheikh Zayed Street</p>
                                  <p>Abu Dhabi, UAE</p>
                                </>
                              ) : (
                                <>
                                  <p>{billingAddress.firstName} {billingAddress.lastName}</p>
                                  <p>{billingAddress.address}</p>
                                  {billingAddress.apartment && <p>{billingAddress.apartment}</p>}
                                  <p>{billingAddress.city}</p>
                                  <p>{billingAddress.country}</p>
                                  <p>{billingAddress.phone}</p>
                                  <p>{billingAddress.email}</p>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Delivery Method</h4>
                            <div className="space-y-3">
                              {Object.entries(
                                cartItems.reduce((acc, item) => {
                                  if (!acc[item.brand]) {
                                    acc[item.brand] = [];
                                  }
                                  acc[item.brand].push(item);
                                  return acc;
                                }, {} as Record<string, CartItem[]>)
                              ).map(([vendor, items]) => {
                                const shipping = vendorShipping[vendor];
                                return (
                                  <div key={vendor} className="border-l-2 border-primary/20 pl-3">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="font-medium text-sm text-primary">{vendor}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                          {items.map(item => item.title).join(', ')}
                                        </div>
                                        {shipping && (
                                          <div className="mt-2 text-sm">
                                            <div className="font-medium capitalize">
                                              {shipping.method.replace('-', ' ')} Shipping
                                            </div>
                                            <div className="text-muted-foreground text-xs">
                                              {shipping.description}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      {shipping && (
                                        <div className="text-right">
                                          <div className="font-semibold text-sm">AED {shipping.cost}</div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                              
                              {/* Show message if no shipping methods selected */}
                              {Object.keys(vendorShipping).length === 0 && (
                                <div className="text-sm text-muted-foreground">
                                  Please select shipping methods for all vendors in the previous step.
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Payment Method</h4>
                            <div className="text-sm">
                              <p>
                                {paymentMethod === 'card' && 'Pay online'}
                                {paymentMethod === 'apple-pay' && 'Apple Pay'}
                                {paymentMethod === 'google-pay' && 'Google Pay'}
                                {!paymentMethod && 'No payment method selected'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <Checkbox
                              id="terms"
                            />
                            <Label htmlFor="terms" className="text-sm font-normal">
                              I agree to the <a href="/terms-conditions" className="text-primary hover:underline">Terms and Conditions</a> and <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={cn(
                      "pt-6 gap-3 border-t",
                      currentStep === 0 
                        ? "flex justify-end" 
                        : "flex flex-col-reverse sm:flex-row justify-between"
                    )}>
                      {currentStep > 0 && (
                        <Button 
                          variant="outline" 
                          onClick={prevStep}
                          className="h-12 md:h-10 w-full sm:w-auto"
                          size="lg"
                        >
                          Previous
                        </Button>
                      )}
                      <Button 
                        onClick={currentStep === checkoutSteps.length - 1 ? handlePlaceOrder : nextStep}
                        className="h-12 md:h-10 w-full sm:w-auto"
                        size="lg"
                      >
                        {currentStep === checkoutSteps.length - 1 ? 'Place Order' : 'Continue'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary (Checkout) */}
              <div className="lg:col-span-1 order-2">
                <Card className="lg:sticky lg:top-24">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    {/* Mini product list */}
                    <div className="space-y-3 max-h-40 lg:max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-8 h-10 lg:w-10 lg:h-14 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.brand}</p>
                            <p className="text-xs">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium whitespace-nowrap">{item.formattedPrice}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{subtotal.toLocaleString()} AED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery fee</span>
                        <span>{deliveryFee === 0 ? 'Free' : `${deliveryFee} AED`}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Promo discount</span>
                          <span>-{promoDiscount} AED</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>{total.toLocaleString()} AED</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}