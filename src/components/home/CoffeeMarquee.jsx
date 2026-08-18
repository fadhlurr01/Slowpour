import React from 'react';

const items = [
  'ESPRESSO', 'COLD BREW', 'CAPPUCCINO', 'MOCHA', 'LATTE',
  'POUR OVER', 'FLAT WHITE', 'CORTADO', 'AMERICANO', 'MATCHA',
];

export default function CoffeeMarquee() {
  const text = items.join('   •   ');

  return (
    <div className="bg-dark-green py-4 overflow-hidden">
      <div className="flex whitespace-nowrap" aria-hidden="true">
        <span
          className="inline-block font-sans text-xs font-600 tracking-[0.3em] text-warm-beige/70 animate-marquee"
          style={{ paddingRight: '4rem' }}
        >
          {text}   •   {text}
        </span>
        <span
          className="inline-block font-sans text-xs font-600 tracking-[0.3em] text-warm-beige/70 animate-marquee"
          style={{ paddingRight: '4rem' }}
          aria-hidden="true"
        >
          {text}   •   {text}
        </span>
      </div>
    </div>
  );
}
