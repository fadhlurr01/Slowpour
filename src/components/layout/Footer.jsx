import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

// Brand icons (removed from lucide-react in newer versions)
function InstagramIcon({ size = 18, strokeWidth = 1.5, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XSocialIcon({ size = 18, strokeWidth = 1.5, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  );
}

function FacebookIcon({ size = 18, strokeWidth = 1.5, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/stories', label: 'Stories' },
  { to: '/contact', label: 'Contact' },
];

const hours = [
  { day: 'Monday – Friday', time: '07:00 AM – 09:00 PM' },
  { day: 'Saturday', time: '08:00 AM – 10:00 PM' },
  { day: 'Sunday', time: '08:00 AM – 08:00 PM' },
];

export default function Footer() {
  return (
    <footer className="bg-deep-forest grain-overlay text-soft-cream">
      {/* Top border accent */}
      <div className="w-full h-px bg-warm-beige/20" />

      <div className="container-main pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-serif text-3xl font-400 text-warm-beige block mb-4">
              Slowpour
            </Link>
            <p className="font-sans text-sm leading-relaxed text-soft-cream/60 max-w-xs">
              Coffee for slow mornings,<br />
              creative afternoons,<br />
              and meaningful conversations.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="https://instagram.com" aria-label="Instagram" className="text-soft-cream/40 hover:text-warm-beige transition-colors duration-300">
                <InstagramIcon size={18} strokeWidth={1.5} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-soft-cream/40 hover:text-warm-beige transition-colors duration-300">
                <XSocialIcon size={18} strokeWidth={1.5} />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="text-soft-cream/40 hover:text-warm-beige transition-colors duration-300">
                <FacebookIcon size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="section-label text-warm-beige/60 mb-6">Navigate</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-sans text-sm text-soft-cream/60 hover:text-warm-beige transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="section-label text-warm-beige/60 mb-6">Hours</h3>
            <ul className="space-y-4">
              {hours.map(({ day, time }) => (
                <li key={day} className="flex flex-col gap-0.5">
                  <span className="font-sans text-xs text-soft-cream/40 tracking-wide">{day}</span>
                  <span className="font-sans text-sm text-soft-cream/80">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="section-label text-warm-beige/60 mb-6">Find Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="text-warm-beige/60 mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-soft-cream/60 leading-relaxed">
                  Jl. Kemang Raya No. 88,<br />Jakarta Selatan, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} strokeWidth={1.5} className="text-warm-beige/60 shrink-0" />
                <a href="tel:+6221234567" className="font-sans text-sm text-soft-cream/60 hover:text-warm-beige transition-colors duration-300">
                  +62 21 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} strokeWidth={1.5} className="text-warm-beige/60 shrink-0" />
                <a href="mailto:hello@slowpour.coffee" className="font-sans text-sm text-soft-cream/60 hover:text-warm-beige transition-colors duration-300">
                  hello@slowpour.coffee
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-warm-beige/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-soft-cream/30 tracking-wide">
            © 2026 Slowpour Coffee. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="font-sans text-xs text-soft-cream/30 hover:text-warm-beige/60 transition-colors">Privacy</Link>
            <Link to="/terms" className="font-sans text-xs text-soft-cream/30 hover:text-warm-beige/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
