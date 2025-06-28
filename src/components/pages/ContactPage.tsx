import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Mail, Phone, ExternalLink, MapPin } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    type: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    subject: "",
    message: "",
    orderId: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const faqItems = [
    {
      question: "How do I make a purchase at Curate?",
      answer: "Scan the QR code on any product in-store using your phone or in-store iPads to shop online. All purchases are made online and delivered to your address."
    },
    {
      question: "How can I track my order?",
      answer: "Once shipped, you'll receive a tracking link via email or SMS. You can also visit shipa.com/track or dhl.com/track to monitor your delivery."
    },
    {
      question: "What is Curate's phygital retail concept?",
      answer: "Curate combines in-store product displays with digital convenience. Scan a QR code on any item to shop the full selection online - you can see and feel product quality in-store, then order from our broader range."
    },
    {
      question: "Where is Curate located?",
      answer: "First level, Reem Mall, Abu Dhabi. Visit us to experience our unique phygital shopping concept."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">Contact Us</h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help with any questions, concerns, or feedback you may have.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Form */}
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              {/* Type of Inquiry */}
              <div>
                <Label htmlFor="type" className="text-sm font-medium">
                  Type of Inquiry*
                </Label>
                <Select value={formData.type} onValueChange={(value: string) => handleInputChange("type", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Please choose type of enquiry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="order">Order Support</SelectItem>
                    <SelectItem value="returns">Returns & Exchanges</SelectItem>
                    <SelectItem value="partnership">Brand Partnership</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Type email address"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {/* First and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name*
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("firstName", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name*
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("lastName", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <Label htmlFor="mobile" className="text-sm font-medium">
                  Mobile Number*
                </Label>
                <div className="flex mt-1">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-sm">
                    +971
                  </div>
                  <Input
                    id="mobile"
                    placeholder="Phone number"
                    value={formData.mobile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("mobile", e.target.value)}
                    required
                    className="rounded-l-none"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject" className="text-sm font-medium">
                  Your Subject*
                </Label>
                <Input
                  id="subject"
                  placeholder="What's your message about?"
                  value={formData.subject}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("subject", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-sm font-medium">
                  Your Message*
                </Label>
                <Textarea
                  id="message"
                  placeholder="We want to serve you better. What do you think of our service? Fill us in and help us improve!"
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("message", e.target.value)}
                  required
                  rows={4}
                  className="mt-1"
                />
              </div>

              {/* Order ID */}
              <div>
                <Label htmlFor="orderId" className="text-sm font-medium">
                  Order ID
                </Label>
                <Input
                  id="orderId"
                  placeholder="Type in your order ID"
                  value={formData.orderId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("orderId", e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Side - Assistance & FAQ */}
          <div className="space-y-6 lg:space-y-8">
            {/* Need Assistance Box */}
            <div className="bg-muted/50 rounded-lg p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4">Need Assistance?</h3>
              <p className="text-sm lg:text-base text-muted-foreground mb-3 lg:mb-4">
                We're here to help with any questions, returns, or order-related inquiries.
              </p>
              <div className="space-y-2 lg:space-y-3">
                <p className="text-xs lg:text-sm font-medium">You can reach our support team via:</p>
                <div className="space-y-1.5 lg:space-y-2">
                  <a 
                    href="mailto:care@curate.ae" 
                    className="flex items-center space-x-2 text-primary hover:underline text-sm lg:text-base"
                  >
                    <Mail className="h-3 lg:h-4 w-3 lg:w-4" />
                    <span>Email: care@curate.ae</span>
                    <ExternalLink className="h-2.5 lg:h-3 w-2.5 lg:w-3" />
                  </a>
                  <a 
                    href="tel:800707070" 
                    className="flex items-center space-x-2 text-primary hover:underline text-sm lg:text-base"
                  >
                    <Phone className="h-3 lg:h-4 w-3 lg:w-4" />
                    <span>Phone: 800 707070</span>
                    <ExternalLink className="h-2.5 lg:h-3 w-2.5 lg:w-3" />
                  </a>
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm lg:text-base">
                    <MapPin className="h-3 lg:h-4 w-3 lg:w-4" />
                    <span>Visit us: First level, Reem Mall, Abu Dhabi</span>
                  </div>
                </div>
              </div>
              <p className="text-xs lg:text-sm text-muted-foreground mt-3 lg:mt-4">
                Your satisfaction is our priority — don't hesitate to get in touch.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-muted/50 rounded-lg p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-xs lg:text-sm">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-4 lg:mt-6">
                <Button variant="outline" size="sm" className="w-full text-xs lg:text-sm" asChild>
                  <a href="/faq">
                    HAVE MORE QUESTIONS? VISIT OUR DETAILED FAQ
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 