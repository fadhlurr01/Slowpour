import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// Page transition wrapper
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Not found page
function NotFoundPage() {
  return (
    <main className="bg-soft-cream min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-serif text-[8rem] leading-none text-charcoal/8 select-none">404</p>
        <h1 className="font-serif text-3xl text-charcoal mb-4 -mt-4">Page not found</h1>
        <p className="font-sans text-charcoal/50 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary bg-deep-forest text-warm-beige">Go Home</a>
      </div>
    </main>
  );
}

export default function App() {
  const location = useLocation();

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <CartDrawer />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/menu" element={<PageWrapper><MenuPage /></PageWrapper>} />
          <Route path="/menu/:slug" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/stories" element={<PageWrapper><StoriesPage /></PageWrapper>} />
          <Route path="/stories/:slug" element={<PageWrapper><StoryDetailPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}
