'use client';

import React from 'react';

export default function ZilkanTrustMarquee() {
  const brands = [
    'ARCHITECTURA',
    'LUMEN AI',
    'VERTEX STUDIO',
    'AURA LIVING',
    'NEXUS LABS',
    'OMNI FORGE',
    'KINETIC DESIGN',
    'SOLARIS MEDIA',
  ];

  return (
    <section className="w-full bg-[#090D16] text-[#F8FAFC] py-10 border-t border-[#1E293B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="font-sans text-[11px] uppercase tracking-widest text-[#94A3B8] font-semibold">
          TRUSTED BY AMBITIOUS BRANDS &amp; LEADING ENTERPRISES GLOBALLY
        </p>
      </div>

      {/* Marquee Banner */}
      <div className="flex overflow-hidden select-none space-x-12 opacity-85 hover:opacity-100 transition-opacity">
        <div className="flex shrink-0 items-center justify-around space-x-12 min-w-full animate-marquee">
          {brands.map((brand, i) => (
            <span
              key={i}
              className="font-serif text-lg md:text-xl font-bold tracking-wider text-[#94A3B8] hover:text-[#00F0FF] transition-colors cursor-pointer"
            >
              {brand}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-around space-x-12 min-w-full animate-marquee" aria-hidden="true">
          {brands.map((brand, i) => (
            <span
              key={`dup-${i}`}
              className="font-serif text-lg md:text-xl font-bold tracking-wider text-[#94A3B8] hover:text-[#00F0FF] transition-colors cursor-pointer"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
