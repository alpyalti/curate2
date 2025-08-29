import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Package, User, Clock, Heart, MapPin, MessageSquare, LifeBuoy, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function ProfilePopupDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Profile Popup Demo - Before & After Login
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Before Login - Guest State */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Before Login (Guest)</h2>
            
            <div className="bg-background border rounded-lg shadow-lg w-60 p-3 mx-auto">
              {/* Login Button */}
              <Link to="/login">
                <Button 
                  className="w-full mb-2 h-10 bg-[#b8956b] hover:bg-[#a6854e] text-white font-medium"
                >
                  LOG IN
                </Button>
              </Link>
              
              {/* Create Account Section */}
              <div className="mb-3">
                <Link to="/complete-profile">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full h-10"
                  >
                    CREATE ACCOUNT
                  </Button>
                </Link>
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  <p>Don't have an account?</p>
                  <p>It only takes a minute.</p>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="space-y-1 pt-2 border-t">
                <Link 
                  to="/faq" 
                  className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">Help & FAQ</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link 
                  to="/order-tracking" 
                  className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">Track Order</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* After Login - Logged In State */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">After Login (Logged In)</h2>
            
            <div className="bg-background border rounded-lg shadow-lg w-60 p-3 mx-auto">
              {/* Menu Items */}
              <div className="space-y-1">
                <Link 
                  to="/profile" 
                  className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">My Profile</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link 
                  to="/profile/orders" 
                  className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">Order History</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link 
                  to="/wishlist" 
                  className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">Wish List</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link 
                  to="/profile/addresses" 
                  className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">Address Book</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link 
                  to="/profile/messages" 
                  className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">Messages</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link 
                  to="/profile/support" 
                  className="flex items-center justify-between w-full p-2 text-left hover:text-primary rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">Support tickets</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <div className="border-t mt-2 pt-2">
                  <button 
                    className="flex items-center justify-between w-full p-2 text-left hover:text-red-700 rounded-md transition-colors group text-red-600"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4 group-hover:text-red-700 transition-colors" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Compare the profile dropdown before and after user login. The left shows the guest state, the right shows the logged-in user state.
          </p>
          <Link 
            to="/" 
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
