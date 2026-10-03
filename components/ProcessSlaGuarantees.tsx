'use client';

import React from 'react';

export default function ProcessSlaGuarantees() {
  const guarantees = [
    {
      title: 'Sub-140ms Server TTFB SLA',
      value: '< 140ms',
      desc: 'Our decoupled Next.js edge builds render globally in under 140ms, guaranteeing 98+ mobile Core Web Vitals scores.',
      icon: 'speed',
    },
    {
      title: 'Sub-45s AI Triage Guarantee',
      value: '< 45 sec',
      desc: 'Autonomous multi-agent webhook intake engages, filters, and books warm buyer leads within 45 seconds of form submission.',
      icon: 'bolt',
    },
    {
      title: '100% CAPI Data Relay Fidelity',
      value: '0% Loss',
      desc: 'Server-to-server Meta CAPI & Google Enhanced Conversions pipeline bypasses Safari/iOS tracking pixel drops.',
      icon: 'verified_user',
    },
    {
      title: '30-Day Production Support SLA',
      value: '30 Days',
      desc: 'Full post-launch monitoring, performance tuning, and bug fix guarantees included in every engineering sprint.',
      icon: 'published_with_changes',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="bg-[#090D16] text-[#F8FAFC] rounded-3xl p-6 sm:p-10 md:p-14 border border-[#1E293B] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <span className="text-[11px] sm:text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-semibold block mb-3">
            Contractual SLAs &amp; Quality Guarantees
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
            Engineering Guarantees You Can Bank On
          </h2>
          <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
            We don't sell open-ended agency hours. Every SJO LABS sprint is backed by hard technical SLAs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {guarantees.map((g, idx) => (
            <div
              key={idx}
              className="bg-[#101726] p-6 rounded-2xl border border-[#1E293B] hover:border-[#00F0FF]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-[#00F0FF] text-2xl">
                    {g.icon}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-full">
                    SLA GUARANTEE
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                  {g.value}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">
                  {g.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
