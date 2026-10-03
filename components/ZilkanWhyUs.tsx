'use client';

import React from 'react';
import Image from 'next/image';

export default function ZilkanWhyUs() {
  const cards = [
    {
      title: 'Integrated Engineering',
      description:
        'Our team builds digital products from the ground up, uniting Web Design, Mobile Apps, Autonomous AI Automation, and Paid Ads into a unified growth engine.',
      image: '/images/hero-team.jpg',
    },
    {
      title: 'Top 10% Senior Talent',
      description:
        'We work exclusively with elite engineers and senior designers to guarantee flawless code quality, hyper-responsive UI/UX, and rapid sprint execution.',
      image: '/images/creative-work.jpg',
    },
    {
      title: 'Monolithic Efficiency',
      description:
        'We stay lean by design. A focused, senior-led studio team ensures direct founder communication, no unnecessary agency bloat, and total transparency.',
      image: '/images/hero-team.jpg',
    },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-24 px-6 md:px-12 border-t border-[#E2E8F0]" id="about">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F172A] tracking-tight uppercase">
            WHY SJO LABS <span className="font-bold text-[#2563EB]">IS DIFFERENT</span>
          </h2>
        </div>

        {/* 3 Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-[#00F0FF] transition-all duration-300"
            >
              <div>
                <div className="relative w-full h-[180px] sm:h-[200px] rounded-2xl overflow-hidden mb-6 border border-[#E2E8F0]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#0F172A] mb-3">
                  {card.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#64748B] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
