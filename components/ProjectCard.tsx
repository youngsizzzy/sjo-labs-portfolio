import React from 'react';

interface ProjectCardProps {
  title: string;
  category: string;
  secondaryTag: string;
  description: string;
  imageSrc: string;
  liveUrl?: string;
  ctaText?: string;
}

export default function ProjectCard({
  title,
  category,
  secondaryTag,
  description,
  imageSrc,
  liveUrl = '#booking',
  ctaText = 'Visit Live Site'
}: ProjectCardProps) {
  return (
    <div className="bg-surface-container border border-surface-variant hover:border-primary-container/60 transition-all duration-200 rounded flex flex-col justify-between group overflow-hidden relative">
      <div>
        <div className="relative w-full h-48 overflow-hidden bg-surface-container-low border-b border-surface-variant">
          <img
            alt={title}
            src={imageSrc}
            className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2 py-0.5 rounded bg-surface-container-high border border-surface-variant text-secondary font-mono text-[10px] uppercase tracking-wider">
              [{category}]
            </span>
            <span className="px-2 py-0.5 rounded bg-primary-container/10 border border-primary-container/30 text-primary-container font-mono text-[10px] uppercase tracking-wider">
              [{secondaryTag}]
            </span>
          </div>
          <h3 className="font-headline text-lg text-on-surface font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-sans text-sm text-tertiary leading-relaxed mb-6">
            {description}
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-0">
        <a
          href={liveUrl}
          className="inline-flex items-center gap-2 font-mono text-xs text-primary group-hover:text-primary-container font-semibold transition-colors duration-150"
        >
          <span>{ctaText}</span>
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">north_east</span>
        </a>
      </div>
    </div>
  );
}
