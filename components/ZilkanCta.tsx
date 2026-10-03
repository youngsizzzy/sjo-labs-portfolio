'use client';

import React, { useState, useEffect } from 'react';
import { addLead, LeadCountry, LeadService, LeadBudget } from '@/lib/leadStore';

export default function ZilkanCta() {
  const [submitted, setSubmitted] = useState(false);
  const [sourcePage, setSourcePage] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    country: 'USA' as LeadCountry,
    service: 'Web Design & Web Development' as LeadService,
    budget: '$500–$999' as LeadBudget,
    message: '',
    websiteUrl: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSourcePage(window.location.pathname + window.location.search);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const leadPayload = {
      name: formData.name,
      email: formData.email,
      business_name: formData.businessName || formData.name + ' Business',
      country: formData.country,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
      website_url: formData.websiteUrl,
      source_page: sourcePage || '/',
    };

    try {
      addLead(leadPayload);

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      }).catch(err => console.error('Contact API call error:', err));

      setSubmitted(true);
    } catch (err) {
      console.error('Lead submit failed:', err);
    }
  };

  return (
    <section className="relative w-full bg-[#F8FAFC] py-16 md:py-24 px-6 md:px-12 border-t border-[#E2E8F0]" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#090D16] text-[#F8FAFC] rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden border border-[#1E293B]">
          {/* Subtle Cyan Glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="bg-[#2563EB] text-white font-sans text-xs uppercase tracking-wider px-4 py-1.5 rounded-full inline-block font-bold shadow-md">
                SJO LABS • ACCEPTING NEW CLIENTS
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#00F0FF] leading-tight drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                Ready to engineer your digital growth?
              </h2>

              <p className="font-sans text-sm md:text-base text-[#94A3B8] leading-relaxed max-w-lg">
                Let&apos;s discuss how SJO LABS can accelerate your business through high-velocity Web Design, Web Architecture, AI Automations, AI Phone Agents, and AI Search Visibility.
              </p>

              <div className="space-y-3 pt-2 font-sans">
                <div className="flex items-center space-x-3 text-xs md:text-sm text-[#F8FAFC]">
                  <span className="material-symbols-outlined text-[#00F0FF] text-base">check_circle</span>
                  <span>Guaranteed response within 24 business hours</span>
                </div>
                <div className="flex items-center space-x-3 text-xs md:text-sm text-[#F8FAFC]">
                  <span className="material-symbols-outlined text-[#00F0FF] text-base">check_circle</span>
                  <span>Direct working access with senior engineers &amp; strategists</span>
                </div>
                <div className="flex items-center space-x-3 text-xs md:text-sm text-[#F8FAFC]">
                  <span className="material-symbols-outlined text-[#00F0FF] text-base">check_circle</span>
                  <span>Transparent starting prices with zero hidden fees</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6">
              <div className="bg-[#131927] rounded-2xl p-6 md:p-8 border border-[#1E293B] text-left">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <span className="material-symbols-outlined text-5xl text-[#00F0FF]">
                      task_alt
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Inquiry Received!
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-[#94A3B8]">
                      Thank you for reaching out to SJO LABS. Our team will review your project requirements and follow up within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                    <h3 className="font-serif text-xl font-bold text-white mb-2">
                      Start A Project Inquiry
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Alexander Wright"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#090D16] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">Work Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="alexander@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#090D16] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">Business Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Wright Enterprise LLC"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className="w-full bg-[#090D16] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">Country *</label>
                        <select
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value as LeadCountry })}
                          className="w-full bg-[#090D16] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF]"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">Service Needed *</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value as LeadService })}
                          className="w-full bg-[#090D16] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF]"
                        >
                          <option value="Web Development">Web Development (From $500)</option>
                          <option value="Web Design">Web Design (From $500)</option>
                          <option value="WordPress">WordPress (From $400)</option>
                          <option value="AI Chatbot">AI Chatbot (From $150)</option>
                          <option value="AI Automation">AI Automation (From $200)</option>
                          <option value="AI Phone Agent">AI Phone Agent (From $250)</option>
                          <option value="AI Search Visibility">AI Search Visibility (From $200)</option>
                          <option value="Not sure">Not sure / Need consultation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">Approximate Budget *</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value as LeadBudget })}
                          className="w-full bg-[#090D16] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF]"
                        >
                          <option value="Under $200">Under $200</option>
                          <option value="$200–$499">$200–$499</option>
                          <option value="$500–$999">$500–$999</option>
                          <option value="$1,000–$1,500">$1,000–$1,500</option>
                          <option value="$1,500+">$1,500+</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#94A3B8] mb-1">Project Details *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your business, what you need, and what you'd like the website or automation to accomplish."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#090D16] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF]"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] font-bold text-xs md:text-sm py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.35)] uppercase tracking-wider mt-2"
                    >
                      Send Project Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
