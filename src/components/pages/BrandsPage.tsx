import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

// Brands from homepage "Shop by brand" section
const allBrands = [
  { 
    id: "lets-swim",
    name: "LETS SWIM", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-.png?context=bWFzdGVyfGltYWdlc3w2Mzk0fGltYWdlL3BuZ3xhREpsTDJnd1pTODVNRFV5TXpVek5EWXlNekF5TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BMbkJ1Wnd8ZmE1ZjRiZGNkMzA4MGU3YTIwMWQyMDU5ZjZmNjliOTA4MDQ3OGFiZDViY2Y3MTRhMzcyMDNiMmFhMjljYWVhOA",
    hasPage: true,
    description: "Luxury swimwear and lifestyle brand from London founded by David Koma."
  },
  { 
    id: "nori-enomoto",
    name: "NORI ENOMOTO", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-6-.png?context=bWFzdGVyfGltYWdlc3w5OTI1fGltYWdlL3BuZ3xhR0l5TDJnMFpDODVNRFV5TXpVM016azBORFl5TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2cyS1M1d2JtY3wxNjBlMzY5Y2QzN2Y1ODFiYzE4YjYwYWE2OWEzMDZkOTljY2ZjYWFkNzJhYjI3ZWI0MTMzODlkOTg4ZDcwOTcw",
    hasPage: true,
    description: "Tokyo-based designer known for sculptural handbags and picturesque accessories."
  },
  { 
    id: "capello",
    name: "CAPELLO", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-4-.png?context=bWFzdGVyfGltYWdlc3w5MzM2fGltYWdlL3BuZ3xhR1F5TDJoaFpDODVNRFV5TXpVMk5qUXdOems0TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2cwS1M1d2JtY3xjZGQ4NmExNWEyMDUwNWIxOWZmY2ZlOWQxYmQ1YzkyYjY2NjQ3Y2FkYWJkZmQ5YTczYTY0NTMzOGIyNThiMTU0",
    hasPage: false,
    description: "Contemporary brand offering stylish accessories and lifestyle products."
  },
  { 
    id: "muse-for-all",
    name: "MUSE FOR ALL", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-7-.png?context=bWFzdGVyfGltYWdlc3wzMzk2fGltYWdlL3BuZ3xhR0kxTDJnMFlTODVNRFV5TXpVM05EVTVPVGs0TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2czS1M1d2JtY3xmYzAzZDI3YjY0ZmQyZDU5MDgxOGE1NzZmYjMyODIzOTU2Y2M0OTBiMjU1YjQyNDJhNWQzNWU3NmU0N2I1ZTMw",
    hasPage: false,
    description: "Inclusive beauty and lifestyle brand celebrating diversity and self-expression."
  },
  { 
    id: "tay-candles",
    name: "TAY CANDLES", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Tay.png?context=bWFzdGVyfGltYWdlc3w2MTM4fGltYWdlL3BuZ3xhR1ZoTDJneVppODVNRFV5TXpVNE9UTTBOVFU0TDFSaGVTNXdibWN8YmNiM2IzMmFjZjAwNDg5ODdmNWJkMzRhM2MwOTQ1NmM5ZWFjYmI5YWFmZGQ2NWNhNTgyMmVmOTQ2MzAwNzhhZA",
    hasPage: false,
    description: "Artisanal candle brand creating luxury scented candles for modern living."
  },
  { 
    id: "iconic-london",
    name: "ICONIC LONDON", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-8-.png?context=bWFzdGVyfGltYWdlc3w1Mjg2fGltYWdlL3BuZ3xhREUyTDJnellTODVNRFV5TXpVM09URTROelV3TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2c0S1M1d2JtY3w5ZGJkNjkxNWY5Mjc4N2E0NzBlYmRmMzZmM2E2NDgxOTllZTM5MTBkNDg2Mzk3ZjFjODlhODQwNWM2ZWJjMzhh",
    hasPage: false,
    description: "London-based makeup brand known for effortless beauty and iconic products."
  },
  { 
    id: "ibrou",
    name: "İBROU", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Ibrou.png?context=bWFzdGVyfGltYWdlc3w4NzI5fGltYWdlL3BuZ3xhREUwTDJnM1ppODVNRFV5TXpVNU1UazJOekF5TDBsaWNtOTFMbkJ1Wnd8ODI5YjYyNGM3Y2NjYjNkNTMwYWUxOWM2NmUyNzNjZmY3NGE0NmFkNjExYWYxYTlmNjgzZTE1MDRlMmY3ODljNQ",
    hasPage: false,
    description: "Eyebrow shaping and beauty services brand specializing in brow perfection."
  },
  { 
    id: "mixsoon",
    name: "MIXSOON", 
    logo: "https://ipoontina.com/wp-content/uploads/2023/12/Mixsoon-LOGO.png",
    hasPage: false,
    description: "Korean skincare brand focusing on minimal ingredients and effective solutions."
  },
  { 
    id: "georgini",
    name: "GEORGINI", 
    logo: "https://theringmakers.co.nz/wp-content/uploads/2017/10/Georgini-Logo-black.png",
    hasPage: false,
    description: "Fine jewelry brand creating contemporary designs with precious metals and gemstones."
  }
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function BrandsPage() {
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter brands by selected letter and search query
  const filteredBrands = useMemo(() => {
    let brands = allBrands;

    // Filter by letter
    if (selectedLetter) {
      brands = brands.filter(brand => brand.name.charAt(0) === selectedLetter);
    }

    // Filter by search query
    if (searchQuery) {
      brands = brands.filter(brand => 
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return brands.sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedLetter, searchQuery]);

  // Group brands by first letter for display
  const groupedBrands = useMemo(() => {
    const groups: { [key: string]: typeof allBrands } = {};
    
    filteredBrands.forEach(brand => {
      const firstLetter = brand.name.charAt(0);
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(brand);
    });

    return groups;
  }, [filteredBrands]);

  // Get available letters (that have brands)
  const availableLetters = useMemo(() => {
    const letters = new Set(allBrands.map(brand => brand.name.charAt(0)));
    return alphabet.filter(letter => letters.has(letter));
  }, []);

  const clearFilters = () => {
    setSelectedLetter('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">Brands</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Brands</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our curated collection of {allBrands.length} premium brands from around the world. 
            From luxury fashion houses to innovative lifestyle brands.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Letter Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">Filter by letter:</span>
            {(selectedLetter || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                Clear filters
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {alphabet.map(letter => {
              const hasbrands = availableLetters.includes(letter);
              const isSelected = selectedLetter === letter;
              
              return (
                <Button
                  key={letter}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLetter(isSelected ? '' : letter)}
                  disabled={!hasbrands}
                  className={cn(
                    "w-10 h-10 p-0 font-medium",
                    isSelected && "bg-black text-white hover:bg-black/90",
                    !hasbrands && "opacity-30 cursor-not-allowed"
                  )}
                >
                  {letter}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''}
            {selectedLetter && ` starting with "${selectedLetter}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Brands Grid */}
        {Object.keys(groupedBrands).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedBrands)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, brands]) => (
                <div key={letter}>
                  <h2 className="text-2xl font-bold mb-6 text-primary">{letter}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                         {brands.map(brand => (
                       <div
                         key={brand.id}
                         className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200"
                       >
                         {brand.hasPage ? (
                           <Link
                             to={`/brand/${brand.id}`}
                             className="block p-6 h-full"
                           >
                             <div className="flex items-center gap-4 mb-4">
                               <img 
                                 src={brand.logo} 
                                 alt={`${brand.name} logo`}
                                 className="w-16 h-16 object-contain rounded-lg bg-muted/50 p-2"
                               />
                               <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                 {brand.name}
                               </h3>
                             </div>
                             <p className="text-sm text-muted-foreground line-clamp-3">
                               {brand.description}
                             </p>
                             <div className="mt-4 text-xs text-primary font-medium">
                               View Brand →
                             </div>
                           </Link>
                         ) : (
                           <div className="p-6 h-full opacity-75">
                             <div className="flex items-center gap-4 mb-4">
                               <img 
                                 src={brand.logo} 
                                 alt={`${brand.name} logo`}
                                 className="w-16 h-16 object-contain rounded-lg bg-muted/50 p-2"
                               />
                               <h3 className="font-bold text-lg text-muted-foreground">
                                 {brand.name}
                               </h3>
                             </div>
                             <p className="text-sm text-muted-foreground line-clamp-3">
                               {brand.description}
                             </p>
                             <div className="mt-4 text-xs text-muted-foreground">
                               Coming Soon
                             </div>
                           </div>
                         )}
                       </div>
                     ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No brands found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or letter filter
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 