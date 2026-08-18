import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ArrowUpRight } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { imgUrl } from '../utils/imageUrl';

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
}

// Editorial size classes cycling pattern
const sizeClasses = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
];

const heightClasses = [
  'h-[360px] md:h-[440px]',
  'h-[200px] md:h-[210px]',
  'h-[200px] md:h-[210px]',
  'h-[200px] md:h-[210px]',
  'h-[200px]',
  'h-[200px] md:h-[210px]',
  'h-[200px] md:h-[210px]',
  'h-[200px] md:h-[210px]',
  'h-[420px] md:h-[440px]',
];

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const activeCat = searchParams.get('cat') || 'All';

  const { addItem } = useCart();

  const filtered = useMemo(() =>
    activeCat === 'All' ? products : products.filter(p => p.category === activeCat),
    [activeCat]
  );

  const setCategory = (cat) => {
    if (cat === 'All') searchParams.delete('cat');
    else searchParams.set('cat', cat);
    setSearchParams(searchParams);
    setFilterOpen(false);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="bg-soft-cream min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-deep-forest grain-overlay py-20 md:py-28">
        <div className="container-main">
          <p className="section-label text-warm-beige/60 mb-4">Our Menu</p>
          <h1 className="font-serif text-display text-soft-cream leading-tight mb-4">
            Every Cup,<br />
            <span className="text-warm-beige italic">a Story.</span>
          </h1>
          <p className="font-sans text-soft-cream/50 text-base max-w-md leading-relaxed">
            Discover our full range of specialty coffees, signature drinks, and artisan pastries.
          </p>
        </div>
      </div>

      {/* Category Filter Bar (desktop horizontal) */}
      <div className="sticky top-[72px] md:top-[80px] z-30 bg-soft-cream/95 backdrop-blur-md border-b border-charcoal/8 shadow-sm">
        <div className="container-main py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full font-sans text-xs font-600 tracking-wider uppercase transition-all duration-300 ${
                activeCat === cat
                  ? 'bg-deep-forest text-warm-beige shadow-md'
                  : 'bg-charcoal/6 text-charcoal/60 hover:bg-charcoal/12 hover:text-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Mobile filter icon */}
          <button
            onClick={() => setFilterOpen(true)}
            className="ml-auto shrink-0 md:hidden flex items-center gap-2 px-4 py-2 border border-charcoal/20 rounded-full font-sans text-xs text-charcoal/60"
          >
            <SlidersHorizontal size={14} />
            Filter
          </button>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.45 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-soft-cream rounded-t-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-charcoal">Filter by Category</h3>
                <button onClick={() => setFilterOpen(false)}><X size={20} className="text-charcoal/50" /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full font-sans text-sm font-600 transition-all ${
                      activeCat === cat ? 'bg-deep-forest text-warm-beige' : 'bg-charcoal/8 text-charcoal/60'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products editorial grid */}
      <div className="container-main py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="font-sans text-sm text-charcoal/40">{filtered.length} products</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
          >
            {filtered.map((product, i) => {
              const sz = sizeClasses[i % sizeClasses.length];
              const ht = heightClasses[i % heightClasses.length];
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`${sz} group relative overflow-hidden rounded-xl cursor-pointer`}
                >
                  <Link to={`/menu/${product.slug}`} className={`block ${ht}`}>
                    <div className={`relative w-full h-full overflow-hidden rounded-xl`}>
                      <img
                        src={imgUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-deep-forest/0 group-hover:bg-deep-forest/65 transition-all duration-500" />

                      {/* Hover content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <p className="font-sans text-[10px] text-warm-beige/70 tracking-widest uppercase mb-1">{product.category}</p>
                        <h3 className="font-serif text-lg md:text-xl text-soft-cream mb-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-sm font-600 text-warm-beige">{formatPrice(product.price)}</span>
                          <div className="w-8 h-8 rounded-full border border-warm-beige/50 flex items-center justify-center">
                            <ArrowUpRight size={14} className="text-warm-beige" />
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {product.isNew && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-warm-beige text-deep-forest text-[10px] font-700 rounded-full tracking-wide">New</span>
                      )}
                      {product.tag && !product.isNew && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-dark-green/80 text-soft-cream text-[10px] font-600 rounded-full tracking-wide">{product.tag}</span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-3xl text-charcoal/30 mb-3">No items found</p>
            <button onClick={() => setCategory('All')} className="btn-ghost text-charcoal text-sm">Clear filter</button>
          </div>
        )}
      </div>
    </main>
  );
}
