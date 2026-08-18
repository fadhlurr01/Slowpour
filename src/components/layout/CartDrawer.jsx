import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
}

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-soft-cream flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={1.5} className="text-dark-green" />
                <h2 className="font-serif text-xl font-500 text-charcoal">
                  Your Order
                  {count > 0 && <span className="ml-2 font-sans text-sm font-400 text-sage">({count} items)</span>}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
                className="p-2 rounded-full text-charcoal/50 hover:text-charcoal hover:bg-charcoal/10 transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} strokeWidth={1} className="text-charcoal/20" />
                  <p className="font-sans text-sm text-charcoal/50">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-ghost text-xs"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.li
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 p-3 bg-white rounded-xl shadow-sm"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-sans text-sm font-600 text-charcoal truncate">{item.name}</h3>
                          <p className="font-sans text-xs text-charcoal/50 mt-0.5">
                            {item.options?.size || 'Regular'}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-sans text-sm font-700 text-deep-forest">
                              {formatPrice(item.price * item.qty)}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQty(item.key, item.qty - 1)}
                                className="w-7 h-7 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-deep-forest hover:text-deep-forest transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} strokeWidth={2} />
                              </button>
                              <span className="font-sans text-sm font-600 w-5 text-center">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.key, item.qty + 1)}
                                className="w-7 h-7 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-deep-forest hover:text-deep-forest transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="text-charcoal/30 hover:text-charcoal transition-colors self-start"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-charcoal/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-charcoal/60">Subtotal</span>
                  <span className="font-sans text-lg font-700 text-deep-forest">{formatPrice(total)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between w-full px-6 py-4 bg-deep-forest text-soft-cream rounded-xl font-sans font-600 text-sm tracking-wide hover:bg-dark-green transition-colors duration-300 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block text-center font-sans text-sm text-charcoal/50 hover:text-charcoal transition-colors"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
