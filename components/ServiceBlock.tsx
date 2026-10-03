import React from 'react';

interface ServiceBlockProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  proofLabel: string;
  proofValue: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  accentColor?: 'primary' | 'secondary';
  caseStudyLink?: string;
}

export default function ServiceBlock({
  badge,
  title,
  subtitle,
  description,
  bullets,
  proofLabel,
  proofValue,
  imageSrc,
  imageAlt,
  reversed = false,
  accentColor = 'primary',
  caseStudyLink = '/work'
}: ServiceBlockProps) {
  return (
    <div className={`bg-surface-container border ${accentColor === 'secondary' ? 'border-secondary-container/40' : 'border-surface-variant'} p-8 md:p-12 rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${accentColor === 'secondary' ? 'accent-glow-card' : ''}`}>
      {/* Content Column */}
      <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
        <span className={`font-mono text-xs ${accentColor === 'secondary' ? 'text-secondary font-bold' : 'text-primary font-bold'} uppercase tracking-wider block mb-2`}>
          {badge}
        </span>
        <h2 className="font-headline text-2xl md:text-4xl text-on-surface font-bold mb-3 leading-tight">
          {title}
        </h2>
        <p className="font-mono text-xs text-primary uppercase tracking-wider mb-6">
          {subtitle}
        </p>
        <p className="font-sans text-base text-tertiary leading-relaxed mb-6">
          {description}
        </p>

        {/* What's included bullets */}
        <div className="space-y-3 mb-8">
          <span className="font-mono text-xs text-on-surface uppercase font-semibold block mb-2">Included Infrastructure:</span>
          {bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary-container text-base mt-0.5">check_circle</span>
              <span className="font-sans text-sm text-on-surface">{bullet}</span>
            </div>
          ))}
        </div>

        {/* Proof element / Stat & Case Study Link */}
        <div className="pt-6 border-t border-surface-variant flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="p-3 bg-surface-container-low border border-surface-variant rounded">
            <span className="text-tertiary block text-[10px] uppercase">{proofLabel}</span>
            <span className="text-primary font-semibold text-sm">{proofValue}</span>
          </div>
          <a
            href={caseStudyLink}
            className="inline-flex items-center gap-1.5 text-secondary hover:text-on-surface font-semibold uppercase tracking-wider transition-colors"
          >
            <span>See Full Case Study</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Graphic / Image Motif Column */}
      <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative w-full h-64 md:h-80 rounded overflow-hidden border border-surface-variant bg-surface-container-low group">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent opacity-60"></div>
        </div>
      </div>
    </div>
  );
}
