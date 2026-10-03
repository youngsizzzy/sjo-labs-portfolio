'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ZilkanNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Automatically close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full bg-[#090D16] text-[#F8FAFC] py-4 px-4 sm:px-6 md:px-12 border-b border-[#1E293B] sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex items-center justify-between font-sans text-xs md:text-sm tracking-wide">
        
        {/* Left: Mobile Hamburger Toggle + Desktop Nav */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#131927] border border-[#1E293B] text-[#00F0FF] hover:bg-[#1E293B] focus:outline-none transition-all"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl block">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center space-x-7 font-light text-[#94A3B8]">
            <Link href="/" className={`transition-colors ${isActive('/') ? 'text-[#00F0FF] font-medium' : 'hover:text-[#00F0FF]'}`}>Home</Link>
            <Link href="/services" className={`transition-colors ${isActive('/services') ? 'text-[#00F0FF] font-medium' : 'hover:text-[#00F0FF]'}`}>Services</Link>
            <Link href="/work" className={`transition-colors ${isActive('/work') ? 'text-[#00F0FF] font-medium' : 'hover:text-[#00F0FF]'}`}>Work</Link>
            <Link href="/process" className={`transition-colors ${isActive('/process') ? 'text-[#00F0FF] font-medium' : 'hover:text-[#00F0FF]'}`}>Process</Link>
            <Link href="/about" className={`transition-colors ${isActive('/about') ? 'text-[#00F0FF] font-medium' : 'hover:text-[#00F0FF]'}`}>About Us</Link>
            <Link href="/blog" className={`transition-colors ${isActive('/blog') ? 'text-[#00F0FF] font-medium' : 'hover:text-[#00F0FF]'}`}>Blog</Link>
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex-1 lg:flex-none text-center">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <img
              src="/images/sjo-labs-logo.png"
              alt="SJO LABS - Innovation Built for Impact"
              className="h-10 sm:h-14 md:h-18 w-auto object-contain block filter brightness-110 contrast-125 drop-shadow-[0_2px_12px_rgba(0,240,255,0.25)]"
            />
          </Link>
        </div>

        {/* Right: Tagline & CTA */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <span className="hidden md:inline-block text-[#94A3B8] text-xs font-light tracking-widest uppercase">
            Web • Apps • AI • Ads
          </span>
          <Link
            href="/#contact"
            className="bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* MOBILE SLIDE-DOWN NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed left-0 right-0 top-[65px] bg-[#090D16] border-b border-[#1E293B] shadow-2xl z-50 max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="p-6 space-y-6 max-w-md mx-auto font-sans">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest block mb-2 font-bold">
                NAVIGATION MENU
              </span>

              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Work', path: '/work' },
                { name: 'Process', path: '/process' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    isActive(link.path)
                      ? 'bg-[#131927] border-[#00F0FF]/40 text-[#00F0FF] font-bold'
                      : 'bg-[#0F172A]/60 border-[#1E293B] text-white hover:bg-[#1E293B]'
                  }`}
                >
                  <span className="text-sm font-medium">{link.name}</span>
                  <span className="material-symbols-outlined text-xs text-[#00F0FF]">chevron_right</span>
                </Link>
              ))}
            </div>

            {/* Quick 8 Services List on Mobile */}
            <div className="pt-4 border-t border-[#1E293B] space-y-2">
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest block mb-2 font-bold">
                OUR 8 PRIMARY SERVICES
              </span>
              <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
                {[
                  { name: 'Web Design & Development', slug: 'web-design-web-development' },
                  { name: 'Mobile App Development', slug: 'mobile-app-development' },
                  { name: 'WordPress', slug: 'wordpress' },
                  { name: 'AI Automation', slug: 'ai-automation' },
                  { name: 'AI Chatbots', slug: 'ai-chatbots' },
                  { name: 'AI Phone Agents', slug: 'ai-phone-agents' },
                  { name: 'AI Search Visibility', slug: 'ai-search-visibility' },
                  { name: 'Meta & Google Ads', slug: 'meta-google-ads' },
                ].map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg bg-[#131927]/80 text-[#94A3B8] hover:text-[#00F0FF] hover:bg-[#1E293B] transition-all flex items-center justify-between border border-[#1E293B]/60"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] text-[#00F0FF]">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="pt-2">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-[#00F0FF] text-[#090D16] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#00F0FF]/25"
              >
                <span>Start a Project</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


