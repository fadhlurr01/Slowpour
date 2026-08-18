import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CoffeeMarquee from '../components/home/CoffeeMarquee';
import FeaturedExperience from '../components/home/FeaturedExperience';
import CoffeeOfTheWeek from '../components/home/CoffeeOfTheWeek';
import ProductMasonry from '../components/home/ProductMasonry';
import BrandPhilosophy from '../components/home/BrandPhilosophy';
import BeansBanner from '../components/home/BeansBanner';
import TestimonialSlider from '../components/home/TestimonialSlider';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CoffeeMarquee />
      <FeaturedExperience />
      <CoffeeOfTheWeek />
      <ProductMasonry />
      <BrandPhilosophy />
      <BeansBanner />
      <TestimonialSlider />
    </main>
  );
}
