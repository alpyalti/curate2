import React from "react";
import { RotateCcw, Mail, User, CheckCircle, Clock, XCircle } from "lucide-react";

export function ReturnsRefundsPage() {
  const returnSteps = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Contact Us",
      description: "Email us at care@curate.ae or submit a request via your account panel"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Return Approval",
      description: "Once your return is approved, a free pickup will be scheduled at your convenience"
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-primary" />,
      title: "Quality Check",
      description: "Returned items must be unused, in their original condition, and include all tags and packaging"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Refund Processing",
      description: "Refunds are processed within 7–10 business days after the item passes our quality inspection"
    }
  ];

  const nonReturnableItems = [
    "Beauty and skincare products",
    "Lingerie",
    "Customized Items"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Return Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Easy returns within 14 days of delivery. Here's everything you need to know about our return process.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Return Window */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">14-Day Return Window</h2>
            <p className="text-lg text-muted-foreground">
              Returns are accepted within <strong>14 days from the date of delivery</strong> for eligible items.
            </p>
          </div>

          {/* Return Process */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">How to Return Your Items</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {returnSteps.map((step, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Initiate Return Section */}
          <div className="bg-muted/50 rounded-lg p-8 mb-12">
            <h3 className="text-xl font-semibold mb-4">To initiate a return:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>Email us at <a href="mailto:care@curate.ae" className="text-primary hover:underline">care@curate.ae</a></span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-primary" />
                <span>Or submit a request via your account panel</span>
              </div>
            </div>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
            <div className="flex items-start space-x-3">
              <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-900">Non-returnable categories include:</h3>
                <ul className="space-y-2">
                  {nonReturnableItems.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-red-800">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Need Help with Your Return?</h3>
            <p className="text-muted-foreground mb-6">
              Have questions about returning an item? Our customer service team is here to assist you.
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