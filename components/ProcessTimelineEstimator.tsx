'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ScopeOption {
  id: string;
  label: string;
  duration: string;
  weeks: {
    week: string;
    title: string;
    desc: string;
    deliverable: string;
  }[];
}

export default function ProcessTimelineEstimator() {
  const [activeScopeId, setActiveScopeId] = useState('full');

  const scopes: ScopeOption[] = [
    {
      id: 'full',
      label: 'Full Growth Ecosystem',
      duration: '4 – 6 Weeks Sprint',
      weeks: [
        { week: 'Week 1', title: 'Audit & Telemetry Discovery', desc: 'Site performance audit, tracking loss scan, and Figma design system token setup.', deliverable: 'Audit & Figma Design System' },
        { week: 'Week 2-3', title: 'Next.js Frontend & Mobile Build', desc: 'Decoupled Next.js edge codebase engineering and React Native app architecture.', deliverable: 'Edge Codebase & Mobile Build' },
        { week: 'Week 4', title: 'AI Triage & Server CAPI Integration', desc: 'n8n AI lead triage webhooks, CRM sync, and Meta CAPI server-to-server relay.', deliverable: 'AI Workflows & CAPI Relay' },
        { week: 'Week 5-6', title: 'Production QA & Launch SLA', desc: 'Final Core Web Vitals SLA verification, stress testing, and live deployment.', deliverable: 'Live Production Engine' },
      ],
    },
    {
      id: 'web',
      label: 'Web Architecture Only',
      duration: '2 – 3 Weeks Sprint',
      weeks: [
        { week: 'Week 1', title: 'Figma UI/UX & Design Tokens', desc: 'Tailwind CSS design system creation, responsive layouts, and CMS schema setup.', deliverable: 'Design Tokens & CMS Schema' },
        { week: 'Week 2', title: 'Decoupled Next.js Development', desc: 'React 18 / Next.js 14 edge runtime coding, component assembly, and API routes.', deliverable: 'Decoupled Next.js Frontend' },
        { week: 'Week 3', title: 'Core Web Vitals QA & Launch', desc: 'Sub-140ms TTFB SLA audit, mobile responsiveness check, and domain DNS setup.', deliverable: 'Live Production Website' },
      ],
    },
    {
      id: 'mobile',
      label: 'Mobile Application',
      duration: '3 – 5 Weeks Sprint',
      weeks: [
        { week: 'Week 1-2', title: 'Mobile UI/UX & State Architecture', desc: 'React Native / Expo component setup, navigation flows, and mock API endpoints.', deliverable: 'Mobile Component Architecture' },
        { week: 'Week 3-4', title: 'Backend Integration & WebSockets', desc: 'Supabase authentication, push notifications, offline cache, and real-time sync.', deliverable: 'Backend & Push API Integration' },
        { week: 'Week 5', title: 'Store Submission & Production Release', desc: 'Apple App Store and Google Play Store build submission and release approval.', deliverable: 'App Store & Play Store Release' },
      ],
    },
    {
      id: 'ai',
      label: 'AI Automation & CAPI',
      duration: '1 – 2 Weeks Sprint',
      weeks: [
        { week: 'Week 1', title: 'AI Prompt Engineering & Webhooks', desc: 'Multi-agent LLM prompt pipeline setup and n8n webhook triage triggers.', deliverable: 'AI Agent Prompt Pipeline' },
        { week: 'Week 2', title: 'CRM Sync & Server CAPI Relay', desc: 'Bi-directional HubSpot/Salesforce CRM sync and Meta CAPI server integration.', deliverable: 'Live AI Triage & CAPI Relay' },
      ],
    },
  ];

  const currentScope = scopes.find((s) => s.id === activeScopeId) || scopes[0];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="bg-[#090D16] text-[#F8FAFC] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 border border-[#1E293B] shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1E293B] mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-[11px] font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
              Interactive Sprint Simulator
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
            Sprint Timeline &amp; Milestone Estimator
          </h2>
          <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base mt-2.5 sm:mt-3 leading-relaxed">
            Select your desired engineering scope below to inspect week-by-week deliverables and sprint timelines.
          </p>

          {/* Scope Selector Pills (Compact 2-column grid on mobile, flex-wrap on tablet/desktop) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 mt-6 font-mono text-[11px] sm:text-xs">
            {scopes.map((scope) => (
              <button
                key={scope.id}
                onClick={() => setActiveScopeId(scope.id)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full transition-all font-semibold text-center truncate ${
                  activeScopeId === scope.id
                    ? 'bg-[#00F0FF] text-[#090D16] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#101726] text-[#94A3B8] border border-[#1E293B] hover:text-white'
                }`}
              >
                {scope.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Timeline Display */}
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#1E293B] pb-3 mb-6 sm:mb-8 gap-2">
            <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
              ESTIMATED TIMELINE: {currentScope.duration}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#94A3B8]">
              DETERMINISTIC SPRINT MODEL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {currentScope.weeks.map((w, idx) => (
              <div
                key={idx}
                className="bg-[#101726] p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-[#1E293B] hover:border-[#00F0FF]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-full">
                      {w.week}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF]/40 group-hover:bg-[#00F0FF]"></span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5">
                    {w.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                    {w.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#1E293B]/60 text-[11px] font-mono text-[#00F0FF]">
                  🎁 <span className="font-semibold text-white">{w.deliverable}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
            <div>
              <span>Need a custom sprint scope or tight launch deadline? We adjust sprint intensity for enterprise requirements.</span>
            </div>
            <Link
              href="/#contact"
              className="w-full sm:w-auto text-center bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] shrink-0"
            >
              Book Sprint Kickoff Call →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
