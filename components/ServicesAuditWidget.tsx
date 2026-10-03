'use client';

import React, { useState } from 'react';

export default function ServicesAuditWidget() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteUrl && email) {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0],
          email: email,
          message: `Audit Request for ${websiteUrl}`,
          website_url: websiteUrl,
          service: 'Infrastructure & Ad Attribution Audit',
          source_page: '/services#audit',
        }),
      }).catch(err => console.error('Audit contact dispatch error:', err));

      setSubmitted(true);
    }
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="bg-[#090D16] text-[#F8FAFC] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 border border-[#00F0FF]/30 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -bottom-20 -left-20 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-[11px] sm:text-xs font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
                Complimentary Audit
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
              Get a Free Infrastructure &amp; Ad Attribution Audit
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base leading-relaxed">
              Enter your website URL to request a telemetry report. We will audit your site’s Core Web Vitals, TTFB speed, mobile rendering, and server-side CAPI pixel health.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#101726] p-5 sm:p-8 rounded-2xl border border-[#1E293B]">
            {submitted ? (
              <div className="text-center py-4 sm:py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center font-bold text-2xl mx-auto border border-[#00F0FF]">
                  ✓
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Audit Request Queued!</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Our automated telemetry scanner is processing <strong className="text-[#00F0FF] break-all">{websiteUrl}</strong>. Your executive report will be sent to <strong className="text-white break-all">{email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] sm:text-xs font-mono text-[#94A3B8] uppercase block mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://yourcompany.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-[#090D16] border border-[#1E293B] focus:border-[#00F0FF] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-mono text-[#94A3B8] uppercase block mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#090D16] border border-[#1E293B] focus:border-[#00F0FF] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] mt-2"
                >
                  Generate Telemetry Audit Report →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
