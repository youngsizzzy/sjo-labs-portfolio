'use client';

import React from 'react';
import Link from 'next/link';

export default function ZilkanPricing() {
  const plans = [
    {
      name: 'Studio Sprint',
      badge: '2-3 Weeks Delivery',
      desc: 'Fast, high-impact Web & Mobile App design and development sprint built for immediate market launch.',
      features: [
        'Custom UI/UX & Brand Identity',
        'Next.js High-Performance Build',
        'Mobile & Tablet Responsive',
        'SEO & Conversion Optimization',
        '14-Day Post-Launch Support',
      ],
      popular: false,
      cta: 'Start Sprint',
    },
    {
      name: 'Full Growth Retainer',
      badge: 'Most Popular',
      desc: 'Ongoing SJO LABS studio partnership covering Web, Mobile Apps, AI Automation & Meta/Google Ads.',
      features: [
        'Dedicated Senior Engineer & Designer',
        'Web, App, AI & Ads Execution',
        '48-72 Hour Average Turnaround',
        'Weekly Strategy & Alignment Syncs',
        'Priority Slack & Loom Communication',
      ],
      popular: true,
      cta: 'Book Studio Partnership',
    },
    {
      name: 'Enterprise Transformation',
      badge: 'Bespoke Architecture',
      desc: 'Full-scale custom engineering, autonomous AI workflows, and dedicated ad growth machinery.',
      features: [
        'Full Web & Platform Architecture',
        'Custom AI Agent & Pipeline Integration',
        'Meta & Google Ads Growth Management',
        'Dedicated Engineering Team',
        '24/7 SLA & Maintenance Guarantee',
      ],
      popular: false,
      cta: 'Request Enterprise Brief',
    },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-24 px-6 md:px-12 border-t border-[#E2E8F0]" id="pricing">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F172A] tracking-tight uppercase">
            ENGAGEMENT <span className="font-bold text-[#2563EB]">MODELS</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#64748B] mt-3">
            Flexible collaboration structures tailored to your scale and execution speed.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#090D16] text-[#F8FAFC] border-[#2563EB] shadow-2xl scale-105 z-10'
                  : 'bg-white text-[#0F172A] border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#00F0FF]'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`font-sans text-[11px] uppercase tracking-wider font-extrabold px-3.5 py-1 rounded-full ${
                      plan.popular
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#F1F5F9] text-[#2563EB]'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <h3
                  className={`font-serif text-2xl font-bold mb-3 ${
                    plan.popular ? 'text-[#00F0FF]' : 'text-[#0F172A]'
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`font-sans text-xs leading-relaxed mb-8 ${
                    plan.popular ? 'text-[#94A3B8]' : 'text-[#64748B]'
                  }`}
                >
                  {plan.desc}
                </p>

                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <span
                        className={`material-symbols-outlined text-sm ${
                          plan.popular ? 'text-[#00F0FF]' : 'text-[#2563EB]'
                        }`}
                      >
                        check_circle
                      </span>
                      <span
                        className={`font-sans text-xs font-semibold ${
                          plan.popular ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
                        }`}
                      >
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href="#contact"
                  className={`w-full inline-flex items-center justify-center font-sans text-xs md:text-sm font-bold py-3.5 rounded-full transition-all duration-200 ${
                    plan.popular
                      ? 'bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'bg-[#090D16] hover:bg-[#1E293B] text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
