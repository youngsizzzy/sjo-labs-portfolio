'use client';

import React from 'react';
import LeadEnquiryForm from './LeadEnquiryForm';

interface LeadEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  sourcePage?: string;
}

export default function LeadEnquiryModal({
  isOpen,
  onClose,
  serviceName = 'Web Development',
  sourcePage,
}: LeadEnquiryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-[#090D16]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-[#1E293B] rounded-3xl p-4 sm:p-8 shadow-2xl overflow-hidden my-4 sm:my-8 mx-4 sm:mx-auto inquiry-form-container">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all z-20"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6 text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-widest">
              SJO LABS • PROJECT ENQUIRY
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Discuss Your <span className="text-[#00F0FF]">{serviceName}</span> Requirements
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#94A3B8]">
            Tell us about your business goals and we&apos;ll help you determine the right technical scope and starting price.
          </p>
        </div>

        {/* Form Component */}
        <div className="relative z-10 max-h-[75vh] overflow-y-auto pr-1 custom-scrollbar">
          <LeadEnquiryForm
            defaultService={serviceName}
            sourcePage={sourcePage}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}
