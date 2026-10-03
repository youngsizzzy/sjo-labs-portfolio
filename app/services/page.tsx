import React from 'react';
import type { Metadata } from 'next';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import ServicesRoiCalculator from '@/components/ServicesRoiCalculator';
import ServicesDeliverablesAccordion from '@/components/ServicesDeliverablesAccordion';
import ServicesComparisonMatrix from '@/components/ServicesComparisonMatrix';
import ServicesTechStack from '@/components/ServicesTechStack';
import ServicesAuditWidget from '@/components/ServicesAuditWidget';
import ServiceDetailSection from '@/components/ServiceDetailSection';
import WhySjoLabs from '@/components/WhySjoLabs';
import ZilkanPricing from '@/components/ZilkanPricing';
import ZilkanFaq from '@/components/ZilkanFaq';
import ZilkanCta from '@/components/ZilkanCta';
import ZilkanFooter from '@/components/ZilkanFooter';
import { getAllServicesSorted } from '@/lib/servicesConfig';

export const metadata: Metadata = {
  title: 'Commercial Services Catalog (All 8 Services) | SJO LABS',
  description: 'Explore SJO LABS 8 primary services: Web Design & Web Development, Mobile App Development, WordPress, AI Automation, AI Chatbots, AI Phone Agents, AI Search Visibility, and Meta & Google Ads.',
  alternates: {
    canonical: 'https://sjolabs.com/services',
  },
  openGraph: {
    title: 'Commercial Services Catalog (All 8 Services) | SJO LABS',
    description: 'Explore SJO LABS 8 primary services: Web Design & Web Development, Mobile App Development, WordPress, AI Automation, AI Chatbots, AI Phone Agents, AI Search Visibility, and Meta & Google Ads.',
    url: 'https://sjolabs.com/services',
    siteName: 'SJO LABS',
    type: 'website',
  },
};

export default function ServicesPage() {
  const allServices = getAllServicesSorted();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00F0FF] selection:text-[#090D16]">
      <ZilkanNavbar />

      <main className="flex-grow">
        {/* HERO BANNER FOR SERVICES */}
        <section className="relative py-20 bg-[#090D16] text-[#F8FAFC] overflow-hidden border-b border-[#1E293B]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                Capabilities &amp; Infrastructure Engine
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-tight">
              Engineering Commercial Digital Assets.
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-3xl leading-relaxed mb-8">
              We design, code, and scale digital products across 8 primary disciplines — Web, Mobile, WordPress, AI Workflows, Chatbots, Phone Agents, AI Search, and Paid Ads.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {allServices.map((svc) => (
                <a
                  key={svc.slug}
                  href={`#${svc.slug}`}
                  className="px-3.5 py-1.5 rounded-full bg-[#131927] border border-[#1E293B] text-xs font-mono text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#090D16] transition-all"
                >
                  0{svc.displayOrder}. {svc.name} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* WHY SJOLABS METHODOLOGY */}
        <WhySjoLabs />

        {/* ALL 8 DETAILED COMMERCIAL SERVICE SECTIONS */}
        {allServices.map((service, idx) => (
          <ServiceDetailSection key={service.slug} service={service} index={idx} />
        ))}

        {/* INTERACTIVE ROI & TIME-SAVED CALCULATOR */}
        <ServicesRoiCalculator />

        {/* SJO LABS VS. GENERIC AGENCY MATRIX */}
        <ServicesComparisonMatrix />

        {/* INTERACTIVE TECH STACK TELEMETRY */}
        <ServicesTechStack />

        {/* FREE TELEMETRY & AUDIT REQUEST WIDGET */}
        <ServicesAuditWidget />

        {/* PRICING & SERVICE TIERS */}
        <ZilkanPricing />

        {/* FAQ SECTION */}
        <ZilkanFaq />

        {/* CALL TO ACTION */}
        <ZilkanCta />
      </main>

      <ZilkanFooter />
    </div>
  );
}
