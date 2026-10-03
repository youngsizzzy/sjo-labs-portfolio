'use client';

import React, { useState } from 'react';

export default function ServicesTechStack() {
  const [activeTab, setActiveTab] = useState('ALL');

  const stackItems = [
    { name: 'NEXT.JS 14/15', category: 'WEB', desc: 'Decoupled Server-Side & Edge Rendering Framework' },
    { name: 'REACT 18', category: 'WEB', desc: 'Component Architecture & Interactive State' },
    { name: 'TAILWIND CSS', category: 'WEB', desc: 'Utility-first Design Systems & Micro-animations' },
    { name: 'SUPABASE / POSTGRES', category: 'WEB', desc: 'Relational Database, Auth, Realtime & Edge Functions' },
    { name: 'REACT NATIVE / EXPO', category: 'MOBILE', desc: 'Cross-platform iOS & Android Native Applications' },
    { name: 'FLUTTER', category: 'MOBILE', desc: 'High-performance Mobile UI Engine' },
    { name: 'OPENAI GPT-4O & ANTHROPIC', category: 'AI', desc: 'LLM Orchestration for Triage & Document RAG' },
    { name: 'N8N & MAKE WORKFLOWS', category: 'AI', desc: 'Autonomous Bi-directional CRM & Webhook Pipeline' },
    { name: 'PYTHON / FASTAPI', category: 'AI', desc: 'Custom Microservices for Data Transformation' },
    { name: 'META GRAPH CAPI', category: 'ADS', desc: 'Server-to-Server Conversions API Event Relay' },
    { name: 'GOOGLE ENHANCED CONVERSIONS', category: 'ADS', desc: 'First-party Hashed User Signals for Bidding Engine' },
    { name: 'STRIPE BILLING', category: 'WEB', desc: 'Subscribed & One-time Payment Processing Gateway' },
  ];

  const filtered = activeTab === 'ALL'
    ? stackItems
    : stackItems.filter((item) => item.category === activeTab);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="bg-[#090D16] text-[#F8FAFC] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 border border-[#1E293B]">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-semibold block mb-3">
            Production Stack Telemetry
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
            Engineered with Modern Technologies
          </h2>
          <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
            Inspect the underlying tools and frameworks powering SJO LABS deployments.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 font-mono text-[11px] sm:text-xs">
            {['ALL', 'WEB', 'MOBILE', 'AI', 'ADS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-5 py-2 rounded-full transition-all font-semibold ${
                  activeTab === tab
                    ? 'bg-[#00F0FF] text-[#090D16] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#101726] text-[#94A3B8] border border-[#1E293B] hover:text-white'
                }`}
              >
                {tab === 'ALL' ? 'ALL STACK' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#101726] p-5 sm:p-6 rounded-2xl border border-[#1E293B] hover:border-[#00F0FF]/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono font-bold text-[#00F0FF]">
                  [{item.category}]
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]/40 group-hover:bg-[#00F0FF] transition-colors"></span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                {item.name}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
