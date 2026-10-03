'use client';

import React from 'react';
import Image from 'next/image';

export default function ZilkanProjects() {
  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-24 px-6 md:px-12 border-t border-[#E2E8F0]" id="works">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F172A] tracking-tight uppercase">
            RECENT <span className="font-bold text-[#2563EB]">PROJECTS</span>
          </h2>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Featured Architecture Website Design */}
          <div className="lg:col-span-7 group cursor-pointer">
            <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden bg-white shadow-md border border-[#E2E8F0] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#00F0FF] group-hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]">
              <Image
                src="/images/project-laptop.jpg"
                alt="Architecture Website Design"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#0F172A]">
                Architecture Website Design
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#64748B]">
                High-performance web architecture &amp; management platform
              </p>
            </div>
          </div>

          {/* Right Column: 2 Stacked Cards */}
          <div className="lg:col-span-5 space-y-8">
            {/* Plant Management App Card */}
            <div className="group cursor-pointer">
              <div className="relative w-full h-[240px] sm:h-[280px] rounded-3xl overflow-hidden bg-white shadow-md border border-[#E2E8F0] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#00F0FF] group-hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]">
                <Image
                  src="/images/project-plant.jpg"
                  alt="Plant Management App"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-serif text-lg md:text-xl font-bold text-[#0F172A]">
                  Plant Management Mobile App
                </h3>
                <p className="font-sans text-xs text-[#64748B]">
                  Cross-platform mobile application build
                </p>
              </div>
            </div>

            {/* Joksybee Properties Luxury Real Estate Platform Card */}
            <div className="group cursor-pointer">
              <div className="relative w-full h-[240px] sm:h-[280px] rounded-3xl overflow-hidden bg-white shadow-md border border-[#E2E8F0] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#00F0FF] group-hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]">
                <Image
                  src="/images/joksybee-hero.png"
                  alt="Joksybee Properties Luxury Real Estate Platform"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-serif text-lg md:text-xl font-bold text-[#0F172A]">
                  Joksybee Properties
                </h3>
                <p className="font-sans text-xs text-[#64748B]">
                  Luxury Real Estate Web Architecture &amp; Lead Engine
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
