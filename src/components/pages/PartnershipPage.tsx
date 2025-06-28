import React from "react";
import { ArrowRight, Users, Star, Zap, Globe, Mail, Handshake } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function PartnershipPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 lg:space-y-6">
              <Badge variant="outline" className="w-fit">
                Partnership Opportunities
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                Partner{" "}
                <span className="text-primary">With Us</span>
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Are you ready to collaborate with one of the UAE's most innovative phygital retail concepts?
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                At Curate, we're transforming the shopping experience by seamlessly merging the physical and digital realms. We're actively seeking partnerships with forward-thinking brands that want to be part of the future of retail.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <Button size="lg" className="group" asChild>
                  <a href="mailto:bd@curate.ae">
                    Get In Touch
                    <Mail className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/contact">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <img
                  src="/about3.jpg"
                  alt="Partnership Opportunities"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white rounded-xl p-3 lg:p-4 shadow-lg border">
                <div className="flex items-center space-x-2">
                  <Handshake className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
                  <span className="text-xs lg:text-sm font-medium">Partnership Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-last lg:order-first">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <img
                  src="/partner1.jpg"
                  alt="Partnership Benefits"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Why Partner With{" "}
                <span className="text-primary">Curate?</span>
              </h2>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 lg:h-6 w-5 lg:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-sm lg:text-base">Innovation-First Approach</h4>
                    <p className="text-sm lg:text-base text-muted-foreground">We leverage cutting-edge technology to create seamless phygital experiences that set new industry standards.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 lg:h-6 w-5 lg:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-sm lg:text-base">Strategic Location</h4>
                    <p className="text-sm lg:text-base text-muted-foreground">Located in the heart of Abu Dhabi at Reem Mall, reaching UAE's most affluent and fashion-forward consumers.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 lg:h-6 w-5 lg:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-sm lg:text-base">Curated Community</h4>
                    <p className="text-sm lg:text-base text-muted-foreground">Access to a highly engaged audience that values quality, exclusivity, and authentic brand experiences.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 lg:h-6 w-5 lg:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-sm lg:text-base">Reduced Operational Costs</h4>
                    <p className="text-sm lg:text-base text-muted-foreground">Our tech-enabled ecosystem reduces overheads and simplifies logistics, allowing you to focus on what you do best.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Handshake className="h-5 lg:h-6 w-5 lg:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-sm lg:text-base">Digital & Physical Presence</h4>
                    <p className="text-sm lg:text-base text-muted-foreground">Benefit from both online visibility and premium physical retail space, maximizing your brand's reach and impact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8 lg:p-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
              Ready to Transform Retail Together?
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 max-w-2xl mx-auto">
              Reach out to us at <a href="mailto:bd@curate.ae" className="text-primary hover:underline font-semibold">bd@curate.ae</a> to explore partnership opportunities and discover how we can create something remarkable together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <a href="mailto:bd@curate.ae">
                  Start Partnership Discussion
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact">
                  Contact Our Team
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 