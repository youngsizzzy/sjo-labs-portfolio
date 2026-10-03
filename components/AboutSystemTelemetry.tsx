'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutSystemTelemetry() {
  const nodes = [
    { name: 'US-EAST (IAD)', ping: '18ms', status: 'ACTIVE' },
    { name: 'US-WEST (SFO)', ping: '24ms', status: 'ACTIVE' },
    { name: 'EU-CENTRAL (FRA)', ping: '42ms', status: 'ACTIVE' },
    { name: 'ASIA-EAST (TYO)', ping: '58ms', status: 'ACTIVE' },
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="bg-[#090D16] text-[#F8FAFC] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-[#1E293B] shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1E293B]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-[11px] font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                Global Infrastructure Telemetry
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Isolated Edge Nodes &amp; Continuous Deployment
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              SJO LABS maintains isolated edge server runtimes connected to automated GitHub CI/CD build pipelines for instant global updates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto font-mono text-xs">
            {nodes.map((node, idx) => (
              <div key={idx} className="bg-[#101726] p-4 rounded-xl border border-[#1E293B]">
                <div className="text-[10px] text-[#94A3B8] uppercase">{node.name}</div>
                <div className="text-lg font-bold text-[#00F0FF] mt-1">{node.ping}</div>
                <div className="text-[10px] text-[#00F0FF] flex items-center gap-1 mt-0.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
                  {node.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8] relative z-10">
          <div>
            <span>120+ active production repositories running on automated Vercel &amp; AWS edge instances.</span>
          </div>
          <Link
            href="/#contact"
            className="w-full sm:w-auto text-center bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] shrink-0"
          >
            Connect With Engineering Team →
          </Link>
        </div>
      </div>
    </section>
  );
}
