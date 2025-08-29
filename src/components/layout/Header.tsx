import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X, Minus, Plus, Clock, HelpCircle, Package } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  cartItemCount?: number;
  wishlistItemCount?: number;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export function Header({
  cartItemCount = 0,
  wishlistItemCount = 0,
  onMenuToggle,
  isMenuOpen = false
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFashionMenu, setShowFashionMenu] = useState(false);
  const [showBeautyMenu, setShowBeautyMenu] = useState(false);
  const [showHomeMenu, setShowHomeMenu] = useState(false);
  const [showSportsMenu, setShowSportsMenu] = useState(false);
  const [showPreLovedMenu, setShowPreLovedMenu] = useState(false);
  const [showDesignersMenu, setShowDesignersMenu] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);

  // Mock cart data - in real app this would come from context/store
  const cartItems = [
    {
      id: "cart-1",
      name: "Black Triangle Bikini Top",
      brand: "LETS SWIM",
      price: 450,
      quantity: 1,
      size: "M",
      color: "Black",
      image: "https://letsswim.co/cdn/shop/files/LET_SSWIM-BLACKLET_SSWIMTRIANGLEBIKINITOP-6.jpg?v=1721327749"
    },
    {
      id: "cart-2",
      name: "Red Wired Balconette Swimsuit",
      brand: "LETS SWIM",
      price: 750,
      quantity: 2,
      size: "S",
      color: "Red",
      image: "https://letsswim.co/cdn/shop/files/LET_SSWIM-REDWIREDBALCONETTESWIMSUIT-1.jpg?v=1713187512",
      stockCount: 2,
      isLowStock: true
    },
    {
      id: "cart-3",
      name: "Mardi Matin Lemon Yellow",
      brand: "NORI ENOMOTO",
      price: 1850,
      quantity: 1,
      size: "One Size",
      color: "Lemon Yellow",
      image: "https://nori-enomoto.com/cdn/shop/files/nori_mardi-matin_lemon-yellow_main_02.png?v=1750655214&width=2400"
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close mobile search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isOutsideSearch = mobileSearchRef.current && !mobileSearchRef.current.contains(target);
      const isOutsideIcon = searchIconRef.current && !searchIconRef.current.contains(target);
      
      if (isOutsideSearch && isOutsideIcon) {
        setShowMobileSearch(false);
      }
    }

    if (showMobileSearch) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMobileSearch]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Mobile: Hamburger + Logo Together, Desktop: Just Logo */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-1 hover:bg-transparent"
              onClick={onMenuToggle}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Logo */}
            <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2"
              aria-label="Curate Home"
            >
              <svg width="140" height="32" viewBox="330 250 490 120" xmlns="http://www.w3.org/2000/svg" className="h-6 lg:h-8 w-auto">
                <g fill="#0090a4">
                  <path d="M388.45,276.39c10.2,0,18.72,4.27,25.58,12.79l13.49-15.29c-10.76-12.14-24.1-18.21-40.04-18.21-14.28,0-26.35,4.82-36.22,14.46-9.87,9.64-14.81,21.67-14.81,36.08s4.84,26.35,14.53,35.8c9.69,9.45,22.01,14.18,36.99,14.18s27.97-6.21,39-18.63l-13.9-14.32c-6.77,8.44-15.48,12.65-26.14,12.65-7.79,0-14.42-2.73-19.88-8.2-5.47-5.47-8.2-12.72-8.2-21.76s2.9-16.22,8.69-21.55c5.79-5.33,12.77-7.99,20.93-7.99"/>
                  <path d="M642.8,285.84c-5.75-4.54-13.16-6.81-22.25-6.81-12.61,0-23.83,3.57-33.65,10.71l9.32,13.49c2.78-2.13,6.19-3.92,10.22-5.35,4.03-1.44,7.86-2.15,11.47-2.15,8.43,0,12.65,3.99,12.65,11.96v.42h-15.57c-9.64,0-17.24,1.9-22.8,5.7-5.56,3.8-8.34,9.52-8.34,17.17s2.69,13.77,8.07,18.36c5.38,4.59,12.03,6.88,19.95,6.88s14.58-3.38,19.95-10.15v9.04h19.6v-47.69c0-9.83-2.87-17.01-8.62-21.55M630.43,326.58c0,3.8-1.41,6.84-4.24,9.11-2.83,2.27-6.1,3.41-9.8,3.41s-6.56-.72-8.55-2.16c-1.99-1.43-2.99-3.5-2.99-6.19,0-5.19,4.17-7.79,12.52-7.79h13.07v3.62Z"/>
                  <path d="M698.96,337.99c-2.04,0-3.8-.81-5.28-2.43-1.48-1.62-2.22-3.87-2.22-6.74v-33.51h18.08v-15.02h-18.08v-22.39h-21v22.39h-8.76v15.02h8.76v34.48c0,8.16,2.48,14.6,7.44,19.33,4.96,4.73,11.03,7.09,18.22,7.09s14.02-2.96,20.51-8.9l-7.79-14.6c-2.69,3.52-5.98,5.28-9.87,5.28"/>
                  <path d="M746.44,335.07c-3.62-2.59-5.75-5.93-6.4-10.01h54.51v-11.12c0-10.85-3.59-19.38-10.78-25.59-7.19-6.21-15.92-9.32-26.21-9.32s-19.22,3.48-26.77,10.43c-7.55,6.95-11.33,16.32-11.33,28.09s3.71,21.16,11.13,28.16c7.42,7,16.8,10.5,28.16,10.5h11.08v-17.24h-11.16c-4.54,0-8.62-1.3-12.24-3.89M746.58,300.03c3.42-2.5,7.21-3.75,11.33-3.75s7.63,1.21,10.5,3.61c2.87,2.41,4.54,5.84,5,10.29h-32.82c.56-4.26,2.55-7.65,5.98-10.15"/>
                  <path d="M786.38,337.88c-5.59,0-10.12,4.53-10.12,10.12s4.53,10.12,10.12,10.12,10.12-4.53,10.12-10.12-4.53-10.12-10.12-10.12"/>
                  <path d="M489.12,320.86v-40.51h21.09v75.16h-21.09v-9.92c-5.22,7.36-11.94,11.04-20.19,11.04s-15.16-2.58-20.74-7.75c-5.59-5.17-8.38-12.83-8.38-22.98v-45.54h21.09v40.93c0,11.55,4.24,17.32,12.71,17.32,4.19,0,7.82-1.51,10.9-4.54,3.07-3.03,4.61-7.43,4.61-13.2"/>
                  <path d="M569.58,298.79c-6.24,0-10.9,2.21-13.97,6.64-3.07,4.42-4.61,10.27-4.61,17.53v32.55h-20.95v-75.16h20.95v9.92c2.7-3.07,6.08-5.68,10.13-7.82,4.05-2.14,8.17-3.26,12.36-3.35l.14,19.7h-4.05Z"/>
                </g>
              </svg>
            </Link>
          </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-12">
            <a
              href="/sale"
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors focus-ring"
            >
              Sale
            </a>
            <a
              href="/new-in"
              className="text-sm font-medium hover:text-primary transition-colors focus-ring"
            >
              New In
            </a>
            <div className="relative">
              <div
                onMouseEnter={() => setShowFashionMenu(true)}
                onMouseLeave={() => setShowFashionMenu(false)}
              >
                <button
                  className="text-sm font-medium hover:text-primary transition-colors focus-ring"
                  onFocus={() => setShowFashionMenu(true)}
                  onBlur={() => setShowFashionMenu(false)}
                >
                  Fashion
                </button>
                {showFashionMenu && (
                  <div className="absolute top-full -left-3 pt-2 z-50">
                    <div className="bg-background border rounded-lg shadow-lg py-2 min-w-[180px]">
                      <nav className="space-y-1">
                        <a
                          href="/c/bags"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Bags & Luggage
                        </a>
                        <a
                          href="/c/men"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Men
                        </a>
                        <a
                          href="/c/women"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Women
                        </a>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div
                onMouseEnter={() => setShowBeautyMenu(true)}
                onMouseLeave={() => setShowBeautyMenu(false)}
              >
                <button
                  className="text-sm font-medium hover:text-primary transition-colors focus-ring"
                  onFocus={() => setShowBeautyMenu(true)}
                  onBlur={() => setShowBeautyMenu(false)}
                >
                  Beauty
                </button>
                {showBeautyMenu && (
                  <div className="absolute top-full -left-3 pt-2 z-50">
                    <div className="bg-background border rounded-lg shadow-lg py-2 min-w-[200px]">
                      <nav className="space-y-1">
                        <a
                          href="/c/skincare"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Skincare
                        </a>
                        <a
                          href="/c/makeup"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Makeup
                        </a>
                        <a
                          href="/c/eyebrow-shaping"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Eyebrow shaping service
                        </a>
                        <a
                          href="/c/hair-care"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Hair Care
                        </a>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div
                onMouseEnter={() => setShowHomeMenu(true)}
                onMouseLeave={() => setShowHomeMenu(false)}
              >
                <button
                  className="text-sm font-medium hover:text-primary transition-colors focus-ring"
                  onFocus={() => setShowHomeMenu(true)}
                  onBlur={() => setShowHomeMenu(false)}
                >
                  Home
                </button>
                {showHomeMenu && (
                  <div className="absolute top-full -left-3 pt-2 z-50">
                    <div className="bg-background border rounded-lg shadow-lg py-2 min-w-[180px]">
                      <nav className="space-y-1">
                        <a
                          href="/c/bath"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Bath
                        </a>
                        <a
                          href="/c/home-decor"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Home Decor
                        </a>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div
                onMouseEnter={() => setShowSportsMenu(true)}
                onMouseLeave={() => setShowSportsMenu(false)}
              >
                <button
                  className="text-sm font-medium hover:text-primary transition-colors focus-ring"
                  onFocus={() => setShowSportsMenu(true)}
                  onBlur={() => setShowSportsMenu(false)}
                >
                  Sports
                </button>
                {showSportsMenu && (
                  <div className="absolute top-full -left-3 pt-2 z-50">
                    <div className="bg-background border rounded-lg shadow-lg py-2 min-w-[180px]">
                      <nav className="space-y-1">
                        <a
                          href="/c/cycling"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Cycling
                        </a>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div
                onMouseEnter={() => setShowPreLovedMenu(true)}
                onMouseLeave={() => setShowPreLovedMenu(false)}
              >
                <button
                  className="text-sm font-medium hover:text-primary transition-colors focus-ring"
                  onFocus={() => setShowPreLovedMenu(true)}
                  onBlur={() => setShowPreLovedMenu(false)}
                >
                  Pre Loved
                </button>
                {showPreLovedMenu && (
                  <div className="absolute top-full -left-3 pt-2 z-50">
                    <div className="bg-background border rounded-lg shadow-lg py-2 min-w-[180px]">
                      <nav className="space-y-1">
                        <a
                          href="/c/pre-loved-bags"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Bags
                        </a>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div
                onMouseEnter={() => setShowDesignersMenu(true)}
                onMouseLeave={() => setShowDesignersMenu(false)}
              >
                <button
                  className="text-sm font-medium hover:text-primary transition-colors focus-ring"
                  onFocus={() => setShowDesignersMenu(true)}
                  onBlur={() => setShowDesignersMenu(false)}
                >
                  Designers
                </button>
                {showDesignersMenu && (
                  <div className="absolute top-full -left-3 pt-2 z-50">
                    <div className="bg-background border rounded-lg shadow-lg py-2 min-w-[180px]">
                      <nav className="space-y-1">
                        <a
                          href="/brand/lets-swim"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Lets Swim
                        </a>
                        <a
                          href="/brand/nori-enomoto"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Nori Enomoto
                        </a>
                        <a
                          href="/brand/capello"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Capello
                        </a>
                        <a
                          href="/brand/muse-for-all"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Muse for All
                        </a>
                        <a
                          href="/brand/tay-candles"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Tay Candles
                        </a>
                        <a
                          href="/brand/iconic-london"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Iconic London
                        </a>
                        <a
                          href="/brand/ibrou"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          İbrou
                        </a>
                        <a
                          href="/brand/mixsoon"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Mixsoon
                        </a>
                        <a
                          href="/brand/georgini"
                          className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          Georgini
                        </a>
                        <div className="border-t my-1"></div>
                        <a
                          href="/brands"
                          className="block px-3 py-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                          View All Brands →
                        </a>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex max-w-md ml-auto mr-4">
            <SearchBar />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Icon - Mobile */}
            <Button
              ref={searchIconRef}
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden hover:bg-transparent group",
                showMobileSearch && "text-primary"
              )}
              aria-label="Search"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className={cn(
                "h-5 w-5 transition-colors",
                showMobileSearch ? "text-primary" : "group-hover:text-primary"
              )} />
            </Button>

            {/* Account */}
            <div className="relative hidden md:block">
              <div
                onMouseEnter={() => setShowProfileDropdown(true)}
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-transparent group"
                  aria-label="Account"
                >
                  <User className="h-5 w-5 group-hover:text-primary transition-colors" />
                </Button>
                
                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 z-50">
                    <div className="bg-background border rounded-lg shadow-lg w-60 p-3">
                      {/* Login Button */}
                      <Link to="/login">
                        <Button 
                          className="w-full mb-2 h-10 bg-[#b8956b] hover:bg-[#a6854e] text-white font-medium"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          LOG IN
                        </Button>
                      </Link>
                      
                      {/* Create Account Section */}
                      <div className="mb-3">
                        <Link to="/complete-profile">
                          <Button 
                            variant="outline" 
                            size="lg"
                            className="w-full h-10"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            CREATE ACCOUNT
                          </Button>
                        </Link>
                        <div className="text-xs text-muted-foreground mt-2 text-center">
                          <p>Don't have an account?</p>
                          <p>It only takes a minute.</p>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="space-y-1 pt-2 border-t">
                        <Link 
                          to="/faq" 
                          className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm font-medium">Help & FAQ</span>
                          </div>
                          <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <Link 
                          to="/order-tracking" 
                          className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm font-medium">Track Order</span>
                          </div>
                          <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent group"
              aria-label={`Wishlist (${wishlistItemCount} items)`}
              asChild
            >
              <Link to="/wishlist">
                <Heart className="h-5 w-5 group-hover:text-primary transition-colors" />
                {wishlistItemCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {wishlistItemCount > 99 ? "99+" : wishlistItemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Shopping Bag */}
            <div className="relative">
              <div
                onMouseEnter={() => setShowCartDropdown(true)}
                onMouseLeave={() => setShowCartDropdown(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-transparent group"
                  aria-label={`Shopping bag (${cartItemCount} items)`}
                  asChild
                >
                  <Link to="/cart">
                    <ShoppingBag className="h-5 w-5 group-hover:text-primary transition-colors" />
                    {cartItemCount > 0 && (
                      <Badge
                        variant="default"
                        className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {cartItemCount > 99 ? "99+" : cartItemCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
                
                {/* Cart Dropdown */}
                {showCartDropdown && (
                  <div className="hidden md:block absolute top-full right-0 pt-2 z-50">
                    {cartItems.length > 0 ? (
                      <div className="bg-background border rounded-lg shadow-lg w-80 max-h-[500px] flex flex-col">
                        {/* Sticky Header */}
                        <div className="sticky top-0 bg-background border-b px-4 py-3 rounded-t-lg">
                          <h3 className="font-semibold text-lg">My Bag</h3>
                        </div>
                        
                        {/* Scrollable Products Area */}
                        <div className="flex-1 overflow-y-auto p-4 max-h-80">
                          {cartItems.map((item, index) => (
                            <div key={item.id}>
                              <div className="flex gap-3 py-2">
                                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-16 h-20 object-cover rounded"
                                  />
                                </Link>
                                <div className="flex-1 min-w-0">
                                  <Link 
                                    to={`/product/${item.id}`}
                                    className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                                  >
                                    {item.name}
                                  </Link>
                                  <p className="text-xs text-muted-foreground mt-1">{item.brand}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.color}{item.size && ` • ${item.size}`}
                                  </p>
                                  {item.isLowStock && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <Clock className="h-3 w-3 text-orange-500" />
                                      <p className="text-xs text-orange-600">
                                        Low in stock: only {item.stockCount} left
                                      </p>
                                    </div>
                                  )}
                                  <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                      <Button variant="outline" size="icon" className="h-6 w-6">
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="text-sm">{item.quantity}</span>
                                      <Button variant="outline" size="icon" className="h-6 w-6">
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <p className="font-semibold text-sm">
                                      {item.price} AED
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Divider line - show for all items except the last one */}
                              {index < cartItems.length - 1 && (
                                <div className="border-t border-gray-200 my-2"></div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {/* Sticky Footer */}
                        <div className="sticky bottom-0 bg-background border-t px-4 py-3 rounded-b-lg">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">Grand Total:</span>
                            <span className="font-bold text-lg">{subtotal} AED</span>
                          </div>
                          <Button asChild className="w-full" onClick={() => setShowCartDropdown(false)}>
                            <Link to="/cart">Go to Bag</Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-background border rounded-lg shadow-lg w-80 p-6 text-center">
                        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground mb-4">Your bag is empty</p>
                        <Button asChild className="w-full">
                          <Link to="/new-in">Shop New In</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                

              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div ref={mobileSearchRef} className="md:hidden pb-4 pt-2">
            <SearchBar 
              autoFocus={true}
              onClose={() => setShowMobileSearch(false)}
            />
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => onMenuToggle && onMenuToggle()} 
      />
    </header>
  );
} 