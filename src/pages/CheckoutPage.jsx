import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, User, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { imgUrl } from '../utils/imageUrl';

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
}

const steps = ['Contact', 'Summary', 'Confirm'];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', method: 'Pickup', notes: '' });
  const [done, setDone] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    if (step < 2) { setStep(s => s + 1); return; }
    setDone(true);
    clearCart();
  };

  const inputClass = "w-full bg-charcoal/4 border border-charcoal/15 rounded-xl px-5 py-3.5 font-sans text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-dark-green transition-colors duration-300";

  if (done) {
    return (
      <main className="bg-soft-cream min-h-screen pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6 max-w-md mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-dark-green flex items-center justify-center mx-auto mb-8">
            <Check size={36} strokeWidth={1.5} className="text-warm-beige" />
          </div>
          <h1 className="font-serif text-4xl text-charcoal mb-4">Order Placed!</h1>
          <p className="font-sans text-charcoal/55 leading-relaxed mb-2">
            Thank you, <strong>{form.name || 'friend'}</strong>. Your order is being prepared.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8 text-dark-green">
            <Clock size={16} strokeWidth={1.5} />
            <span className="font-sans text-sm font-600">Ready in 10–15 minutes</span>
          </div>
          <Link to="/menu" id="checkout-done-menu-link" className="btn-primary bg-deep-forest text-warm-beige">
            Order More <ArrowRight size={16} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-soft-cream min-h-screen pt-20">
      <div className="container-main py-14 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label text-sage mb-2">Almost There</p>
          <h1 className="font-serif text-section text-charcoal">Checkout</h1>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-4 mb-12">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 font-sans text-sm transition-colors ${
                  i === step ? 'text-deep-forest font-600' : i < step ? 'text-sage cursor-pointer' : 'text-charcoal/30'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-700 transition-all ${
                  i < step ? 'bg-sage text-white' : i === step ? 'bg-deep-forest text-warm-beige' : 'bg-charcoal/10 text-charcoal/40'
                }`}>
                  {i < step ? <Check size={12} strokeWidth={2.5} /> : i + 1}
                </span>
                {s}
              </button>
              {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-sage' : 'bg-charcoal/10'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Form area */}
          <form onSubmit={handleOrder} className="lg:col-span-2 space-y-5">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <h2 className="font-serif text-2xl text-charcoal">Contact Information</h2>
                  <div>
                    <label className="block font-sans text-xs text-charcoal/40 tracking-widest uppercase mb-2" htmlFor="checkout-name">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                      <input id="checkout-name" type="text" required placeholder="Your name" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={`${inputClass} pl-11`} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-charcoal/40 tracking-widest uppercase mb-2" htmlFor="checkout-email">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                      <input id="checkout-email" type="email" required placeholder="your@email.com" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={`${inputClass} pl-11`} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-charcoal/40 tracking-widest uppercase mb-2" htmlFor="checkout-phone">Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                      <input id="checkout-phone" type="tel" placeholder="+62 ..." value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className={`${inputClass} pl-11`} />
                    </div>
                  </div>
                  <div>
                    <p className="block font-sans text-xs text-charcoal/40 tracking-widest uppercase mb-3">Order Method</p>
                    <div className="flex gap-3">
                      {['Pickup', 'Delivery'].map(opt => (
                        <button type="button" key={opt} onClick={() => setForm(f => ({ ...f, method: opt }))}
                          className={`flex-1 py-3 rounded-xl border font-sans text-sm font-600 transition-all ${
                            form.method === opt ? 'border-deep-forest bg-deep-forest text-warm-beige' : 'border-charcoal/15 text-charcoal/50 hover:border-charcoal/30'
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {form.method === 'Delivery' && (
                    <div>
                      <label className="block font-sans text-xs text-charcoal/40 tracking-widest uppercase mb-2" htmlFor="checkout-address">Delivery Address</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-4 top-3.5 text-charcoal/30" />
                        <textarea id="checkout-address" rows={2} placeholder="Full address..." className={`${inputClass} pl-11 resize-none`} />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block font-sans text-xs text-charcoal/40 tracking-widest uppercase mb-2" htmlFor="checkout-notes">Special Notes</label>
                    <textarea id="checkout-notes" rows={2} placeholder="Any requests?" value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      className={`${inputClass} resize-none`} />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="font-serif text-2xl text-charcoal">Review Your Order</h2>
                  {items.map(item => (
                    <div key={item.key} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <img src={imgUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-sm font-600 text-charcoal">{item.name}</p>
                        <p className="font-sans text-xs text-charcoal/40">{item.options?.size} · Qty {item.qty}</p>
                      </div>
                      <span className="font-sans text-sm font-700 text-deep-forest">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <h2 className="font-serif text-2xl text-charcoal">Confirm Order</h2>
                  <div className="bg-white rounded-2xl p-6 space-y-3">
                    {[
                      ['Name', form.name || '—'],
                      ['Email', form.email || '—'],
                      ['Phone', form.phone || '—'],
                      ['Method', form.method],
                      ['Items', `${items.reduce((s, i) => s + i.qty, 0)} items`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between font-sans text-sm">
                        <span className="text-charcoal/40">{k}</span>
                        <span className="text-charcoal font-500">{v}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-charcoal/8 flex justify-between">
                      <span className="font-sans font-600 text-charcoal">Total</span>
                      <span className="font-serif text-xl text-deep-forest">{formatPrice(total + 5000)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              id="checkout-next-btn"
              className="w-full flex items-center justify-center gap-3 py-4 bg-deep-forest text-warm-beige rounded-xl font-sans font-600 text-sm hover:bg-dark-green transition-colors duration-300 mt-4"
            >
              {step < 2 ? 'Continue' : 'Place Order'}
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </form>

          {/* Mini order summary */}
          <div className="bg-deep-forest grain-overlay rounded-2xl p-6 text-soft-cream">
            <h3 className="font-serif text-lg mb-5">Order Total</h3>
            <div className="space-y-2 mb-5 pb-5 border-b border-warm-beige/10">
              <div className="flex justify-between font-sans text-sm">
                <span className="text-soft-cream/50">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-sans text-sm">
                <span className="text-soft-cream/50">Service fee</span>
                <span>{formatPrice(5000)}</span>
              </div>
            </div>
            <div className="flex justify-between mb-3">
              <span className="font-sans font-600">Total</span>
              <span className="font-serif text-xl text-warm-beige">{formatPrice(total + 5000)}</span>
            </div>
            <p className="font-sans text-[10px] text-soft-cream/25 mt-4 text-center">
              Estimated ready in 10–15 minutes
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
