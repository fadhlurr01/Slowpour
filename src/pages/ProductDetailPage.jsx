import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { imgUrl } from '../utils/imageUrl';

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
}

const sugarLevels = ['0%', '25%', '50%', '75%', '100%'];
const iceOptions = ['No Ice', 'Less Ice', 'Normal Ice', 'Extra Ice'];
const addons = [
  { label: 'Extra Shot', price: 8000 },
  { label: 'Oat Milk', price: 12000 },
  { label: 'Vanilla Syrup', price: 7000 },
  { label: 'Whipped Cream', price: 8000 },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find(p => p.slug === slug);
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSugar, setSelectedSugar] = useState('75%');
  const [selectedIce, setSelectedIce] = useState('Normal Ice');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) setSelectedSize(product.sizes[0]);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-soft-cream flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-charcoal/40 mb-4">Product not found</p>
          <Link to="/menu" className="btn-ghost text-charcoal">Back to Menu</Link>
        </div>
      </div>
    );
  }

  const addonTotal = selectedAddons.reduce((sum, l) => sum + (addons.find(a => a.label === l)?.price || 0), 0);
  const totalPrice = (product.price + addonTotal) * qty;

  const handleAdd = () => {
    addItem(product, { size: selectedSize, sugar: selectedSugar, ice: selectedIce, addons: selectedAddons });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleAddon = (label) => {
    setSelectedAddons(prev => prev.includes(label) ? prev.filter(a => a !== label) : [...prev, label]);
  };

  const stagger = (i) => ({ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6 } } });

  return (
    <main className="bg-soft-cream min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="container-main py-4 flex items-center gap-2 text-xs font-sans text-charcoal/40">
        <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/menu" className="hover:text-charcoal transition-colors">Menu</Link>
        <ChevronRight size={12} />
        <span className="text-charcoal/70">{product.name}</span>
      </div>

      <div className="container-main pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT: Product image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-warm-beige/10">
              <img
                src={imgUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Flavor profile pills below image */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs font-sans text-charcoal/40 uppercase tracking-widest self-center mr-1">Flavor</span>
              {product.flavorProfile.map(f => (
                <span key={f} className="px-3 py-1 border border-charcoal/15 rounded-full font-sans text-xs text-charcoal/60">
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Info */}
          <div className="space-y-8">
            <motion.div variants={stagger(0)} initial="hidden" animate="visible">
              <p className="section-label text-sage mb-2">{product.category}</p>
              <h1 className="font-serif text-hero text-charcoal leading-tight mb-3">{product.name}</h1>
              {product.isNew && (
                <span className="inline-block px-3 py-1 bg-warm-beige text-deep-forest text-xs font-700 rounded-full tracking-wide mb-3">New</span>
              )}
              <p className="font-sans text-charcoal/60 leading-relaxed text-base">{product.description}</p>
            </motion.div>

            {/* Price */}
            <motion.div variants={stagger(1)} initial="hidden" animate="visible">
              <p className="font-serif text-4xl text-deep-forest">{formatPrice(product.price)}</p>
            </motion.div>

            {/* Size */}
            <motion.div variants={stagger(2)} initial="hidden" animate="visible">
              <p className="font-sans text-xs font-600 tracking-widest uppercase text-charcoal/50 mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-full border font-sans text-sm transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-deep-forest bg-deep-forest text-warm-beige'
                        : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Sugar Level */}
            {product.category !== 'Coffee Beans' && product.category !== 'Pastry' && (
              <motion.div variants={stagger(3)} initial="hidden" animate="visible">
                <p className="font-sans text-xs font-600 tracking-widest uppercase text-charcoal/50 mb-3">Sugar Level</p>
                <div className="flex flex-wrap gap-2">
                  {sugarLevels.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSugar(s)}
                      className={`px-4 py-2 rounded-full border font-sans text-sm transition-all duration-300 ${
                        selectedSugar === s
                          ? 'border-dark-green bg-dark-green text-soft-cream'
                          : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal/40'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Ice */}
            {product.category === 'Cold Coffee' || product.category === 'Signature Drinks' ? (
              <motion.div variants={stagger(4)} initial="hidden" animate="visible">
                <p className="font-sans text-xs font-600 tracking-widest uppercase text-charcoal/50 mb-3">Ice</p>
                <div className="flex flex-wrap gap-2">
                  {iceOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSelectedIce(opt)}
                      className={`px-4 py-2 rounded-full border font-sans text-sm transition-all duration-300 ${
                        selectedIce === opt
                          ? 'border-dark-green bg-dark-green text-soft-cream'
                          : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {/* Add-ons */}
            <motion.div variants={stagger(5)} initial="hidden" animate="visible">
              <p className="font-sans text-xs font-600 tracking-widest uppercase text-charcoal/50 mb-3">Add-ons</p>
              <div className="grid grid-cols-2 gap-2">
                {addons.map(a => (
                  <button
                    key={a.label}
                    onClick={() => toggleAddon(a.label)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all duration-300 ${
                      selectedAddons.includes(a.label)
                        ? 'border-dark-green bg-dark-green/5 text-dark-green'
                        : 'border-charcoal/15 text-charcoal/60 hover:border-charcoal/30'
                    }`}
                  >
                    <span className="font-sans text-sm">{a.label}</span>
                    <span className="font-sans text-xs text-charcoal/40">+{formatPrice(a.price)}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Qty + Add to Cart */}
            <motion.div variants={stagger(6)} initial="hidden" animate="visible" className="pt-2">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Qty */}
                <div className="flex items-center gap-3 px-4 py-3 border border-charcoal/20 rounded-full">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">
                    <Minus size={16} strokeWidth={1.5} className="text-charcoal/60" />
                  </button>
                  <span className="font-sans font-600 w-6 text-center text-charcoal">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} aria-label="Increase">
                    <Plus size={16} strokeWidth={1.5} className="text-charcoal/60" />
                  </button>
                </div>

                {/* Add button */}
                <button
                  onClick={handleAdd}
                  id="product-add-to-cart-btn"
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans font-600 text-sm tracking-wide transition-all duration-500 ${
                    added ? 'bg-sage text-white' : 'bg-deep-forest text-warm-beige hover:bg-dark-green'
                  }`}
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {added ? 'Added!' : `Add to Order — ${formatPrice(totalPrice)}`}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-charcoal/10">
            <h2 className="font-serif text-3xl text-charcoal mb-10">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rp => (
                <Link key={rp.id} to={`/menu/${rp.slug}`} className="group block">
                  <div className="rounded-xl overflow-hidden h-56 mb-4">
                    <img src={imgUrl(rp.image)} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="font-sans text-xs text-charcoal/40 tracking-widest uppercase mb-1">{rp.category}</p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-charcoal">{rp.name}</h3>
                    <span className="font-sans text-sm font-600 text-deep-forest">{formatPrice(rp.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
