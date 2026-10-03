'use client';

import React, { useState } from 'react';

export default function ProcessInteractiveProtocol() {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      num: 1,
      id: '01',
      title: 'Audit & Telemetry Discovery',
      tagline: 'Deep diagnostic scan of site performance, tracking loss, and lead friction',
      inputs: ['Current Site URL', 'Analytics & Ad Account Access', 'Lead Form Conversion Benchmarks'],
      outputs: ['Core Web Vitals Audit Report', 'CAPI Tracking Loss Analysis', 'Figma UI Component Tokens'],
      codeSnippet: `// Step 01 Telemetry Scan Payload
{
  "site_url": "https://client.com",
  "baseline_ttfb_ms": 1420,
  "mobile_performance": 48,
  "capi_tracking_loss": "34.2%",
  "lead_decay_window_hours": 14
}`,
    },
    {
      num: 2,
      id: '02',
      title: 'Decoupled Architecture & Design',
      tagline: 'Engineering a Next.js edge codebase and custom Figma UI system',
      inputs: ['Figma Design System Tokens', 'Supabase Database Schema', 'CMS Content Model'],
      outputs: ['Decoupled Next.js 14/15 Codebase', 'Sub-140ms Server TTFB', 'Tailwind Micro-animations'],
      codeSnippet: `// Step 02 Next.js Edge Config
export const runtime = 'edge';
export const revalidate = 3600;

export default async function Page() {
  const data = await getEdgeData();
  return <RenderEngine data={data} />;
}`,
    },
    {
      num: 3,
      id: '03',
      title: 'AI Lead Triage & Server CAPI Integration',
      tagline: 'Deploying 0-touch AI webhook workflows and server-to-server CAPI relays',
      inputs: ['OpenAI / Anthropic API Keys', 'n8n Webhook Endpoints', 'Meta CAPI Hashed Token'],
      outputs: ['Sub-45s Autonomous AI Triage', 'Bi-directional CRM Sync', '100% Attributed Ad Data'],
      codeSnippet: `// Step 03 AI Triage & CAPI Webhook Relay
export async function POST(req: Request) {
  const lead = await req.json();
  const scored = fontEvaluateLead(lead);
  await Promise.all([
    sendCapiEvent(scored),
    syncCrmRecord(scored)
  ]);
  return Response.json({ status: "triaged_45s" });
}`,
    },
    {
      num: 4,
      id: '04',
      title: 'Continuous Algorithmic Optimization',
      tagline: 'Live telemetry monitoring, bottom-funnel ad bidding models, and CRO testing',
      inputs: ['Production Analytics Logs', 'ROAS Attribution Data', 'A/B Testing Variants'],
      outputs: ['Weekly Executive ROAS Dashboard', 'Continuous TTFB Optimization', 'Reduced CAC Metrics'],
      codeSnippet: `// Step 04 Algorithmic ROAS Model
{
  "period": "Last 30 Days",
  "attributed_roas": "4.2x",
  "average_cac": "$42.10",
  "conversions_relayed": 1840,
  "system_status": "OPTIMAL_SCALE"
}`,
    },
  ];

  const current = stages.find((s) => s.num === activeStage) || stages[0];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto my-8 sm:my-12">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] sm:text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-semibold block mb-3">
          Protocol Deep-Dive
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D16] tracking-tight leading-snug">
          Inspect Stage Inputs, Outputs &amp; Payloads
        </h2>
        <p className="text-[#64748B] text-xs sm:text-sm md:text-base mt-2.5 sm:mt-3 leading-relaxed">
          Click through each stage of our deterministic 4-step engineering protocol below.
        </p>

        {/* Stage Switcher Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 mt-6 sm:mt-8 font-mono text-[11px] sm:text-xs">
          {stages.map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStage(s.num)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full transition-all font-semibold text-center ${
                activeStage === s.num
                  ? 'bg-[#090D16] text-[#00F0FF] border border-[#00F0FF] shadow-md'
                  : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:text-[#090D16]'
              }`}
            >
              STAGE {s.id}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Detail Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-sm p-5 sm:p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#090D16] text-[#00F0FF] font-mono text-[11px] sm:text-xs font-bold">
            STAGE {current.id} PROTOCOL
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold text-[#090D16] leading-snug">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            {current.tagline}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
            <div className="bg-[#F8FAFC] p-3.5 sm:p-4 rounded-xl border border-[#E2E8F0]">
              <span className="text-[10px] font-mono font-bold text-[#090D16] uppercase block mb-1.5">
                📥 Inputs Required:
              </span>
              <ul className="space-y-1 text-xs text-[#64748B]">
                {current.inputs.map((inp, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-[#2563EB] font-bold">•</span>
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#00F0FF]/5 p-3.5 sm:p-4 rounded-xl border border-[#00F0FF]/20">
              <span className="text-[10px] font-mono font-bold text-[#090D16] uppercase block mb-1.5">
                🎁 Deliverable Outputs:
              </span>
              <ul className="space-y-1 text-xs text-[#090D16] font-medium">
                {current.outputs.map((out, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-[#090D16] bg-[#00F0FF] rounded-full w-3 h-3 flex items-center justify-center text-[8px] font-bold">✓</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Code Payload Inspector */}
        <div className="lg:col-span-6 bg-[#090D16] text-[#F8FAFC] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#1E293B] font-mono text-[11px] sm:text-xs overflow-x-auto shadow-inner">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#94A3B8] border-b border-[#1E293B] pb-2.5 mb-3">
            <span className="flex items-center gap-1.5 text-[#00F0FF]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              STAGE {current.id} PAYLOAD PREVIEW
            </span>
            <span>UTF-8</span>
          </div>
          <pre className="text-[#00F0FF] leading-relaxed">{current.codeSnippet}</pre>
        </div>
      </div>
    </section>
  );
}
