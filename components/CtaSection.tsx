import React from 'react';

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden" id="booking">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        <div className="bg-surface-container border border-primary-container/40 rounded-xl p-8 md:p-14 text-center accent-glow-card relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container font-mono text-xs mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            Direct Architecture Access
          </div>
          <h2 className="font-headline text-2xl md:text-4xl text-on-surface font-bold mb-4 max-w-2xl mx-auto leading-tight">
            Ready to build the machine behind your business?
          </h2>
          <p className="font-sans text-lg text-tertiary max-w-xl mx-auto mb-10 leading-relaxed">
            Book a dedicated 25-minute architecture discovery call. We'll map your system flaws, calculate ad projection targets, and blueprint an automated pipeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              className="w-full sm:w-auto bg-primary-container hover:bg-on-primary-fixed-variant text-surface-container-lowest font-mono text-sm uppercase font-semibold px-8 py-4 rounded transition-all duration-200 flex items-center justify-center gap-3 shadow-lg group"
              href="mailto:build@sjolabs.site?subject=Discovery%20Architecture%20Call"
            >
              <span>Schedule 25-Min Architecture Call</span>
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">calendar_month</span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-tertiary">
            <span>Direct terminal email:</span>
            <a className="text-primary hover:underline font-semibold" href="mailto:build@sjolabs.site">build@sjolabs.site</a>
          </div>
        </div>
      </div>
    </section>
  );
}
