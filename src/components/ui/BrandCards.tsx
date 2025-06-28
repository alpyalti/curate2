import React from "react";
import { Badge } from "./badge";
import { ArrowRight } from "lucide-react";

interface BrandCard {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  badge: string;
}

interface BrandCardsProps {
  title?: string;
  subtitle?: string;
  cards: BrandCard[];
  viewAllHref?: string;
}

export function BrandCards({ 
  title = "Featured Brands", 
  subtitle = "Discover our curated selection of premium brands and emerging designers.",
  cards,
  viewAllHref = "/brands"
}: BrandCardsProps) {
  return (
    <section className="py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <a
            href={viewAllHref}
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {cards.map((card) => (
            <a 
              key={card.id} 
              href={`/brand/${card.id}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                  {card.badge}
                </Badge>
                <div className="flex items-center mb-3">
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <svg 
                    className="ml-2 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" 
                    viewBox="0 0 20 20" 
                    fill="none"
                  >
                    <path 
                      d="M7 4l6 6-6 6" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 