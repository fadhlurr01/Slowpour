import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { stories } from '../data/stories';
import { imgUrl } from '../utils/imageUrl';

export default function StoryDetailPage() {
  const { slug } = useParams();
  const story = stories.find(s => s.slug === slug);
  const related = stories.filter(s => s.slug !== slug).slice(0, 3);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!story) {
    return (
      <div className="min-h-screen bg-soft-cream flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-serif text-2xl text-charcoal/40 mb-4">Story not found</p>
          <Link to="/stories" className="btn-ghost text-charcoal">Back to Stories</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-soft-cream min-h-screen pt-20">
      {/* Hero image */}
      <div className="h-[50vh] md:h-[65vh] relative overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          src={imgUrl(story.image)}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-main pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label text-warm-beige/80">{story.category}</span>
              <span className="w-1 h-1 rounded-full bg-soft-cream/40" />
              <span className="font-sans text-xs text-soft-cream/60">{story.date}</span>
              <span className="w-1 h-1 rounded-full bg-soft-cream/40" />
              <Clock size={12} className="text-soft-cream/50" />
              <span className="font-sans text-xs text-soft-cream/60">{story.readTime}</span>
            </div>
            <h1 className="font-serif text-hero text-soft-cream leading-tight max-w-3xl">{story.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* Article content */}
      <div className="container-main py-14">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-sans text-charcoal/40 mb-10">
            <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/stories" className="hover:text-charcoal transition-colors">Stories</Link>
            <ChevronRight size={12} />
            <span className="text-charcoal/70 truncate max-w-[200px]">{story.title}</span>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mb-10 pb-10 border-b border-charcoal/10">
            <div className="w-10 h-10 rounded-full bg-dark-green text-soft-cream flex items-center justify-center font-sans font-700 text-sm">
              {story.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-sans text-sm font-600 text-charcoal">{story.author}</p>
              <p className="font-sans text-xs text-charcoal/40">{story.date}</p>
            </div>
          </div>

          {/* Body (dummy long-form content) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose-like space-y-6"
          >
            <p className="font-sans text-lg text-charcoal/80 leading-relaxed font-400 italic">
              {story.excerpt}
            </p>
            <p className="font-sans text-base text-charcoal/65 leading-relaxed">
              Coffee has always been more than a beverage. For centuries, it has been the catalyst for conversation, the companion for solitude, and the ritual that anchors our mornings. At Slowpour, we believe every cup is an opportunity to slow down and be present.
            </p>
            <h2 className="font-serif text-2xl text-charcoal">The Art of Patience</h2>
            <p className="font-sans text-base text-charcoal/65 leading-relaxed">
              Our cold brew steeps for exactly 18 hours. Not 17, not 19. That precision comes from months of experimentation — understanding how temperature, grind size, and water chemistry interact over time. The result is a coffee that is impossibly smooth, naturally sweet, and deeply complex.
            </p>
            <p className="font-sans text-base text-charcoal/65 leading-relaxed">
              This patience extends to every part of what we do. We visit our farmers. We cup samples for weeks before committing to a new origin. We train our baristas for months before they touch an espresso machine in service. Slow, deliberate, purposeful.
            </p>
            <h2 className="font-serif text-2xl text-charcoal">What Makes Coffee Special</h2>
            <p className="font-sans text-base text-charcoal/65 leading-relaxed">
              No two coffees are the same. A coffee from the Gayo Highlands of Aceh tastes nothing like one from Flores or Toraja. Altitude, rainfall, processing method, variety — every variable shapes the cup. Learning to taste these differences is one of the great pleasures of specialty coffee.
            </p>
            <p className="font-sans text-base text-charcoal/65 leading-relaxed">
              We hope that every visit to Slowpour deepens your appreciation for what a remarkable thing a great cup of coffee truly is.
            </p>
          </motion.div>

          {/* Back link */}
          <div className="mt-14 pt-10 border-t border-charcoal/10">
            <Link to="/stories" className="flex items-center gap-2 font-sans text-sm text-charcoal/50 hover:text-charcoal transition-colors">
              <ArrowLeft size={16} strokeWidth={1.5} />
              Back to Stories
            </Link>
          </div>
        </div>

        {/* Related stories */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-charcoal/10">
            <h2 className="font-serif text-3xl text-charcoal mb-10">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(s => (
                <Link key={s.id} to={`/stories/${s.slug}`} className="group block">
                  <div className="rounded-xl overflow-hidden h-48 mb-4">
                    <img src={imgUrl(s.image)} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="section-label text-xs text-sage block mb-2">{s.category}</span>
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-dark-green transition-colors">{s.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
