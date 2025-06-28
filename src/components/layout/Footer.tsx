import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Button } from "../ui/button";

const footerLinks = {
  "About Curate": [
    { name: "About Us", href: "/about" },
    { name: "Partnership", href: "/partnership" },
    { name: "Store Locator", href: "/store-locator" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms and Conditions", href: "/terms-conditions" },
  ],
  "Customer Service": [
    { name: "Shipping Policies", href: "/shipping-policies" },
    { name: "Returns and Refunds", href: "/returns-refunds" },
    { name: "Track your orders", href: "/track-order" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ's", href: "/faq" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
];

const currencies = ["AED", "USD", "EUR", "GBP"];
const languages = ["English", "العربية", "Français"];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg width="120" height="28" viewBox="330 250 490 120" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
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
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Curate is a next-generation retail concept that blends inspiration, technology, and access—offering a shopping experience that's both elevated and effortless.
            </p>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              We're here to help with any questions, returns, or order-related inquiries.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                800 707070
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                care@curate.ae
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Download our apps */}
          <div>
            <h4 className="font-semibold mb-4">Download our apps</h4>
            <div className="space-y-3 mb-8">
              <a
                href="https://apps.apple.com/in/app/reem-mall/id1583719509"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                <img
                  src="/appstore.png"
                  alt="Download on the App Store"
                  className="h-10 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=ae.reemmall.app&pcampaignid=web_share&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                <img
                  src="/googleplay.png"
                  alt="Get it on Google Play"
                  className="h-10 w-auto"
                />
              </a>
            </div>
            
            <h4 className="font-semibold mb-4">Social channels</h4>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-semibold mb-4">Stay in the loop</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Be the first to know about new arrivals, exclusive sales, and special events.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-10 px-3 rounded-md border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm"
              />
              <Button size="sm" className="w-full">Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2025 All rights reserved. Reem Mall</span>
              <img src="/RMLogo.png" alt="RM Logo" className="h-6 w-auto" />
            </div>



            {/* Language & Currency Selector */}
            <div className="flex items-center space-x-4">
              <select className="text-sm bg-transparent border-none text-muted-foreground focus:outline-none focus:text-foreground">
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              <select className="text-sm bg-transparent border-none text-muted-foreground focus:outline-none focus:text-foreground">
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 