import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { weeklyProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
}

export default function CoffeeOfTheWeek() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { addItem } = useCart();

  const products = weeklyProducts;
  const product = products[current];

  const go = (dir) => {
    setDirection(dir);
    setCurrent(i => (i + dir + products.length) % products.length);
  };

  return (
    <section className="bg-deep-forest grain-overlay py-24 lg:py-32 overflow-hidden" aria-label="Coffee of the Week">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p className="section-label text-warm-beige/60 mb-3">Weekly Special</p>
            <h2 className="font-serif text-section text-soft-cream leading-tight">
              Coffee of<br />the Week
            </h2>
          </div>
          {/* Counter */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-5xl text-warm-beige/30 leading-none font-400">
              0{current + 1}
            </span>
            <span className="font-sans text-sm text-soft-cream/30">/ 0{products.length}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Image */}
          <div className="relative h-[400px] md:h-[520px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={product.id}
                custom={direction}
                initial={{ x: direction * 100 + '%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -100 + '%', opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Tag */}
            {product.tag && (
              <div className="absolute top-5 left-5 px-3 py-1.5 bg-warm-beige text-deep-forest rounded-full font-sans text-xs font-700 tracking-wide">
                {product.tag}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <p className="section-label text-warm-beige/50 mb-4">{product.category}</p>

                <h3 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-soft-cream leading-tight mb-4">
                  {product.name}
                </h3>

                <p className="font-sans text-soft-cream/60 text-base leading-relaxed mb-6 max-w-sm">
                  {product.description}
                </p>

                {/* Flavor profile */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.flavorProfile.map(f => (
                    <span
                      key={f}
                      className="px-3 py-1 border border-warm-beige/20 rounded-full font-sans text-xs text-warm-beige/70 tracking-wide"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center gap-6 flex-wrap">
                  <span className="font-serif text-4xl text-warm-beige font-400">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => addItem(product)}
                    id={`cotw-add-btn-${product.id}`}
                    className="btn-primary"
                  >
                    <ShoppingBag size={16} strokeWidth={1.5} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex items-center gap-4 mt-12">
              <button
                onClick={() => go(-1)}
                id="cotw-prev-btn"
                className="w-12 h-12 rounded-full border border-soft-cream/20 flex items-center justify-center text-soft-cream/60 hover:text-warm-beige hover:border-warm-beige/40 transition-all duration-300"
                aria-label="Previous coffee"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => go(1)}
                id="cotw-next-btn"
                className="w-12 h-12 rounded-full border border-soft-cream/20 flex items-center justify-center text-soft-cream/60 hover:text-warm-beige hover:border-warm-beige/40 transition-all duration-300"
                aria-label="Next coffee"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 ml-2">
                {products.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-warm-beige' : 'w-1.5 h-1.5 bg-soft-cream/20 hover:bg-soft-cream/40'}`}
                    aria-label={`Go to product ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
