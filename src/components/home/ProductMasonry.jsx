import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { products } from '../../data/products';

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
}

// Editorial masonry layout config — 6 showcase products
const layoutConfig = [
  { colSpan: 'col-span-2 row-span-2', height: 'h-[420px]' },
  { colSpan: 'col-span-1 row-span-1', height: 'h-[200px]' },
  { colSpan: 'col-span-1 row-span-1', height: 'h-[200px]' },
  { colSpan: 'col-span-1 row-span-2', height: 'h-[420px]' },
  { colSpan: 'col-span-1 row-span-1', height: 'h-[200px]' },
  { colSpan: 'col-span-1 row-span-1', height: 'h-[200px]' },
];

export default function ProductMasonry() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const showcaseProducts = products.slice(0, 6);

  return (
    <section ref={ref} className="bg-soft-cream py-24 lg:py-32" aria-label="Product showcase">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label text-sage mb-3"
            >
              Latest Offerings
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-section text-charcoal"
            >
              Explore Our Menu
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/menu"
              id="masonry-view-all-btn"
              className="btn-ghost text-charcoal group"
            >
              View All
              <ArrowUpRight size={14} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-5">
          {showcaseProducts.map((product, i) => {
            const layout = layoutConfig[i];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                className={`${layout.colSpan} group product-card rounded-xl overflow-hidden relative cursor-pointer`}
              >
                <Link to={`/menu/${product.slug}`} className="block w-full h-full">
                  <div className={`w-full ${layout.height} relative overflow-hidden rounded-xl`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-img absolute inset-0 w-full h-full"
                    />

                    {/* Dark overlay */}
                    <div className="product-card-overlay absolute inset-0" />

                    {/* Hover info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="font-sans text-[10px] text-warm-beige/70 tracking-widest uppercase mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-serif text-xl text-soft-cream mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm font-600 text-warm-beige">
                          {formatPrice(product.price)}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-warm-beige/50 flex items-center justify-center">
                          <ArrowUpRight size={14} strokeWidth={1.5} className="text-warm-beige" />
                        </div>
                      </div>
                    </div>

                    {/* New badge */}
                    {product.isNew && (
                      <div className="absolute top-4 left-4 px-2.5 py-1 bg-warm-beige text-deep-forest rounded-full font-sans text-[10px] font-700 tracking-wide">
                        New
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
