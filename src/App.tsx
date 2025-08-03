import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProductListingPage } from './components/pages/ProductListingPage';
import { SearchResultsPage } from './components/pages/SearchResultsPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { BrandPage } from './components/pages/BrandPage';
import { BrandsPage } from './components/pages/BrandsPage';
import { CartPage } from './components/pages/CartPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { FAQPage } from './components/pages/FAQPage';
import { ShippingPoliciesPage } from './components/pages/ShippingPoliciesPage';
import { ReturnsRefundsPage } from './components/pages/ReturnsRefundsPage';
import { TermsConditionsPage } from './components/pages/TermsConditionsPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { PartnershipPage } from './components/pages/PartnershipPage';
import { LoginPage } from './components/pages/LoginPage';
import { ForgotPasswordPage } from './components/pages/ForgotPasswordPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import OrderDetailPage from './components/pages/OrderDetailPage';
import { ScrollToTop } from './components/ui/scroll-to-top';

// Component to handle automatic scroll to top on route changes
function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <div className="min-h-screen bg-background">
        <Header
          cartItemCount={3}
          wishlistItemCount={5}
          onMenuToggle={handleMenuToggle}
          isMenuOpen={isMobileMenuOpen}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/c/:category" element={<ProductListingPage />} />
            <Route path="/search/:keyword" element={<SearchResultsPage />} />
            <Route path="/sale" element={<ProductListingPage />} />
            <Route path="/new-in" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/track-order" element={<OrderTrackingPage />} />
            <Route path="/shipping-policies" element={<ShippingPoliciesPage />} />
            <Route path="/returns-refunds" element={<ReturnsRefundsPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/partnership" element={<PartnershipPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/orders" element={<ProfilePage />} />
            <Route path="/profile/addresses" element={<ProfilePage />} />
            <Route path="/profile/orders/:orderNumber" element={<OrderDetailPage />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
