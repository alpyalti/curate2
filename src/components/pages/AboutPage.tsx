import React from "react";
import { ArrowRight, Globe, Sparkles, Users, ShoppingBag, Heart, Zap, Shield, Star, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function AboutPage() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Handpicked Selection",
      description: "Global and local brands across fashion, beauty, home, and more"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Exclusive Access",
      description: "International labels with styles you won't find everywhere"
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Flexible Shopping",
      description: "In-store for the experience or online for convenience"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Seamless Experience",
      description: "Digital and physical blend giving you freedom to shop your way"
    }
  ];

  const benefits = [
    {
      category: "For Brands",
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Agile Platform",
      description: "Tech-enabled ecosystem that reduces overheads, simplifies logistics, and ensures visibility across both in-store and digital fronts—without the risk.",
      points: ["Reduced overheads", "Simplified logistics", "Digital & physical visibility", "Risk-free entry"]
    },
    {
      category: "For Shoppers",
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Complete Control",
      description: "Browse, discover, and shop the way you prefer—on-ground for a tactile touch or online for on-the-go ease.",
      points: ["Tactile in-store experience", "Convenient online shopping", "Quality assurance", "Style & innovation focus"]
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
                <Button variant="outline" size="lg">
                  Visit Store
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&auto=format&q=80"
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">The Curate Experience</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're not just a store—we're a destination. Every product is handpicked to reflect quality, style, and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop&auto=format&q=80"
                  alt="Curated Shopping Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Community Driven</h3>
                  <p className="text-muted-foreground">
                    An ever-evolving space where newness, inspiration, and community come together.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Quality Assured</h3>
                  <p className="text-muted-foreground">
                    Whether discovering emerging labels or trusted favorites, quality is guaranteed.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">What Sets Us Apart</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&auto=format&q=80"
                  alt="Premium Beauty Products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Built for Everyone</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Curate, your experience comes first—whether you're a brand looking to grow or a shopper seeking the best.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-background rounded-2xl p-8 shadow-sm border">
                <div className="flex items-center space-x-3 mb-6">
                  {benefit.icon}
                  <div>
                    <Badge variant="secondary" className="mb-2">{benefit.category}</Badge>
                    <h3 className="text-2xl font-bold">{benefit.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {benefit.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Curated for You</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're not just building a marketplace—we're building a community. At Curate, every product tells a story, every partnership adds value, and every visit opens up a new world of possibilities.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Every Product</h3>
                <p className="text-muted-foreground">Tells a story</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Every Partnership</h3>
                <p className="text-muted-foreground">Adds value</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Every Visit</h3>
                <p className="text-muted-foreground">Opens possibilities</p>
              </div>
            </div>

            <div className="pt-8">
              <Button size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 