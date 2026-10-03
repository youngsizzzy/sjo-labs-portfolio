'use client';

import React from 'react';

export default function TelemetryWidget() {
  return (
    <div className="mt-6 bg-surface-container-low border border-surface-variant p-6 rounded grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-surface-variant pb-6 lg:pb-0 lg:pr-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-on-surface font-semibold uppercase">Real-Time Event Dispatch Telemetry</span>
          <span className="font-mono text-[10px] text-primary-container flex items-center gap-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            POLLING ACTIVE
          </span>
        </div>
        {/* Telemetry log terminal mockup */}
        <div className="bg-surface-container-lowest p-4 rounded font-mono text-[11px] text-tertiary space-y-2 border border-surface-variant">
          <div className="flex items-center justify-between text-on-surface">
            <span>[09:14:02.118] &gt; Inbound webhook from Meta Ad #49102 (Creative Variant C)</span>
            <span className="text-secondary font-bold">OK 200</span>
          </div>
          <div className="text-primary-container font-medium">
            [09:14:02.340] &gt; AI Agent triggered: Parsing contact parameters &amp; intent match score (94%)
          </div>
          <div>
            [09:14:02.890] &gt; SMS qualification link dispatched via Twilio endpoint
          </div>
          <div className="text-on-surface-variant">
            [09:14:38.012] &gt; Prospect completed pre-qualification questionnaire &amp; booked $5,000 estimate call
          </div>
          <div className="text-primary font-semibold">
            [09:14:39.100] &gt; Telemetry record finalized: End-to-end execution completed in 36.984s
          </div>
        </div>
      </div>

      {/* Speed benchmark widget */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="font-mono text-[10px] text-tertiary uppercase tracking-wider block mb-1">AUTOMATED SPEED BENCHMARK</span>
          <h4 className="font-headline text-lg text-on-surface font-semibold mb-2">Under 45s Response</h4>
          <p className="font-sans text-xs text-tertiary mb-4 leading-relaxed">
            Leads contacted within 60 seconds are 7x more likely to qualify. SJOlabs automations operate within 45 seconds around the clock.
          </p>
        </div>
        <div className="p-3 bg-surface-container rounded border border-surface-variant flex items-center justify-between font-mono text-xs">
          <span className="text-tertiary">Speed Advantage</span>
          <span className="text-primary-container font-bold">+390% Lift</span>
        </div>
      </div>
    </div>
  );
}
