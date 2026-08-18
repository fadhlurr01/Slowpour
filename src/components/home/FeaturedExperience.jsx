import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] } },
});

export default function FeaturedExperience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="bg-soft-cream py-24 lg:py-36 overflow-hidden"
      aria-label="Featured coffee experience"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

          {/* Left: Text content */}
          <div className="lg:col-span-5 lg:col-start-1 relative">
            {/* Decorative number */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="absolute -top-8 -left-4 font-serif text-[9rem] leading-none text-charcoal/5 select-none pointer-events-none"
            >
              01
            </motion.span>

            <motion.p
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="section-label text-sage mb-5"
            >
              The Experience
            </motion.p>

            <motion.h2
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-serif text-section text-charcoal leading-tight mb-6"
            >
              Coffee made<br />
              <em>with intention.</em>
            </motion.h2>

            <motion.p
              variants={fadeUp(0.35)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="font-sans text-charcoal/60 leading-relaxed text-base max-w-sm mb-8"
            >
              From the first roast to the final pour, every detail is carefully considered. We source beans from farmers who share our values — slow, intentional, exceptional.
            </motion.p>

            <motion.div
              variants={fadeUp(0.45)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <Link
                to="/about"
                id="featured-about-link"
                className="btn-ghost text-charcoal group"
              >
                Our Story
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp(0.55)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex items-center gap-10 mt-12 pt-10 border-t border-charcoal/10"
            >
              {[
                { num: '18+', label: 'Origin Countries' },
                { num: '200+', label: 'Cups Daily' },
                { num: '5★', label: 'Average Rating' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-serif text-2xl font-600 text-deep-forest">{num}</p>
                  <p className="font-sans text-xs text-charcoal/40 tracking-wide mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Images */}
          <div className="lg:col-span-6 lg:col-start-7 relative flex flex-col items-end gap-4">
            {/* Large image */}
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={inView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
              className="w-full lg:w-[85%] h-80 md:h-[440px] rounded-2xl overflow-hidden shadow-2xl shadow-charcoal/10"
            >
              <img
                src="/images/cold-brew.jpg"
                alt="Cold brew coffee experience"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Small overlapping image */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="w-40 h-40 md:w-52 md:h-52 rounded-xl overflow-hidden shadow-xl absolute bottom-0 -left-4 lg:-left-10 border-4 border-soft-cream"
            >
              <img
                src="/images/cappuccino.jpg"
                alt="Cappuccino latte art detail"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute top-6 -left-6 lg:-left-16 bg-deep-forest text-soft-cream rounded-xl px-4 py-3 shadow-lg"
            >
              <p className="font-sans text-[10px] text-soft-cream/50 tracking-[0.2em] uppercase mb-0.5">Roasted fresh</p>
              <p className="font-sans text-sm font-600">Every morning</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
