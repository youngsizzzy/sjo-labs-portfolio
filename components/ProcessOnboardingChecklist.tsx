'use client';

import React from 'react';

export default function ProcessOnboardingChecklist() {
  const steps = [
    {
      num: '01',
      title: 'Brand Assets & Figma Guidelines',
      desc: 'Provide your logo vector files, typography preferences, and existing brand guidelines.',
      providedBy: 'Client Provided',
    },
    {
      num: '02',
      title: 'DNS & Domain Registrar Access',
      desc: 'Grant DNS access or CNAME configuration permissions for instant edge deployment.',
      providedBy: 'Client Provided',
    },
    {
      num: '03',
      title: 'CRM API Credentials & Webhooks',
      desc: 'Share HubSpot, Salesforce, or Supabase API keys for 0-touch AI lead triage setup.',
      providedBy: 'Client Provided',
    },
    {
      num: '04',
      title: 'Meta & Google Ad Account Access',
      desc: 'Provide Business Manager access for server-to-server CAPI pixel configuration.',
      providedBy: 'Client Provided',
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[11px] sm:text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-semibold block mb-3">
          Onboarding Readiness
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D16] tracking-tight leading-snug">
          Client Kickoff Prerequisites Checklist
        </h2>
        <p className="text-[#64748B] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          Here is what we need from your team before Day 1 to ensure a seamless engineering sprint.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-[#090D16] text-[#00F0FF] font-mono text-xs font-bold flex items-center justify-center">
                  {s.num}
                </span>
                <span className="text-[10px] font-mono font-semibold text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-full">
                  {s.providedBy}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#090D16] mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-[#090D16] flex items-center gap-1.5 font-semibold">
              <span className="text-[#00F0FF] bg-[#090D16] rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px]">✓</span>
              <span>Day 1 Ready</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
