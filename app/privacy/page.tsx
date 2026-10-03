import React from 'react';
import type { Metadata } from 'next';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import ZilkanCta from '@/components/ZilkanCta';
import ZilkanFooter from '@/components/ZilkanFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy | SJO LABS®',
  description: 'Privacy Policy and First-Party Data Protection Standards for SJO LABS® client platforms, AI workflows, and web infrastructure.',
};

export default function PrivacyPolicyPage() {
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
                Data Protection &amp; Governance
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-[#94A3B8]">
              LAST REVISED: OCTOBER 2026 • GOVERNING ENTITY: SJO LABS® INC.
            </p>
          </div>
        </section>

        {/* POLICY CONTENT */}
        <div className="py-16 px-6 md:px-12 max-w-4xl mx-auto space-y-10">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm text-sm text-[#0F172A] border-l-4 border-l-[#00F0FF]">
            <strong>Summary:</strong> SJO LABS® respects client confidentiality and user privacy. We build compliant, server-side data infrastructure (including CAPI relays and first-party identity pipelines) strictly designed to protect data integrity without selling or unauthorized sharing.
          </div>

          <article className="space-y-8 text-base text-[#334155] leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">1. Information We Collect</h2>
              <p className="text-sm">
                When you interact with SJO LABS® web architectures, request project discovery consultations, or deploy our automated workflow integrations, we may process:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1.5 text-[#64748B]">
                <li>Contact Information (e.g. name, work email, phone number, company name).</li>
                <li>Technical Device &amp; Telemetry Data (IP address, browser type, edge routing region).</li>
                <li>Client Project Specifications &amp; API Integration Metadata provided during onboarding.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">2. How We Use Collected Data</h2>
              <p className="text-sm">
                Data collected by SJO LABS® is strictly utilized to engineer, optimize, and maintain high-performance digital systems:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1.5 text-[#64748B]">
                <li>Delivering custom Next.js web architectures, mobile apps, and AI triage automations.</li>
                <li>Processing server-to-server Meta CAPI &amp; Google Ads attribution events for client campaigns.</li>
                <li>Executing system diagnostics, performance telemetry monitoring, and infrastructure maintenance.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">3. Data Security &amp; Encryption Standards</h2>
              <p className="text-sm">
                All client credentials, API keys, and end-user telemetry are protected with enterprise-grade AES-256 encryption at rest and TLS 1.3 in transit. We maintain zero-trust access controls across all production edge environments.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">4. Third-Party API Relays</h2>
              <p className="text-sm">
                We integrate trusted cloud infrastructure providers (Vercel, Supabase, Meta Graph API, Google Cloud Engine). Third-party data relays strictly follow official platform privacy contracts and GDPR / CCPA compliance benchmarks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#090D16]">5. Contact Data Protection Office</h2>
              <p className="text-sm">
                For questions regarding data processing or privacy inquiries, contact the SJO LABS® Legal &amp; Data Protection team at:
              </p>
              <div className="p-4 rounded-xl bg-[#090D16] text-[#00F0FF] font-mono text-xs border border-[#1E293B]">
                EMAIL: privacy@sjolabs.com • COMPLIANCE: ISO 27001 &amp; SOC2 Type II Certified
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
