import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from "../ui/button";
import { ArrowRight, MapPin, CreditCard, Package, Shield } from "lucide-react";

export function FAQPage() {
  const faqSections = [
    {
      title: "About Curate",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "What is Curate's phygital retail concept?",
          answer: "Curate combines in-store product displays with digital convenience. Scan a QR code on any item to shop the full selection online."
        },
        {
          question: "How does this benefit customers?",
          answer: "You can see and feel product quality in-store, then order online from a broader range—convenient and seamless."
        },
        {
          question: "What kind of products are available at Curate?",
          answer: "Beauty, cosmetics, fashion, pre-loved luxury, handbags, footwear, and accessories."
        },
        {
          question: "Where is Curate located?",
          answer: "First level, Reem Mall, Abu Dhabi."
        }
      ]
    },
    {
      title: "Shopping & Purchases",
      icon: <Package className="h-5 w-5" />,
      questions: [
        {
          question: "How do I make a purchase at Curate?",
          answer: "Scan the QR code on any product in-store using your phone or in-store iPads to shop online."
        },
        {
          question: "Can I buy and take the product home immediately?",
          answer: "No. All purchases are made online and delivered to your address."
        },
        {
          question: "Can I reserve an item in-store?",
          answer: "Yes! Visit us or contact our team to place a reservation."
        },
        {
          question: "How do I check product availability?",
          answer: "Stock status is visible on each product page."
        },
        {
          question: "Do you offer size guides?",
          answer: "Yes, each product page includes a detailed size guide."
        }
      ]
    },
    {
      title: "Payment & Delivery",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: "What payment methods are accepted?",
          answer: "Visa, MasterCard, Apple Pay, and Google Pay."
        },
        {
          question: "Can I pay Cash on Delivery?",
          answer: "We do not accept cash payments in-store or on delivery."
        },
        {
          question: "Can I use Tabby, Tamara, or other split payments?",
          answer: "Not yet, but we're working on adding them soon."
        },
        {
          question: "Is there a delivery fee?",
          answer: "Local orders: AED 26.25. Drop-ship orders: Standard DHL rates apply."
        },
        {
          question: "Do you offer international delivery?",
          answer: "Currently, we only deliver within the UAE."
        },
        {
          question: "How can I track my order?",
          answer: "Once shipped, you'll receive a tracking link via email or SMS. You can also visit shipa.com/track or dhl.com/track"
        }
      ]
    },
    {
      title: "Pre-Loved & Authentication",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "Are pre-loved items authenticated?",
          answer: "Yes. All are professionally verified for authenticity and quality."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">Frequently Asked Questions</h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Curate's phygital shopping experience, payments, delivery, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Quick Links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8 lg:mb-12">
            {faqSections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="flex items-center space-x-2 lg:space-x-3 p-3 lg:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                {section.icon}
                <span className="font-medium text-xs lg:text-sm">{section.title}</span>
              </a>
            ))}
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8 lg:space-y-12">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} id={`section-${sectionIndex}`} className="scroll-mt-24">
                <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                  {section.icon}
                  <h2 className="text-xl lg:text-2xl font-bold">{section.title}</h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((faq, questionIndex) => (
                    <AccordionItem key={questionIndex} value={`${sectionIndex}-${questionIndex}`}>
                      <AccordionTrigger className="text-left text-sm lg:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 lg:mt-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 lg:p-8 text-center">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Still Have Questions?</h3>
            <p className="text-sm lg:text-base text-muted-foreground mb-4 lg:mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help with any questions about your Curate experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <a href="/contact">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://g.co/kgs/ffGrMBK" target="_blank" rel="noopener noreferrer">
                  Visit Store
                  <MapPin className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Store Info */}
          <div className="mt-8 lg:mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm lg:text-base">First level, Reem Mall, Abu Dhabi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 