import React from "react";
import { Truck, CreditCard, Clock, Globe } from "lucide-react";

export function ShippingPoliciesPage() {
  const shippingInfo = [
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Delivery Coverage",
      description: "We currently ship across the United Arab Emirates."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Payment Methods",
      description: "Accepted payment methods include Debit Card, Credit Card, Google Pay, and Apple Pay."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Local Delivery",
      description: "Next day delivery for locally shipped orders"
    },
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "International Delivery",
      description: "3-5 days for internationally shipped orders"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our delivery services and shipping options.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {shippingInfo.map((info, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Important Notes</h2>
            <div className="space-y-4 text-center max-w-2xl mx-auto">
              <p className="text-muted-foreground leading-relaxed">
                All orders are processed and shipped from our fulfillment centers. Delivery times may vary based on product availability and location.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For any shipping-related questions or concerns, please don't hesitate to contact our customer service team.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-6">
              Have questions about your order or shipping? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background rounded-md hover:bg-muted transition-colors"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 