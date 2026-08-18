import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { imgUrl } from '../utils/imageUrl';

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
}

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="bg-soft-cream min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center px-6">
          <ShoppingBag size={64} strokeWidth={1} className="text-charcoal/15 mx-auto mb-6" />
          <h1 className="font-serif text-4xl text-charcoal mb-4">Your cart is empty</h1>
          <p className="font-sans text-charcoal/50 mb-8">Add something beautiful to get started.</p>
          <Link to="/menu" id="cart-empty-menu-link" className="btn-primary bg-deep-forest text-warm-beige">
            Explore Menu <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-soft-cream min-h-screen pt-20">
      <div className="container-main py-14">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label text-sage mb-2">Your Selection</p>
            <h1 className="font-serif text-section text-charcoal">Your Cart</h1>
          </div>
          <button onClick={clearCart} className="font-sans text-xs text-charcoal/40 hover:text-charcoal transition-colors">
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.key}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.35 }}
                  className="flex gap-5 p-5 bg-white rounded-2xl shadow-sm"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={imgUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-sans font-600 text-charcoal">{item.name}</h3>
                        <p className="font-sans text-xs text-charcoal/40 mt-0.5">
                          {item.options?.size || 'Regular'}
                          {item.options?.sugar ? ` · Sugar ${item.options.sugar}` : ''}
                          {item.options?.ice ? ` · ${item.options.ice}` : ''}
                        </p>
                      </div>
                      <button onClick={() => removeItem(item.key)} className="text-charcoal/25 hover:text-charcoal transition-colors ml-2">
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-charcoal/15 rounded-full px-3 py-1.5">
                        <button onClick={() => updateQty(item.key, item.qty - 1)} aria-label="Decrease">
                          <Minus size={12} strokeWidth={2} className="text-charcoal/60" />
                        </button>
                        <span className="font-sans text-sm font-600 w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.key, item.qty + 1)} aria-label="Increase">
                          <Plus size={12} strokeWidth={2} className="text-charcoal/60" />
                        </button>
                      </div>
                      <span className="font-sans font-700 text-deep-forest">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-deep-forest grain-overlay rounded-2xl p-8 text-soft-cream">
              <h2 className="font-serif text-2xl mb-8">Order Summary</h2>

              {/* Promo code */}
              <div className="mb-8">
                <label className="block font-sans text-xs text-soft-cream/40 tracking-widest uppercase mb-2" htmlFor="promo-code">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1 bg-white/5 border border-warm-beige/15 rounded-xl px-4 py-3">
                    <Tag size={14} className="text-warm-beige/40" />
                    <input
                      id="promo-code"
                      type="text"
                      placeholder="Enter code"
                      className="bg-transparent flex-1 font-sans text-sm text-soft-cream placeholder-soft-cream/25 focus:outline-none"
                    />
                  </div>
                  <button className="px-4 py-3 bg-warm-beige/15 border border-warm-beige/20 rounded-xl font-sans text-xs text-warm-beige hover:bg-warm-beige/25 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-8 pb-8 border-b border-warm-beige/10">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-soft-cream/50">Subtotal</span>
                  <span className="text-soft-cream">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-soft-cream/50">Service fee</span>
                  <span className="text-soft-cream">{formatPrice(5000)}</span>
                </div>
              </div>
              <div className="flex justify-between mb-8">
                <span className="font-sans font-600 text-soft-cream">Total</span>
                <span className="font-serif text-2xl text-warm-beige">{formatPrice(total + 5000)}</span>
              </div>

              {/* Pickup / Delivery */}
              <div className="flex gap-2 mb-8">
                {['Pickup', 'Delivery'].map(opt => (
                  <button
                    key={opt}
                    className={`flex-1 py-2.5 rounded-full font-sans text-xs font-600 tracking-wide transition-all ${
                      opt === 'Pickup' ? 'bg-warm-beige text-deep-forest' : 'border border-warm-beige/20 text-soft-cream/50 hover:text-soft-cream'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <Link
                to="/checkout"
                id="cart-checkout-btn"
                className="flex items-center justify-between w-full px-6 py-4 bg-warm-beige text-deep-forest rounded-xl font-sans font-600 text-sm hover:bg-soft-cream transition-colors duration-300 group"
              >
                Proceed to Checkout
                <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <p className="font-sans text-[10px] text-soft-cream/25 text-center mt-4 tracking-wide">
                Estimated ready in 10–15 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
