'use client';

import React, { useState, useEffect } from 'react';
import { addLead, LeadCountry, LeadService, LeadBudget, LeadReferralSource } from '@/lib/leadStore';
import { getServiceConfig } from '@/lib/servicesConfig';

interface LeadEnquiryFormProps {
  defaultService?: string;
  sourcePage?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export default function LeadEnquiryForm({
  defaultService = 'Web Design & Web Development',
  sourcePage,
  onSuccess,
  compact = false,
}: LeadEnquiryFormProps) {
  const [detectedSourcePage, setDetectedSourcePage] = useState<string>('');
  const [referrerUrl, setReferrerUrl] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [country, setCountry] = useState<LeadCountry>('USA');
  const [serviceNeeded, setServiceNeeded] = useState<LeadService>(
    (defaultService as LeadService) || 'Web Design & Web Development'
  );
  const [budget, setBudget] = useState<LeadBudget>('$500–$999');
  const [referralSource, setReferralSource] = useState<LeadReferralSource>('Google Search');
  const [message, setMessage] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  useEffect(() => {
    if (sourcePage) {
      setDetectedSourcePage(sourcePage);
    } else if (typeof window !== 'undefined') {
      setDetectedSourcePage(window.location.pathname + window.location.search);
      setReferrerUrl(document.referrer || 'Direct / Organic');
    }
  }, [sourcePage]);

  useEffect(() => {
    if (defaultService) {
      const config = getServiceConfig(defaultService);
      setServiceNeeded((config.name as LeadService) || 'Web Design & Web Development');
    }
  }, [defaultService]);

  const activeServiceConfig = getServiceConfig(serviceNeeded);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadPayload = {
      name,
      email,
      business_name: businessName,
      country,
      service: serviceNeeded,
      budget,
      referral_source: referralSource,
      message,
      website_url: websiteUrl,
      source_page: detectedSourcePage || '/services',
      landing_page: detectedSourcePage || '/',
      referrer: referrerUrl || 'Direct',
    };

    try {
      // 1. Store lead locally & in state for Admin Panel
      addLead(leadPayload);

      // 2. Dispatch to Server API route /api/contact (Resend API -> sjolabs8@gmail.com)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      const json = await res.json();
      console.log('Lead form contact API result:', json);

      setSubmitted(true);
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#131927] border border-[#00F0FF]/30 rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-white">Project Enquiry Received!</h3>
        <p className="font-sans text-xs md:text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to SJO LABS. Our team is reviewing your project details for{' '}
          <strong className="text-white">{serviceNeeded}</strong> and will follow up with pricing &amp; architecture scope within 24 business hours.
        </p>
        <div className="pt-2 text-[11px] font-mono text-[#00F0FF] bg-[#090D16] py-2 px-4 rounded-xl inline-block border border-[#1E293B]">
          SOURCE PAGE RECORDED: {detectedSourcePage || '/services'}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans inquiry-form w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            Your Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Marcus Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs md:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF] transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            Work Email *
          </label>
          <input
            type="email"
            required
            placeholder="marcus@vancehvac.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs md:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Name */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            Business Name *
          </label>
          <input
            type="text"
            required
            placeholder="Vance Heating & Air"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs md:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF] transition-all"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            Country *
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as LeadCountry)}
            className="w-full px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-all"
          >
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Service Needed */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            Service Needed *
          </label>
          <select
            value={serviceNeeded}
            onChange={(e) => setServiceNeeded(e.target.value as LeadService)}
            className="w-full px-3.5 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs text-white focus:outline-none focus:border-[#00F0FF] transition-all"
          >
            <option value="Web Design & Web Development">1. Web Design &amp; Web Development (From $500)</option>
            <option value="Mobile App Development">2. Mobile App Development (Request Quote)</option>
            <option value="WordPress">3. WordPress (From $400)</option>
            <option value="AI Automation">4. AI Automation (From $200)</option>
            <option value="AI Chatbots">5. AI Chatbots (From $150)</option>
            <option value="AI Phone Agents">6. AI Phone Agents (From $250)</option>
            <option value="AI Search Visibility">7. AI Search Visibility (From $200)</option>
            <option value="Meta & Google Ads">8. Meta &amp; Google Ads (Request Quote)</option>
            <option value="Not sure">Not sure / Need consultation</option>
          </select>
        </div>

        {/* Approximate Budget */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            Approximate Budget *
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value as LeadBudget)}
            className="w-full px-3.5 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs text-white focus:outline-none focus:border-[#00F0FF] transition-all"
          >
            <option value="Under $200">Under $200</option>
            <option value="$200–$499">$200–$499</option>
            <option value="$500–$999">$500–$999</option>
            <option value="$1,000–$1,500">$1,000–$1,500</option>
            <option value="$1,500+">$1,500+</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>

        {/* How did you find SJOLabs? */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            How Did You Find Us? *
          </label>
          <select
            value={referralSource}
            onChange={(e) => setReferralSource(e.target.value as LeadReferralSource)}
            className="w-full px-3.5 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs text-white focus:outline-none focus:border-[#00F0FF] transition-all"
          >
            <option value="Google Search">Google Search</option>
            <option value="ChatGPT / AI Search">ChatGPT / AI Search</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Portfolio">Portfolio</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Dynamic Service Pricing Banner */}
      {activeServiceConfig && (
        <div className="p-3 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-xl text-xs flex items-start gap-2 text-[#E2E8F0]">
          <span className="material-symbols-outlined text-[#00F0FF] text-base shrink-0 pt-0.5">info</span>
          <div>
            <span className="font-bold text-[#00F0FF] mr-1">{activeServiceConfig.name}:</span>
            <span>Starting from {activeServiceConfig.startingPrice} (typical range {activeServiceConfig.typicalRange}). {activeServiceConfig.pricingNote}</span>
          </div>
        </div>
      )}

      {/* Project Description */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
          What are you looking to build or improve? *
        </label>
        <textarea
          rows={compact ? 3 : 4}
          required
          placeholder="Tell us about your business, what you need, and what you'd like the website or automation to accomplish."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs md:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF] transition-all"
        ></textarea>
      </div>

      {/* Website URL (Optional) */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
          Existing Website URL <span className="text-[#64748B] font-sans lowercase">(optional)</span>
        </label>
        <input
          type="url"
          placeholder="https://yourcompany.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-xs md:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF] transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-[#00F0FF] hover:bg-white text-[#090D16] font-bold text-xs md:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#00F0FF]/25 flex items-center justify-center gap-2 mt-2"
      >
        {loading ? (
          <span>Processing Project Enquiry...</span>
        ) : (
          <>
            <span>Submit Project Enquiry</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-center text-[#64748B] font-mono">
        Guaranteed response within 24 business hours • Transparent pricing positioning
      </p>
    </form>
  );
}
