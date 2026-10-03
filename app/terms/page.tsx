import React from 'react';
import type { Metadata } from 'next';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import ZilkanCta from '@/components/ZilkanCta';
import ZilkanFooter from '@/components/ZilkanFooter';

export const metadata: Metadata = {
  title: 'Terms of Service | SJO LABS®',
  description: 'Terms of Service, Engineering SLAs, and Intellectual Property Rights for SJO LABS® services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00F0FF] selection:text-[#090D16]">
      <ZilkanNavbar />

      <main className="flex-grow">
        {/* HERO BANNER */}
        <section className="relative py-16 bg-[#090D16] text-[#F8FAFC] overflow-hidden border-b border-[#1E293B]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                Service Agreement &amp; Guarantees
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Terms of Service
            </h1>
            <p className="text-xs font-mono text-[#94A3B8]">
              LAST REVISED: OCTOBER 2026 • GOVERNING ENTITY: SJO LABS® INC.
            </p>
          </div>
        </section>

        {/* TERMS CONTENT */}
        <div className="py-16 px-6 md:px-12 max-w-4xl mx-auto space-y-10">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm text-sm text-[#0F172A] border-l-4 border-l-[#00F0FF]">
            <strong>Summary:</strong> SJO LABS® delivers high-velocity digital engineering services backed by strict Service Level Agreements (SLAs), 100% client code ownership, and 99.4% on-time delivery benchmarks.
          </div>

          <article className="space-y-8 text-base text-[#334155] leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">1. Scope of Client Engagements</h2>
              <p className="text-sm">
                SJO LABS® provides custom web architecture, mobile application development, AI workflow automation, and paid ad acquisition management as defined in individual Statement of Work (SOW) agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">2. Code Ownership &amp; Intellectual Property</h2>
              <p className="text-sm">
                Upon final invoice clearance, 100% of custom source code, design assets, and repository ownership are transferred unconditionally to the client. SJO LABS® retains rights only to pre-existing open-source libraries and general architectural frameworks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">3. Service Level Guarantees (SLAs)</h2>
              <p className="text-sm">
                All production web infrastructure deployed by SJO LABS® carries a 99.9% uptime target and sub-second TTFB performance standards. Bug resolution SLAs cover 30 days of post-launch hypercare at zero additional cost.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">4. Payment Terms &amp; Milestones</h2>
              <p className="text-sm">
                Projects operate on milestone-based billing (e.g. 50% kick-off, 25% staging acceptance, 25% final deployment). All invoices are due within 14 calendar days of issuance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">5. Contact Legal Office</h2>
              <p className="text-sm">
                For contractual or legal inquiries regarding service agreements:
              </p>
              <div className="p-4 rounded-xl bg-[#090D16] text-[#00F0FF] font-mono text-xs border border-[#1E293B]">
                EMAIL: legal@sjolabs.com • GOVERNING LAW: DELAWARE, USA
              </div>
            </section>
          </article>
        </div>

        {/* CALL TO ACTION */}
        <ZilkanCta />
      </main>

      <ZilkanFooter />
    </div>
  );
}
