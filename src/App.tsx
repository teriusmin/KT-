import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingBar } from './components/layout/FloatingBar';
import { HeroSection } from './components/landing/HeroSection';
import { LiveLeadTicker } from './components/landing/LiveLeadTicker';
import { ProductSection } from './components/landing/ProductSection';
import { PlanCalculator } from './components/landing/PlanCalculator';
import { WhySkylifeSection } from './components/landing/WhySkylifeSection';
import { ReviewSection } from './components/landing/ReviewSection';
import { FaqSection } from './components/landing/FaqSection';
import { BoardSection } from './components/landing/BoardSection';
import { ConsultationForm } from './components/landing/ConsultationForm';
import { ToastContainer } from './components/common/ToastContainer';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLeads } from './components/admin/AdminLeads';
import { AdminPosts } from './components/admin/AdminPosts';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminHeroCards } from './components/admin/AdminHeroCards';
import { AdminDesign } from './components/admin/AdminDesign';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { ProductItem } from './types';

const MainAppContent: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    adminTab,
    isAdminAuthenticated,
    loginAdmin,
    setSelectedProductForApply
  } = useApp();

  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductToApply = (product: ProductItem) => {
    setSelectedProductForApply(product);
    scrollToSection('apply-form');
  };

  const handleRequestAdmin = () => {
    if (isAdminAuthenticated) {
      setViewMode('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    loginAdmin();
    setIsLoginModalOpen(false);
    setViewMode('admin');
  };

  if (viewMode === 'admin') {
    // If not authenticated (e.g. state reset), fallback to landing
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <AdminLoginModal
            isOpen={true}
            onClose={() => setViewMode('landing')}
            onSuccess={handleLoginSuccess}
          />
        </div>
      );
    }

    return (
      <AdminLayout>
        {adminTab === 'dashboard' && <AdminDashboard />}
        {adminTab === 'leads' && <AdminLeads />}
        {adminTab === 'cards' && <AdminHeroCards />}
        {adminTab === 'products' && <AdminProducts />}
        {adminTab === 'design' && <AdminDesign />}
        {adminTab === 'posts' && <AdminPosts />}
        {adminTab === 'settings' && <AdminSettings />}
        <ToastContainer />
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased">
      {/* Customer Header */}
      <Navbar onScrollTo={scrollToSection} onRequestAdmin={handleRequestAdmin} />

      {/* Landing Page Content Sections with Mobile Reordering */}
      <main className="flex flex-col">
        {/* 1. Hero Section */}
        <div className="order-1">
          <HeroSection onScrollTo={scrollToSection} />
        </div>

        {/* 2. Real-time Ticker of Inquiries & Gifts */}
        <div className="order-2">
          <LiveLeadTicker />
        </div>

        {/* 3. Interactive Plan & Benefit Calculator (Placed above Product Cards) */}
        <div className="order-3">
          <PlanCalculator onApplyCalculatedPlan={handleSelectProductToApply} />
        </div>

        {/* 4. Products & Plans Grid */}
        <div className="order-4">
          <ProductSection onSelectProductToApply={handleSelectProductToApply} />
        </div>

        {/* 5. Core Advantages */}
        <div className="order-5">
          <WhySkylifeSection />
        </div>

        {/* 6. Verified Reviews & Installation Gallery */}
        <div className="order-6">
          <ReviewSection />
        </div>

        {/* 7. Frequently Asked Questions */}
        <div className="order-7">
          <FaqSection />
        </div>

        {/* 8. Notices, Events & Guides Board */}
        <div className="order-8">
          <BoardSection onScrollToApply={() => scrollToSection('apply-form')} />
        </div>

        {/* 9. Primary Dedicated Subscription Application Form */}
        <div className="order-9">
          <ConsultationForm />
        </div>
      </main>

      {/* Footer */}
      <Footer onScrollTo={scrollToSection} onRequestAdmin={handleRequestAdmin} />

      {/* Floating Action Bar */}
      <FloatingBar onScrollTo={scrollToSection} />

      {/* Admin Password Authentication Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Global Toast Notification */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
