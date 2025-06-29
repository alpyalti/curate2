import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, ChevronDown, ChevronRight, HelpCircle, Package, FileText, Truck, RefreshCw, User } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItemProps {
  title: string;
  image: string;
  href?: string;
  submenu?: { title: string; href: string }[];
}

const menuItems: MenuItemProps[] = [
  {
    title: "Homepage",
    image: "/images/men.png",
    href: "/"
  },
  {
    title: "Sale",
    image: "/images/sale.png",
    href: "/sale"
  },
  {
    title: "New In",
    image: "/images/bags.png",
    href: "/new-in"
  },
  {
    title: "Fashion",
    image: "/images/women.png",
    submenu: [
      { title: "Bags & Luggage", href: "/c/bags" },
      { title: "Men", href: "/c/men" },
      { title: "Women", href: "/c/women" }
    ]
  },
  {
    title: "Beauty",
    image: "/images/beauty.png",
    submenu: [
      { title: "Skincare", href: "/c/skincare" },
      { title: "Makeup", href: "/c/makeup" },
      { title: "Eyebrow shaping service", href: "/c/eyebrow-shaping" },
      { title: "Hair Care", href: "/c/hair-care" }
    ]
  },
  {
    title: "Home",
    image: "/images/home.png",
    submenu: [
      { title: "Bath", href: "/c/bath" },
      { title: "Home Decor", href: "/c/home-decor" }
    ]
  },
  {
    title: "Sports",
    image: "/images/sports.png",
    submenu: [
      { title: "Cycling", href: "/c/cycling" }
    ]
  },
  {
    title: "Pre Loved",
    image: "/images/preloved.png",
    submenu: [
      { title: "Bags", href: "/c/pre-loved-bags" }
    ]
  },
  {
    title: "Designers",
    image: "/partner1.jpg",
    submenu: [
      { title: "Lets Swim", href: "/brand/lets-swim" },
      { title: "Nori Enomoto", href: "/brand/nori-enomoto" },
      { title: "Capello", href: "/brand/capello" },
      { title: "Muse for All", href: "/brand/muse-for-all" },
      { title: "Tay Candles", href: "/brand/tay-candles" },
      { title: "Iconic London", href: "/brand/iconic-london" },
      { title: "İbrou", href: "/brand/ibrou" },
      { title: "Mixsoon", href: "/brand/mixsoon" },
      { title: "Georgini", href: "/brand/georgini" },
      { title: "View All Brands", href: "/brands" }
    ]
  }
];

const secondaryMenuItems = [
  { title: "Track Orders", href: "/track-order", icon: Package },
  { title: "Need Help?", href: "/contact", icon: HelpCircle },
  { title: "FAQ", href: "/faq", icon: FileText },
  { title: "Shipping Policy", href: "/shipping-policies", icon: Truck },
  { title: "Returns & Refunds", href: "/returns-refunds", icon: RefreshCw }
];

function MenuItem({ 
  item, 
  onClose, 
  isExpanded, 
  onToggle 
}: { 
  item: MenuItemProps; 
  onClose: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}) {

  if (!item.submenu) {
    // Special case for Homepage - no image
    if (item.title === "Homepage") {
      return (
        <Link
          to={item.href!}
          onClick={onClose}
          className="flex items-center py-6 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg font-medium pl-2">{item.title}</span>
        </Link>
      );
    }

    return (
      <Link
        to={item.href!}
        onClick={onClose}
        className="flex items-center justify-between p-0 border-b border-gray-100 hover:bg-gray-50 transition-colors relative overflow-hidden h-20"
      >
        <div className="flex items-center h-full">
          <span className="text-lg font-medium pl-6 py-4 z-10 relative">{item.title}</span>
        </div>
        <img
          src={item.image}
          alt={item.title}
          className="absolute right-0 top-0 w-20 h-full object-cover flex-shrink-0"
        />
      </Link>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-0 hover:bg-gray-50 transition-colors relative overflow-hidden h-20"
      >
        <div className="flex items-center h-full">
          <div className="flex items-center gap-2 pl-6 py-4 z-10 relative">
            <span className="text-lg font-medium">{item.title}</span>
            <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-90' : 'rotate-0'
            }`} />
          </div>
        </div>
        <img
          src={item.image}
          alt={item.title}
          className="absolute right-0 top-0 w-20 h-full object-cover flex-shrink-0"
        />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gray-50">
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.href}
              to={subItem.href}
              onClick={onClose}
              className="block pl-6 pr-4 py-3 text-base hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
            >
              {subItem.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleToggle = (itemTitle: string) => {
    setExpandedItem(prevExpanded => 
      prevExpanded === itemTitle ? null : itemTitle
    );
  };

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed inset-0 w-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="mr-1 hover:bg-transparent"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Logo */}
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center space-x-2"
              aria-label="Curate Home"
            >
              <svg width="140" height="32" viewBox="330 250 490 120" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
                <g fill="#0090a4">
                  <path d="M388.45,276.39c10.2,0,18.72,4.27,25.58,12.79l13.49-15.29c-10.76-12.14-24.1-18.21-40.04-18.21-14.28,0-26.35,4.82-36.22,14.46-9.87,9.64-14.81,21.67-14.81,36.08s4.84,26.35,14.53,35.8c9.69,9.45,22.01,14.18,36.99,14.18s27.97-6.21,39-18.63l-13.9-14.32c-6.77,8.44-15.48,12.65-26.14,12.65-7.79,0-14.42-2.73-19.88-8.2-5.47-5.47-8.2-12.72-8.2-21.76s2.9-16.22,8.69-21.55c5.79-5.33,12.77-7.99,20.93-7.99"/>
                  <path d="M642.8,285.84c-5.75-4.54-13.16-6.81-22.25-6.81-12.61,0-23.83,3.57-33.65,10.71l9.32,13.49c2.78-2.13,6.19-3.92,10.22-5.35,4.03-1.44,7.86-2.15,11.47-2.15,8.43,0,12.65,3.99,12.65,11.96v.42h-15.57c-9.64,0-17.24,1.9-22.8,5.7-5.56,3.8-8.34,9.52-8.34,17.17s2.69,13.77,8.07,18.36c5.38,4.59,12.03,6.88,19.95,6.88s14.58-3.38,19.95-10.15v9.04h19.6v-47.69c0-9.83-2.87-17.01-8.62-21.55M630.43,326.58c0,3.8-1.41,6.84-4.24,9.11-2.83,2.27-6.1,3.41-9.8,3.41s-6.56-.72-8.55-2.16c-1.99-1.43-2.99-3.5-2.99-6.19,0-5.19,4.17-7.79,12.52-7.79h13.07v3.62Z"/>
                  <path d="M698.96,337.99c-2.04,0-3.8-.81-5.28-2.43-1.48-1.62-2.22-3.87-2.22-6.74v-33.51h18.08v-15.02h-18.08v-22.39h-21v22.39h-8.76v15.02h8.76v34.48c0,8.16,2.48,14.6,7.44,19.33,4.96,4.73,11.03,7.09,18.22,7.09s14.02-2.96,20.51-8.9l-7.79-14.6c-2.69,3.52-5.98,5.28-9.87,5.28"/>
                  <path d="M746.44,335.07c-3.62-2.59-5.75-5.93-6.4-10.01h54.51v-11.12c0-10.85-3.59-19.38-10.78-25.59-7.19-6.21-15.92-9.32-26.21-9.32s-19.22,3.48-26.77,10.43c-7.55,6.95-11.33,16.32-11.33,28.09s3.71,21.16,11.13,28.16c7.42,7,16.8,10.5,28.16,10.5h11.08v-17.24h-11.16c-4.54,0-8.62-1.3-12.24-3.89M746.58,300.03c3.42-2.5,7.21-3.75,11.33-3.75s7.63,1.21,10.5,3.61c2.87,2.41,4.54,5.84,5,10.29h-32.82c.56-4.26,2.55-7.65,5.98-10.15"/>
                  <path d="M786.38,337.88c-5.59,0-10.12,4.53-10.12,10.12s4.53,10.12,10.12,10.12,10.12-4.53,10.12-10.12-4.53-10.12-10.12-10.12"/>
                  <path d="M489.12,320.86v-40.51h21.09v75.16h-21.09v-9.92c-5.22,7.36-11.94,11.04-20.19,11.04s-15.16-2.58-20.74-7.75c-5.59-5.17-8.38-12.83-8.38-22.98v-45.54h21.09v40.93c0,11.55,4.24,17.32,12.71,17.32,4.19,0,7.82-1.51,10.9-4.54,3.07-3.03,4.61-7.43,4.61-13.2"/>
                  <path d="M569.58,298.79c-6.24,0-10.9,2.21-13.97,6.64-3.07,4.42-4.61,10.27-4.61,17.53v32.55h-20.95v-75.16h20.95v9.92c2.7-3.07,6.08-5.68,10.13-7.82,4.05-2.14,8.17-3.26,12.36-3.35l.14,19.7h-4.05Z"/>
                </g>
              </svg>
            </Link>
          </div>

          {/* Account Section */}
          <div className="flex items-center gap-2">
            <Link to="/login" onClick={onClose} className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Login / Register
            </Link>
            <Link to="/login" onClick={onClose} className="hover:bg-transparent" aria-label="Account">
              <User className="h-5 w-5 text-gray-600" />
            </Link>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
                    {/* Main Menu Items */}
          <div>
            {menuItems.map((item) => (
              <MenuItem 
                key={item.title} 
                item={item} 
                onClose={onClose}
                isExpanded={expandedItem === item.title}
                onToggle={() => handleToggle(item.title)}
              />
            ))}
          </div>

          {/* Secondary Menu Items */}
          <div>
            <div className="bg-gray-100 h-4"></div>
            {secondaryMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 pl-6 pr-4 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-gray-400" />
                    <span className="text-base">{item.title}</span>
                  </Link>
                  {index < secondaryMenuItems.length - 1 && (
                    <div className="bg-gray-100 h-4"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
} 