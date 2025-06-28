import React from "react";
import { Package, ExternalLink, Mail, Search, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

export function OrderTrackingPage() {
  const trackingSteps = [
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: "Visit Tracking Website",
      description: "Head to shipa.com/track or dhl.com/track"
    },
    {
      icon: <Package className="h-6 w-6 text-primary" />,
      title: "Enter Tracking Number",
      description: "Use the tracking number you received via email"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "View Real-time Updates",
      description: "See live delivery status and estimated arrival"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Order Tracking</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your order easily in just a few steps
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Instructions */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8 mb-8 md:mb-12 text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Package className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Track Your Package</h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8">
              Enter the tracking number you received via email to view real-time delivery updates
            </p>
            
            {/* Tracking Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <a
                href="https://shipa.com/track"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-primary/20 rounded-xl p-4 md:p-6 hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">Shipa Tracking</h3>
                  <ExternalLink className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                  For local orders delivered by Shipa
                </p>
                <div className="text-primary font-medium text-sm md:text-base">
                  Visit shipa.com/track →
                </div>
              </a>

              <a
                href="https://dhl.com/track"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-primary/20 rounded-xl p-4 md:p-6 hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-semibold">DHL Tracking</h3>
                  <ExternalLink className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                  For international orders delivered by DHL
                </p>
                <div className="text-primary font-medium text-sm md:text-base">
                  Visit dhl.com/track →
                </div>
              </a>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {trackingSteps.map((step, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4 md:p-6 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    {step.icon}
                  </div>
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs md:text-sm font-bold mx-auto mb-3 md:mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-muted/50 rounded-lg p-6 md:p-8 mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Important Information</h3>
            <div className="space-y-3 md:space-y-4 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base">Tracking information is typically available within 24 hours of shipment</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base">Local orders are delivered by Shipa, while international orders use DHL</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base">You'll receive email notifications with tracking updates at key delivery milestones</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 md:p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Can't find your tracking information or have questions about your order?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" className="text-sm md:text-base" asChild>
                <a href="mailto:care@curate.ae">
                  Contact Support
                  <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-sm md:text-base" asChild>
                <a href="/contact">
                  Visit Contact Page
                </a>
              </Button>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-4">
              Reach out to us at <a href="mailto:care@curate.ae" className="text-primary hover:underline font-semibold">care@curate.ae</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 