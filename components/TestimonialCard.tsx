import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: string;
  metricBadge: string;
  accentColor?: 'primary' | 'secondary';
}

export default function TestimonialCard({
  quote,
  author,
  role,
  rating,
  metricBadge,
  accentColor = 'primary'
}: TestimonialProps) {
  return (
    <div className={`bg-surface-container border border-surface-variant p-8 rounded flex flex-col justify-between relative group hover:border-${accentColor === 'secondary' ? 'secondary' : 'primary-container'} transition-all duration-200`}>
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-variant/60 font-mono text-xs">
          <span className="text-primary flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined text-sm text-primary-container">verified</span>
            VERIFIED CLIENT REVIEW
          </span>
          <span className="text-on-surface-variant">{rating}</span>
        </div>
        <div className="text-primary-container font-mono text-3xl leading-none mb-3 opacity-70">“</div>
        <p className="font-sans text-base text-on-surface leading-relaxed mb-6">
          {quote}
        </p>
      </div>
      <div className="pt-6 border-t border-surface-variant flex items-end justify-between gap-3">
        <div>
          <span className="font-headline text-sm text-on-surface font-semibold block">{author}</span>
          <span className="font-sans text-xs text-tertiary block mt-0.5">{role}</span>
        </div>
        <span className={`px-2.5 py-1 rounded ${accentColor === 'secondary' ? 'bg-secondary-container/20 border border-secondary-container text-secondary' : 'bg-primary-container/10 border border-primary-container/30 text-primary'} font-mono text-xs font-semibold whitespace-nowrap`}>
          {metricBadge}
        </span>
      </div>
    </div>
  );
}
