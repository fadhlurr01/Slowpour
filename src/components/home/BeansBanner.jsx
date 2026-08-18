import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { imgUrl } from '../../utils/imageUrl';

export default function BeansBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-charcoal py-16 md:py-0 overflow-hidden" aria-label="Coffee beans promotion">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[420px] items-stretch">

          {/* Text side */}
          <div className="flex flex-col justify-center py-16 md:py-20 pr-0 md:pr-12">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label text-warm-beige/60 mb-5"
            >
              Specialty Beans
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif text-section text-soft-cream leading-tight mb-5"
            >
              Discover our<br />
              finest coffee<br />
              <span className="text-warm-beige italic">beans.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-sans text-soft-cream/50 text-sm leading-relaxed max-w-sm mb-8"
            >
              From carefully selected origins to your daily ritual. Single origin, traceable, roasted in small batches — only the best makes it to you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.38 }}
            >
              <Link
                to="/menu?cat=Coffee+Beans"
                id="beans-shop-btn"
                className="btn-outline"
              >
                Shop Beans
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          {/* Image side — bleeds slightly */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="relative md:translate-x-8 md:-mr-8"
          >
            {/* Bean shapes decoration */}
            <div className="absolute top-8 right-8 w-16 h-8 rounded-full bg-warm-beige/10 rotate-45 blur-sm" />
            <div className="absolute bottom-16 left-8 w-10 h-5 rounded-full bg-warm-beige/5 rotate-12" />

            <div className="h-full min-h-[320px] rounded-l-2xl overflow-hidden">
              <img
                src={imgUrl('/images/coffee-beans.jpg')}
                alt="Premium coffee beans from single origin farms"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
