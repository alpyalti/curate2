import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProductListingPage } from './components/pages/ProductListingPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { FAQPage } from './components/pages/FAQPage';
import { ShippingPoliciesPage } from './components/pages/ShippingPoliciesPage';
import { ReturnsRefundsPage } from './components/pages/ReturnsRefundsPage';
import { TermsConditionsPage } from './components/pages/TermsConditionsPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { PartnershipPage } from './components/pages/PartnershipPage';
import { ScrollToTop } from './components/ui/scroll-to-top';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header
          cartItemCount={2}
          wishlistItemCount={5}
          onMenuToggle={handleMenuToggle}
          isMenuOpen={isMobileMenuOpen}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/c/:category" element={<ProductListingPage />} />
            <Route path="/sale" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping-policies" element={<ShippingPoliciesPage />} />
            <Route path="/returns-refunds" element={<ReturnsRefundsPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/partnership" element={<PartnershipPage />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
