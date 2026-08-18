import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const values = [
  {
    num: '01',
    title: 'Thoughtfully Sourced',
    desc: 'Every bean traced back to its origin — farmers, altitude, and harvest date.',
  },
  {
    num: '02',
    title: 'Carefully Roasted',
    desc: 'Small-batch roasting that honors each bean\'s unique character and complexity.',
  },
  {
    num: '03',
    title: 'Made for Slow Moments',
    desc: 'We believe good coffee is never rushed. Neither are good conversations.',
  },
];

export default function BrandPhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section ref={ref} className="bg-soft-cream py-24 lg:py-36 overflow-hidden" aria-label="Brand philosophy">

      {/* Large scrolling text */}
      <div className="overflow-hidden mb-16 md:mb-24">
        <motion.p
          style={{ x: marqueeX }}
          className="font-serif text-[clamp(3.5rem,10vw,8rem)] whitespace-nowrap text-charcoal/6 leading-none select-none pointer-events-none"
        >
          Good coffee is not rushed. Neither are good moments.&nbsp;&nbsp;&nbsp;Good coffee is not rushed.
        </motion.p>
      </div>

      <div className="container-main" ref={undefined}>
        {/* Central statement */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label text-sage mb-6"
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-[clamp(2.2rem,5vw,4rem)] text-charcoal leading-tight"
          >
            Slow coffee.{' '}
            <span className="text-warm-beige italic">Good company.</span>{' '}
            Better moments.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-16 h-px bg-warm-beige mx-auto mt-8"
          />
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {values.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
              className="relative"
            >
              {/* Decorative number */}
              <span className="font-serif text-7xl font-400 text-charcoal/6 leading-none absolute -top-4 -left-2 select-none">
                {num}
              </span>
              <div className="relative pt-6">
                <div className="w-8 h-px bg-warm-beige mb-5" />
                <h3 className="font-serif text-xl font-500 text-charcoal mb-3">{title}</h3>
                <p className="font-sans text-sm text-charcoal/55 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
