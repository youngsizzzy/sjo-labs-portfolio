import React from 'react';
import type { Metadata } from 'next';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import ZilkanHero from '@/components/ZilkanHero';
import ZilkanTrustMarquee from '@/components/ZilkanTrustMarquee';
import ZilkanSolutions from '@/components/ZilkanSolutions';
import ZilkanProjects from '@/components/ZilkanProjects';
import ZilkanMetrics from '@/components/ZilkanMetrics';
import ZilkanWhyUs from '@/components/ZilkanWhyUs';
import ZilkanTestimonials from '@/components/ZilkanTestimonials';
import ZilkanPricing from '@/components/ZilkanPricing';
import ZilkanTeam from '@/components/ZilkanTeam';
import ZilkanFaq from '@/components/ZilkanFaq';
import ZilkanCta from '@/components/ZilkanCta';
import ZilkanFooter from '@/components/ZilkanFooter';

export const metadata: Metadata = {
  title: 'SJO LABS® — Web Design & Dev, Mobile Apps, AI Automation & Meta/Google Ads',
  description: 'SJO LABS is a high-velocity digital service studio delivering sub-second Web Architecture, iOS/Android Mobile Apps, Autonomous AI Workflows, and Meta & Google Ads.',
  alternates: {
    canonical: 'https://sjolabs.com',
  },
  openGraph: {
    title: 'SJO LABS® — Web Design & Dev, Mobile Apps, AI Automation & Meta/Google Ads',
    description: 'High-velocity digital service studio delivering sub-second Web Architecture, Mobile Applications, Autonomous AI Automation Workflows, and Meta/Google Ads Scaling.',
    url: 'https://sjolabs.com',
    siteName: 'SJO LABS',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00F0FF] selection:text-[#090D16]">
      <ZilkanNavbar />
      <main className="flex-grow">
        <ZilkanHero />
        <ZilkanTrustMarquee />
        {/* NEWLY BUILT 8-SERVICE SECTION REPLACING THE OLD 4-CARD SECTION */}
        <ZilkanSolutions />
        <ZilkanProjects />
        <ZilkanMetrics />
        <ZilkanWhyUs />
        <ZilkanTestimonials />
        <ZilkanPricing />
        <ZilkanTeam />
        <ZilkanFaq />
        <ZilkanCta />
      </main>
      <ZilkanFooter />
    </div>
  );
}
