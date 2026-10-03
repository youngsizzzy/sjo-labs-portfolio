'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceConfig } from '@/lib/servicesConfig';
import LeadEnquiryModal from './LeadEnquiryModal';

interface ServiceDetailSectionProps {
  service: ServiceConfig;
  index: number;
}

export default function ServiceDetailSection({ service, index }: ServiceDetailSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const isEven = index % 2 === 0;

  return (
    <section
      id={service.slug}
      className={`py-16 sm:py-24 px-6 md:px-12 border-t border-[#E2E8F0] scroll-mt-20 ${isEven ? 'bg-[#F8FAFC]' : 'bg-white'
        }`}
    >
      <div className="max-w-7xl mx-auto space-y-12 text-left">
        {/* Top Header & Pricing Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090D16] text-[#00F0FF] border border-[#1E293B]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                SERVICE 0{service.displayOrder} • {service.name.toUpperCase()}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
              {service.name}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#475569] max-w-2xl leading-relaxed">
              {service.shortDescription}
            </p>
          </div>

          <div className="bg-[#090D16] text-white p-6 rounded-3xl border border-[#1E293B] shrink-0 space-y-3 shadow-xl max-w-sm">
            <div className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider">
              PRICING POSITIONING
            </div>
            <div className="text-3xl font-extrabold text-[#00F0FF] font-mono">
              Starting from {service.startingPrice}
            </div>
            <div className="text-xs text-[#94A3B8] font-mono">
              Typical Range: <strong className="text-white">{service.typicalRange}</strong>
            </div>
            <p className="text-[11px] text-[#94A3B8] leading-tight font-sans border-t border-[#1E293B] pt-2">
              {service.pricingNote}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 bg-[#00F0FF] hover:bg-white text-[#090D16] font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-md mt-1"
            >
              {service.ctaButtonText} →
            </button>
          </div>
        </div>

        {/* Grid 1: Who It's For & Problems Solved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {/* Target Audience */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#2563EB]">
              <span className="material-symbols-outlined text-2xl">groups</span>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">Who This Service Is For</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              {service.whoItsFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#00F0FF] bg-[#090D16] p-0.5 rounded-full text-sm shrink-0 mt-0.5">
                    check
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Problems Solved */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#2563EB]">
              <span className="material-symbols-outlined text-2xl">build_circle</span>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">Problems We Solve</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
              {service.problemsSolved.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 bg-emerald-50 p-0.5 rounded-full text-sm shrink-0 mt-0.5">
                    done_all
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Deliverables Accordion / List */}
        <div className="bg-[#090D16] text-[#F8FAFC] p-6 sm:p-10 rounded-3xl border border-[#1E293B] shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
                TECHNICAL DELIVERABLES
              </span>
              <h3 className="font-serif text-2xl font-bold text-white pt-1">
                What Is Included in {service.name}
              </h3>
            </div>
            {service.portfolioTitle && (
              <div className="text-xs font-mono text-[#94A3B8] flex items-center gap-2">
                <span>Verified Proof:</span>
                <Link href="/work" className="text-[#00F0FF] font-bold hover:underline">
                  {service.portfolioTitle} →
                </Link>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {service.deliverables.map((del, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#131927] border border-[#1E293B] flex items-start gap-3 hover:border-[#00F0FF]/40 transition-all"
              >
                <span className="text-[#00F0FF] font-bold text-base">0{i + 1}.</span>
                <span className="text-[#E2E8F0] font-sans text-xs leading-relaxed">{del}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-6 font-sans">
          <div className="text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
              PROJECT EXECUTION PROTOCOL
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0F172A] pt-1">
              How We Execute {service.name} Projects
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {service.processSteps.map((step, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-2 hover:border-[#2563EB] transition-all"
              >
                <div className="text-xs font-mono font-bold text-[#2563EB]">STEP 0{i + 1}</div>
                <h4 className="font-serif font-bold text-sm text-[#0F172A]">{step.title}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        {service.faqs.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                SERVICE FAQS &amp; DISCLOSURES
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0F172A]">
                Frequently Asked Questions ({service.name})
              </h3>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-sans font-bold text-sm text-[#0F172A] bg-[#F8FAFC] hover:bg-[#F1F5F9] flex items-center justify-between gap-4 transition-colors"
                    >
                      <span>Q: {faq.question}</span>
                      <span className="material-symbols-outlined text-lg text-[#2563EB] shrink-0">
                        {isOpen ? 'remove' : 'add'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs text-[#475569] leading-relaxed font-sans border-t border-[#E2E8F0]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Schema Microdata */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: service.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.answer,
                    },
                  })),
                }),
              }}
            />
          </div>
        )}
      </div>

      <LeadEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={service.name}
        sourcePage={`/services#${service.slug}`}
      />
    </section>
  );
}
