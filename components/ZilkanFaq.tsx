'use client';

import React, { useState } from 'react';

export default function ZilkanFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast can SJO LABS kick off our project?',
      a: 'We intentionally limit our capacity to 2-3 new client engagements per month to maintain monolithic quality. Once our initial discovery call and agreement are signed, we can kick off within 3 business days.',
    },
    {
      q: 'What skills and services does SJO LABS provide?',
      a: 'We specialize in Web Design & Web Development (Next.js/React), Mobile App Development (iOS & Android), Autonomous AI Automation workflows, and Meta & Google Ads growth marketing.',
    },
    {
      q: 'Do we own all Figma design files and source code?',
      a: '100% yes. Upon project completion, all intellectual property, Figma component libraries, Github repositories, AI workflow scripts, and ad account assets are completely transferred to your organization.',
    },
    {
      q: 'How do you handle post-launch support & maintenance?',
      a: 'Every project includes 14 to 30 days of dedicated post-launch support and performance optimization. Clients who require continuous updates transition seamlessly into our Full Growth Retainer plan.',
    },
    {
      q: 'What technologies and platforms do you build with?',
      a: 'We engineer with Next.js 14/15, React, TypeScript, React Native/Flutter, Tailwind CSS, n8n/Make, Supabase, and Meta & Google Ads conversion API tracking to guarantee maximum speed and conversion.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-24 px-6 md:px-12 border-t border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F172A] tracking-tight uppercase">
            FREQUENTLY ASKED <span className="font-bold text-[#2563EB]">QUESTIONS</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#64748B] mt-3">
            Everything you need to know about working with SJO LABS.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden transition-all duration-200 hover:border-[#2563EB]"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-serif text-base md:text-lg font-bold text-[#0F172A]">
                    {faq.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#2563EB] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#00F0FF]' : ''
                    }`}
                  >
                    keyboard_arrow_down
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 font-sans text-xs md:text-sm text-[#64748B] leading-relaxed border-t border-[#F1F5F9] mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
