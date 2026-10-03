'use client';

import React from 'react';
import Link from 'next/link';

export default function WorkTelemetryMonitor() {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8">
      <div className="bg-[#090D16] text-[#F8FAFC] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#1E293B] shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1E293B]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-[11px] font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                LIVE PRODUCTION MONITOR
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Edge Infrastructure &amp; Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              All SJO LABS deployments run on isolated edge nodes connected to bi-directional webhook relays, guaranteeing 99.8% uptime and instant lead intake.
            </p>
          </div>

          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-[#101726] p-4 rounded-xl border border-[#1E293B]">
              <div className="text-[10px] text-[#94A3B8] uppercase">Global Edge Ping</div>
              <div className="text-lg font-bold text-[#00F0FF] mt-1">42 ms</div>
              <div className="text-[10px] text-[#64748B]">AWS &amp; Vercel Nodes</div>
            </div>

            <div className="bg-[#101726] p-4 rounded-xl border border-[#1E293B]">
              <div className="text-[10px] text-[#94A3B8] uppercase">Core Web Vitals</div>
              <div className="text-lg font-bold text-white mt-1">99 / 100</div>
              <div className="text-[10px] text-[#64748B]">Mobile Audited</div>
            </div>

            <div className="bg-[#101726] p-4 rounded-xl border border-[#1E293B] col-span-2 sm:col-span-1">
              <div className="text-[10px] text-[#94A3B8] uppercase">System SLA</div>
              <div className="text-lg font-bold text-[#00F0FF] mt-1">99.8%</div>
              <div className="text-[10px] text-[#64748B]">Nominal Status</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]"></span>
            <span>All production nodes operational. Request technical case study PDFs for detailed architecture schematics.</span>
          </div>
          <Link
            href="/#contact"
            className="bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] font-bold px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] shrink-0"
          >
            Request Architecture PDF →
          </Link>
        </div>
      </div>
    </section>
  );
}
