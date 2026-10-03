'use client';

import React, { useState } from 'react';

export default function BlogNewsletterBox() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <div className="bg-[#090D16] border border-[#1E293B] rounded-3xl p-8 sm:p-12 relative overflow-hidden text-[#F8FAFC]">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155]">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
          <span className="text-[11px] font-mono font-bold text-[#00F0FF] uppercase tracking-widest">
            SJO LABS DISPATCHES
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Get High-Velocity Engineering Field Notes Direct to Your Inbox.
        </h2>

        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl mx-auto">
          No marketing fluff. Just monthly deep-dives on sub-second TTFB, edge computing, autonomous lead triage pipelines, and CAPI attribution.
        </p>

        {status === 'success' ? (
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-sm space-y-2 animate-fade-in">
            <div className="text-base font-bold">✓ Subscribed Successfully to SJO Field Notes</div>
            <div className="text-xs text-[#94A3B8]">
              Check your inbox for our latest TTFB Optimization Playbook.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your work email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-5 py-3.5 bg-[#0F172A] border border-[#334155] rounded-xl text-sm font-sans text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-6 py-3.5 bg-[#00F0FF] text-[#090D16] font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20 whitespace-nowrap"
            >
              {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-[#64748B] pt-2">
          <span>🔒 Zero Spam Guarantee</span>
          <span>•</span>
          <span>⚡ Monthly Technical Dispatches</span>
          <span>•</span>
          <span>Unsubscribe Anytime</span>
        </div>
      </div>
    </div>
  );
}
