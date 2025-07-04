import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  { id: "payment", title: "Payment Method", completed: false, active: false },
  { id: "review", title: "Review Order", completed: false, active: false }
];

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Checkout form states
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United Arab Emirates',
    emirate: '',
    postalCode: ''
  });
  
  const [deliveryMode, setDeliveryMode] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

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
  const deliveryFee = deliveryMode === 'pickup' ? 0 : (subtotal > 500 ? 0 : 20); // Free delivery over 500 AED or pickup
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

  if (cartItems.length === 0) {
      return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your bag is empty</h2>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your bag</p>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
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

                    {deliveryFee === 0 && deliveryMode !== 'pickup' && (
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Free delivery on orders over 500 AED
                      </div>
                    )}
                    {deliveryMode === 'pickup' && (
                      <div className="text-sm text-blue-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Store pickup is always free
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
                      {checkoutSteps[currentStep].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-4">
                    {/* Shipping Address Form */}
                    {currentStep === 0 && (
                      <div className="space-y-4">
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
                          <Input
                            id="phone"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress(prev => ({...prev, phone: e.target.value}))}
                            placeholder="+971 XX XXX XXXX"
                            className="h-12 md:h-10"
                          />
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={shippingAddress.city}
                              onChange={(e) => setShippingAddress(prev => ({...prev, city: e.target.value}))}
                              placeholder="Enter city"
                              className="h-12 md:h-10"
                            />
                          </div>
                          <div>
                            <Label htmlFor="emirate">Emirate *</Label>
                            <Select value={shippingAddress.emirate} onValueChange={(value) => setShippingAddress(prev => ({...prev, emirate: value}))}>
                              <SelectTrigger className="h-12 md:h-10">
                                <SelectValue placeholder="Select emirate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                                <SelectItem value="dubai">Dubai</SelectItem>
                                <SelectItem value="sharjah">Sharjah</SelectItem>
                                <SelectItem value="ajman">Ajman</SelectItem>
                                <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                                <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                                <SelectItem value="fujairah">Fujairah</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="postalCode">Postal Code (optional)</Label>
                          <Input
                            id="postalCode"
                            value={shippingAddress.postalCode}
                            onChange={(e) => setShippingAddress(prev => ({...prev, postalCode: e.target.value}))}
                            placeholder="Enter postal code"
                            className="h-12 md:h-10"
                          />
                        </div>
                      </div>
                    )}

                    {/* Delivery Mode Form */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div 
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all touch-manipulation",
                              deliveryMode === 'standard' ? "border-primary bg-primary/5" : "border-muted hover:border-gray-300"
                            )}
                            onClick={() => setDeliveryMode('standard')}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-5 h-5 rounded-full border-2",
                                  deliveryMode === 'standard' ? "border-primary bg-primary" : "border-muted"
                                )} />
                                <div>
                                  <h3 className="font-medium">Standard Delivery</h3>
                                  <p className="text-sm text-muted-foreground">1-2 business days</p>
                                </div>
                              </div>
                              <span className="font-medium">20 AED</span>
                            </div>
                          </div>
                          
                          <div 
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all touch-manipulation",
                              deliveryMode === 'pickup' ? "border-primary bg-primary/5" : "border-muted hover:border-gray-300"
                            )}
                            onClick={() => setDeliveryMode('pickup')}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-5 h-5 rounded-full border-2",
                                  deliveryMode === 'pickup' ? "border-primary bg-primary" : "border-muted"
                                )} />
                                <div>
                                  <h3 className="font-medium">Pick-up</h3>
                                  <p className="text-sm text-muted-foreground">Pick it up from the pickup location</p>
                                </div>
                              </div>
                              <span className="font-medium">Free</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Delivery Notes</h4>
                          <p className="text-sm text-muted-foreground">
                            Free delivery on orders over 500 AED. Pick-up location details will be provided after order confirmation.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Payment Method Form */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-4">
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
                                <span className="font-medium">Credit / Debit Card</span>
                              </div>
                            </div>
                          </div>
                          
                          <div 
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all touch-manipulation",
                              paymentMethod === 'apple-pay' ? "border-primary bg-primary/5" : "border-muted hover:border-gray-300"
                            )}
                            onClick={() => setPaymentMethod('apple-pay')}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-5 h-5 rounded-full border-2",
                                paymentMethod === 'apple-pay' ? "border-primary bg-primary" : "border-muted"
                              )} />
                              <div className="flex items-center gap-2">
                                <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor">
                                  <path d="M16.789 13.911c0 0.956-0.583 1.506-1.611 1.506h-1.35v-3.011h1.356c1.022 0 1.605 0.544 1.605 1.505zM19.428 17.389c0 0.461 0.4 0.761 1.028 0.761 0.8 0 1.4-0.505 1.4-1.217v-0.428l-1.306 0.083c-0.739 0.050-1.122 0.322-1.122 0.8zM32 6.167v19.556c0 1.472-1.194 2.667-2.667 2.667h-26.667c-1.472 0-2.667-1.194-2.667-2.667v-19.556c0-1.472 1.194-2.667 2.667-2.667h26.667c1.472 0 2.667 1.194 2.667 2.667zM7.1 12.733c0.467 0.039 0.933-0.233 1.228-0.578 0.289-0.356 0.478-0.833 0.428-1.317-0.411 0.017-0.922 0.272-1.217 0.628-0.267 0.306-0.494 0.8-0.439 1.267zM10.467 16.872c-0.011-0.011-1.089-0.422-1.1-1.667-0.011-1.039 0.85-1.539 0.889-1.567-0.489-0.722-1.245-0.8-1.506-0.817-0.678-0.039-1.256 0.383-1.578 0.383-0.328 0-0.817-0.367-1.35-0.355-0.694 0.011-1.344 0.406-1.694 1.033-0.728 1.256-0.189 3.111 0.517 4.133 0.344 0.505 0.761 1.061 1.306 1.039 0.516-0.022 0.722-0.333 1.344-0.333 0.628 0 0.806 0.333 1.35 0.328 0.567-0.011 0.917-0.505 1.267-1.011 0.383-0.578 0.544-1.133 0.556-1.167zM17.989 13.906c0-1.478-1.028-2.489-2.495-2.489h-2.844v7.578h1.178v-2.589h1.628c1.489 0 2.533-1.022 2.533-2.5zM22.989 15.222c0-1.094-0.878-1.8-2.222-1.8-1.25 0-2.172 0.717-2.206 1.694h1.061c0.089-0.467 0.522-0.772 1.111-0.772 0.722 0 1.122 0.333 1.122 0.956v0.417l-1.467 0.089c-1.367 0.083-2.105 0.645-2.105 1.617 0 0.983 0.761 1.633 1.855 1.633 0.739 0 1.422-0.372 1.733-0.967h0.022v0.911h1.089v-3.778zM28.667 13.494h-1.194l-1.383 4.478h-0.022l-1.383-4.478h-1.239l1.994 5.517-0.105 0.333c-0.178 0.567-0.472 0.789-0.994 0.789-0.095 0-0.272-0.011-0.345-0.017v0.911c0.067 0.022 0.361 0.028 0.45 0.028 1.15 0 1.689-0.439 2.161-1.767z"/>
                                </svg>
                                <span className="font-medium">Apple Pay</span>
                              </div>
                            </div>
                          </div>
                          
                          <div 
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all touch-manipulation",
                              paymentMethod === 'google-pay' ? "border-primary bg-primary/5" : "border-muted hover:border-gray-300"
                            )}
                            onClick={() => setPaymentMethod('google-pay')}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-5 h-5 rounded-full border-2",
                                paymentMethod === 'google-pay' ? "border-primary bg-primary" : "border-muted"
                              )} />
                              <div className="flex items-center gap-2">
                                <svg className="h-5 w-5" viewBox="0 -9 58 58" fill="none">
                                  <rect x="0.5" y="0.5" width="57" height="39" rx="3.5" fill="white" stroke="#F3F3F3"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M27.9174 24.1182V19.6071V19.6062H30.3578C31.3639 19.6068 32.2095 19.2907 32.8945 18.6578C33.5868 18.0571 33.9738 17.1935 33.9541 16.2934C33.9678 15.3982 33.5815 14.541 32.8945 13.9422C32.2155 13.3059 31.3023 12.9587 30.3578 12.9778H26.4404V24.1182H27.9174ZM27.9174 18.2382V14.3494V14.3485H30.3945C30.9466 14.3334 31.4788 14.5487 31.856 14.9396C32.2355 15.2971 32.4496 15.7881 32.4496 16.3009C32.4496 16.8137 32.2355 17.3048 31.856 17.6622C31.4741 18.0449 30.9436 18.254 30.3945 18.2382H27.9174Z" fill="#5F6368"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M39.9431 17.0951C39.3113 16.5297 38.4496 16.2471 37.3578 16.2471C35.9554 16.2471 34.8963 16.7448 34.1807 17.7404L35.4817 18.5342C35.9624 17.8598 36.6153 17.5226 37.4404 17.5226C37.9664 17.5167 38.4755 17.703 38.8661 18.0444C39.2555 18.3564 39.4795 18.8215 39.4762 19.3111V19.6382C38.9086 19.3271 38.1863 19.1715 37.3092 19.1715C36.2817 19.1727 35.4603 19.4062 34.845 19.872C34.2297 20.3377 33.922 20.965 33.922 21.7537C33.9086 22.4719 34.2302 23.1577 34.7973 23.6204C35.3807 24.1182 36.1058 24.3671 36.9725 24.3671C37.9878 24.3671 38.8012 23.9315 39.4129 23.0604H39.4771V24.1182H40.8899V19.4204C40.8905 18.4355 40.5749 17.6604 39.9431 17.0951ZM35.9367 22.7182C35.6273 22.5021 35.4448 22.1544 35.4468 21.7848C35.4468 21.3697 35.6477 21.024 36.0523 20.7395C36.4529 20.4592 36.9532 20.3191 37.5532 20.3191C38.3771 20.3191 39.0193 20.4968 39.4798 20.8524C39.4798 21.4533 39.2352 21.9768 38.7459 22.4231C38.3052 22.8501 37.7077 23.0905 37.0844 23.0915C36.6689 23.099 36.2634 22.9672 35.9367 22.7182Z" fill="#5F6368"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M49 16.496L44.0679 27.4782H42.5431L44.3734 23.6355L41.1303 16.496H42.7358L45.0798 21.9715H45.1119L47.3917 16.496H49Z" fill="#5F6368"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M21.9486 18.6347C21.9492 18.1986 21.9111 17.7632 21.8349 17.3334H15.6055V19.7983H19.1734C19.0259 20.5938 18.5493 21.2964 17.8541 21.7432V23.3432H19.9835C21.2303 22.2294 21.9486 20.5823 21.9486 18.6347Z" fill="#4285F4"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M15.6055 24.8889C17.3881 24.8889 18.889 24.3217 19.9835 23.344L17.8541 21.744C17.2615 22.1333 16.4982 22.3555 15.6055 22.3555C13.8826 22.3555 12.4202 21.2302 11.8973 19.7137H9.70367V21.3626C10.8249 23.5244 13.1085 24.8887 15.6055 24.8889Z" fill="#34A853"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M11.8973 19.7138C11.6208 18.9192 11.6208 18.0586 11.8973 17.264V15.6151H9.70367C8.76585 17.4232 8.76585 19.5546 9.70367 21.3627L11.8973 19.7138Z" fill="#FBBC04"/>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M15.6055 14.6223C16.5475 14.6073 17.4577 14.9522 18.1395 15.5823V15.5823L20.0248 13.7556C18.8293 12.6677 17.2455 12.0704 15.6055 12.0889C13.1085 12.089 10.8249 13.4534 9.70367 15.6151L11.8973 17.264C12.4202 15.7476 13.8826 14.6223 15.6055 14.6223Z" fill="#EA4335"/>
                                </svg>
                                <span className="font-medium">Google Pay</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {paymentMethod === 'card' && (
                          <div className="space-y-4 border-t pt-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number *</Label>
                              <Input
                                id="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={(e) => setPaymentDetails(prev => ({...prev, cardNumber: e.target.value}))}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                className="h-12 md:h-10"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="cardholderName">Cardholder Name *</Label>
                              <Input
                                id="cardholderName"
                                value={paymentDetails.cardholderName}
                                onChange={(e) => setPaymentDetails(prev => ({...prev, cardholderName: e.target.value}))}
                                placeholder="Enter cardholder name"
                                className="h-12 md:h-10"
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date *</Label>
                                <Input
                                  id="expiryDate"
                                  value={paymentDetails.expiryDate}
                                  onChange={(e) => setPaymentDetails(prev => ({...prev, expiryDate: e.target.value}))}
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  className="h-12 md:h-10"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV *</Label>
                                <Input
                                  id="cvv"
                                  value={paymentDetails.cvv}
                                  onChange={(e) => setPaymentDetails(prev => ({...prev, cvv: e.target.value}))}
                                  placeholder="123"
                                  maxLength={4}
                                  className="h-12 md:h-10"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Review Order */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Shipping Address</h4>
                          <div className="text-sm space-y-1">
                            <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                            <p>{shippingAddress.address}</p>
                            {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                            <p>{shippingAddress.city}, {shippingAddress.emirate}</p>
                            <p>{shippingAddress.country}</p>
                            <p>{shippingAddress.phone}</p>
                            <p>{shippingAddress.email}</p>
                          </div>
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Delivery Method</h4>
                          <div className="text-sm">
                            <p className="capitalize">
                              {deliveryMode === 'pickup' ? 'Store Pickup' : `${deliveryMode.replace('-', ' ')} Delivery`}
                            </p>
                            <p className="text-muted-foreground">
                                                          {deliveryMode === 'standard' && '1-2 business days - 20 AED'}
                            {deliveryMode === 'pickup' && 'Pick-up from location - Free'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Payment Method</h4>
                          <div className="text-sm">
                            <p>
                              {paymentMethod === 'card' && 'Credit / Debit Card'}
                              {paymentMethod === 'apple-pay' && 'Apple Pay'}
                              {paymentMethod === 'google-pay' && 'Google Pay'}
                              {!paymentMethod && 'No payment method selected'}
                            </p>
                            {paymentMethod === 'card' && paymentDetails.cardNumber && (
                              <p className="text-muted-foreground">
                                **** **** **** {paymentDetails.cardNumber.slice(-4)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="flex items-center gap-2 mb-4">
                            <input type="checkbox" id="terms" className="rounded" />
                            <Label htmlFor="terms" className="text-sm">
                              I agree to the <a href="/terms-conditions" className="text-primary hover:underline">Terms and Conditions</a> and <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 gap-3 border-t">
                      <Button 
                        variant="outline" 
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="h-12 md:h-10 w-full sm:w-auto"
                        size="lg"
                      >
                        Previous
                      </Button>
                      <Button 
                        onClick={nextStep}
                        disabled={currentStep === checkoutSteps.length - 1}
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