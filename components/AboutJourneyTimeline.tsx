'use client';

import React, { useState } from 'react';

export default function AboutJourneyTimeline() {
  const [activeYear, setActiveYear] = useState('2026');

  const milestones = [
    {
      year: '2023',
      title: 'The Catalyst & Decoupled Web R&D',
      desc: 'Tired of slow agency retainers and bloated WordPress builds, SJO LABS began developing decoupled Next.js edge architectures.',
      badge: 'FOUNDING YEAR',
      highlights: ['Decoupled React R&D', 'Sub-140ms Server TTFB Target', 'First 10 Client Storefronts'],
    },
    {
      year: '2024',
      title: 'Autonomous AI Triage Engine',
      desc: 'Engineered sub-45s multi-agent lead triage webhooks and bi-directional CRM synchronization across HubSpot and Supabase.',
      badge: 'AI AUTOMATION',
      highlights: ['n8n Multi-Agent Pipelines', 'Sub-45s Response SLA', 'Zero Manual Data Entry'],
    },
    {
      year: '2025',
      title: 'Server-Side Meta & Google CAPI Relay',
      desc: 'Pioneered first-party server-to-server tracking relays to defeat iOS 14.5+ privacy drops and scale client ROAS.',
      badge: 'AD MACHINERY',
      highlights: ['Server-to-Server CAPI', 'First-Party Hashed Data', '4.2x Attributed ROAS Avg'],
    },
    {
      year: '2026',
      title: 'Enterprise Growth Infrastructure',
      desc: 'Unified Web Architecture, Mobile Apps, AI Workflows, and Paid Ad Scaling into a single high-velocity agency engine.',
      badge: 'ENTERPRISE SCALE',
      highlights: ['120+ Active Repositories', '99.8% System Uptime SLA', 'Global Edge Region Nodes'],
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="bg-[#090D16] text-[#F8FAFC] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 border border-[#1E293B] shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1E293B] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-[11px] font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
              Origin &amp; Milestone Journey
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
            The Evolution of SJO LABS
          </h2>
          <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
            From decoupled web R&amp;D to autonomous AI pipelines and server-side ad scaling machinery.
          </p>

          {/* Year Switcher Pills */}
          <div className="grid grid-cols-4 sm:flex sm:justify-center gap-2 mt-6 font-mono text-xs">
            {milestones.map((m) => (
              <button
                key={m.year}
                onClick={() => setActiveYear(m.year)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full transition-all font-bold text-center ${
                  activeYear === m.year
                    ? 'bg-[#00F0FF] text-[#090D16] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#101726] text-[#94A3B8] border border-[#1E293B] hover:text-white'
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Cards Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {milestones.map((m) => {
            const isActive = activeYear === m.year;
            return (
              <div
                key={m.year}
                onClick={() => setActiveYear(m.year)}
                className={`cursor-pointer bg-[#101726] p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                  isActive
                    ? 'border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-[#101726]'
                    : 'border-[#1E293B] hover:border-[#334155]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-extrabold font-mono text-[#00F0FF]">
                      {m.year}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-full">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1E293B] space-y-1.5 text-[11px] font-mono text-[#F8FAFC]">
                  {m.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5">
                      <span className="text-[#00F0FF] font-bold">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
