'use client';

import React from 'react';
import Link from 'next/link';

export default function BlogFeaturedSpotlight() {
  return (
    <div className="bg-[#090D16] border border-[#1E293B] rounded-3xl overflow-hidden shadow-2xl relative group">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00F0FF]/15 transition-all"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-12 relative z-10">
        {/* Left Column: Visual / Graphic */}
        <div className="lg:col-span-6 order-1 lg:order-1 relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#0F172A] aspect-[16/10]">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
            alt="Sub-Second TTFB Next.js Architecture"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#090D16]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#00F0FF]/30">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
            <span className="text-[11px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
              FLAGSHIP FIELD NOTE
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#94A3B8] bg-[#090D16]/80 backdrop-blur-md p-3 rounded-xl border border-[#1E293B]">
            <span>BENCHMARK: 42ms TTFB</span>
            <span>STACK: Next.js 14 + Vercel Edge</span>
          </div>
        </div>

        {/* Right Column: Article Details */}
        <div className="lg:col-span-6 order-2 lg:order-2 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] text-xs font-mono text-[#00F0FF]">
              WEB ARCHITECTURE
            </span>
            <span className="text-xs font-mono text-[#94A3B8]">OCT 24, 2026 • 6 MIN READ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:text-[#00F0FF] transition-colors">
            Achieving Sub-140ms TTFB Worldwide with Decoupled Next.js Stacks
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            How decoupling your frontend presentation from monolithic WordPress and Webflow backends eliminates edge latency, avoids cold starts, and accelerates global page execution under peak ad loads.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B] text-center">
              <div className="text-lg font-bold text-white font-mono">140ms</div>
              <div className="text-[10px] text-[#94A3B8] font-mono uppercase">Global TTFB</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B] text-center">
              <div className="text-lg font-bold text-[#00F0FF] font-mono">100/100</div>
              <div className="text-[10px] text-[#94A3B8] font-mono uppercase">Lighthouse</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B] text-center">
              <div className="text-lg font-bold text-white font-mono">+34%</div>
              <div className="text-[10px] text-[#94A3B8] font-mono uppercase">CVR Lift</div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/blog/sub-second-ttfb-nextjs-guide"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#00F0FF] text-[#090D16] font-bold text-sm hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20"
            >
              <span>Read Full Breakdown</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
