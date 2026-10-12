'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  SPOTS_LEFT,
  SPOTS_TOTAL,
  PRICE_NGN,
  PRICE_USD,
  DELIVERY_DAYS,
  WHATSAPP,
  PORTFOLIO_URL,
} from '@/lib/offer-bot/offer-config';
import { normalizePhoneNumber } from '@/lib/offer-bot/phone';
import OfferChatWidget from '@/components/offer-chat/OfferChatWidget';

// ==========================================
// CONFIGURATION BLOCK (Sourced from offer-config)
// ==========================================
const CONFIG = {
  SPOTS_LEFT,
  SPOTS_TOTAL,
  DELIVERY_DAYS,
  WHATSAPP,
  whatsappNumber: WHATSAPP,
  instagramHandle: '@sjolabs',
  instagramUrl: 'https://instagram.com/sjolabs',
  portfolioUrl: PORTFOLIO_URL,
  priceNGN: `₦${PRICE_NGN}`,
  priceUSD: `≈ $${PRICE_USD}`,
  showTestimonials: false,
  defaultWaMessage:
    `Hi Shepherd, I'd like to claim one of the founding-client spots for ₦${PRICE_NGN}.`,
};

const getWaLink = (customMsg?: string) => {
  const msg = customMsg || CONFIG.defaultWaMessage;
  return `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;
};

export default function FoundingLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const triggerRef = useRef<HTMLElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement | null>(null);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      const timer = setTimeout(() => {
        setMobileMenuVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setMobileMenuVisible(false);
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
    setTimeout(() => {
      setMobileMenuOpen(false);
      hamburgerBtnRef.current?.focus();
    }, 250);
  };

  // Lock body scroll for mobile drawer
  useEffect(() => {
    if (mobileMenuOpen && !modalOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!modalOpen) {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen, modalOpen]);

  // Focus trap, Escape key, and resize listener for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const timer = setTimeout(() => {
      firstNavLinkRef.current?.focus();
    }, 60);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      } else if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessType: '',
    whatsapp: '',
    socialLink: '',
    botField: '',
  });

  const getBadgeText = () => {
    if (CONFIG.SPOTS_LEFT > 1) {
      return `${CONFIG.SPOTS_LEFT} of ${CONFIG.SPOTS_TOTAL} founding spots open`;
    }
    if (CONFIG.SPOTS_LEFT === 1) {
      return '1 founding spot left';
    }
    return 'Founding spots are full. Join the waitlist';
  };

  const openModal = (e?: React.MouseEvent) => {
    if (e && e.currentTarget) {
      triggerRef.current = e.currentTarget as HTMLElement;
    }
    setModalOpen(true);
    setFormError(null);
    setFormSuccess(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => firstInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [modalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const normalizedPhone = normalizePhoneNumber(formData.whatsapp);
    if (!normalizedPhone) {
      setFormError("Please enter a valid WhatsApp number. Include your country code if you're outside Nigeria, e.g. +44.");
      return;
    }

    setIsSubmitting(true);

    try {
      const body = new URLSearchParams({
        'form-name': 'founding-lead',
        'bot-field': formData.botField,
        'name': formData.name.trim(),
        'businessName': formData.businessName.trim(),
        'businessType': formData.businessType.trim(),
        'whatsapp': normalizedPhone,
        'socialLink': formData.socialLink.trim(),
        'spotsLeftAtSubmit': String(CONFIG.SPOTS_LEFT),
      });

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) {
        throw new Error('Network error sending request.');
      }

      // Dispatch Telegram notification for claim form lead
      fetch('/api/offer-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'claim_form',
          name: formData.name.trim(),
          business: formData.businessName.trim(),
          what_it_does: formData.businessType.trim(),
          whatsapp: normalizedPhone,
          honeypot: formData.botField,
        }),
      }).catch((e) => console.warn('Offer claim Telegram dispatch error:', e));

      setFormSuccess(true);
      setIsSubmitting(false);

      const customMsg = `Hi Shepherd! My name is ${formData.name.trim()} (${formData.businessName.trim()} - ${formData.businessType.trim()}). My WhatsApp is ${normalizedPhone}. I'd like to confirm my founding-client spot!`;
      const waUrl = getWaLink(customMsg);

      setTimeout(() => {
        window.location.href = waUrl;
      }, 3000);
    } catch (err) {
      setIsSubmitting(false);
      setFormError('Request failed to send. Please check your connection and try again.');
    }
  };

  // Structured Data (JSON-LD)
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://sjolabs.site/#organization',
        name: 'SJOlabs',
        url: 'https://sjolabs.site',
        logo: 'https://sjolabs.site/images/sjo-labs-logo.png',
        image: 'https://sjolabs.site/hero.jpg',
        description:
          'SJOlabs provides conversion-focused websites, custom 24/7 AI chatbots, and AI-search optimization for small business owners.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lagos',
          addressCountry: 'NG',
        },
        founder: {
          '@type': 'Person',
          name: 'Shepherd John',
          jobTitle: 'Freelance Web Designer & AI Automation Builder',
        },
        offers: {
          '@type': 'Offer',
          name: 'Founding Client Website & AI Chatbot Package',
          price: '150000',
          priceCurrency: 'NGN',
          availability: 'https://schema.org/LimitedAvailability',
          validThrough: '2026-12-31',
          description:
            'Complete conversion website, AI chatbot, AI-search setup, domain and hosting included for 5 founding clients.',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Why is the founding-client price so low (${CONFIG.priceNGN})?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `I am launching a new portfolio series focused on AI-powered business websites. To build strong case studies quickly, I am offering the complete website build, AI chatbot integration, and AI-search markup at cost (${CONFIG.priceNGN} covers your domain and hosting). In return, you agree to give an honest review upon delivery.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Who is this offer for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This is built for small business owners who get traffic or social media inquiries but lose leads because they do not have a structured website or cannot reply to questions 24/7.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need any technical skills to run this?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'None at all. I handle the domain setup, hosting configuration, website design, and AI chatbot training for you. Once launched, it runs automatically.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will my business show up on ChatGPT, Perplexity, and Gemini?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'I optimize your website code with structured schemas (JSON-LD entity data) and an /llms.txt file so AI crawlers can cleanly read, index, and understand your services. While no developer can ethically guarantee AI search rankings or specific placement, your site will be built using current AI-search standards.',
            },
          },
          {
            '@type': 'Question',
            name: "What if I'm not happy with the preview?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We review the initial design before going live. If it does not meet your expectations during the preview phase, we adjust it until it aligns with your brand goals before launch.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens after I submit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "I'll message you on WhatsApp to confirm your spot, learn about your business, and set up your free preview.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#120C08] text-[#F3E9DC] font-sans antialiased selection:bg-[#F29A1F] selection:text-[#120C08] pb-24 md:pb-0 overflow-x-hidden relative w-full">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Anton&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-display {
          font-family: 'Anton', sans-serif;
          letter-spacing: 0.03em;
        }
        .font-script {
          font-family: 'Allura', cursive;
        }
        
        .amber-glow {
          box-shadow: 0 0 25px rgba(242, 154, 31, 0.25);
        }
        .amber-glow-btn {
          box-shadow: 0 0 15px rgba(242, 154, 31, 0.3);
          transition: all 0.25s ease;
        }
        .amber-glow-btn:hover {
          box-shadow: 0 0 28px rgba(242, 154, 31, 0.55);
          transform: translateY(-2px);
        }
        .panel-border {
          border: 1px solid rgba(242, 154, 31, 0.16);
        }
        .panel-border-hover:hover {
          border-color: rgba(242, 154, 31, 0.45);
        }
        
        @media (prefers-reduced-motion: reduce) {
          #mobile-side-drawer {
            transition: opacity 150ms ease-out !important;
            transform: none !important;
          }
          #mobile-side-drawer a,
          #mobile-side-drawer div {
            transition: none !important;
            transition-delay: 0ms !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ==========================================
          1. TOP NAVIGATION
         ========================================== */}
      <header className="sticky top-0 z-40 bg-[#120C08]/90 backdrop-blur-md border-b border-[#2D1E16]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-[#F29A1F]/10 border border-[#F29A1F]/40 flex items-center justify-center text-[#F29A1F] text-lg font-bold group-hover:bg-[#F29A1F] group-hover:text-[#120C08] transition-all">
              👑
            </span>
            <span className="font-display text-2xl tracking-wider text-[#F3E9DC] uppercase">
              SJO<span className="text-[#F29A1F]">labs</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B7A793]">
            <a href="#overview" className="hover:text-[#F29A1F] transition-colors">
              Overview
            </a>
            <a href="#whats-inside" className="hover:text-[#F29A1F] transition-colors">
              What's Inside
            </a>
            <a href="#proof" className="hover:text-[#F29A1F] transition-colors">
              My Work
            </a>
            <a href="#faq" className="hover:text-[#F29A1F] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={openModal}
              className="amber-glow-btn px-5 py-2.5 rounded-lg bg-[#1B130D] border border-[#F29A1F] text-[#F29A1F] text-sm font-semibold tracking-wide flex items-center gap-2"
            >
              <span>Claim a spot</span>
              <span>→</span>
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            ref={hamburgerBtnRef}
            onClick={() => (mobileMenuOpen ? closeMobileMenu() : openMobileMenu())}
            className="md:hidden p-2.5 text-[#F3E9DC] hover:text-[#F29A1F] focus:outline-none rounded-lg focus:ring-1 focus:ring-[#F29A1F]/50 transition-colors z-40"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-side-drawer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* ==========================================
          MOBILE SIDE DRAWER & BACKDROP (RIGHT SLIDE)
         ========================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop Overlay */}
          <div
            onClick={closeMobileMenu}
            aria-hidden="true"
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[4px] transition-opacity duration-300 ease-out ${
              mobileMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Side Drawer */}
          <div
            id="mobile-side-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className={`fixed inset-y-0 right-0 z-50 h-full w-[82vw] max-w-[360px] bg-[#1B130D] border-l border-[#2D1E16] flex flex-col justify-between shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,0.8,0.3,1)] ${
              mobileMenuVisible
                ? 'translate-x-0 opacity-100 pointer-events-auto'
                : 'translate-x-full opacity-0 pointer-events-none'
            }`}
            style={{
              boxShadow: '-20px 0 60px rgba(242,154,31,0.08)',
            }}
          >
            {/* Drawer Header Row (Close Button at Top Right) */}
            <div className="h-20 px-6 flex items-center justify-between border-b border-[#2D1E16]/80 shrink-0">
              <span className="font-display text-xl tracking-wider text-[#F3E9DC] uppercase">
                SJO<span className="text-[#F29A1F]">labs</span>
              </span>
              <button
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="p-2 text-[#B7A793] hover:text-[#F3E9DC] text-xl font-bold rounded-lg hover:bg-[#120C08] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Drawer Content (Left-aligned, Stacked Links & Bottom CTA) */}
            <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
              <nav className="space-y-5 flex flex-col">
                {[
                  { href: '#overview', label: 'Overview' },
                  { href: '#whats-inside', label: "What's Inside" },
                  { href: '#proof', label: 'My Work' },
                  { href: '#faq', label: 'FAQ' },
                ].map((item, idx) => (
                  <a
                    key={item.href}
                    ref={idx === 0 ? firstNavLinkRef : undefined}
                    href={item.href}
                    onClick={() => closeMobileMenu()}
                    className={`text-[#F3E9DC] hover:text-[#F29A1F] text-lg font-medium tracking-wide py-1 text-left transition-all duration-300 ${
                      mobileMenuVisible
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: mobileMenuVisible ? `${120 + idx * 40}ms` : '0ms',
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Full Width Bottom Action Button */}
              <div
                className={`pt-6 transition-all duration-300 ${
                  mobileMenuVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
                style={{
                  transitionDelay: mobileMenuVisible ? '280ms' : '0ms',
                }}
              >
                <button
                  onClick={(e) => {
                    closeMobileMenu();
                    setTimeout(() => openModal(e), 220);
                  }}
                  className="amber-glow-btn w-full h-13 py-3.5 px-5 rounded-xl bg-[#1B130D] border border-[#F29A1F] text-[#F29A1F] font-bold text-sm tracking-wide flex items-center justify-center gap-2"
                >
                  <span>Claim a spot</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          2. HERO SECTION
         ========================================== */}
      <section id="hero" className="relative pt-12 pb-20 md:py-24 overflow-hidden bg-[linear-gradient(to_right,#120C08_0%,#120C08_35%,#0A0604_65%,#000000_90%)]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F29A1F]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-[#E8A33D]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Kicker Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B130D] border border-[#F29A1F]/30 text-[#F29A1F] text-xs font-semibold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#F29A1F] animate-pulse" />
                <span>WEBSITE + AI CHATBOT FOR BUSINESS OWNERS</span>
              </div>

              {/* Headline */}
              <div className="relative pt-6 sm:pt-8">
                {/* Script Accent "always open" — Positioned above-right with 16px+ clearance from kicker & headline */}
                <span className="font-script text-3xl sm:text-5xl lg:text-6xl text-[#E8A33D] absolute top-0 right-0 sm:right-2 lg:right-4 rotate-[-4deg] pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] z-20">
                  always open
                </span>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-[#F3E9DC] uppercase tracking-wide">
                  A WEBSITE <br />
                  THAT WORKS <br />
                  <span className="text-[#F29A1F]">WHILE YOU SLEEP</span>
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-[#D4C5B3] max-w-xl leading-[1.6]">
                A professional website and an AI chatbot that answers questions, captures leads and keeps customers engaged around the clock, so you stop losing business when you're busy or offline.
              </p>

              {/* Primary & Secondary Buttons Stack */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={openModal}
                    className="amber-glow-btn h-14 px-4 sm:px-8 rounded-xl bg-[#1B130D] border-2 border-[#F29A1F] text-[#F29A1F] font-bold text-base tracking-wide flex items-center justify-center gap-3"
                  >
                    <span className="whitespace-nowrap">Claim a founding spot</span>
                    <span className="text-xl">→</span>
                  </button>

                  <a
                    href="#what-is-this"
                    className="h-14 px-6 rounded-xl border border-[#2D1E16] bg-[#120C08]/80 text-[#B7A793] hover:text-[#F3E9DC] hover:border-[#F29A1F]/40 font-medium text-sm flex items-center justify-center gap-3 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#F29A1F]/15 border border-[#F29A1F]/40 flex items-center justify-center text-[#F29A1F] text-xs">
                      ▶
                    </span>
                    <span>See how it works</span>
                  </a>
                </div>

                {/* Free Preview Line */}
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-[#B7A793] pt-1">
                  <span className="text-[#F29A1F] font-bold text-sm">✓</span>
                  <span>Free preview before you commit.</span>
                </div>
              </div>

              {/* Price / Scarcity Line */}
              <div className="pt-3 text-[15px] sm:text-base text-[#F3E9DC] leading-snug">
                Founding price: <strong className="text-[#F29A1F] font-bold">{CONFIG.priceNGN}</strong> ({CONFIG.priceUSD}). Covers your domain and hosting. {CONFIG.SPOTS_LEFT} spots open.
              </div>
            </div>

            {/* Right Portrait Column (Blended Cutout Image, Pure Black Background Alignment) */}
            <div className="lg:col-span-5 relative flex items-end justify-center pt-8 lg:pt-0">
              {/* Standalone Soft Amber Radial Glow Div Behind Portrait (Unclipped by Image) */}
              <div
                className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[130%] h-[130%] pointer-events-none z-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 35%, rgba(242,154,31,0.22) 0%, rgba(242,154,31,0.06) 45%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Faint Texture Overlay */}
              <div className="absolute inset-0 bg-repeat opacity-[0.025] pointer-events-none bg-[radial-gradient(#F29A1F_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 max-w-sm sm:max-w-md lg:max-w-none text-center">
                {/* Cutout Image with Feathered Mask & Lighten/Screen Blending */}
                <picture>
                  <source srcSet="/hero-cutout.png" type="image/png" />
                  <img
                    src="/hero-cutout.png"
                    alt="Shepherd John, founder and AI automation builder"
                    width={500}
                    height={600}
                    fetchPriority="high"
                    decoding="async"
                    className="w-auto h-auto max-h-[440px] sm:max-h-[500px] lg:max-h-[540px] mx-auto object-contain transition-all duration-300"
                    style={{
                      mixBlendMode: 'lighten',
                      maskImage:
                        'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage:
                        'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
                      WebkitMaskComposite: 'destination-in',
                      maskComposite: 'intersect',
                    }}
                  />
                </picture>

                {/* Handwritten Signature Badge Overlay with Dark Soft Gradient Backdrop */}
                <div className="absolute bottom-0 inset-x-0 pt-8 pb-3 px-4 text-right pointer-events-none z-20 bg-gradient-to-t from-[#000000]/95 via-[#000000]/60 to-transparent rounded-b-xl">
                  <span className="font-script text-4xl sm:text-5xl text-[#F29A1F] block drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
                    Shepherd John
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#D4C5B3] block font-semibold drop-shadow-md [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
                    FOUNDER & AI AUTOMATION BUILDER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. BANNER STRIP BELOW HERO
         ========================================== */}
      <section className="bg-[#1B130D] border-y border-[#2D1E16] py-6 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-display text-lg sm:text-xl lg:text-2xl text-[#F3E9DC] tracking-wide uppercase">
            BUILT FOR BUSINESS OWNERS WHO ARE READY TO STOP LOSING LEADS WHILE THEY'RE BUSY.
          </p>
        </div>
      </section>

      {/* ==========================================
          4. "ONE SYSTEM THAT TURNS VISITORS INTO CLIENTS" SECTION
         ========================================== */}
      <section id="what-is-this" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3E9DC] uppercase tracking-wide leading-tight">
              ONE SYSTEM THAT TURNS VISITORS INTO CLIENTS
            </h2>
            <div className="w-16 h-1 bg-[#F29A1F] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Lead Paragraph for Mobile */}
            <div className="lg:hidden text-center space-y-4">
              <p className="text-lg sm:text-xl text-[#F3E9DC] font-medium leading-relaxed">
                I build you a fast, professional website and pair it with an AI chatbot trained on your business details, so customers get answers the moment they ask.
              </p>
            </div>

            {/* Browser Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="bg-[#1B130D] rounded-2xl p-4 sm:p-6 panel-border amber-glow">
                <div className="bg-[#120C08] rounded-xl border border-[#2D1E16] overflow-hidden shadow-2xl relative">
                  <div className="bg-[#1B130D] px-4 py-2.5 flex items-center justify-between border-b border-[#2D1E16]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#120C08] px-3 py-1 rounded-md border border-[#2D1E16]">
                      <span className="text-[10px] text-[#F29A1F]">🔒</span>
                      <span className="text-[11px] text-[#B7A793] font-mono">
                        yourbusiness.com
                      </span>
                    </div>
                    <div className="w-10" />
                  </div>

                  <div className="p-4 sm:p-5 space-y-4 relative min-h-[300px] sm:min-h-[340px]">
                    <div className="flex items-center justify-between pb-3 border-b border-[#2D1E16]/60">
                      <div className="h-3.5 w-20 bg-[#F29A1F]/25 rounded" />
                      <div className="flex gap-2">
                        <div className="h-3 w-10 bg-[#2D1E16] rounded" />
                        <div className="h-3 w-10 bg-[#2D1E16] rounded" />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="h-5 w-3/4 bg-[#F3E9DC]/15 rounded" />
                      <div className="h-3 w-1/2 bg-[#B7A793]/15 rounded" />
                      <div className="h-7 w-28 bg-[#F29A1F]/20 rounded-lg mt-3" />
                    </div>

                    <div className="mt-6 sm:absolute sm:bottom-3 sm:right-3 sm:left-3 bg-[#1B130D] border border-[#F29A1F]/45 rounded-xl p-3.5 shadow-2xl space-y-2.5">
                      <div className="flex items-center justify-between border-b border-[#2D1E16] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-xs text-[#F3E9DC]">AI Assistant</span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-medium">Online</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#B7A793]">
                          Example conversation
                        </span>
                      </div>

                      <div className="bg-[#120C08] p-2.5 rounded-lg border border-[#2D1E16] text-xs space-y-0.5">
                        <span className="text-[10px] text-[#B7A793] font-semibold block">Customer</span>
                        <p className="text-[#F3E9DC]">"Hi, are you available next week?"</p>
                      </div>

                      <div className="bg-[#F29A1F]/10 border border-[#F29A1F]/30 p-2.5 rounded-lg text-xs space-y-0.5">
                        <span className="text-[10px] text-[#F29A1F] font-semibold block">AI Assistant</span>
                        <p className="text-[#F3E9DC] leading-relaxed">
                          "Hi! Yes, we have openings next week. Can I get your name and WhatsApp number so we can confirm a time?"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 space-y-6">
              <p className="hidden lg:block text-lg sm:text-xl text-[#F3E9DC] font-medium leading-relaxed">
                I build you a fast, professional website and pair it with an AI chatbot trained on your business details, so customers get answers the moment they ask.
              </p>

              <div className="space-y-2">
                <p className="text-base text-[#D4C5B3] leading-relaxed">
                  I also set up your pages so AI tools like ChatGPT, Perplexity and Gemini can understand what your business does and who it serves.
                </p>
                <p className="text-xs text-[#B7A793] italic leading-normal">
                  No one can guarantee placement in AI answers. This gives your business the strongest foundation to be found.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#1B130D] p-5 rounded-xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#F3E9DC] mb-1">Convert visitors</h4>
                    <p className="text-[14.5px] text-[#D4C5B3] leading-snug">Turn visitors into real enquiries.</p>
                  </div>
                </div>

                <div className="bg-[#1B130D] p-5 rounded-xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#F3E9DC] mb-1">Reply instantly</h4>
                    <p className="text-[14.5px] text-[#D4C5B3] leading-snug">Answer customer questions in seconds, at any hour.</p>
                  </div>
                </div>

                <div className="bg-[#1B130D] p-5 rounded-xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v4m-2-2h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#F3E9DC] mb-1">Get found by AI</h4>
                    <p className="text-[14.5px] text-[#D4C5B3] leading-snug">Set up so AI tools can understand your business.</p>
                  </div>
                </div>

                <div className="bg-[#1B130D] p-5 rounded-xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#F3E9DC] mb-1">Capture every lead</h4>
                    <p className="text-[14.5px] text-[#D4C5B3] leading-snug">Every enquiry is saved and sent straight to you.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#whats-inside"
                  className="text-sm font-semibold text-[#F29A1F] hover:text-[#E8A33D] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>See everything included</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. "WHAT'S INSIDE" SECTION
         ========================================== */}
      <section id="whats-inside" className="py-20 bg-[#1B130D]/60 border-y border-[#2D1E16] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-5xl text-[#F3E9DC] uppercase tracking-wide">
              WHAT'S INSIDE
            </h2>
            <div className="w-16 h-1 bg-[#F29A1F] mx-auto mt-3 rounded-full" />
            <p className="text-base text-[#D4C5B3] mt-3 leading-relaxed">
              Everything included in your {CONFIG.priceNGN} founding-client package.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  Conversion website
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  A fast, mobile-friendly website built to guide visitors to contact you or book.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  AI chatbot
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  An assistant trained on your services that answers common questions and collects customer details, day and night.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  AI-search setup
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  Your pages are structured so ChatGPT, Perplexity and Gemini can understand and cite your business.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  Lead capture
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  Every enquiry reaches you instantly, so you can follow up fast.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  Domain and hosting
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  Your own web address and hosting, set up and connected for you.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  Launch and revisions
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  Live within 7-10 days of receiving your content, with revisions and direct support through launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. PROOF SECTION ("HOW I EARN YOUR TRUST")
         ========================================== */}
      <section id="proof" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-5xl text-[#F3E9DC] uppercase tracking-wide">
              HOW I EARN YOUR TRUST
            </h2>
            <div className="w-16 h-1 bg-[#F29A1F] mx-auto mt-3 rounded-full" />
            <p className="text-base text-[#D4C5B3] mt-3 leading-relaxed">
              You can check my work, see your site first, and pay only for your domain and hosting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  See my work
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  Browse real projects and judge the quality for yourself.
                </p>
              </div>

              <a
                href={CONFIG.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="amber-glow-btn w-full py-3 rounded-xl bg-[#120C08] border border-[#F29A1F] text-[#F29A1F] font-bold text-sm tracking-wide flex items-center justify-center gap-2"
              >
                <span>Visit SJOlabs.site/work</span>
                <span>↗</span>
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  See a preview first
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  Get a free preview of your site before you commit to anything.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1B130D] p-[22px] rounded-2xl panel-border panel-border-hover transition-all flex flex-col justify-between h-full space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F29A1F]/10 border border-[#F29A1F]/30 flex items-center justify-center text-[#F29A1F]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[17px] text-[#F3E9DC]">
                  Honest review exchange
                </h3>
                <p className="text-[14.5px] text-[#CDBFAA] leading-relaxed">
                  You pay {CONFIG.priceNGN} for your domain and hosting. In return, you share an honest review and let me feature your project in my portfolio.
                </p>
              </div>
            </div>
          </div>

          {/* Centered CTA Row */}
          <div className="mt-14 text-center space-y-3">
            <button
              onClick={openModal}
              className="amber-glow-btn inline-flex h-14 px-8 rounded-xl bg-[#1B130D] border-2 border-[#F29A1F] text-[#F29A1F] font-bold text-base tracking-wide items-center justify-center gap-3"
            >
              <span>Claim a founding spot</span>
              <span className="text-xl">→</span>
            </button>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#B7A793]">
              <span className="text-[#F29A1F] font-bold">✓</span>
              <span>{CONFIG.SPOTS_LEFT} spots open. Free preview before you commit.</span>
            </div>
          </div>

          {/* Hidden Testimonial Component */}
          {CONFIG.showTestimonials && (
            <div className="mt-12 p-6 bg-[#1B130D] rounded-2xl panel-border max-w-xl mx-auto text-left space-y-3">
              <div className="flex items-center gap-1 text-[#F29A1F] text-sm">
                ★ ★ ★ ★ ★
              </div>
              <p className="text-sm italic text-[#F3E9DC]">
                "[Future Client Review Placeholder — Will display verified business owner feedback once founding spots launch]."
              </p>
              <p className="text-xs font-bold text-[#B7A793]">
                — Verified Founding Client
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          7. FREQUENTLY ASKED QUESTIONS (FAQ)
         ========================================== */}
      <section id="faq" className="py-20 bg-[#1B130D]/40 border-t border-[#2D1E16] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-5xl text-[#F3E9DC] uppercase tracking-wide">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="w-16 h-1 bg-[#F29A1F] mx-auto mt-3 rounded-full" />
          </div>

          <div className="space-y-4">
            {[
              {
                q: `Why is the founding-client price so low (${CONFIG.priceNGN})?`,
                a: `I am launching a new portfolio series focused on AI-powered business websites. To build strong case studies quickly, I am offering the complete website build, AI chatbot integration, and AI-search markup at cost (${CONFIG.priceNGN} covers your domain and hosting). In return, you agree to give an honest review upon delivery.`,
              },
              {
                q: 'Who is this offer for?',
                a: 'This is built for small business owners who get traffic or social media inquiries but lose leads because they do not have a structured website or cannot reply to questions 24/7.',
              },
              {
                q: 'Do I need any technical skills to run this?',
                a: 'None at all. I handle the domain setup, hosting configuration, website design, and AI chatbot training for you. Once launched, it runs automatically.',
              },
              {
                q: 'Will my business show up on ChatGPT, Perplexity, and Gemini?',
                a: 'I optimize your website code with structured schemas (JSON-LD entity data) and an /llms.txt file so AI crawlers can cleanly read, index, and understand your services. While no developer can ethically guarantee AI search rankings or specific placement, your site will be built using current AI-search standards.',
              },
              {
                q: "What if I'm not happy with the preview?",
                a: 'We review the initial design before going live. If it does not meet your expectations during the preview phase, we adjust it until it aligns with your brand goals before launch.',
              },
              {
                q: 'What happens after I submit?',
                a: "I'll message you on WhatsApp to confirm your spot, learn about your business, and set up your free preview.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-[#1B130D] rounded-xl border border-[#2D1E16] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left font-bold text-base sm:text-lg text-[#F3E9DC] flex items-center justify-between gap-4 hover:text-[#F29A1F] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#F29A1F] text-xl font-mono">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-sm text-[#B7A793] leading-relaxed border-t border-[#2D1E16]/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          8. FINAL CALL TO ACTION (CTA)
         ========================================== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#2A180B] via-[#1B130D] to-[#120C08] border-2 border-[#F29A1F]/50 text-center space-y-8 amber-glow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#F29A1F]/20 blur-3xl pointer-events-none rounded-full" />

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F3E9DC] uppercase tracking-wide leading-tight max-w-3xl mx-auto">
              YOUR WEBSITE SHOULD WORK AS HARD AS YOU DO.
            </h2>

            <p className="text-base sm:text-lg text-[#B7A793] max-w-2xl mx-auto leading-relaxed">
              Stop letting potential clients visit your page and leave without getting in touch. Claim one of the 5 founding spots today before standard pricing resumes.
            </p>

            <div className="inline-block bg-[#120C08]/90 p-6 rounded-2xl border border-[#F29A1F]/40 space-y-2">
              <div className="text-xs text-[#B7A793] uppercase font-bold tracking-widest">
                Founding Client Package
              </div>
              <div className="text-3xl sm:text-4xl font-display text-[#F29A1F]">
                {CONFIG.priceNGN} <span className="text-base font-sans text-[#B7A793]">({CONFIG.priceUSD})</span>
              </div>
              <div className="text-xs text-[#F3E9DC]">
                One-time payment. Covers your domain & hosting setup.
              </div>
            </div>

            <div className="text-sm font-bold text-[#E8A33D] flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F29A1F] animate-ping" />
              <span>⚡ {CONFIG.SPOTS_LEFT} of {CONFIG.SPOTS_TOTAL} founding spots open</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={openModal}
                className="amber-glow-btn min-h-[56px] py-3.5 px-4 sm:px-10 rounded-xl bg-[#1B130D] border-2 border-[#F29A1F] text-[#F29A1F] font-bold text-base sm:text-lg tracking-wide flex items-center justify-center gap-2.5 w-full sm:w-auto text-center"
              >
                <span className="whitespace-nowrap">Claim a founding spot</span>
                <span className="text-xl">→</span>
              </button>

              <button
                onClick={openModal}
                className="min-h-[56px] py-3.5 px-5 sm:px-6 rounded-xl border border-[#2D1E16] bg-[#120C08] text-[#B7A793] hover:text-[#F3E9DC] hover:border-[#F29A1F]/50 font-medium text-sm transition-colors w-full sm:w-auto flex items-center justify-center text-center"
              >
                <span>Submit Form Enquiry First</span>
              </button>
            </div>

            <div className="pt-2 text-xs text-[#B7A793]">
              Prefer Instagram? DM me on Instagram at{' '}
              <a
                href={CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F29A1F] underline font-semibold"
              >
                {CONFIG.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          9. FOOTER BAR
         ========================================== */}
      <footer className="bg-[#120C08] border-t border-[#2D1E16] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="font-display text-2xl tracking-wider text-[#F3E9DC] uppercase block">
              SJO<span className="text-[#F29A1F]">labs</span>
            </span>
            <p className="text-xs text-[#B7A793]">
              Built by Shepherd John • Lagos, Nigeria
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#B7A793]">
            <a href="#hero" className="hover:text-[#F29A1F]">Overview</a>
            <a href="#whats-inside" className="hover:text-[#F29A1F]">What's Inside</a>
            <a href="#proof" className="hover:text-[#F29A1F]">My Work</a>
            <a href="#faq" className="hover:text-[#F29A1F]">FAQ</a>
          </div>

          <div className="text-xs text-[#B7A793]/80">
            © 2026 SJOlabs. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ==========================================
          10. STICKY MOBILE BOTTOM CTA BAR
         ========================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1B130D]/95 backdrop-blur-md border-t border-[#F29A1F]/40 px-4 py-3 flex items-center justify-between gap-3 md:hidden shadow-2xl w-full max-w-full">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-[#F3E9DC] truncate">
            {CONFIG.priceNGN} <span className="text-[#F29A1F] text-[10px] font-semibold">({CONFIG.SPOTS_LEFT} Spots Left)</span>
          </div>
          <div className="text-[10px] text-[#B7A793] truncate">Founding Client Offer</div>
        </div>
        <button
          onClick={openModal}
          className="amber-glow-btn px-4 py-2.5 rounded-lg bg-[#120C08] border border-[#F29A1F] text-[#F29A1F] text-xs font-bold flex items-center gap-1.5 shrink-0"
        >
          <span>Claim Spot</span>
          <span>→</span>
        </button>
      </div>

      {/* ==========================================
          11. FOUNDING SPOT REQUEST MODAL
         ========================================== */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            ref={modalRef}
            className="bg-[#1B130D] border border-[#F29A1F]/50 sm:rounded-2xl rounded-xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-[#B7A793] hover:text-[#F3E9DC] text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#120C08] transition-colors"
            >
              ✕
            </button>

            {/* Status Badge & Header */}
            <div className="space-y-3 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#120C08] border border-[#F29A1F]/30 text-[#F29A1F] text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#F29A1F] animate-pulse" />
                <span>{getBadgeText()}</span>
              </div>

              <h3 id="modal-title" className="font-display text-2xl sm:text-3xl text-[#F3E9DC] uppercase tracking-wide">
                {CONFIG.SPOTS_LEFT > 0 ? "You're one step away." : 'Founding spots are currently full.'}
              </h3>
              <p className="text-xs sm:text-sm text-[#B7A793] leading-relaxed">
                {CONFIG.SPOTS_LEFT > 0
                  ? "Tell me about your business and I'll confirm your spot on WhatsApp."
                  : "Leave your details and I'll notify you on WhatsApp if a spot opens up."}
              </p>
            </div>

            {/* Accessible Live Error Alert */}
            {formError && (
              <div
                aria-live="polite"
                className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-xs text-red-200 flex items-center justify-between gap-2"
              >
                <span>{formError}</span>
                <button
                  type="button"
                  onClick={() => setFormError(null)}
                  className="text-red-400 font-bold hover:underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Form vs Thank-You State */}
            {formSuccess ? (
              <div aria-live="polite" className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F29A1F]/20 border border-[#F29A1F] flex items-center justify-center text-[#F29A1F] text-2xl mx-auto">
                  ✓
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-lg text-[#F3E9DC]">
                    Thanks, {formData.name.trim()}. {CONFIG.SPOTS_LEFT > 0 ? 'Your request is in.' : "You're on the waitlist."}
                  </h4>
                  <p className="text-xs text-[#B7A793] leading-relaxed">
                    Tap the button below to send it on WhatsApp so I can confirm your spot and book your free preview.
                  </p>
                </div>

                <a
                  href={getWaLink(
                    `Hi Shepherd! My name is ${formData.name.trim()} (${formData.businessName.trim()} - ${formData.businessType.trim()}). My WhatsApp is ${formData.whatsapp}. I'd like to confirm my founding-client spot!`
                  )}
                  className="amber-glow-btn w-full h-12 rounded-xl bg-[#120C08] border-2 border-[#F29A1F] text-[#F29A1F] font-bold text-sm tracking-wide flex items-center justify-center gap-2"
                >
                  <span>Continue on WhatsApp</span>
                  <span>→</span>
                </a>

                <p className="text-[11px] text-[#B7A793] italic">
                  Opening WhatsApp in a few seconds...
                </p>
              </div>
            ) : (
              <form
                name="founding-lead"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleFormSubmit}
                className="space-y-4 text-left"
              >
                <input type="hidden" name="form-name" value="founding-lead" />
                <p className="hidden">
                  <label>
                    Don’t fill this out if you’re human:{' '}
                    <input
                      name="bot-field"
                      value={formData.botField}
                      onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                    />
                  </label>
                </p>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#F3E9DC] mb-1">
                    Your Name <span className="text-[#F29A1F]">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Adebayo Johnson"
                    className="w-full h-12 px-3.5 rounded-lg bg-[#120C08] border border-[#2D1E16] text-[#F3E9DC] text-sm focus:border-[#F29A1F] focus:ring-1 focus:ring-[#F29A1F] focus:outline-none transition-colors"
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#F3E9DC] mb-1">
                    Business Name <span className="text-[#F29A1F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Logistics"
                    className="w-full h-12 px-3.5 rounded-lg bg-[#120C08] border border-[#2D1E16] text-[#F3E9DC] text-sm focus:border-[#F29A1F] focus:ring-1 focus:ring-[#F29A1F] focus:outline-none transition-colors"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-xs font-semibold text-[#F3E9DC] mb-1">
                    What does your business do? <span className="text-[#F29A1F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    placeholder="e.g. Real estate agency, retail, consulting"
                    className="w-full h-12 px-3.5 rounded-lg bg-[#120C08] border border-[#2D1E16] text-[#F3E9DC] text-sm focus:border-[#F29A1F] focus:ring-1 focus:ring-[#F29A1F] focus:outline-none transition-colors"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-[#F3E9DC] mb-1">
                    WhatsApp Phone Number <span className="text-[#F29A1F]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g. 08012345678 or +2348012345678"
                    className="w-full h-12 px-3.5 rounded-lg bg-[#120C08] border border-[#2D1E16] text-[#F3E9DC] text-sm focus:border-[#F29A1F] focus:ring-1 focus:ring-[#F29A1F] focus:outline-none transition-colors"
                  />
                  <p className="text-xs text-[#B7A793] mt-1">
                    Include your country code if you're outside Nigeria, e.g. +44
                  </p>
                </div>

                {/* Social / Website Link (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-[#F3E9DC] mb-1">
                    Instagram or website link <span className="text-[#B7A793] font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.socialLink}
                    onChange={(e) => setFormData({ ...formData, socialLink: e.target.value })}
                    placeholder="e.g. @yourbusiness or yourbusiness.com"
                    className="w-full h-12 px-3.5 rounded-lg bg-[#120C08] border border-[#2D1E16] text-[#F3E9DC] text-sm focus:border-[#F29A1F] focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="amber-glow-btn w-full h-12 rounded-xl bg-[#120C08] border-2 border-[#F29A1F] text-[#F29A1F] font-bold text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#F29A1F] border-t-transparent animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>{CONFIG.SPOTS_LEFT > 0 ? 'Request my founding spot →' : 'Join the waitlist →'}</span>
                  )}
                </button>

                {/* Muted Privacy Note */}
                <p className="text-[11px] text-[#B7A793] text-center leading-relaxed pt-1">
                  Free preview before you commit. Your details are only used to contact you about this offer.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Founding Offer AI Chat Widget */}
      <OfferChatWidget />
    </div>
  );
}
