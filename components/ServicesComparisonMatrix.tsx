'use client';

import React from 'react';

export default function ServicesComparisonMatrix() {
  const rows = [
    {
      vector: 'Architecture & Scope',
      agency: 'WordPress / Webflow templates loaded with heavy plugins.',
      sjolabs: 'Decoupled Next.js edge architecture with bespoke custom design system.',
    },
    {
      vector: 'Performance & Speed',
      agency: 'Slow TTFB (>1.5s), bloated DOM, low mobile Lighthouse scores.',
      sjolabs: 'Sub-second TTFB, 98+ Core Web Vitals SLA guaranteed on mobile.',
    },
    {
      vector: 'Lead Qualification Speed',
      agency: 'Manual inbox checking (4 to 24 hours delay); high lead decay.',
      sjolabs: 'Autonomous AI webhook triage qualifying leads in under 45 seconds.',
    },
    {
      vector: 'Ad Attribution & CAPI',
      agency: 'Client-side pixel only; loses 30%+ data to Safari/iOS blocks.',
      sjolabs: 'Server-Side Meta CAPI & Google Enhanced Conversions pipeline.',
    },
    {
      vector: 'System Reliability & SLA',
      agency: 'No uptime guarantees; fragile codebase vulnerable to updates.',
      sjolabs: '99.9% Uptime SLA, deterministic Git deployment pipeline.',
    },
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E2E8F0] border border-[#CBD5E1] mb-4">
          <span className="text-[11px] sm:text-xs font-mono font-semibold text-[#090D16] uppercase tracking-widest">
            Evaluation Matrix
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D16] tracking-tight leading-snug">
          SJO LABS vs. Generic Agency Retainers
        </h2>
        <p className="text-[#64748B] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          Compare our engineered delivery standards against standard marketplace offerings.
        </p>
      </div>

      {/* Mobile Stacked Cards View (Visible on sm & below) */}
      <div className="block md:hidden space-y-4">
        {rows.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-3 shadow-sm">
            <div className="text-xs font-mono font-bold text-[#090D16] uppercase tracking-wider border-b border-[#E2E8F0] pb-2">
              {r.vector}
            </div>

            <div className="space-y-2">
              <div className="bg-[#FEF2F2] p-3 rounded-xl border border-[#FCA5A5]/40 text-xs text-[#991B1B]">
                <div className="font-bold font-mono text-[10px] text-[#7F1D1D] uppercase mb-1 flex items-center gap-1">
                  <span>✕</span> Generic Agency / Freelancer
                </div>
                <div>{r.agency}</div>
              </div>

              <div className="bg-[#00F0FF]/10 p-3 rounded-xl border border-[#00F0FF]/30 text-xs text-[#090D16] font-medium">
                <div className="font-bold font-mono text-[10px] text-[#090D16] uppercase mb-1 flex items-center gap-1">
                  <span className="bg-[#00F0FF] rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px]">✓</span> SJO LABS Machinery
                </div>
                <div>{r.sjolabs}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (Visible on md & above) */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-3xl border border-[#E2E8F0] shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#090D16] text-white font-mono text-xs uppercase tracking-wider">
              <th className="p-6">Evaluation Vector</th>
              <th className="p-6 text-[#94A3B8]">Generic Agency / Freelancer</th>
              <th className="p-6 text-[#00F0FF] font-bold">SJO LABS Growth Machinery</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-sm">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="p-6 font-bold text-[#090D16] font-mono text-xs">
                  {r.vector}
                </td>
                <td className="p-6 text-[#64748B]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>{r.agency}</span>
                  </div>
                </td>
                <td className="p-6 text-[#090D16] font-medium bg-[#00F0FF]/5">
                  <div className="flex items-start gap-2">
                    <span className="text-[#090D16] bg-[#00F0FF] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold mt-0.5">✓</span>
                    <span>{r.sjolabs}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
