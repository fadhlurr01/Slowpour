import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/stories', label: 'Stories' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  // Determine if we're on a dark-background page (home hero)
  const isDarkPage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const textColor = (!scrolled && isDarkPage) ? 'text-soft-cream' : 'text-charcoal';
  const bgClass = scrolled
    ? 'bg-deep-forest/95 backdrop-blur-md shadow-lg'
    : isDarkPage ? 'bg-transparent' : 'bg-soft-cream/95 backdrop-blur-md';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
      >
        <div className="container-main flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className={`font-serif text-xl font-600 tracking-tight transition-colors duration-300 ${scrolled ? 'text-soft-cream' : isDarkPage ? 'text-soft-cream' : 'text-deep-forest'}`}
          >
            Slowpour
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative font-sans text-sm font-500 tracking-wide transition-colors duration-300 pb-0.5
                  ${scrolled ? 'text-soft-cream/80 hover:text-warm-beige' : isDarkPage ? 'text-soft-cream/80 hover:text-warm-beige' : 'text-charcoal/70 hover:text-deep-forest'}
                  ${isActive ? (scrolled || isDarkPage ? 'text-warm-beige' : 'text-deep-forest') : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-warm-beige"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              id="cart-toggle-btn"
              onClick={() => setIsOpen(true)}
              className={`relative p-2 transition-colors duration-300 ${scrolled || !isDarkPage ? 'text-soft-cream hover:text-warm-beige' : 'text-soft-cream hover:text-warm-beige'} ${!scrolled && !isDarkPage ? 'text-charcoal hover:text-deep-forest' : ''}`}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0.5 right-0.5 w-4 h-4 bg-warm-beige text-deep-forest text-[10px] font-700 rounded-full flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Order CTA (desktop) */}
            <Link
              to="/menu"
              id="nav-order-btn"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-warm-beige text-deep-forest font-sans font-600 text-xs tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-deep-forest hover:text-warm-beige hover:shadow-md"
            >
              Order Now
            </Link>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className={`lg:hidden p-2 transition-colors duration-300 ${scrolled || !isDarkPage ? 'text-soft-cream' : 'text-soft-cream'} ${!scrolled && !isDarkPage ? 'text-charcoal' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 bg-deep-forest grain-overlay flex flex-col justify-center items-center gap-2"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `font-serif text-4xl font-400 transition-colors duration-300 ${isActive ? 'text-warm-beige' : 'text-soft-cream/80 hover:text-warm-beige'}`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-6"
              >
                <Link
                  to="/menu"
                  className="btn-outline text-base"
                  onClick={() => setMobileOpen(false)}
                >
                  Order Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
