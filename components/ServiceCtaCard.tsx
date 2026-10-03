'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getServiceConfig } from '@/lib/servicesConfig';
import LeadEnquiryModal from './LeadEnquiryModal';

interface ServiceCtaCardProps {
  serviceName?: string | null;
  sourcePage?: string;
}

export default function ServiceCtaCard({ serviceName, sourcePage }: ServiceCtaCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const config = getServiceConfig(serviceName);

  return (
    <>
      <div className="my-10 bg-[#0F172A] border border-[#00F0FF]/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        {/* Soft Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6 text-left">
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
                SJOLABS SERVICE • {config.name.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#00F0FF]/10 border border-[#00F0FF]/40 px-3 py-1 rounded-full">
              <span className="text-xs font-mono font-bold text-[#00F0FF]">
                Starting from {config.startingPrice}
              </span>
            </div>
          </div>

          {/* Headline & Body */}
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
              {config.ctaHeadline}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {config.ctaBody}
            </p>
          </div>

          {/* Scope Note & Typical Range */}
          <div className="bg-[#090D16] border border-[#1E293B] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#94A3B8] font-sans">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00F0FF] text-base shrink-0">verified</span>
              <span>{config.pricingNote}</span>
            </div>
            <div className="font-mono text-[11px] text-[#64748B] shrink-0 bg-[#131927] px-2.5 py-1 rounded-lg border border-[#1E293B]">
              Typical: {config.typicalRange}
            </div>
          </div>

          {/* Portfolio Proof Link (if present) */}
          {config.portfolioTitle && (
            <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between gap-4 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#E2E8F0]">
                <span className="material-symbols-outlined text-[#2563EB] text-base">workspace_premium</span>
                <span className="text-[#94A3B8]">
                  Relevant Proof:{' '}
                  <strong className="text-white font-medium">{config.portfolioTitle}</strong> — {config.portfolioSummary}
                </span>
              </div>
              <Link
                href="/work"
                className="text-[11px] font-mono font-bold text-[#00F0FF] hover:underline shrink-0 hidden md:inline-block"
              >
                View Work →
              </Link>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3.5 bg-[#00F0FF] hover:bg-white text-[#090D16] font-bold text-xs md:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#00F0FF]/20 flex items-center justify-center gap-2"
            >
              <span>{config.ctaButtonText}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <Link
              href={config.servicePageUrl}
              className="px-5 py-3.5 bg-[#1E293B] hover:bg-[#334155] text-white font-bold text-xs md:text-sm uppercase tracking-wider rounded-xl transition-all text-center border border-[#334155]"
            >
              Explore {config.name} Details
            </Link>
          </div>
        </div>
      </div>

      {/* Embedded Modal */}
      <LeadEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={config.name}
        sourcePage={sourcePage}
      />
    </>
  );
}
