'use client';

import React from 'react';

export default function WorkImpactTelemetry() {
  const metrics = [
    {
      value: '+315%',
      label: 'Commercial Revenue Lift',
      sub: 'Joksybee Luxury Real Estate',
      icon: 'trending_up',
    },
    {
      value: '< 38s',
      label: 'Lead Triage Response',
      sub: 'Autonomous AI Webhook Ingest',
      icon: 'bolt',
    },
    {
      value: '99.8%',
      label: 'Core Web Vitals SLA',
      sub: 'Decoupled Next.js Edge Runtime',
      icon: 'speed',
    },
    {
      value: '4.2x',
      label: 'Attributed ROAS Scaling',
      sub: 'Server-Side Meta CAPI Relay',
      icon: 'verified',
    },
  ];

  return (
    <section className="py-12 bg-[#090D16] text-[#F8FAFC] border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-[#101726] p-5 sm:p-6 rounded-2xl border border-[#1E293B] hover:border-[#00F0FF]/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-[#00F0FF] text-lg sm:text-xl">
                  {m.icon}
                </span>
                <span className="text-[10px] font-mono text-[#00F0FF] uppercase bg-[#00F0FF]/10 px-2 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>
              <div className="text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-tight group-hover:text-[#00F0FF] transition-colors">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#F8FAFC] mt-1">
                {m.label}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
