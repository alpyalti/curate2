import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn, debounce } from "../../lib/utils";
import { useDummyProducts } from "../../hooks/useDummyProducts";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  className,
  placeholder = "Search for products, brands, categories...",
  onSearch
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get search suggestions based on current query
  const { data: suggestions } = useDummyProducts({
    query: query.trim(),
    page: 1,
    size: 6
  });

  // Debounced search function
  const debouncedSearch = debounce((searchQuery: string) => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (query.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    }
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(query);
    }
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            "relative flex items-center rounded-md border bg-background/40 backdrop-blur-sm transition-colors",
            isFocused && "ring-2 ring-ring ring-offset-2",
            "hover:bg-accent/20"
          )}
        >
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className={cn(
              "flex h-10 w-full rounded-md bg-transparent px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            )}
            aria-label="Search products"
            autoComplete="off"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 h-8 w-8"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover p-2 shadow-md animate-fade-in">
          {suggestions.length > 0 ? (
            <div className="space-y-1">
              <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                Products
              </div>
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => {
                    setShowSuggestions(false);
                    setIsFocused(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center space-x-3 rounded-sm px-2 py-2 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none"
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.images[0]?.alt}
                    className="h-8 w-8 rounded object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium">{product.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {product.brand}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {product.discount?.discountedPrice.formattedAmount || product.price.formattedAmount}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              No products found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
} 