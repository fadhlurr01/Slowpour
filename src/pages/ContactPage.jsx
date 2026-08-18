import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

// Brand icons (removed from lucide-react in newer versions)
function InstagramIcon({ size = 14, strokeWidth = 1.5, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XSocialIcon({ size = 14, strokeWidth = 1.5, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  );
}

function FacebookIcon({ size = 14, strokeWidth = 1.5, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const hours = [
  { day: 'Monday – Friday', time: '07:00 – 21:00' },
  { day: 'Saturday', time: '08:00 – 22:00' },
  { day: 'Sunday', time: '08:00 – 20:00' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass = "w-full bg-transparent border border-warm-beige/20 rounded-xl px-5 py-3.5 font-sans text-sm text-soft-cream placeholder-soft-cream/30 focus:outline-none focus:border-warm-beige/60 transition-colors duration-300";

  return (
    <main className="min-h-screen bg-dark-green grain-overlay pt-20">
      {/* Header */}
      <section className="container-main py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="section-label text-warm-beige/60 mb-5"
        >
          Come Visit
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif text-display text-soft-cream leading-tight max-w-2xl"
        >
          We'd Love to<br />
          <span className="text-warm-beige italic">Hear From You.</span>
        </motion.h1>
      </section>

      {/* Main content */}
      <section className="container-main pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* LEFT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="border border-warm-beige/10 rounded-2xl p-8 md:p-10">
              <h2 className="font-serif text-2xl text-soft-cream mb-8">Send a Message</h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-warm-beige/10 flex items-center justify-center mb-5">
                    <Send size={24} className="text-warm-beige" />
                  </div>
                  <h3 className="font-serif text-2xl text-soft-cream mb-2">Message Sent!</h3>
                  <p className="font-sans text-sm text-soft-cream/50">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-sans text-xs text-soft-cream/40 tracking-widest uppercase mb-2" htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs text-soft-cream/40 tracking-widest uppercase mb-2" htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-soft-cream/40 tracking-widest uppercase mb-2" htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="What's on your mind?"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-soft-cream/40 tracking-widest uppercase mb-2" htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Tell us anything..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-warm-beige text-deep-forest rounded-xl font-sans font-600 text-sm tracking-wide hover:bg-soft-cream transition-colors duration-300"
                  >
                    <Send size={16} strokeWidth={1.5} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Address */}
            <div className="border border-warm-beige/10 rounded-2xl p-6">
              <h3 className="font-serif text-xl text-soft-cream mb-5">Find Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} strokeWidth={1.5} className="text-warm-beige/60 mt-0.5 shrink-0" />
                  <span className="font-sans text-sm text-soft-cream/60 leading-relaxed">
                    Jl. Kemang Raya No. 88,<br />Kemang, Jakarta Selatan 12730
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} strokeWidth={1.5} className="text-warm-beige/60 shrink-0" />
                  <a href="tel:+6221234567" className="font-sans text-sm text-soft-cream/60 hover:text-warm-beige transition-colors">+62 21 234 5678</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} strokeWidth={1.5} className="text-warm-beige/60 shrink-0" />
                  <a href="mailto:hello@slowpour.coffee" className="font-sans text-sm text-soft-cream/60 hover:text-warm-beige transition-colors">hello@slowpour.coffee</a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="border border-warm-beige/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock size={16} strokeWidth={1.5} className="text-warm-beige/60" />
                <h3 className="font-serif text-xl text-soft-cream">Opening Hours</h3>
              </div>
              <ul className="space-y-3">
                {hours.map(({ day, time }) => (
                  <li key={day} className="flex items-center justify-between">
                    <span className="font-sans text-xs text-soft-cream/40">{day}</span>
                    <span className="font-sans text-sm font-500 text-soft-cream/80">{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="border border-warm-beige/10 rounded-2xl p-6">
              <h3 className="font-serif text-xl text-soft-cream mb-5">Follow Along</h3>
              <div className="flex items-center gap-4">
                {[
                  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
                  { icon: XSocialIcon, label: 'Twitter', href: 'https://twitter.com' },
                  { icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 border border-warm-beige/20 rounded-full text-soft-cream/60 hover:text-warm-beige hover:border-warm-beige/50 transition-all duration-300 font-sans text-xs"
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="border border-warm-beige/10 rounded-2xl overflow-hidden h-48 bg-deep-forest/60 flex items-center justify-center relative">
              <div className="text-center">
                <MapPin size={32} strokeWidth={1} className="text-warm-beige/30 mx-auto mb-2" />
                <p className="font-sans text-xs text-soft-cream/30">Kemang, Jakarta Selatan</p>
              </div>
              {/* Simulated map grid */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute border-r border-soft-cream/20" style={{ left: `${(i + 1) * 12.5}%`, top: 0, bottom: 0 }} />
                ))}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute border-b border-soft-cream/20" style={{ top: `${(i + 1) * 16.6}%`, left: 0, right: 0 }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
