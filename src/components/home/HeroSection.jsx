import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Flame, Snowflake } from 'lucide-react';

const categories = [
  { icon: Flame, label: 'Hot Coffee', to: '/menu?cat=Hot+Coffee' },
  { icon: Snowflake, label: 'Cold Coffee', to: '/menu?cat=Cold+Coffee' },
  { icon: Coffee, label: 'Signature', to: '/menu?cat=Signature+Drinks' },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-deep-forest grain-overlay overflow-hidden flex items-center"
      aria-label="Hero section"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-warm-beige/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen">

        {/* Left: Headline */}
        <motion.div
          style={{ y: textY }}
          className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-label text-warm-beige/70 mb-6"
          >
            Freshly Roasted Daily
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-display text-soft-cream leading-[1.05] tracking-tight mb-6"
          >
            Start Your Day<br />
            <span className="text-warm-beige italic">With Better</span><br />
            Coffee
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-soft-cream/60 text-base leading-relaxed max-w-sm mb-10"
          >
            Thoughtfully sourced coffee, crafted for slow mornings and meaningful moments.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Link
              to="/menu"
              id="hero-explore-btn"
              className="btn-primary"
            >
              Explore Menu
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link
              to="/about"
              className="font-sans text-sm text-soft-cream/60 hover:text-warm-beige transition-colors duration-300 flex items-center gap-1.5"
            >
              Our Story
              <span className="w-8 h-px bg-soft-cream/40 inline-block" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Center: Oval coffee image */}
        <motion.div
          style={{ y: imgY }}
          className="lg:col-span-4 flex justify-center items-center order-1 lg:order-2 relative"
        >
          {/* Decorative ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[300px] h-[380px] md:w-[340px] md:h-[440px] rounded-[50%/40%] border border-warm-beige/10" />
          </motion.div>

          {/* Coffee image in oval */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, clipPath: 'inset(10% 10% 10% 10%)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10"
          >
            <div
              className="w-[260px] h-[340px] md:w-[300px] md:h-[400px] overflow-hidden"
              style={{ borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' }}
            >
              <img
                src="/images/caramel-ribbon.jpg"
                alt="Caramel Ribbon - signature iced coffee"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute bottom-8 -left-4 bg-warm-beige/10 backdrop-blur-md border border-warm-beige/20 rounded-xl px-4 py-3"
          >
            <p className="font-sans text-xs text-warm-beige/60 tracking-widest uppercase mb-0.5">Caramel Ribbon</p>
            <p className="font-serif text-lg text-warm-beige">Rp 58.000</p>
          </motion.div>

          {/* Section number */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-0 right-0 font-serif text-[120px] leading-none font-400 text-soft-cream/5 select-none pointer-events-none"
          >
            01
          </motion.span>
        </motion.div>

        {/* Right: Category panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="lg:col-span-3 flex flex-row lg:flex-col gap-3 justify-center order-3"
        >
          {categories.map(({ icon: Icon, label, to }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
            >
              <Link
                to={to}
                className="flex items-center gap-3 px-4 py-3.5 bg-white/5 hover:bg-warm-beige/15 border border-white/10 hover:border-warm-beige/30 rounded-xl transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-warm-beige/10 group-hover:bg-warm-beige/20 flex items-center justify-center transition-colors duration-300">
                  <Icon size={18} strokeWidth={1.5} className="text-warm-beige" />
                </div>
                <span className="font-sans text-sm font-500 text-soft-cream/80 group-hover:text-warm-beige transition-colors duration-300 whitespace-nowrap">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}

          {/* Decorative label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="hidden lg:block font-sans text-[10px] text-soft-cream/25 tracking-[0.4em] uppercase mt-4 text-center"
          >
            09 varieties
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-sans text-[10px] text-soft-cream/30 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-warm-beige/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
