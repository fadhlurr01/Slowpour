import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const t = testimonials[current];
  const nextT = testimonials[(current + 1) % testimonials.length];

  const go = (dir) => {
    setDirection(dir);
    setCurrent(i => (i + dir + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(i => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section className="bg-deep-forest grain-overlay py-24 lg:py-32 overflow-hidden" aria-label="Customer testimonials">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 border-b border-warm-beige/10 pb-8">
          <div>
            <p className="section-label text-warm-beige/60 mb-2">Community</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-soft-cream">What They Say</h2>
          </div>
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => go(-1)}
              className="p-3 border border-soft-cream/20 rounded-full text-soft-cream/60 hover:text-warm-beige hover:border-warm-beige/40 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go(1)}
              className="p-3 border border-soft-cream/20 rounded-full text-soft-cream/60 hover:text-warm-beige hover:border-warm-beige/40 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 min-h-[300px]">
          
          {/* Main active testimonial */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="flex flex-col h-full justify-between"
              >
                {/* Quote icon */}
                <div className="font-serif text-6xl text-warm-beige/20 leading-none mb-6">“</div>
                
                <p className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-soft-cream leading-tight mb-10 max-w-3xl">
                  {t.quote}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-warm-beige text-deep-forest flex items-center justify-center font-sans font-700 text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-sans text-sm font-600 text-soft-cream">{t.name}</p>
                      <p className="font-sans text-xs text-soft-cream/50 mt-0.5">{t.role}</p>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < t.rating ? 'fill-warm-beige text-warm-beige' : 'text-soft-cream/20'}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Secondary preview (desktop only) */}
          <div className="hidden lg:block lg:col-span-3 lg:col-start-10 relative">
            <div className="h-full flex flex-col justify-center border-l border-soft-cream/10 pl-8 opacity-40">
              <p className="font-serif text-lg text-soft-cream leading-snug mb-6 line-clamp-4">
                "{nextT.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-soft-cream/20 text-soft-cream flex items-center justify-center font-sans font-600 text-[10px]">
                  {nextT.avatar}
                </div>
                <div>
                  <p className="font-sans text-xs font-600 text-soft-cream">{nextT.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-px bg-soft-cream/10 mt-16 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-warm-beige"
            initial={{ width: 0 }}
            animate={{ width: `${((current + 1) / testimonials.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
}
