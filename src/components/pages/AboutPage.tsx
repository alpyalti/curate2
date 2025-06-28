import React from "react";
import { ArrowRight, Globe, Sparkles, ShoppingBag, Heart, Zap, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export function AboutPage() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Handpicked Selection",
      description: "Every product is thoughtfully chosen by our team for its quality, design, and uniqueness. We blend emerging designers and trusted brands to offer a collection that stands out and inspires. Our curation ensures you always discover something special."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Exclusive Access",
      description: "Enjoy access to international brands, limited editions, and exclusive collaborations you won't find elsewhere. We partner directly with global labels and local artisans to bring you unique pieces. Discover new favorites before anyone else."
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Flexible Shopping",
      description: "Shop in-store for a hands-on experience or online for ultimate convenience. Our services like click-and-collect and virtual styling make it easy to shop your way. Switch seamlessly between digital and physical shopping whenever you like."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Seamless Experience",
      description: "Your shopping journey is unified across all channels. Our technology connects your preferences, wishlists, and orders whether you're online or in-store. Enjoy a smooth, personalized experience every time you shop."
    }
  ];



  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit">
                About Curate
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your World,{" "}
                <span className="text-primary">Curated</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Curate is a next-generation retail concept that blends inspiration, technology, and access—offering a shopping experience that's both elevated and effortless.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="group">
                  Explore Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/contact">
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <img
                  src="/about1.jpg"
                  alt="Curate Store Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Shopping Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">The Curate Experience</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how we blend innovation, quality, and community to create something extraordinary.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Image (same size as hero) */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <img
                  src="/about2.jpg"
                  alt="Curated Shopping Experience"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              {/* Paragraph */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Curate, we believe in creating an extraordinary shopping experience that goes beyond the ordinary. Our <span className="font-semibold text-foreground bg-primary/10 px-2 py-1 rounded">Handpicked Selection</span> ensures that every product reflects quality, style, and innovation. We are a <span className="font-semibold text-foreground bg-primary/10 px-2 py-1 rounded">Community Driven</span> platform where newness, inspiration, and connections flourish together.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're discovering emerging labels or exploring trusted favorites, our curated approach guarantees an elevated shopping journey that adapts to your preferences.
                </p>
              </div>

              {/* What Sets Us Apart - Accordion Style */}
              <div>
                <h3 className="text-2xl font-bold mb-6">What Sets Us Apart</h3>
                <Accordion type="single" collapsible className="w-full">
                  {features.map((feature, index) => (
                    <AccordionItem key={index} value={`feature-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            {feature.icon}
                          </div>
                          <span className="font-medium">{feature.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-11">
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Built for Everyone</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Curate, your experience comes first—whether you're a brand looking to grow or a shopper seeking the best.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* For Shoppers Card */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src="/about4.jpg"
                alt="For Shoppers"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                  For Shoppers
                </Badge>
                <h3 className="text-2xl font-bold mb-3">Complete Control</h3>
                <p className="text-white/90 leading-relaxed">
                  Browse, discover, and shop the way you prefer—on-ground for a tactile touch or online for on-the-go ease.
                </p>
              </div>
            </div>

            {/* For Brands Card */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src="/about3.jpg"
                alt="For Brands"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                  For Brands
                </Badge>
                <h3 className="text-2xl font-bold mb-3">Agile Platform</h3>
                <p className="text-white/90 leading-relaxed">
                  Tech-enabled ecosystem that reduces overheads, simplifies logistics, and ensures visibility across both in-store and digital fronts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Curated for You</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Ready to experience the future of retail? Whether you're a shopper looking for something unique or a brand seeking the perfect platform, we'd love to hear from you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="group" asChild>
                <a href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/">
                  Explore Collections
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 