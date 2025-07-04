import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import { useDummyProducts } from "../../hooks/useDummyProducts";
import { BrandCards } from "../ui/BrandCards";

const categoryTiles = [
  {
    id: "sale",
    title: "Sale",
    href: "/sale",
    image: "/images/sale.png",
    className: "col-span-1 row-span-1",
    featured: false
  },
  {
    id: "women",
    title: "Women",
    href: "/c/women",
    image: "/images/women.png",
    className: "col-span-1 row-span-1"
  },
  {
    id: "men",
    title: "Men",
    href: "/c/men",
    image: "/images/men.png",
    className: "col-span-1 row-span-1"
  },
  {
    id: "beauty",
    title: "Beauty",
    href: "/c/beauty",
    image: "/images/beauty.png",
    className: "col-span-1 row-span-1"
  },
  {
    id: "bags",
    title: "Bags",
    href: "/c/bags",
    image: "/images/bags.png",
    className: "col-span-1 row-span-1"
  },
  {
    id: "home",
    title: "Home",
    href: "/c/home",
    image: "/images/home.png",
    className: "col-span-1 row-span-1"
  },
  {
    id: "sports",
    title: "Sports",
    href: "/c/sports",
    image: "/images/sports.png",
    className: "col-span-1 row-span-1"
  },
  {
    id: "pre-loved",
    title: "Pre Loved",
    href: "/c/pre-loved",
    image: "/images/preloved.png",
    className: "col-span-1 row-span-1"
  }
];

const brands = [
  { 
    id: "lets-swim",
    name: "Lets Swim", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-.png?context=bWFzdGVyfGltYWdlc3w2Mzk0fGltYWdlL3BuZ3xhREpsTDJnd1pTODVNRFV5TXpVek5EWXlNekF5TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BMbkJ1Wnd8ZmE1ZjRiZGNkMzA4MGU3YTIwMWQyMDU5ZjZmNjliOTA4MDQ3OGFiZDViY2Y3MTRhMzcyMDNiMmFhMjljYWVhOA",
    hasPage: true
  },
  { 
    id: "nori-enomoto",
    name: "Nori Enomoto", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-6-.png?context=bWFzdGVyfGltYWdlc3w5OTI1fGltYWdlL3BuZ3xhR0l5TDJnMFpDODVNRFV5TXpVM016azBORFl5TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2cyS1M1d2JtY3wxNjBlMzY5Y2QzN2Y1ODFiYzE4YjYwYWE2OWEzMDZkOTljY2ZjYWFkNzJhYjI3ZWI0MTMzODlkOTg4ZDcwOTcw",
    hasPage: true
  },
  { 
    id: "capello",
    name: "Capello", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-4-.png?context=bWFzdGVyfGltYWdlc3w5MzM2fGltYWdlL3BuZ3xhR1F5TDJoaFpDODVNRFV5TXpVMk5qUXdOems0TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2cwS1M1d2JtY3xjZGQ4NmExNWEyMDUwNWIxOWZmY2ZlOWQxYmQ1YzkyYjY2NjQ3Y2FkYWJkZmQ5YTczYTY0NTMzOGIyNThiMTU0",
    hasPage: false
  },
  { 
    id: "muse-for-all",
    name: "Muse for All", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-7-.png?context=bWFzdGVyfGltYWdlc3wzMzk2fGltYWdlL3BuZ3xhR0kxTDJnMFlTODVNRFV5TXpVM05EVTVPVGs0TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2czS1M1d2JtY3xmYzAzZDI3YjY0ZmQyZDU5MDgxOGE1NzZmYjMyODIzOTU2Y2M0OTBiMjU1YjQyNDJhNWQzNWU3NmU0N2I1ZTMw",
    hasPage: false
  },
  { 
    id: "tay-candles",
    name: "Tay Candles", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Tay.png?context=bWFzdGVyfGltYWdlc3w2MTM4fGltYWdlL3BuZ3xhR1ZoTDJneVppODVNRFV5TXpVNE9UTTBOVFU0TDFSaGVTNXdibWN8YmNiM2IzMmFjZjAwNDg5ODdmNWJkMzRhM2MwOTQ1NmM5ZWFjYmI5YWFmZGQ2NWNhNTgyMmVmOTQ2MzAwNzhhZA",
    hasPage: false
  },
  { 
    id: "iconic-london",
    name: "Iconic London", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Untitled-200-x-200-px-8-.png?context=bWFzdGVyfGltYWdlc3w1Mjg2fGltYWdlL3BuZ3xhREUyTDJnellTODVNRFV5TXpVM09URTROelV3TDFWdWRHbDBiR1ZrSUNneU1EQWdlQ0F5TURBZ2NIZ3BJQ2c0S1M1d2JtY3w5ZGJkNjkxNWY5Mjc4N2E0NzBlYmRmMzZmM2E2NDgxOTllZTM5MTBkNDg2Mzk3ZjFjODlhODQwNWM2ZWJjMzhh",
    hasPage: false
  },
  { 
    id: "ibrou",
    name: "İbrou", 
    logo: "https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/Ibrou.png?context=bWFzdGVyfGltYWdlc3w4NzI5fGltYWdlL3BuZ3xhREUwTDJnM1ppODVNRFV5TXpVNU1UazJOekF5TDBsaWNtOTFMbkJ1Wnd8ODI5YjYyNGM3Y2NjYjNkNTMwYWUxOWM2NmUyNzNjZmY3NGE0NmFkNjExYWYxYTlmNjgzZTE1MDRlMmY3ODljNQ",
    hasPage: false
  },
  { 
    id: "mixsoon",
    name: "Mixsoon", 
    logo: "https://ipoontina.com/wp-content/uploads/2023/12/Mixsoon-LOGO.png",
    hasPage: false
  },
  { 
    id: "georgini",
    name: "Georgini", 
    logo: "https://theringmakers.co.nz/wp-content/uploads/2017/10/Georgini-Logo-black.png",
    hasPage: false
  }
];

const brandCards = [
  {
    id: "nori-enomoto",
    category: "Accessories",
    title: "Nori Enomoto",
    description: "Picturesque Accessories",
    image: "https://nori-enomoto.com/cdn/shop/files/nori_web__LOGO__1_de5bdecc-f585-4c0f-9db5-5ef6fda43fc0.png",
    badge: "Bags & Luggage"
  },
  {
    id: "lets-swim",
    category: "Swimwear",
    title: "Lets Swim",
    description: "LET'S SWIM is a swimwear and lifestyle brand from Founder and Creative Director, David Koma.",
    image: "https://letsswim.co/cdn/shop/files/SECOND_IMAGE_OPTION_1.jpg?crop=center&height=1800&v=1713169197&width=1800",
    badge: "Women's Fashion"
  }
];

export function HomePage() {
  const [brandScrollPosition, setBrandScrollPosition] = React.useState(0);
  const [canScrollBrandLeft, setCanScrollBrandLeft] = React.useState(false);
  const [canScrollBrandRight, setCanScrollBrandRight] = React.useState(true);
  const brandScrollRef = React.useRef<HTMLDivElement>(null);
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const progressStartTime = React.useRef<number>(Date.now());
  const isManualChange = React.useRef<boolean>(false);

  const { data: newInProducts } = useDummyProducts({ 
    filters: { sortBy: "newest" }, 
    page: 1, 
    size: 8 
  });
  
  const { data: trendingProducts } = useDummyProducts({ 
    filters: { sortBy: "popularity" }, 
    page: 1, 
    size: 8 
  });
  
  const { data: curatePicksProducts } = useDummyProducts({ 
    filters: { sortBy: "newest" }, 
    page: 1, 
    size: 8 
  });

  // Carousel slides
  const carouselSlides = [
    {
      id: 1,
      title: "New Season Arrivals",
      subtitle: "Discover the latest fashion trends",
      video: "https://videos.pexels.com/video-files/10678925/10678925-uhd_2732_1440_25fps.mp4",
      buttonText: "Shop Now",
      buttonLink: "/new-in"
    },
    {
      id: 3,
      title: "Designer Bags & Accessories",
      subtitle: "Elevate your style with premium accessories",
      image: "/images/bags.png",
      buttonText: "Shop Bags",
      buttonLink: "/c/bags"
    },
    {
      id: 4,
      title: "Sale - Up to 70% Off",
      subtitle: "Limited time offers on selected items",
      video: "https://videos.pexels.com/video-files/5649214/5649214-uhd_2560_1440_25fps.mp4",
      buttonText: "Shop Sale",
      buttonLink: "/sale"
    }
  ];

  // Debug: Log carousel slides and current slide
  React.useEffect(() => {
    console.log('Carousel slides:', carouselSlides);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle page visibility changes (for mobile optimization)
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause all videos
        videoRefs.current.forEach((video) => {
          if (video && !video.paused) {
            video.pause();
          }
        });
      } else {
        // Page is visible, resume current video
        const currentVideo = videoRefs.current[currentSlide];
        if (currentVideo && currentVideo.paused) {
          currentVideo.play().catch((error) => {
            console.log('Resume play failed:', error);
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentSlide]);

  React.useEffect(() => {
    console.log('Current slide changed to:', currentSlide, 'Link:', carouselSlides[currentSlide]?.buttonLink);
  }, [currentSlide]);

  React.useEffect(() => {
    const updateBrandScrollState = () => {
      if (!brandScrollRef.current) return;
      
      const container = brandScrollRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      setBrandScrollPosition(scrollLeft);
      setCanScrollBrandLeft(scrollLeft > 5);
      setCanScrollBrandRight(scrollLeft < maxScroll - 5);
    };

    const container = brandScrollRef.current;
    if (container) {
      updateBrandScrollState();
      container.addEventListener('scroll', updateBrandScrollState);
      
      const resizeObserver = new ResizeObserver(updateBrandScrollState);
      resizeObserver.observe(container);
      
      return () => {
        container.removeEventListener('scroll', updateBrandScrollState);
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Restart video when slide changes
  React.useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentSlide) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Play current slide video
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      
      // For mobile devices, ensure video is ready before playing
      if (currentVideo.readyState >= 3) {
        currentVideo.play().catch((error) => {
          console.log('Autoplay failed:', error);
          // Autoplay restrictions - user interaction required
        });
      } else {
        currentVideo.addEventListener('canplay', () => {
          currentVideo.play().catch((error) => {
            console.log('Autoplay failed:', error);
          });
        }, { once: true });
      }
    }
  }, [currentSlide]);

  // Single continuous progress interval
  React.useEffect(() => {
    const duration = 9000; // 9 seconds
    const interval = 50; // Update every 50ms
    
    progressStartTime.current = Date.now();
    
    const progressInterval = setInterval(() => {
      if (isManualChange.current) {
        // Skip this cycle if manual change happened
        isManualChange.current = false;
        progressStartTime.current = Date.now();
        setProgress(0);
        return;
      }
      
      const elapsed = Date.now() - progressStartTime.current;
      const newProgress = (elapsed / duration) * 100;
      
      if (newProgress >= 100) {
        // Move to next slide
        setCurrentSlide((current) => (current + 1) % carouselSlides.length);
        progressStartTime.current = Date.now();
        setProgress(0);
      } else {
        setProgress(newProgress);
      }
    }, interval);

    return () => clearInterval(progressInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselSlides.length]);

  // Reset progress when slide changes manually
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    isManualChange.current = true;
    progressStartTime.current = Date.now();
    setProgress(0);
  };

  const scrollBrands = (direction: 'left' | 'right') => {
    if (!brandScrollRef.current) return;
    
    const container = brandScrollRef.current;
    // Responsive card width: mobile 163px, desktop 181px
    const cardWidth = window.innerWidth < 768 ? 163 : 181;
    const gap = 16; // space-x-4 = 16px
    const scrollAmount = cardWidth + gap;
    
    let newPosition = brandScrollPosition;
    
    if (direction === 'left') {
      newPosition = Math.max(0, brandScrollPosition - scrollAmount);
    } else {
      const maxScroll = container.scrollWidth - container.clientWidth;
      newPosition = Math.min(maxScroll, brandScrollPosition + scrollAmount);
    }
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="container-padding py-4 md:py-6 lg:py-8 -mt-4">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden rounded-lg">
              <div className="relative w-full h-full">
{carouselSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={cn(
                      "absolute inset-0 transition-all duration-1000 ease-in-out rounded-lg",
                      index === currentSlide 
                        ? "opacity-100 scale-100 z-10" 
                        : "opacity-0 scale-105 z-0"
                    )}
                    style={{ 
                      pointerEvents: index === currentSlide ? 'auto' : 'none',
                      zIndex: index === currentSlide ? 10 : 0
                    }}
                  >
                    {slide.video ? (
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={slide.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                        preload="metadata"
                        webkit-playsinline="true"
                        x5-video-player-type="h5"
                        x5-video-player-fullscreen="false"
                        className="w-full h-full object-cover rounded-lg"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          console.log('Video load error:', e);
                        }}
                        onCanPlay={() => {
                          if (index === currentSlide) {
                            const video = videoRefs.current[index];
                            if (video) {
                              video.play().catch(() => {
                                // Autoplay failed, user interaction required
                              });
                            }
                          }
                        }}
                      />
                    ) : (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 rounded-lg" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white max-w-4xl px-6">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-base md:text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                          {slide.subtitle}
                        </p>
                        <Link 
                          to={slide.buttonLink}
                          onClick={(e) => {
                            console.log('Button clicked! Navigating to:', slide.buttonLink, 'from slide:', index);
                            console.log('Current slide is:', currentSlide);
                            if (index !== currentSlide) {
                              e.preventDefault();
                              console.log('Prevented navigation - not current slide');
                            }
                          }}
                        >
                          <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-2">
                            {slide.buttonText}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={cn(
                      "relative h-1 transition-all duration-300 rounded-full overflow-hidden",
                      index === currentSlide 
                        ? "w-12 bg-white/30" 
                        : "w-6 bg-white/50 hover:bg-white/70 hover:w-8"
                    )}
                  >
                    {index === currentSlide && (
                      <div 
                        className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    {index !== currentSlide && (
                      <div className="absolute inset-0 bg-white/50 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Outside Container */}
            <button
              onClick={() => handleSlideChange((currentSlide - 1 + carouselSlides.length) % carouselSlides.length)}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={() => handleSlideChange((currentSlide + 1) % carouselSlides.length)}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section with Bento Grid */}
      <section className="container-padding pt-4 pb-4 md:pt-2 md:pb-6 lg:pt-0.5 lg:pb-8 -mt-4">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {categoryTiles.map((tile) => (
              <Link
                key={tile.id}
                to={tile.id === "sale" ? "/sale" : `/c/${tile.id}`}
                              className={cn(
                "group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg",
                tile.className
              )}
              >
                {!tile.featured && (
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className={cn(
                  "absolute inset-0 transition-opacity",
                  tile.featured ? "bg-gradient-to-br from-red-500/90 to-red-600/90" : "bg-black/40 group-hover:bg-black/50"
                )} />
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                  <div className="text-white">
                    <div className="flex items-center text-xl md:text-2xl font-semibold">
                      {tile.title}
                      <svg 
                        className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="container-padding bg-muted/30">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by brand</h2>
            <a
              href="/brands"
              className="flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="relative">
            {/* Brands Container */}
            <div 
              ref={brandScrollRef}
              className="flex space-x-4 overflow-x-auto scroll-bar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {brands.map((brand, index) => (
                brand.hasPage ? (
                  <Link
                    key={index}
                    to={`/brand/${brand.id}`}
                    className="flex-shrink-0 bg-background rounded-lg border flex items-center justify-center cursor-pointer p-3 hover:border-primary/50 transition-colors duration-300 w-[163px] h-[120px] md:w-[177px] md:h-[130px]"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={cn(
                        "max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300",
                        brand.id === "mixsoon" && "max-w-[70%] max-h-[70%]"
                      )}
                      loading="lazy"
                    />
                  </Link>
                ) : (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-background rounded-lg border flex items-center justify-center cursor-pointer p-3 hover:border-primary/50 transition-colors duration-300 opacity-75 w-[163px] h-[120px] md:w-[177px] md:h-[130px]"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={cn(
                        "max-w-full max-h-full object-contain filter grayscale transition-all duration-300",
                        brand.id === "mixsoon" && "max-w-[70%] max-h-[70%]"
                      )}
                      loading="lazy"
                    />
                  </div>
                )
              ))}
            </div>

            {/* Left Arrow */}
            <button
              className={cn(
                "hidden md:block absolute left-0 top-[40%] -translate-y-1/2 -translate-x-12 z-10 text-gray-600 hover:text-gray-800 transition-colors",
                !canScrollBrandLeft && "opacity-30 cursor-not-allowed"
              )}
              onClick={() => scrollBrands('left')}
              disabled={!canScrollBrandLeft}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Right Arrow */}
            <button
              className={cn(
                "hidden md:block absolute right-0 top-[40%] -translate-y-1/2 translate-x-12 z-10 text-gray-600 hover:text-gray-800 transition-colors",
                !canScrollBrandRight && "opacity-30 cursor-not-allowed"
              )}
              onClick={() => scrollBrands('right')}
              disabled={!canScrollBrandRight}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Sliders */}
      <ProductSlider 
        title="New In" 
        products={newInProducts} 
        viewAllHref="/new-in"
      />
      
      <ProductSlider 
        title="Trending" 
        products={trendingProducts} 
        viewAllHref="/trending"
        className="bg-muted/20"
      />
      
      {/* Brand Cards Section */}
      <BrandCards 
        title="Trending This Week"
        subtitle=""
        cards={brandCards}
        viewAllHref="/trending"
      />
      
      <ProductSlider 
        title="Curate Picks" 
        products={curatePicksProducts} 
        viewAllHref="/curate-picks"
      />

      {/* Editorial Banner */}
      <section className="container-padding mb-8 mt-4">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-lg aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
            <img
              src="https://api.cdc1so4tme-dimension1-p1-public.model-t.cc.commerce.ondemand.com/medias/banner.jpeg?context=bWFzdGVyfGltYWdlc3wxMjg4MTl8aW1hZ2UvanBlZ3xhREV4TDJneE9TODRPVFF5TmprM01URTVOemMwTDJKaGJtNWxjaTVxY0dWbnw1ZTlkYjE3NzViODk2M2NkMWFkODhhMmMzODMwZWRiYjgxYWI0Njc3NjI1ZWViODJlNDY0YzMxMmQ1MWUxMWVm"
              alt="Discover Luxury Fashion Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-2xl px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                  Discover Luxury Fashion
                </h2>
                <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
                  Curated collections from the world's finest designers
                </p>
                <Button size="default" asChild className="bg-white text-black hover:bg-gray-100 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  <a href="https://g.co/kgs/ffGrMBK" target="_blank" rel="noopener noreferrer">
                    Visit Store
                    <MapPin className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ProductSliderProps {
  title: string;
  products: any[];
  viewAllHref: string;
  className?: string;
}

function ProductSlider({ title, products, viewAllHref, className }: ProductSliderProps) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateScrollState = () => {
      if (!scrollRef.current) return;
      
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      setScrollPosition(scrollLeft);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < maxScroll - 5);
    };

    const container = scrollRef.current;
    if (container) {
      updateScrollState();
      container.addEventListener('scroll', updateScrollState);
      
      const resizeObserver = new ResizeObserver(updateScrollState);
      resizeObserver.observe(container);
      
      return () => {
        container.removeEventListener('scroll', updateScrollState);
        resizeObserver.disconnect();
      };
    }
  }, [products]);

  const scrollProducts = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.clientWidth || 280;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;
    
    let newPosition = scrollPosition;
    
    if (direction === 'left') {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      const maxScroll = container.scrollWidth - container.clientWidth;
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  return (
    <section className={cn("container-padding py-6 md:py-8 lg:py-10", className)}>
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
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
        
        <div className="relative">
          {/* Products Container */}
          <div 
            ref={scrollRef}
            className="flex gap-3 md:gap-6 overflow-x-auto scroll-bar-hide pb-4"
          >
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="flex-none w-[calc(40%-6px)] md:w-[calc(25%-18px)]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            className={cn(
              "hidden md:block absolute left-0 top-[40%] -translate-y-1/2 -translate-x-12 z-10 text-gray-600 hover:text-gray-800 transition-colors",
              !canScrollLeft && "opacity-30 cursor-not-allowed"
            )}
            onClick={() => scrollProducts('left')}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Right Arrow */}
          <button
            className={cn(
              "hidden md:block absolute right-0 top-[40%] -translate-y-1/2 translate-x-12 z-10 text-gray-600 hover:text-gray-800 transition-colors",
              !canScrollRight && "opacity-30 cursor-not-allowed"
            )}
            onClick={() => scrollProducts('right')}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: any;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const [hoveredImage, setHoveredImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const displayPrice = product.price; // Always use the current price (already discounted)

  return (
    <Link to={`/product/${product.id}`} className={cn("group cursor-pointer block", className)}>
      <div 
        className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3"
        onMouseEnter={() => setHoveredImage(1)}
        onMouseLeave={() => setHoveredImage(0)}
      >
        <img
          src={product.images[hoveredImage]?.url || product.images[0]?.url}
          alt={product.images[hoveredImage]?.alt || product.images[0]?.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badges.slice(0, 2).map((badge: any, index: number) => (
              <Badge
                key={index}
                variant={badge.type as any}
                className="text-xs"
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        )}
        

        <button
          className="absolute top-2 right-2 transition-all duration-200 hover:scale-110"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart className={cn("h-5 w-5 text-black drop-shadow-md hover:text-red-500 transition-colors duration-200 stroke-[1.5]", isWishlisted && "fill-current text-red-500")} />
        </button>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground font-medium">{product.brand}</div>
        <h3 className="text-sm font-medium line-clamp-2 leading-tight">
          {product.title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">{displayPrice.formattedAmount}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {product.originalPrice.formattedAmount}
            </span>
          )}
          {product.discount && (
            <Badge className="bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5">
              -{product.discount.value}%
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
} 