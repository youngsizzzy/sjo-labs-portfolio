'use client';

import React from 'react';

export default function AboutValuesMatrix() {
  const values = [
    {
      num: '01',
      title: 'Mathematical Precision',
      desc: 'We measure success in sub-140ms TTFB server latency, Core Web Vitals scores, and verified lead response seconds.',
      icon: 'calculate',
    },
    {
      num: '02',
      title: 'Zero Vanity Metrics',
      desc: 'No fluff or superficial design retainers. Every ad campaign and site deployment is audited against bottom-funnel revenue.',
      icon: 'verified',
    },
    {
      num: '03',
      title: 'Zero-Touch Automation',
      desc: 'We believe manual data entry is a flaw. Autonomous AI webhooks triage, qualify, and sync lead records in 45 seconds.',
      icon: 'smart_toy',
    },
    {
      num: '04',
      title: 'Deterministic SLAs',
      desc: 'Contracts backed by hard performance guarantees — 99.8% uptime, sub-second edge rendering, and full CAPI attribution.',
      icon: 'gavel',
    },
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="text-[11px] sm:text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-semibold block mb-3">
          Engineering Culture
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D16] tracking-tight leading-snug">
          Foundational Engineering Principles
        </h2>
        <p className="text-[#64748B] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          The values guiding every architectural decision and client deployment at SJO LABS.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#090D16] text-[#00F0FF] font-mono text-sm font-bold flex items-center justify-center">
                  {v.num}
                </span>
                <span className="material-symbols-outlined text-[#2563EB] text-2xl group-hover:scale-110 transition-transform">
                  {v.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#090D16] mb-2">
                {v.title}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {v.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#00F0FF] bg-[#090D16] p-2 rounded-lg text-center font-bold">
              NON-NEGOTIABLE SLA
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
