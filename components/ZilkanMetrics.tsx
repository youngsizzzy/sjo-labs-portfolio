'use client';

import React from 'react';

export default function ZilkanMetrics() {
  const metrics = [
    { value: '$45M+', label: 'Client Revenue Generated', sub: 'Across digital builds & funnels' },
    { value: '3.2x', label: 'Average Conversion Lift', sub: 'Post-redesign performance' },
    { value: '99.4%', label: 'On-Time Delivery Rate', sub: 'Strict sprint milestones' },
    { value: '4.9 / 5.0', label: 'Client Satisfaction', sub: 'Based on 40+ client reviews' },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-20 px-6 md:px-12 border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:border-[#2563EB] hover:shadow-lg transition-all duration-300"
            >
              <div>
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2563EB] block mb-2">
                  {item.value}
                </span>
                <h3 className="font-serif text-base font-bold text-[#0F172A] mb-1">
                  {item.label}
                </h3>
                <p className="font-sans text-xs text-[#64748B]">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
