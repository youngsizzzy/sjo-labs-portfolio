import React from 'react';
import type { Metadata } from 'next';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import WorkImpactTelemetry from '@/components/WorkImpactTelemetry';
import WorkProjectsFilter from '@/components/WorkProjectsFilter';
import WorkTelemetryMonitor from '@/components/WorkTelemetryMonitor';
import ZilkanTestimonials from '@/components/ZilkanTestimonials';
import ZilkanCta from '@/components/ZilkanCta';
import ZilkanFooter from '@/components/ZilkanFooter';

export const metadata: Metadata = {
  title: 'Our Work, Case Studies & Impact Telemetry | SJO LABS',
  description: 'Explore verified commercial case studies, headless Next.js web applications, mobile apps, AI triage workflows, and server-side CAPI ad scaling deployments by SJO LABS.',
  alternates: {
    canonical: 'https://sjolabs.com/work',
  },
  openGraph: {
    title: 'Our Work, Case Studies & Impact Telemetry | SJO LABS',
    description: 'Explore verified commercial case studies, headless Next.js web applications, mobile apps, AI triage workflows, and server-side CAPI ad scaling deployments by SJO LABS.',
    url: 'https://sjolabs.com/work',
    siteName: 'SJO LABS',
    type: 'website',
  },
};

export default function WorkPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00F0FF] selection:text-[#090D16]">
      <ZilkanNavbar />

      <main className="flex-grow">
        {/* WORK HERO BANNER */}
        <section className="relative py-20 bg-[#090D16] text-[#F8FAFC] overflow-hidden border-b border-[#1E293B]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                Proven Portfolio &amp; Case Studies
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-tight">
              Tested Systems. Verified Commercial Results.
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-3xl leading-relaxed mb-8">
              Explore our featured deployments across Headless Next.js web applications, native mobile apps, autonomous AI intake pipelines, and server-side Conversions API ad funnels.
            </p>
          </div>
        </section>

        {/* 1. COMMERCIAL IMPACT TELEMETRY BAR */}
        <WorkImpactTelemetry />

        {/* 2. INTERACTIVE CASE STUDY GRID & FILTERS */}
        <WorkProjectsFilter />

        {/* 3. LIVE EDGE SYSTEM TELEMETRY MONITOR */}
        <WorkTelemetryMonitor />

        {/* 4. CLIENT TESTIMONIALS & REVIEWS */}
        <ZilkanTestimonials />

        {/* 5. CALL TO ACTION */}
        <ZilkanCta />
      </main>

      <ZilkanFooter />
    </div>
  );
}
