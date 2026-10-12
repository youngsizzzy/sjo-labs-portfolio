'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProjectItem, getStoredProjects, fetchProjectsFromSupabase } from '@/lib/adminStore';

export default function ZilkanProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    // 1. Initial cached state
    const cached = getStoredProjects();
    if (cached && cached.length > 0) {
      setProjects(cached);
    }

    // 2. Fresh live state directly from Supabase
    fetchProjectsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  const displayProjects = projects.length > 0 ? projects : getStoredProjects();
  const featured = displayProjects[0];
  const stacked = displayProjects.slice(1, 3);

  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-24 px-6 md:px-12 border-t border-[#E2E8F0]" id="works">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-[#00F0FF] bg-[#090D16] px-3 py-1 rounded-full uppercase tracking-widest font-semibold block mb-2 w-fit">
              Client Deployments &amp; Case Studies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F172A] tracking-tight uppercase">
              RECENT <span className="font-bold text-[#2563EB]">PROJECTS</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="text-xs font-mono font-bold text-[#2563EB] hover:text-[#00F0FF] hover:bg-[#090D16] px-4 py-2 rounded-xl border border-[#E2E8F0] transition-all w-fit flex items-center gap-2"
          >
            <span>View All Deployments</span>
            <span>→</span>
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Featured Card */}
          {featured && (
            <div className="lg:col-span-7 group">
              <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden bg-[#090D16] shadow-md border border-[#E2E8F0] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#00F0FF] group-hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]">
                <img
                  src={featured.imageSrc || '/images/project-laptop.jpg'}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                />
                <div className="absolute top-4 left-4 bg-[#090D16]/90 backdrop-blur-sm border border-[#1E293B] text-[#00F0FF] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {featured.category}
                </div>
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 bg-[#00F0FF] text-[#090D16] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg hover:bg-white transition-all flex items-center gap-1"
                  >
                    <span>LIVE PREVIEW</span>
                    <span>↗</span>
                  </a>
                )}
                {featured.metrics && (
                  <div className="absolute bottom-4 left-4 bg-[#090D16]/90 backdrop-blur-sm border border-[#1E293B] text-[#00F0FF] font-mono text-xs font-bold px-3 py-1.5 rounded-xl">
                    {featured.metrics}
                  </div>
                )}
              </div>
              <div className="mt-5 space-y-1">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  {featured.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-[#64748B] line-clamp-2">
                  {featured.description}
                </p>
              </div>
            </div>
          )}

          {/* Right Column: 2 Stacked Cards */}
          <div className="lg:col-span-5 space-y-8">
            {stacked.map((p) => (
              <div key={p.id} className="group">
                <div className="relative w-full h-[240px] sm:h-[280px] rounded-3xl overflow-hidden bg-[#090D16] shadow-md border border-[#E2E8F0] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#00F0FF] group-hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]">
                  <img
                    src={p.imageSrc || '/images/project-laptop.jpg'}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute top-4 left-4 bg-[#090D16]/90 backdrop-blur-sm border border-[#1E293B] text-[#00F0FF] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {p.category}
                  </div>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-[#00F0FF] text-[#090D16] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg hover:bg-white transition-all flex items-center gap-1"
                    >
                      <span>LIVE PREVIEW</span>
                      <span>↗</span>
                    </a>
                  )}
                  {p.metrics && (
                    <div className="absolute bottom-4 left-4 bg-[#090D16]/90 backdrop-blur-sm border border-[#1E293B] text-[#00F0FF] font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      {p.metrics}
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs text-[#64748B] line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA Footer */}
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#090D16] text-[#00F0FF] font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#2563EB] hover:text-white transition-all shadow-lg hover:shadow-cyan-500/20"
          >
            <span>Explore All Client Work &amp; Case Studies</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
