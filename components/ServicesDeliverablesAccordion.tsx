'use client';

import React, { useState } from 'react';

export default function ServicesDeliverablesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    {
      title: 'Web Architecture & Next.js Headless Development',
      tagline: 'High-velocity digital storefronts built for sub-second load times',
      timeline: '2 – 3 Weeks Sprint',
      deliverables: [
        'Custom Figma UI/UX Design System with responsive tokens',
        'Decoupled Next.js 14/15 edge-rendered codebase',
        'Tailwind CSS styling with micro-animations & dark mode support',
        'Supabase or Sanity CMS backend integration',
        '98+ Core Web Vitals mobile SLA & sub-140ms server response guarantee',
      ],
    },
    {
      title: 'Mobile Application Engineering (iOS & Android)',
      tagline: 'Native cross-platform mobile apps with cloud synchronization',
      timeline: '3 – 5 Weeks Sprint',
      deliverables: [
        'React Native / Expo or Flutter cross-platform architecture',
        'App Store & Google Play Store submission & approval pipeline',
        'Push notifications, user authentication & offline storage',
        'Smooth 60fps UI animations and gesture controls',
        'Real-time backend data sync via Supabase WebSockets',
      ],
    },
    {
      title: 'Autonomous AI Lead Triage & CRM Workflows',
      tagline: '24/7 automated lead qualification & scheduling machinery',
      timeline: '1 – 2 Weeks Sprint',
      deliverables: [
        'Custom multi-agent LLM (OpenAI/Anthropic) prompt pipeline',
        'Sub-45 second lead response via SMS, Email & Webhooks',
        'Bi-directional CRM synchronization (HubSpot, Salesforce, Supabase)',
        'Cal.com / Calendly automated booking integration',
        'Zero manual data entry guarantee for incoming buyer inquiries',
      ],
    },
    {
      title: 'Meta & Google Ads CAPI Scaling Machinery',
      tagline: 'Audited paid acquisition funnels with server-side attribution',
      timeline: '1 – 2 Weeks Sprint',
      deliverables: [
        'Server-Side Meta Conversions API (CAPI) & Google Enhanced Conversions setup',
        'First-party data hashing relay bypassing iOS/Safari tracking blocks',
        'Bottom-funnel value-based bidding model configuration',
        'Creative matrix testing framework and high-converting landing pages',
        'Weekly executive attribution dashboard reporting with zero vanity metrics',
      ],
    },
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="text-[11px] sm:text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-semibold block mb-3">
          Scope &amp; Deliverables
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D16] tracking-tight leading-snug">
          Exact Deliverables &amp; Turnaround Times
        </h2>
        <p className="text-[#64748B] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          Click any service discipline below to inspect what is included in your engineering sprint.
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-8 flex items-center justify-between gap-4 bg-white hover:bg-[#F8FAFC] transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#00F0FF] bg-[#090D16] px-2.5 py-0.5 rounded-full">
                      DISCIPLINE 0{idx + 1}
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono font-semibold text-[#64748B]">
                      ⏱ {service.timeline}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-[#090D16] leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed">
                    {service.tagline}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#090D16] text-[#00F0FF] flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0">
                  {isOpen ? '−' : '+'}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-[#E2E8F0] bg-[#F8FAFC]">
                  <h4 className="text-[11px] sm:text-xs font-mono font-bold text-[#090D16] uppercase tracking-wider mt-5 sm:mt-6 mb-4">
                    Included Deliverables &amp; Milestones:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#334155]">
                    {service.deliverables.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-[#E2E8F0]">
                        <span className="text-[#090D16] bg-[#00F0FF] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">✓</span>
                        <span className="font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
