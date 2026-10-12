import React from 'react';
import type { Metadata } from 'next';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import ProcessTimelineEstimator from '@/components/ProcessTimelineEstimator';
import ProcessInteractiveProtocol from '@/components/ProcessInteractiveProtocol';
import ProcessSlaGuarantees from '@/components/ProcessSlaGuarantees';
import ProcessOnboardingChecklist from '@/components/ProcessOnboardingChecklist';
import ZilkanWhyUs from '@/components/ZilkanWhyUs';
import ZilkanCta from '@/components/ZilkanCta';
import ZilkanFooter from '@/components/ZilkanFooter';

export const metadata: Metadata = {
  title: 'Engineering Process, Protocol & Sprint Simulator | SJO LABS',
  description: 'Our 4-stage engineering protocol: Audit & Telemetry, Decoupled Architecture, AI & CAPI Deployment, and Algorithmic Scaling. Inspect sprint timelines and SLAs.',
  alternates: {
    canonical: 'https://sjolabs.site/process',
  },
  openGraph: {
    title: 'Engineering Process, Protocol & Sprint Simulator | SJO LABS',
    description: 'Our 4-stage engineering protocol: Audit & Telemetry, Decoupled Architecture, AI & CAPI Deployment, and Algorithmic Scaling. Inspect sprint timelines and SLAs.',
    url: 'https://sjolabs.site/process',
    siteName: 'SJO LABS',
    type: 'website',
  },
};

export default function ProcessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00F0FF] selection:text-[#090D16]">
      <ZilkanNavbar />

      <main className="flex-grow">
        {/* PROCESS HERO BANNER */}
        <section className="relative py-20 bg-[#090D16] text-[#F8FAFC] overflow-hidden border-b border-[#1E293B]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                4-Stage Engineering Protocol
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-tight">
              Deterministic Protocol. Predictable Outcomes.
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-3xl leading-relaxed mb-8">
              We eliminate guesswork with a rigorous 4-step engineering process designed to take your web infrastructure from audit to sub-second production scaling.
            </p>
          </div>
        </section>

        {/* 1. INTERACTIVE SPRINT TIMELINE ESTIMATOR */}
        <ProcessTimelineEstimator />

        {/* 2. PROTOCOL DEEP-DIVE & ARTIFACT INSPECTOR */}
        <ProcessInteractiveProtocol />

        {/* 3. CONTRACTUAL SLAS & QUALITY GUARANTEES */}
        <ProcessSlaGuarantees />

        {/* 4. CLIENT KICKOFF PREREQUISITES CHECKLIST */}
        <ProcessOnboardingChecklist />

        {/* 5. WHY US / ADVANTAGE MATRIX */}
        <ZilkanWhyUs />

        {/* 6. CALL TO ACTION */}
        <ZilkanCta />
      </main>

      <ZilkanFooter />
    </div>
  );
}
