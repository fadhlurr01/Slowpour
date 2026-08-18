import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import { stories } from '../data/stories';

const allCategories = ['All', ...new Set(stories.map(s => s.category))];

export default function StoriesPage() {
  const [activeCat, setActiveCat] = useState('All');

  const featured = stories.find(s => s.featured);
  const rest = stories.filter(s => !s.featured);
  const filtered = activeCat === 'All' ? rest : rest.filter(s => s.category === activeCat);

  return (
    <main className="bg-soft-cream min-h-screen pt-20">
      {/* Header */}
      <div className="bg-dark-green grain-overlay py-20 md:py-28">
        <div className="container-main">
          <p className="section-label text-warm-beige/60 mb-4">Journal</p>
          <h1 className="font-serif text-display text-soft-cream leading-tight max-w-2xl">
            Stories &<br />
            <span className="text-warm-beige italic">Perspectives.</span>
          </h1>
        </div>
      </div>

      <div className="container-main py-14">
        {/* Featured article */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Link to={`/stories/${featured.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="rounded-2xl overflow-hidden h-72 md:h-96">
                <img src={featured.image} alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="section-label text-sage">{featured.category}</span>
                  <span className="w-1 h-1 rounded-full bg-charcoal/20" />
                  <span className="font-sans text-xs text-charcoal/40">{featured.date}</span>
                </div>
                <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] text-charcoal leading-tight mb-4 group-hover:text-dark-green transition-colors">
                  {featured.title}
                </h2>
                <p className="font-sans text-charcoal/55 leading-relaxed text-sm mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-charcoal/40">
                    <Clock size={13} />
                    <span className="font-sans text-xs">{featured.readTime}</span>
                  </div>
                  <span className="font-sans text-xs text-charcoal/40">By {featured.author}</span>
                  <ArrowUpRight size={16} className="text-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-auto" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-charcoal/10" />
          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full font-sans text-xs font-600 tracking-wide uppercase transition-all ${
                  activeCat === cat ? 'bg-deep-forest text-warm-beige' : 'bg-charcoal/8 text-charcoal/50 hover:bg-charcoal/14'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex-1 h-px bg-charcoal/10" />
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              <Link to={`/stories/${story.slug}`} className="group block">
                <div className="rounded-xl overflow-hidden h-52 mb-4">
                  <img src={story.image} alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="section-label text-xs text-sage">{story.category}</span>
                  <span className="w-1 h-1 rounded-full bg-charcoal/20" />
                  <span className="font-sans text-xs text-charcoal/40">{story.readTime}</span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-dark-green transition-colors leading-snug">
                  {story.title}
                </h3>
                <p className="font-sans text-sm text-charcoal/55 leading-relaxed line-clamp-2">{story.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-charcoal/40">
                  <span className="font-sans text-xs">{story.date}</span>
                  <span>·</span>
                  <span className="font-sans text-xs">{story.author}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
