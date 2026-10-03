'use client';

import React from 'react';
import Link from 'next/link';

export default function ZilkanFooter() {
  return (
    <footer className="w-full bg-[#090D16] text-[#F8FAFC] pt-14 pb-8 px-6 md:px-12 border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Streamlined Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand & Brief Description */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <img
                src="/images/sjo-labs-logo.png"
                alt="SJO LABS - Innovation Built for Impact"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain block filter brightness-110 contrast-125 drop-shadow-[0_2px_12px_rgba(0,240,255,0.25)]"
              />
            </Link>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md leading-relaxed font-sans">
              High-velocity digital agency building sub-second web architecture, native mobile applications, autonomous AI workflows, and paid acquisition engines.
            </p>
          </div>

          {/* Quick Essential Navigation */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 font-sans text-xs sm:text-sm">
            {/* Services Column */}
            <div>
              <h4 className="font-mono font-bold text-[#00F0FF] uppercase tracking-wider text-[11px] mb-3">
                SERVICES
              </h4>
              <ul className="space-y-1.5 text-[#94A3B8] text-xs">
                <li><Link href="/services/web-design-web-development" className="hover:text-white transition-colors">Web Design &amp; Development</Link></li>
                <li><Link href="/services/mobile-app-development" className="hover:text-white transition-colors">Mobile App Development</Link></li>
                <li><Link href="/services/wordpress" className="hover:text-white transition-colors">WordPress</Link></li>
                <li><Link href="/services/ai-automation" className="hover:text-white transition-colors">AI Automation</Link></li>
                <li><Link href="/services/ai-chatbots" className="hover:text-white transition-colors">AI Chatbots</Link></li>
                <li><Link href="/services/ai-phone-agents" className="hover:text-white transition-colors">AI Phone Agents</Link></li>
                <li><Link href="/services/ai-search-visibility" className="hover:text-white transition-colors">AI Search Visibility</Link></li>
                <li><Link href="/services/meta-google-ads" className="hover:text-white transition-colors">Meta &amp; Google Ads</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-mono font-bold text-[#00F0FF] uppercase tracking-wider text-[11px] mb-3">
                COMPANY
              </h4>
              <ul className="space-y-2 text-[#94A3B8]">
                <li><Link href="/work" className="hover:text-white transition-colors">Selected Work</Link></li>
                <li><Link href="/process" className="hover:text-white transition-colors">Our Process</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About SJO LABS</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Technical Field Notes</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Clean Bottom Copyright & Legal Links */}
        <div className="pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4 font-mono">
          <div>
            Copyright © {new Date().getFullYear()} SJO LABS®. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
