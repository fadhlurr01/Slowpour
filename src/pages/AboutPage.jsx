import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const timeline = [
  { year: '2018', title: 'The Beginning', desc: 'Started as a small cart at a Jakarta market with one espresso machine and a dream.' },
  { year: '2020', title: 'First Café', desc: 'Opened our first brick-and-mortar in Kemang, Jakarta — a 40-seat space that felt like home.' },
  { year: '2022', title: 'Direct Trade', desc: 'Established direct relationships with farmers in Aceh, Flores, and West Java.' },
  { year: '2024', title: 'Slowpour Beans', desc: 'Launched our own roastery and retail bean line — single origin, traceable, beautiful.' },
  { year: '2026', title: 'Growing Slowly', desc: 'A second location and a growing community of people who believe in slow mornings.' },
];

const values = [
  { label: 'Transparency', desc: 'Every bean is traceable. We publish sourcing data for every coffee we carry.' },
  { label: 'Craft', desc: 'Our baristas train for months. A perfect cup is never an accident.' },
  { label: 'Community', desc: 'We host workshops, support local artists, and give back to farming communities.' },
];

export default function AboutPage() {
  const storyRef = useRef(null);
  const timelineRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' });

  return (
    <main className="bg-soft-cream min-h-screen pt-20">

      {/* Hero */}
      <section className="relative min-h-[80vh] bg-dark-green grain-overlay flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/images/cappuccino.jpg" alt="Coffee shop atmosphere" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-dark-green/60 to-transparent" />
        </div>

        <div className="container-main relative z-10 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label text-warm-beige/60 mb-5"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-display text-soft-cream leading-tight max-w-3xl"
          >
            Coffee made slowly.<br />
            <span className="text-warm-beige italic">Moments made</span><br />
            meaningfully.
          </motion.h1>
        </div>
      </section>

      {/* Brand Statement */}
      <section ref={storyRef} className="py-24 lg:py-36">
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }} animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }} className="section-label text-sage mb-5"
            >
              Founded 2018
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }} animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif text-section text-charcoal mb-6 leading-tight"
            >
              We believe the best coffee comes from the best relationships.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }} animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-sans text-charcoal/60 leading-relaxed text-base mb-4"
            >
              Slowpour began as a conversation between two friends who loved coffee and hated being rushed. We wanted a place that honored both the craft and the ritual — the 18-hour cold brew, the perfectly pulled shot, the barista who remembers your name.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }} animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-sans text-charcoal/60 leading-relaxed text-base mb-8"
            >
              Today, we source directly from farmers in Indonesia, Ethiopia, and Colombia — people who share our belief that better relationships make better coffee.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }} animate={storyInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link to="/menu" id="about-menu-link" className="btn-primary bg-deep-forest text-warm-beige hover:bg-warm-beige hover:text-deep-forest">
                Explore the Menu <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 h-64 md:h-80 rounded-2xl overflow-hidden">
              <img src="/images/cold-brew.jpg" alt="Our coffee preparation" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 rounded-xl overflow-hidden">
              <img src="/images/cappuccino.jpg" alt="Barista crafting" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 rounded-xl overflow-hidden">
              <img src="/images/caramel-ribbon.jpg" alt="Specialty drinks" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-deep-forest grain-overlay py-20">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="section-label text-warm-beige/60 mb-4">What We Stand For</p>
            <h2 className="font-serif text-section text-soft-cream">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="border border-warm-beige/10 rounded-xl p-8"
              >
                <div className="w-8 h-px bg-warm-beige mb-6" />
                <h3 className="font-serif text-xl text-soft-cream mb-3">{label}</h3>
                <p className="font-sans text-sm text-soft-cream/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 lg:py-32 overflow-hidden">
        <div className="container-main">
          <div className="mb-14">
            <p className="section-label text-sage mb-4">Our Journey</p>
            <h2 className="font-serif text-section text-charcoal">Growing Slowly,<br /><em>On Purpose.</em></h2>
          </div>

          {/* Desktop: horizontal. Mobile: vertical */}
          <div className="relative">
            {/* Horizontal line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-charcoal/10" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
              {timeline.map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="hidden md:block w-3 h-3 rounded-full bg-warm-beige border-2 border-soft-cream mb-6 shadow-md" />
                  <div className="md:hidden w-px h-8 bg-charcoal/10 ml-1.5 mb-2" />

                  <span className="font-serif text-sm text-warm-beige font-500 block mb-2">{year}</span>
                  <h3 className="font-sans font-600 text-charcoal text-sm mb-2">{title}</h3>
                  <p className="font-sans text-xs text-charcoal/50 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
