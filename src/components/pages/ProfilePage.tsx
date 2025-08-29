import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import { Save, Check, User, Package, MapPin, Edit, Trash2, Plus, ArrowLeft, MessageSquare, LifeBuoy, Phone, HelpCircle } from "lucide-react";
import { MessagesPage } from "./MessagesPage";
import { SupportTicketsPage } from "./SupportTicketsPage";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  country: string;
  subscribeNewsletter: boolean;
  profileImage?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  datePlaced: string;
  total: number;
  items: Array<{
    id: string;
    title: string;
    brand: string;
    image: string;
    price: number;
    quantity: number;
  }>;
}

interface Address {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  zipCode?: string;
  phone: string;
  isDefault: boolean;
}

const countries = [
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "KW", name: "Kuwait" },
  { code: "QA", name: "Qatar" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
  { code: "JO", name: "Jordan" },
  { code: "LB", name: "Lebanon" },
  { code: "EG", name: "Egypt" },
  { code: "TR", name: "Turkey" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
];

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "tickets", label: "Support Tickets", icon: LifeBuoy },
];

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#00218000",
    status: "pending",
    datePlaced: "23/05/25",
    total: 221.25,
    items: [
      {
        id: "1",
        title: "Black Triangle Bikini Top",
        brand: "LETS SWIM",
        image: "https://letsswim.co/cdn/shop/files/LET_SSWIM-BLACKLET_SSWIMTRIANGLEBIKINITOP-6.jpg?v=1721327749",
        price: 450,
        quantity: 1
      },
      {
        id: "2",
        title: "Red Wired Balconette Swimsuit",
        brand: "LETS SWIM",
        image: "https://letsswim.co/cdn/shop/files/LET_SSWIM-REDWIREDBALCONETTESWIMSUIT-1.jpg?v=1713187512",
        price: 750,
        quantity: 1
      }
    ]
  },
  {
    id: "2",
    orderNumber: "#00217999",
    status: "delivered",
    datePlaced: "20/05/25",
    total: 1850,
    items: [
      {
        id: "3",
        title: "Mardi Matin Lemon Yellow",
        brand: "NORI ENOMOTO",
        image: "https://nori-enomoto.com/cdn/shop/files/nori_mardi-matin_lemon-yellow_main_02.png?v=1750655214&width=2400",
        price: 350,
        quantity: 1
      },
      {
        id: "12",
        title: "Summer Floral Dress",
        brand: "FASHION HOUSE",
        image: "/images/women.png",
        price: 250,
        quantity: 1
      },
      {
        id: "13",
        title: "Luxury Handbag",
        brand: "PREMIUM BAGS",
        image: "/images/bags.png",
        price: 400,
        quantity: 1
      },
      {
        id: "14",
        title: "Sports Running Shoes",
        brand: "ATHLETIC GEAR",
        image: "/images/sports.png",
        price: 300,
        quantity: 1
      },
      {
        id: "15",
        title: "Home Decor Set",
        brand: "INTERIOR DESIGN",
        image: "/images/home.png",
        price: 200,
        quantity: 1
      },
      {
        id: "16",
        title: "Beauty Kit Essentials",
        brand: "BEAUTY CO",
        image: "/images/beauty.png",
        price: 150,
        quantity: 1
      },
      {
        id: "17",
        title: "Men's Casual Wear",
        brand: "GENTLEMAN STYLE",
        image: "/images/men.png",
        price: 200,
        quantity: 1
      }
    ]
  },
  {
    id: "3",
    orderNumber: "#00217998",
    status: "shipped",
    datePlaced: "18/05/25",
    total: 1200,
    items: [
      {
        id: "4",
        title: "Classic White T-Shirt",
        brand: "BASIC WEAR",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        price: 1200,
        quantity: 1
      }
    ]
  },
  {
    id: "4",
    orderNumber: "#00217997",
    status: "processing",
    datePlaced: "15/05/25",
    total: 890.50,
    items: [
      {
        id: "5",
        title: "Summer Floral Dress",
        brand: "FASHION HOUSE",
        image: "/images/women.png",
        price: 890.50,
        quantity: 1
      }
    ]
  },
  {
    id: "5",
    orderNumber: "#00217996",
    status: "delivered",
    datePlaced: "12/05/25",
    total: 2150,
    items: [
      {
        id: "6",
        title: "Luxury Handbag",
        brand: "PREMIUM BAGS",
        image: "/images/bags.png",
        price: 2150,
        quantity: 1
      }
    ]
  },
  {
    id: "6",
    orderNumber: "#00217995",
    status: "cancelled",
    datePlaced: "10/05/25",
    total: 675.75,
    items: [
      {
        id: "7",
        title: "Sports Running Shoes",
        brand: "ATHLETIC GEAR",
        image: "/images/sports.png",
        price: 675.75,
        quantity: 1
      }
    ]
  },
  {
    id: "7",
    orderNumber: "#00217994",
    status: "shipped",
    datePlaced: "08/05/25",
    total: 1425.00,
    items: [
      {
        id: "8",
        title: "Home Decor Set",
        brand: "INTERIOR DESIGN",
        image: "/images/home.png",
        price: 1425.00,
        quantity: 1
      }
    ]
  },
  {
    id: "8",
    orderNumber: "#00217993",
    status: "delivered",
    datePlaced: "05/05/25",
    total: 320.25,
    items: [
      {
        id: "9",
        title: "Beauty Kit Essentials",
        brand: "BEAUTY CO",
        image: "/images/beauty.png",
        price: 320.25,
        quantity: 1
      }
    ]
  },
  {
    id: "9",
    orderNumber: "#00217992",
    status: "processing",
    datePlaced: "03/05/25",
    total: 1875.50,
    items: [
      {
        id: "10",
        title: "Men's Casual Wear Set",
        brand: "GENTLEMAN STYLE",
        image: "/images/men.png",
        price: 1875.50,
        quantity: 1
      }
    ]
  },
  {
    id: "10",
    orderNumber: "#00217991",
    status: "pending",
    datePlaced: "01/05/25",
    total: 455.00,
    items: [
      {
        id: "11",
        title: "Vintage Preloved Jacket",
        brand: "SECOND CHANCE",
        image: "/images/preloved.png",
        price: 455.00,
        quantity: 1
      }
    ]
  }
];

const mockAddresses: Address[] = [
  {
    id: "1",
    title: "Home",
    firstName: "Ahmed",
    lastName: "Al Mansouri",
    address: "Sheikh Zayed Road, Downtown",
    apartment: "Apt 1205",
    city: "Dubai",
    country: "AE",
    zipCode: "12345",
    phone: "+971 50 123 4567",
    isDefault: true
  },
  {
    id: "2",
    title: "Office",
    firstName: "Ahmed",
    lastName: "Al Mansouri",
    address: "Business Bay, Bay Square",
    apartment: "Building 1, Office 201",
    city: "Dubai",
    country: "AE",
    zipCode: "54321",
    phone: "+971 50 123 4567",
    isDefault: false
  }
];

export function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "Ahmed",
    lastName: "Al Mansouri",
    email: "ahmed@example.com",
    phone: "+971 50 123 4567",
    zipCode: "12345",
    country: "AE",
    subscribeNewsletter: true,
    profileImage: "/defaultpp.png"
  });

  const [originalData, setOriginalData] = useState<ProfileData>({ ...profileData });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  
  // Address book state
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    title: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'AE',
    zipCode: '',
    phone: '',
    isDefault: false
  });

  // Handle tab changes and URL updates
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "orders") {
      navigate("/profile/orders");
    } else if (tabId === "addresses") {
      navigate("/profile/addresses");
    } else if (tabId === "messages") {
      navigate("/profile/messages");
    } else if (tabId === "tickets") {
      navigate("/profile/tickets");
    } else {
      navigate("/profile");
    }
  };

  // Update active tab based on current URL
  const getActiveTabFromUrl = () => {
    if (location.pathname === "/profile/orders") {
      setActiveTab("orders");
    } else if (location.pathname === "/profile/addresses") {
      setActiveTab("addresses");
    } else if (location.pathname === "/profile/messages") {
      setActiveTab("messages");
    } else if (location.pathname === "/profile/tickets") {
      setActiveTab("tickets");
    } else {
      setActiveTab("profile");
    }
  };

  useEffect(() => {
    getActiveTabFromUrl();
  }, [location.pathname]);

  // Sort orders and handle pagination
  const { sortedOrders, currentOrders, totalPages } = React.useMemo(() => {
    const sorted = [...mockOrders];
    switch (sortBy) {
      case "date":
        sorted.sort((a, b) => {
          // Convert DD/MM/YY format to Date object for comparison
          const [dayA, monthA, yearA] = a.datePlaced.split('/');
          const [dayB, monthB, yearB] = b.datePlaced.split('/');
          const dateA = new Date(2000 + parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA));
          const dateB = new Date(2000 + parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB));
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "status":
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case "total":
        sorted.sort((a, b) => b.total - a.total);
        break;
    }
    
    const totalPages = Math.ceil(sorted.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const currentOrders = sorted.slice(startIndex, startIndex + ordersPerPage);
    
    return { sortedOrders: sorted, currentOrders, totalPages };
  }, [sortBy, currentPage, ordersPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if there are any changes
  const hasChanges = JSON.stringify(profileData) !== JSON.stringify(originalData);

  const handleProfileChange = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleProfileChange('profileImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOriginalData({ ...profileData });
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Address management functions
  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      title: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      country: 'AE',
      zipCode: '',
      phone: '',
      isDefault: false
    });
    setShowAddressForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      title: address.title,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      apartment: address.apartment || '',
      city: address.city,
      country: address.country,
      zipCode: address.zipCode || '',
      phone: address.phone,
      isDefault: address.isDefault
    });
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addressForm, id: editingAddress.id }
          : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        ...addressForm,
        id: Date.now().toString()
      };
      setAddresses(prev => [...prev, newAddress]);
    }
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleCancelAddress = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleAddressFormChange = (field: keyof Omit<Address, 'id'>, value: any) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>/</span>
            <span className="text-foreground font-medium">Profile</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-500">Need help?</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Manage your account</p>
              <div className="flex items-center gap-4">
                <Link 
                  to="/contact" 
                  className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call us</span>
                </Link>
                <Link 
                  to="/profile/tickets" 
                  className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <LifeBuoy className="w-4 h-4" />
                  <span>Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 whitespace-nowrap border-b-2 font-medium text-sm transition-colors",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* My Profile Tab */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={profileData.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">Click to change profile picture</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="mt-1"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => handleProfileChange('zipCode', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={profileData.country} onValueChange={(value) => handleProfileChange('country', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={profileData.subscribeNewsletter}
                    onCheckedChange={(checked) => handleProfileChange('subscribeNewsletter', checked)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter
                  </Label>
                </div>

                {/* Save Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={!hasChanges || isSaving}
                    className="w-full md:w-auto md:min-w-[300px] px-8 py-3 text-base"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Saving...
                      </>
                    ) : showSuccess ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order History Tab */}
          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Header with pagination info and sorting */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * ordersPerPage) + 1}-{Math.min(currentPage * ordersPerPage, sortedOrders.length)} of {sortedOrders.length}
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="total">Total</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Desktop Orders Table */}
                <div className="hidden md:block border rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      <div>Order Number</div>
                      <div>Order Status</div>
                      <div>Date Placed</div>
                      <div>Total</div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y">
                    {currentOrders.map((order) => (
                      <div key={order.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-4 gap-4 items-center">
                          {/* Order Number */}
                          <div>
                            <Link to={`/profile/orders/${order.orderNumber.replace('#', '')}`}>
                              <button className="text-sm font-medium text-primary hover:underline">
                                {order.orderNumber}
                              </button>
                            </Link>
                          </div>

                          {/* Order Status */}
                          <div>
                            <span className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              order.status === 'pending' && "bg-yellow-100 text-yellow-800",
                              order.status === 'processing' && "bg-blue-100 text-blue-800",
                              order.status === 'shipped' && "bg-purple-100 text-purple-800",
                              order.status === 'delivered' && "bg-green-100 text-green-800",
                              order.status === 'cancelled' && "bg-red-100 text-red-800"
                            )}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>

                          {/* Date Placed */}
                          <div className="text-sm text-gray-600">
                            {order.datePlaced}
                          </div>

                          {/* Total */}
                          <div className="text-sm font-medium">
                            AED {order.total.toFixed(2)}
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            {order.items.slice(0, 5).map((item) => (
                              <div key={item.id} className="flex items-center gap-2">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-8 h-8 object-cover rounded"
                                />
                                <div className="text-xs text-gray-600">
                                  <div className="font-medium truncate max-w-20">{item.title}</div>
                                  <div className="text-gray-500">Qty: {item.quantity}</div>
                                </div>
                              </div>
                            ))}
                            {order.items.length > 5 && (
                              <div className="text-xs text-gray-500">
                                +{order.items.length - 5} more items
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Compact View */}
                <div className="md:hidden space-y-3">
                  {currentOrders.map((order) => (
                    <Link
                      key={order.id}
                      to={`/profile/orders/${order.orderNumber.replace('#', '')}`}
                      className="block"
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          {/* Main row: Date, Total, Status */}
                          <div className="grid grid-cols-3 gap-4 items-center">
                            {/* Date - Left */}
                            <div className="text-left">
                              <div className="text-sm font-medium text-gray-900">
                                {order.datePlaced}
                              </div>
                            </div>
                            
                            {/* Total - Center */}
                            <div className="text-center">
                              <div className="font-bold text-sm text-gray-900">
                                AED {order.total.toFixed(2)}
                              </div>
                            </div>
                            
                            {/* Status - Right */}
                            <div className="text-right">
                              <span className={cn(
                                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                order.status === 'pending' && "bg-yellow-100 text-yellow-800",
                                order.status === 'processing' && "bg-blue-100 text-blue-800",
                                order.status === 'shipped' && "bg-purple-100 text-purple-800",
                                order.status === 'delivered' && "bg-green-100 text-green-800",
                                order.status === 'cancelled' && "bg-red-100 text-red-800"
                              )}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          {/* Order Number - separate row, left aligned */}
                          <div className="mt-1">
                            <div className="text-left">
                              <div className="text-sm text-primary font-medium">
                                {order.orderNumber}
                              </div>
                            </div>
                          </div>
                          
                          {/* Order Items Preview */}
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                              {order.items.slice(0, 5).map((item) => (
                                <img
                                  key={item.id}
                                  src={item.image}
                                  alt={item.title}
                                  className="w-8 h-8 object-cover rounded"
                                />
                              ))}
                              {order.items.length > 5 && (
                                <div className="text-xs text-gray-500">
                                  +{order.items.length - 5} more
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6 pt-6 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 px-3"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 px-3"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Address Book Tab */}
          {activeTab === "addresses" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Address Book</CardTitle>
                  {!showAddressForm && (
                    <Button onClick={handleAddAddress} className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Address
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!showAddressForm ? (
                  <>

                    {/* Address List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4 relative">
                          {/* Action Icons */}
                          <div className="absolute top-3 right-3 flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditAddress(address)}
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAddress(address.id)}
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Address Content */}
                          <div className="pr-16">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{address.firstName} {address.lastName}</h3>
                              {address.isDefault && (
                                <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm mb-1">
                              {address.address}
                              {address.apartment && `, ${address.apartment}`}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              {address.city}, {countries.find(c => c.code === address.country)?.name}
                              {address.zipCode && ` ${address.zipCode}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.phone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {addresses.length === 0 && (
                      <div className="text-center py-8">
                        <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses yet</h3>
                        <p className="text-gray-600 mb-4">Add your first address to get started</p>
                        <Button onClick={handleAddAddress}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Address
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  /* Address Form */
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCancelAddress}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-semibold">
                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                      </h3>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="addressTitle">Title (Optional)</Label>
                          <Select value={addressForm.title} onValueChange={(value) => handleAddressFormChange('title', value)}>
                            <SelectTrigger className="mt-1">
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
                        <div>
                          <Label htmlFor="addressFirstName">First Name</Label>
                          <Input
                            id="addressFirstName"
                            value={addressForm.firstName}
                            onChange={(e) => handleAddressFormChange('firstName', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="addressLastName">Last Name</Label>
                          <Input
                            id="addressLastName"
                            value={addressForm.lastName}
                            onChange={(e) => handleAddressFormChange('lastName', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="addressStreet">Address</Label>
                        <Input
                          id="addressStreet"
                          value={addressForm.address}
                          onChange={(e) => handleAddressFormChange('address', e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="addressApartment">Apartment, suite, etc. (optional)</Label>
                        <Input
                          id="addressApartment"
                          value={addressForm.apartment}
                          onChange={(e) => handleAddressFormChange('apartment', e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="addressCity">City</Label>
                          <Input
                            id="addressCity"
                            value={addressForm.city}
                            onChange={(e) => handleAddressFormChange('city', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="addressCountry">Country</Label>
                          <Select 
                            value={addressForm.country} 
                            onValueChange={(value) => handleAddressFormChange('country', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="addressZip">ZIP Code (optional)</Label>
                          <Input
                            id="addressZip"
                            value={addressForm.zipCode}
                            onChange={(e) => handleAddressFormChange('zipCode', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="addressPhone">Phone Number</Label>
                        <Input
                          id="addressPhone"
                          type="tel"
                          value={addressForm.phone}
                          onChange={(e) => handleAddressFormChange('phone', e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isDefault"
                          checked={addressForm.isDefault}
                          onCheckedChange={(checked) => handleAddressFormChange('isDefault', checked)}
                        />
                        <Label htmlFor="isDefault" className="text-sm">
                          Set as default address
                        </Label>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={handleCancelAddress}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveAddress}
                        className="flex-1"
                      >
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <MessagesPage />
          )}

          {/* Support Tickets Tab */}
          {activeTab === "tickets" && (
            <SupportTicketsPage />
          )}
        </div>
      </div>
    </div>
  );
} 