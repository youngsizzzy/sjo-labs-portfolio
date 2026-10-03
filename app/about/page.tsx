import React from 'react';
import type { Metadata } from 'next';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import AboutJourneyTimeline from '@/components/AboutJourneyTimeline';
import AboutValuesMatrix from '@/components/AboutValuesMatrix';
import AboutSystemTelemetry from '@/components/AboutSystemTelemetry';
import WhySjoLabs from '@/components/WhySjoLabs';
import ZilkanMetrics from '@/components/ZilkanMetrics';
import ZilkanTeam from '@/components/ZilkanTeam';
import ZilkanTrustMarquee from '@/components/ZilkanTrustMarquee';
import ZilkanCta from '@/components/ZilkanCta';
import ZilkanFooter from '@/components/ZilkanFooter';
import Link from 'next/link';

import { getAllServicesSorted } from '@/lib/servicesConfig';

export const metadata: Metadata = {
  title: 'About SJOLabs — Digital Service Studio & Web Engineering',
  description: 'Learn about SJOLabs, our core service capabilities across Web Design & Development, Mobile Apps, WordPress, AI Chatbots, AI Automation, AI Phone Agents, AI Search Visibility, and Meta & Google Ads.',
  alternates: {
    canonical: 'https://sjolabs.com/about',
  },
  openGraph: {
    title: 'About SJOLabs — Digital Service Studio & Web Engineering',
    description: 'Learn about SJOLabs, our core service capabilities across Web Design & Development, Mobile Apps, WordPress, AI Chatbots, AI Automation, AI Phone Agents, AI Search Visibility, and Meta & Google Ads.',
    url: 'https://sjolabs.com/about',
    siteName: 'SJO LABS',
    type: 'website',
  },
};

export default function AboutPage() {
  const allServices = getAllServicesSorted();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00F0FF] selection:text-[#090D16]">
      <ZilkanNavbar />

      <main className="flex-grow">
        {/* ABOUT HERO BANNER */}
        <section className="relative py-20 bg-[#090D16] text-[#F8FAFC] overflow-hidden border-b border-[#1E293B]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                Our Origin &amp; Studio Philosophy
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-tight">
              We Engineering Machines, Not Just Websites.
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-3xl leading-relaxed mb-8">
              SJOLabs is a specialized digital service studio delivering business-focused Web Development, Web Design, WordPress, Mobile Apps, AI Chatbots, AI Automation, AI Phone Agents, AI Search Visibility, and Meta &amp; Google Ads.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="px-6 py-3.5 bg-[#00F0FF] text-[#090D16] font-bold font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20"
              >
                Explore Commercial Services →
              </Link>
              <Link
                href="/work"
                className="px-6 py-3.5 bg-[#1E293B] text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-[#334155] transition-all border border-[#334155]"
              >
                View Portfolio &amp; Case Studies
              </Link>
            </div>
          </div>
        </section>

        {/* 1. TRUST MARQUEE */}
        <ZilkanTrustMarquee />

        {/* 2. CORE SERVICE CAPABILITIES SECTION */}
        <section className="py-16 sm:py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
          <div className="space-y-4 mb-12">
            <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              CORE CAPABILITIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F172A] tracking-tight">
              Our 8 Official Service Verticals
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#64748B] max-w-2xl leading-relaxed">
              SJOLabs operates across eight primary disciplines to solve real business bottlenecks, engineer sub-second web apps, automate AI workflows, and drive lead conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {allServices.map((s, idx) => (
              <div
                key={s.slug}
                className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-[#2563EB]">0{s.displayOrder}. {s.name}</span>
                  </div>
                  <span className="inline-block text-[11px] font-mono font-bold bg-[#090D16] text-[#00F0FF] px-2.5 py-1 rounded-full">
                    {s.startingPrice}
                  </span>
                  <p className="text-xs text-[#64748B] leading-relaxed">{s.shortDescription}</p>
                </div>
                <Link href={s.servicePageUrl} className="text-xs font-mono text-[#2563EB] font-bold hover:underline inline-block pt-3 border-t border-[#F1F5F9]">
                  View Dedicated Scope →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 3. WHY SJOLABS METHODOLOGY */}
        <WhySjoLabs />

        {/* 4. INTERACTIVE ORIGIN & MILESTONE TIMELINE */}
        <AboutJourneyTimeline />

        {/* 5. CORE VALUES & ENGINEERING CULTURE MATRIX */}
        <AboutValuesMatrix />

        {/* 6. GLOBAL INFRASTRUCTURE TELEMETRY BAR */}
        <AboutSystemTelemetry />

        {/* 7. METRICS SHOWCASE */}
        <ZilkanMetrics />

        {/* 8. TEAM LEADERSHIP SECTION */}
        <ZilkanTeam />

        {/* 9. CALL TO ACTION */}
        <ZilkanCta />
      </main>

      <ZilkanFooter />
    </div>
  );
}
