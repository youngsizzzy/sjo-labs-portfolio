'use client';

import React from 'react';

export default function WhySjoLabs() {
  const points = [
    {
      icon: 'speed',
      title: 'Sub-Second Edge Performance',
      desc: 'We build with decoupled Next.js edge architecture, rendering static assets globally in <100ms to eliminate mobile bounce rates.',
    },
    {
      icon: 'insights',
      title: 'AEO & AI Search Readiness',
      desc: 'Every site is structured with JSON-LD schema microdata and AEO key takeaway structures to ensure citation readiness in Google & ChatGPT Search.',
    },
    {
      icon: 'smart_toy',
      title: 'Autonomous AI Business Machinery',
      desc: 'From 45-second AI lead triage to 24/7 Voice AI receptionists, we automate manual operational bottlenecks for service businesses.',
    },
    {
      icon: 'payments',
      title: 'Transparent Starting Prices',
      desc: 'We provide clear starting prices for all services ($500 Web Dev, $400 Web Design, $150 AI Chatbot) with zero hidden retainer fees.',
    },
    {
      icon: 'groups',
      title: 'Direct Engineering Access',
      desc: 'Work directly with senior systems architects and developers. No middle managers or delayed email game chains.',
    },
    {
      icon: 'verified_user',
      title: 'Zero Fake Promises',
      desc: 'We deliver clean code, proven conversion layouts, and robust software architecture without artificial ranking guarantees.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-6 md:px-12 bg-[#090D16] text-[#F8FAFC] border-t border-[#1E293B] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10 text-left">
        <div className="text-center sm:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E293B] border border-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-[11px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
              OUR WORKING METHODOLOGY
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Why Growing Businesses Choose <span className="text-[#00F0FF]">SJOLabs</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
            We operate as a digital service studio combining software engineering discipline, edge infrastructure, and practical AI automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#131927] border border-[#1E293B] hover:border-[#00F0FF]/40 transition-all space-y-3 group shadow-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">{pt.icon}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                {pt.title}
              </h3>
              <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
