import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  CheckCircle2, 
  Package, 
  Calendar, 
  Clock, 
  CreditCard, 
  MapPin, 
  Truck,
  Receipt
} from "lucide-react";

interface OrderItem {
  id: string;
  title: string;
  brand: string;
  price: number;
  formattedPrice: string;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

interface OrderData {
  orderNumber: string;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    country: string;
    phone: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    country: string;
    phone: string;
  };
  vendorShipping: Record<string, {
    method: string;
    cost: string;
    description: string;
  }>;
  paymentMethod: string;
}

// Mock data for demonstration (2 sellers, 3 products total)
const mockOrderData: OrderData = {
  orderNumber: "00231015",
  total: 789.50,
  items: [
    {
      id: "1",
      title: "Smoothing Cleanser Complexion Purifier With Bamboo Face Cloth",
      brand: "The BDINC",
      price: 129.00,
      formattedPrice: "AED 129.00",
      quantity: 1,
      image: "/images/beauty.png",
      color: "Natural"
    },
    {
      id: "2", 
      title: "Premium Luxury Handbag Collection",
      brand: "LUXURY BAGS CO",
      price: 445.50,
      formattedPrice: "AED 445.50",
      quantity: 1,
      image: "/images/bags.png",
      color: "Black",
      size: "Medium"
    },
    {
      id: "3",
      title: "Designer Summer Dress",
      brand: "LUXURY BAGS CO", 
      price: 215.00,
      formattedPrice: "AED 215.00",
      quantity: 1,
      image: "/images/women.png",
      color: "Blue",
      size: "M"
    }
  ],
  shippingAddress: {
    firstName: "Milat Sayra",
    lastName: "Berirmen",
    address: "Villa 259 Arabian Ranches 3 Sun Cluster",
    city: "Dubai",
    country: "AE",
    phone: "+971 54 478 3474"
  },
  billingAddress: {
    firstName: "Milat Sayra", 
    lastName: "Berirmen",
    address: "Villa 259 Arabian Ranches 3 Sun Cluster",
    city: "Dubai",
    country: "AE",
    phone: "+971 54 478 3474"
  },
  vendorShipping: {
    "The BDINC": {
      method: "international",
      cost: "167.71",
      description: "International shipping"
    },
    "LUXURY BAGS CO": {
      method: "express", 
      cost: "200.00",
      description: "Express shipping (1-2 days)"
    }
  },
  paymentMethod: "Payment online"
};

export function OrderConfirmationPage() {
  const location = useLocation();
  const orderData = location.state?.orderData || mockOrderData;
  
  // Group items by vendor
  const groupedItems = orderData.items.reduce((groups: Record<string, OrderItem[]>, item: OrderItem) => {
    const vendor = item.brand;
    if (!groups[vendor]) {
      groups[vendor] = [];
    }
    groups[vendor].push(item);
    return groups;
  }, {} as Record<string, OrderItem[]>);

  // Calculate shipping total
  const shippingTotal = Object.values(orderData.vendorShipping).reduce((sum: number, shipping: any) => {
    return sum + parseFloat(shipping.cost || '0');
  }, 0);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Order Confirmation
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Confirmation Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            {/* Success Icon - similar to checkout completed steps */}
            <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Confirmation of Order: {orderData.orderNumber}
            </h2>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Thank you for your order!
            </h3>
            <p className="text-gray-600">
              We will contact you when your order is approved
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Order Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Order Number</h4>
                  <p className="text-gray-600">{orderData.orderNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Placed on</h4>
                  <p className="text-gray-600">{currentDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Order Status</h4>
                  <Badge variant="secondary" className="mt-1">
                    Pending
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Payment Method</h4>
                  <p className="text-gray-600">{orderData.paymentMethod}</p>
                </div>
              </div>

              {/* Billing Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Billing address</h4>
                  <div className="text-gray-600 mt-1">
                    <p>{orderData.billingAddress.firstName} {orderData.billingAddress.lastName}</p>
                    <p>{orderData.billingAddress.address}</p>
                    {orderData.billingAddress.apartment && <p>{orderData.billingAddress.apartment}</p>}
                    <p>{orderData.billingAddress.city}, {orderData.billingAddress.country}</p>
                    <p>{orderData.billingAddress.phone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Shipping Address</h4>
                  <div className="text-gray-600 mt-1">
                    <p>{orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}</p>
                    <p>{orderData.shippingAddress.address}</p>
                    {orderData.shippingAddress.apartment && <p>{orderData.shippingAddress.apartment}</p>}
                    <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.country}</p>
                    <p>{orderData.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gray-800" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Shipping Method</h4>
                  <div className="mt-2 space-y-3">
                    {Object.entries(groupedItems).map(([vendor, items]) => {
                      const shipping = orderData.vendorShipping[vendor];
                      return (
                        <div key={vendor} className="border-l-2 border-gray-200 pl-3">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{vendor}</div>
                            {shipping && (
                              <div className="text-gray-600 mt-1">
                                {shipping.method.replace('-', ' ')} - AED {shipping.cost}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([vendor, items]) => {
            const vendorItems = items as OrderItem[];
            const vendorTotal = vendorItems.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0);
            const shipping = orderData.vendorShipping[vendor];
            const vendorShippingCost = parseFloat(shipping?.cost || '0');
            const vendorGrandTotal = vendorTotal + vendorShippingCost;

            return (
              <Card key={vendor}>
                <CardContent className="p-6">
                  {/* Vendor Header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Cart total ({vendorItems.length} item{vendorItems.length > 1 ? 's' : ''}): AED {vendorGrandTotal.toFixed(2)}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Sold by <span className="font-medium underline">{vendor}</span>
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-4">
                    {vendorItems.map((item: OrderItem) => (
                      <div key={item.id} className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-2">
                            {item.title}
                          </h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            {item.color && <div>Color: {item.color}</div>}
                            {item.size && <div>Size: {item.size}</div>}
                            <div>QTY: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            {item.formattedPrice}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vendor Shipping */}
                  {shipping && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping ({shipping.description})</span>
                        <span className="font-medium">AED {shipping.cost}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Total Summary */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>AED {(orderData.total - shippingTotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>AED {shippingTotal.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>AED {orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
