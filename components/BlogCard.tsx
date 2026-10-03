import React from 'react';

interface BlogCardProps {
  title: string;
  category: string;
  dateAndReadTime: string;
  excerpt: string;
  imageSrc: string;
  articleUrl?: string;
  actionText?: string;
}

export default function BlogCard({
  title,
  category,
  dateAndReadTime,
  excerpt,
  imageSrc,
  articleUrl = '#blog',
  actionText = 'Read Field Note'
}: BlogCardProps) {
  return (
    <article className="bg-surface-container border border-surface-variant hover:border-primary-container/60 transition-all duration-200 rounded flex flex-col justify-between group overflow-hidden relative">
      <div>
        <div className="relative w-full h-48 overflow-hidden bg-surface-container-low border-b border-surface-variant">
          <img
            alt={title}
            src={imageSrc}
            className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="px-2 py-0.5 rounded bg-surface-container-low border border-secondary-container/40 text-secondary font-mono text-[10px] uppercase tracking-wider">
              [{category}]
            </span>
            <span className="font-mono text-[10px] text-tertiary uppercase tracking-wider">
              {dateAndReadTime}
            </span>
          </div>
          <h3 className="font-headline text-lg text-on-surface font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>
          <p className="font-sans text-sm text-tertiary leading-relaxed mb-6">
            {excerpt}
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-0">
        <a
          href={articleUrl}
          className="inline-flex items-center gap-2 font-mono text-xs text-primary group-hover:text-primary-container font-semibold transition-colors duration-150"
        >
          <span>{actionText}</span>
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
        </a>
      </div>
    </article>
  );
}
