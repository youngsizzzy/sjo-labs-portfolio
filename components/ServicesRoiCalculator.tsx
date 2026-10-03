'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ServicesRoiCalculator() {
  const [monthlyLeads, setMonthlyLeads] = useState(150);
  const [responseTimeHours, setResponseTimeHours] = useState(12);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(10000);

  // Calculations
  const hoursSavedPerMonth = Math.round((monthlyLeads * 0.4) + (responseTimeHours > 4 ? 20 : 10));
  const estimatedRevenueLift = Math.round((monthlyAdSpend * 0.25) + (monthlyLeads * 45));
  const newResponseTimeSeconds = 45;

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="bg-[#090D16] text-[#F8FAFC] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 border border-[#1E293B] shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-mono font-medium text-[#00F0FF] uppercase tracking-widest">
              Interactive ROI Simulator
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
            Calculate Your Efficiency &amp; Revenue Lift
          </h2>
          <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
            Adjust your current operational volume below to estimate lead response speed improvements and saved manual labor hours with SJO LABS machinery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Sliders Input Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 bg-[#101726] p-5 sm:p-8 rounded-2xl border border-[#1E293B]">
            {/* Slider 1: Monthly Leads */}
            <div>
              <div className="flex flex-wrap justify-between items-center mb-2 sm:mb-3 gap-1">
                <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                  Monthly Lead Volume
                </label>
                <span className="text-base sm:text-lg font-bold font-mono text-[#00F0FF]">
                  {monthlyLeads} leads/mo
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="w-full h-2 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
              />
            </div>

            {/* Slider 2: Current Lead Response Time */}
            <div>
              <div className="flex flex-wrap justify-between items-center mb-2 sm:mb-3 gap-1">
                <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                  Current Lead Response Time
                </label>
                <span className="text-base sm:text-lg font-bold font-mono text-white">
                  {responseTimeHours} {responseTimeHours === 1 ? 'Hour' : 'Hours'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="48"
                step="1"
                value={responseTimeHours}
                onChange={(e) => setResponseTimeHours(Number(e.target.value))}
                className="w-full h-2 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
              />
            </div>

            {/* Slider 3: Monthly Ad Spend */}
            <div>
              <div className="flex flex-wrap justify-between items-center mb-2 sm:mb-3 gap-1">
                <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                  Monthly Paid Ad Spend
                </label>
                <span className="text-base sm:text-lg font-bold font-mono text-[#00F0FF]">
                  ${monthlyAdSpend.toLocaleString()}/mo
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={monthlyAdSpend}
                onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                className="w-full h-2 bg-[#1E293B] rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
              />
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 bg-[#00F0FF]/5 p-5 sm:p-8 rounded-2xl border border-[#00F0FF]/20 space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 border-b border-[#1E293B] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span>Projected Machinery Impact</span>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#00F0FF] uppercase bg-[#00F0FF]/10 px-3 py-1 rounded-full whitespace-nowrap">
                SJO LABS SLA
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#101726] p-4 sm:p-5 rounded-xl border border-[#1E293B]">
                <div className="text-[11px] sm:text-xs font-mono text-[#94A3B8] uppercase mb-1">
                  New Triage Speed
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#00F0FF] font-mono tracking-tight">
                  &lt; {newResponseTimeSeconds} Seconds
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">
                  Down from {responseTimeHours}h
                </div>
              </div>

              <div className="bg-[#101726] p-4 sm:p-5 rounded-xl border border-[#1E293B]">
                <div className="text-[11px] sm:text-xs font-mono text-[#94A3B8] uppercase mb-1">
                  Hours Saved / Mo
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                  ~{hoursSavedPerMonth} Hours
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">
                  Zero manual data entry
                </div>
              </div>
            </div>

            <div className="bg-[#101726] p-4 sm:p-6 rounded-xl border border-[#1E293B]">
              <div className="text-[11px] sm:text-xs font-mono text-[#94A3B8] uppercase mb-1">
                Estimated Recovered Revenue &amp; ROAS Lift
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00F0FF] font-mono tracking-tight">
                +${estimatedRevenueLift.toLocaleString()} <span className="text-xs text-[#94A3B8] font-normal">/ month</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                Based on server-side CAPI tracking recovery and immediate lead engagement.
              </p>
            </div>

            <Link
              href="/#contact"
              className="w-full bg-[#00F0FF] hover:bg-[#33F3FF] text-[#090D16] font-bold text-center text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl transition-all block shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              Deploy This Architecture →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
