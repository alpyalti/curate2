import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import { User, Package } from "lucide-react";

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

const tabs = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "orders", label: "Order History", icon: Package },
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
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
        price: 450,
        quantity: 1
      },
      {
        id: "2",
        title: "Red Wired Balconette Swimsuit",
        brand: "LETS SWIM",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
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
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop",
        price: 1850,
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
  }
];

export function OrderHistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [sortBy, setSortBy] = useState<string>("date");

  // Handle tab changes and URL updates
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "orders") {
      navigate("/profile/orders");
    } else {
      navigate("/profile");
    }
  };

  // Sort orders based on selected criteria
  const sortedOrders = React.useMemo(() => {
    const sorted = [...mockOrders];
    switch (sortBy) {
      case "date":
        return sorted.sort((a, b) => {
          // Convert DD/MM/YY format to Date object for comparison
          const [dayA, monthA, yearA] = a.datePlaced.split('/');
          const [dayB, monthB, yearB] = b.datePlaced.split('/');
          const dateA = new Date(2000 + parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA));
          const dateB = new Date(2000 + parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB));
          return dateB.getTime() - dateA.getTime();
        });
      case "status":
        return sorted.sort((a, b) => a.status.localeCompare(b.status));
      case "total":
        return sorted.sort((a, b) => b.total - a.total);
      default:
        return sorted;
    }
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>/</span>
            <a href="/profile" className="hover:text-foreground">Profile</a>
            <span>/</span>
            <span className="text-foreground font-medium">Orders</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">Track your orders and view order details</p>
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
          {/* Order History Tab */}
          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Header with order count and filter */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="text-sm text-gray-600">
                    {sortedOrders.length} Orders
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="sort" className="text-sm text-gray-600">Sort by:</Label>
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
                </div>

                {/* Orders Table */}
                <div className="border rounded-lg overflow-hidden">
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
                    {sortedOrders.map((order) => (
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
                            {order.items.slice(0, 3).map((item) => (
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
                            {order.items.length > 3 && (
                              <div className="text-xs text-gray-500">
                                +{order.items.length - 3} more items
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 