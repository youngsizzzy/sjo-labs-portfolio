'use client';

import React from 'react';
import Link from 'next/link';
import { getAllServicesSorted, getServiceConfig } from '@/lib/servicesConfig';

export default function ZilkanSolutions() {
  const allServices = getAllServicesSorted();

  // Featured Service (#01)
  const featuredService = getServiceConfig('Web Design & Web Development');

  // Secondary Services (#02 through #08)
  const secondaryServices = allServices.filter((s) => s.displayOrder > 1);

  return (
    <section className="relative w-full bg-[#F8FAFC] text-[#0F172A] py-16 md:py-28 px-4 sm:px-6 md:px-12 border-t border-[#E2E8F0]" id="services-overview">
      <div className="max-w-7xl mx-auto relative z-10 space-y-12 text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E8F0] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090D16] text-[#00F0FF] border border-[#1E293B]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest">
                OUR CORE SERVICES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight uppercase">
              WHAT WE <span className="text-[#2563EB]">BUILD &amp; SCALE</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#64748B] max-w-2xl leading-relaxed">
              Websites, mobile products, AI systems, and growth solutions designed around real business needs.
            </p>
          </div>

          {/* Category Grouping Badges */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#2563EB] font-bold shadow-sm">
              ⚡ BUILD (01–03)
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#2563EB] font-bold shadow-sm">
              🤖 AUTOMATE (04–06)
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#2563EB] font-bold shadow-sm">
              📈 GROW (07–08)
            </span>
          </div>
        </div>

        {/* 1. FEATURED PRIMARY SERVICE CARD (#01: Web Design & Web Development) */}
        {featuredService && (
          <div className="bg-[#090D16] text-white border-2 border-[#00F0FF]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6 group hover:border-[#00F0FF] transition-all">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm font-bold bg-[#00F0FF] text-[#090D16] px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                  FEATURED 01
                </span>
                <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider bg-[#131927] px-3 py-1 rounded-full border border-[#1E293B]">
                  BUILD
                </span>
              </div>

              <div className="text-xs font-mono font-bold text-[#00F0FF] bg-[#131927] px-4 py-1.5 rounded-full border border-[#00F0FF]/30">
                Starting from {featuredService.startingPrice}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                  {featuredService.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {featuredService.shortDescription}
                </p>

                {/* Capabilities Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredService.capabilities.slice(0, 5).map((cap, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#131927] border border-[#1E293B] text-xs font-sans text-[#E2E8F0] flex items-center gap-1.5"
                    >
                      <span className="text-[#00F0FF]">✓</span>
                      <span>{cap}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#131927] p-6 rounded-2xl border border-[#1E293B] space-y-4 text-xs font-sans">
                <div className="font-mono text-[#00F0FF] uppercase text-[11px] font-bold">
                  SCOPE &amp; POSITIONING
                </div>
                <p className="text-[#94A3B8] leading-relaxed">
                  {featuredService.pricingNote}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#1E293B]">
                  <span className="font-mono text-[#64748B]">Typical: {featuredService.typicalRange}</span>
                  <Link
                    href={featuredService.servicePageUrl}
                    className="px-5 py-2.5 bg-[#00F0FF] hover:bg-white text-[#090D16] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-1.5"
                  >
                    <span>View Service</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SECONDARY SERVICES GRID (#02 through #08) - WHITE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryServices.map((svc) => (
            <div
              key={svc.slug}
              className="bg-white border border-[#E2E8F0] hover:border-[#2563EB] rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-xl"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#00F0FF] bg-[#090D16] px-2.5 py-1 rounded-full">
                      0{svc.displayOrder}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {svc.categoryGroup}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#090D16] text-[#00F0FF] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      {svc.icon}
                    </span>
                  </div>
                </div>

                {/* Service Title & Desc */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {svc.name}
                  </h3>
                  <p className="font-sans text-xs text-[#64748B] leading-relaxed line-clamp-3">
                    {svc.shortDescription}
                  </p>
                </div>

                {/* Capability Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {svc.capabilities.slice(0, 3).map((cap, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-[#334155] bg-[#F1F5F9] px-2 py-0.5 rounded font-medium border border-[#E2E8F0]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Pricing & Link */}
              <div className="pt-6 mt-6 border-t border-[#F1F5F9] flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-[11px] text-[#2563EB] font-bold">
                  {svc.startingPrice}
                </span>
                <Link
                  href={svc.servicePageUrl}
                  className="text-xs text-[#0F172A] font-bold hover:text-[#2563EB] transition-colors inline-flex items-center gap-1 group-hover:translate-x-1 duration-200"
                >
                  <span>View Service</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 3. SECTION FOOTER CTA */}
        <div className="text-center pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0F172A] hover:bg-[#2563EB] text-white font-mono font-bold text-sm uppercase tracking-wider transition-all shadow-xl"
          >
            <span>Explore All Services</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
