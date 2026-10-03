'use client';

import React from 'react';
import Image from 'next/image';

export default function ZilkanTestimonials() {
  const reviews = [
    {
      quote:
        '“SJO LABS completely transformed our digital presence. Our landing page conversion rate increased by 280% within 60 days of launch. Their web and AI automation team is exceptionally sharp.”',
      author: 'Marcus Vance',
      role: 'CEO & Co-Founder',
      company: 'Architectura Group',
      avatar: '/images/creative-work.jpg',
      rating: 5,
    },
    {
      quote:
        '“The level of craft, speed, and strategic thinking is unmatched. They engineered our iOS mobile app and automated our CRM lead routing effortlessly. Monolithic execution.”',
      author: 'Elena Rostova',
      role: 'Head of Product',
      company: 'Lumen AI Labs',
      avatar: '/images/hero-team.jpg',
      rating: 5,
    },
    {
      quote:
        '“SJO LABS managed our Google & Meta Ads campaigns alongside our website rebuild. Our ROAS scaled to 4.2x in less than two months. Absolutely elite growth partners.”',
      author: 'David Chen',
      role: 'Managing Partner',
      company: 'Vertex Ventures',
      avatar: '/images/creative-work.jpg',
      rating: 5,
    },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-24 px-6 md:px-12 border-t border-[#E2E8F0]" id="reviews">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F172A] tracking-tight uppercase">
            WHAT FOUNDERS <span className="font-bold text-[#2563EB]">SAY ABOUT SJO LABS</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#64748B] mt-3">
            Real feedback from high-growth companies and industry leaders.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-[#00F0FF] transition-all duration-300"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center space-x-1 mb-6 text-[#2563EB]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm text-[#2563EB]">
                      star
                    </span>
                  ))}
                </div>

                <p className="font-serif text-base md:text-lg text-[#0F172A] italic leading-relaxed mb-8">
                  {rev.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-[#F1F5F9]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#2563EB]/30 shrink-0">
                  <Image
                    src={rev.avatar}
                    alt={rev.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0F172A]">
                    {rev.author}
                  </h4>
                  <p className="font-sans text-xs text-[#64748B]">
                    {rev.role} • <span className="font-medium text-[#2563EB]">{rev.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
