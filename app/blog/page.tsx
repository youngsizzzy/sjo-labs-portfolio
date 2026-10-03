import React from 'react';
import type { Metadata } from 'next';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import ZilkanCta from '@/components/ZilkanCta';
import ZilkanFooter from '@/components/ZilkanFooter';
import BlogFeaturedSpotlight from '@/components/BlogFeaturedSpotlight';
import BlogSearchFilter from '@/components/BlogSearchFilter';
import BlogNewsletterBox from '@/components/BlogNewsletterBox';

export const metadata: Metadata = {
  title: 'Insights & Technical Field Notes | SJO LABS Blog',
  description: 'Deep-dives on Sub-Second TTFB, Next.js App Router, 45-Second AI Lead Triage, and Server-Side Meta CAPI Attribution.',
  alternates: {
    canonical: 'https://sjolabs.com/blog',
  },
  openGraph: {
    title: 'Insights & Technical Field Notes | SJO LABS Blog',
    description: 'Deep-dives on Sub-Second TTFB, Next.js App Router, 45-Second AI Lead Triage, and Server-Side Meta CAPI Attribution.',
    url: 'https://sjolabs.com/blog',
    siteName: 'SJO LABS',
    type: 'website',
  },
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00F0FF] selection:text-[#090D16]">
      <ZilkanNavbar />

      <main className="flex-grow">
        {/* BLOG HERO BANNER */}
        <section className="relative py-20 bg-[#090D16] text-[#F8FAFC] overflow-hidden border-b border-[#1E293B]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                Technical Field Notes &amp; Engineering Dispatches
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-tight">
              Architectural Blueprints &amp; Growth Mechanics.
            </h1>
            <p className="text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
              Sub-second web performance, autonomous AI agent workflows, and server-side ad attribution breakdowns published directly by SJO LABS engineers.
            </p>
          </div>
        </section>

        {/* FEATURED SPOTLIGHT SECTION */}
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto -mt-10 relative z-20">
          <BlogFeaturedSpotlight />
        </section>

        {/* INTERACTIVE SEARCH & ARTICLES GRID */}
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-[#090D16] tracking-tight">
              All Engineering Field Notes
            </h2>
            <p className="text-sm text-[#64748B]">
              Filter by engineering domain or search specific technical concepts below.
            </p>
          </div>

          <BlogSearchFilter />
        </section>

        {/* NEWSLETTER CAPTURE */}
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
          <BlogNewsletterBox />
        </section>

        {/* CALL TO ACTION */}
        <ZilkanCta />
      </main>

      <ZilkanFooter />
    </div>
  );
}
