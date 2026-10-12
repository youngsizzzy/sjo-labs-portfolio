'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ZilkanHero() {
  return (
    <section className="relative w-full bg-[#090D16] text-[#F8FAFC] pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#1E293B] overflow-hidden">
      {/* Background Radial Glow & Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-[400px] h-[300px] bg-[#2563EB]/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: High-Converting Copy */}
          <div className="lg:col-span-7 space-y-7">

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-serif text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.65rem] text-white font-bold tracking-[-0.02em] leading-[1.15] max-w-[95%] lg:max-w-[90%]">
                <span className="block text-white">We don't just build apps.</span>
                <span className="block bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#2563EB] bg-clip-text text-transparent">
                  We build the growth machine behind them.
                </span>
              </h1>

              <p className="font-sans text-xs sm:text-sm md:text-base text-[#94A3B8] leading-relaxed max-w-[65ch]">
                SJOlabs is a high-velocity digital agency — <strong className="text-white font-semibold">Web Architecture</strong>, native <strong className="text-white font-semibold">Mobile Apps</strong>, <strong className="text-white font-semibold">AI Automation</strong>, and <strong className="text-white font-semibold">Meta &amp; Google Ads</strong> working as one system to turn traffic into revenue.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="#contact"
                className="bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] font-sans text-xs md:text-sm font-bold px-8 py-3.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] group w-full sm:w-auto"
              >
                <span>Book a 15-Min Discovery Call</span>
                <span className="font-sans font-bold text-base transition-transform group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="#works"
                className="bg-[#131927] hover:bg-[#1E293B] text-[#F8FAFC] border border-[#1E293B] hover:border-[#00F0FF]/50 font-sans text-xs md:text-sm font-semibold px-8 py-3.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2.5 w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-[#00F0FF] text-base">
                  query_stats
                </span>
                <span>See Real Case Studies</span>
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-6 border-t border-[#1E293B]/70 flex flex-wrap items-center gap-6 text-xs text-[#94A3B8] font-sans">
              <div className="flex items-center space-x-2">
                <span className="text-[#00F0FF] text-sm">★</span>
                <span><strong className="text-white font-semibold">4.9 / 5.0</strong> Client Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-[#00F0FF] text-sm">bolt</span>
                <span><strong className="text-white font-semibold">99.4%</strong> On-Time Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-[#00F0FF] text-sm">trending_up</span>
                <span><strong className="text-white font-semibold">3.2x</strong> Avg ROAS Lift</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered 3D Device Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none group">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF]/30 via-[#2563EB]/20 to-[#00F0FF]/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>

              {/* Showcase Frame */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#090D16] border border-[#1E293B] shadow-[0_10px_40px_rgba(0,0,0,0.8)] group-hover:border-[#00F0FF]/50 transition-all duration-500">
                <Image
                  src="/images/hero-showcase-new.png"
                  alt="SJO LABS Web, Mobile Apps & AI Automation Ecosystem"
                  width={1000}
                  height={880}
                  className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Verified Tech Stack Strip */}
        <div className="mt-16 pt-8 border-t border-[#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-2 text-[#00F0FF]">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="uppercase tracking-widest text-[11px] font-semibold text-[#94A3B8]">Production Stack Verified:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#94A3B8] font-medium text-[11px]">
            <span className="hover:text-white transition-colors">NEXT.JS 15</span>
            <span className="text-[#1E293B]">•</span>
            <span className="hover:text-white transition-colors">REACT NATIVE</span>
            <span className="text-[#1E293B]">•</span>
            <span className="hover:text-white transition-colors">AI PIPELINES</span>
            <span className="text-[#1E293B]">•</span>
            <span className="hover:text-white transition-colors">N8N / MAKE</span>
            <span className="text-[#1E293B]">•</span>
            <span className="hover:text-white transition-colors">META GRAPH API</span>
            <span className="text-[#1E293B]">•</span>
            <span className="hover:text-white transition-colors">GOOGLE ADS ENGINE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
