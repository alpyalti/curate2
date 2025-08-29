import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChevronLeft, Package, User, CreditCard, MapPin, Phone, Mail, MessageSquare, FileText } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  size?: string;
  quantity: number;
  price: number;
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  datePlaced: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
  soldBy: string;
  consignmentId: string;
  shippingMethod: string;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  billingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
}

const mockOrderDetail: OrderDetail = {
  id: "1",
  orderNumber: "#00218000",
  status: "processing",
  datePlaced: "23/05/25",
  total: 221.25,
  subtotal: 195.00,
  deliveryFee: 26.25,
  soldBy: "Beauty Solutions",
  consignmentId: "00218000-A",
  shippingMethod: "Ships Locally",
  items: [
    {
      id: "1",
      name: "No Frizz Smooth Styling Cream",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
      size: "236ml",
      quantity: 1,
      price: 195.00
    }
  ],
  shippingAddress: {
    name: "Ahmed Al Mansouri",
    address: "123 Sheikh Zayed Street",
    city: "Abu Dhabi",
    country: "UAE",
    phone: "+971 50 123 4567"
  },
  billingAddress: {
    name: "Ahmed Al Mansouri",
    address: "123 Sheikh Zayed Street",
    city: "Abu Dhabi",
    country: "UAE"
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "processing": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "shipped": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "delivered": return "bg-green-100 text-green-800 hover:bg-green-200";
    case "cancelled": return "bg-red-100 text-red-800 hover:bg-red-200";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending": return "PENDING";
    case "processing": return "PROCESSING";
    case "shipped": return "SHIPPED";
    case "delivered": return "DELIVERED";
    case "cancelled": return "CANCELLED";
    default: return status.toUpperCase();
  }
};

const OrderDetailPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder(mockOrderDetail);
    }, 500);
  }, [orderNumber]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
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
            <a href="/" className="hover:text-foreground">Home</a>
            <span>/</span>
            <a href="/profile" className="hover:text-foreground">Profile</a>
            <span>/</span>
            <a href="/profile/orders" className="hover:text-foreground">Orders</a>
            <span>/</span>
            <span className="text-foreground font-medium">Order Detail</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order {order.orderNumber}</h1>
                <p className="text-gray-600 mt-1">Placed on {order.datePlaced}</p>
              </div>
              <Badge className={`${getStatusColor(order.status)} px-3 py-1 text-sm font-medium w-fit`}>
                {getStatusText(order.status)}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">AED {order.total.toFixed(2)}</p>
              <p className="text-gray-600">Total</p>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600">Sold by</p>
                <p className="font-semibold text-gray-900">{order.soldBy}</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mt-2 px-3 py-1 text-sm font-medium w-fit">RECEIVED</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm">
                  EVALUATE PARCEL
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  CONTACT SELLER
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  DOCUMENTS
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shipping Information */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Ship To</h3>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p className="text-gray-600">{order.shippingAddress.address}</p>
                <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">{order.shippingAddress.phone}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Shipping Method</p>
                <p className="font-medium text-gray-900">{order.shippingMethod}</p>
                <p className="text-sm text-gray-600 mt-1">Consignment ID: {order.consignmentId}</p>
              </div>
            </div>
          </Card>

          {/* Billing Details */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Billing Details</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium text-gray-900">Payment online</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Billing address</p>
                  <p className="font-medium text-gray-900">{order.billingAddress.name}</p>
                  <p className="text-gray-600">{order.billingAddress.address}</p>
                  <p className="text-gray-600">{order.billingAddress.city}, {order.billingAddress.country}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Products */}
        <Card className="mt-6">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Products in the package</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-4 flex-1">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      {item.size && <p className="text-sm text-gray-600">{item.size}</p>}
                      <p className="text-sm text-gray-600">QTY: {item.quantity}</p>
                      <p className="font-medium text-gray-900 mt-1">AED {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    OPEN AN INCIDENT
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="mt-6">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">AED {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery fee</span>
                <span className="font-medium">AED {order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">AED {order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetailPage; 