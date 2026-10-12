'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProjectItem, getStoredProjects, fetchProjectsFromSupabase } from '@/lib/adminStore';
import CaseStudyModal from './CaseStudyModal';

export default function WorkProjectsFilter() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>(getStoredProjects());

  useEffect(() => {
    fetchProjectsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);


  const categories = [
    'ALL',
    'WEB ARCHITECTURE',
    'MOBILE APP DEV',
    'AI AUTOMATION',
    'META & GOOGLE ADS',
  ];

  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto" id="works">
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <span className="text-xs font-mono text-[#00F0FF] bg-[#090D16] px-3 py-1 rounded-full uppercase tracking-widest font-semibold block mb-2 w-fit">
              Production Portfolio &amp; Case Studies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F172A] tracking-tight uppercase">
              RECENT <span className="font-bold text-[#2563EB]">PROJECTS</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 font-mono text-xs w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-full transition-all font-semibold text-center ${activeCategory === cat
                    ? 'bg-[#090D16] text-[#00F0FF] shadow-md border border-[#00F0FF]'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:text-[#0F172A]'
                  }`}
              >
                {cat === 'ALL' ? 'ALL DEPLOYMENTS' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Project Image */}
                <div className="relative w-full h-[260px] sm:h-[320px] bg-[#090D16] overflow-hidden">
                  <Image
                    src={p.imageSrc}
                    alt={p.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
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
                </div>

                {/* Project Brief Info */}
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors">
                    {p.title}
                  </h3>

                  <p className="font-sans text-sm text-[#64748B] leading-relaxed">
                    {p.description}
                  </p>

                  {/* Metrics Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D16] text-[#00F0FF] font-mono text-xs font-bold border border-[#1E293B]">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
                    <span>{p.metrics}</span>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-[#F1F5F9] text-[#334155] font-mono text-[10px] px-2.5 py-0.5 rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action Bar */}
              <div className="px-6 pb-6 md:px-8 pt-0 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(p)}
                  className="flex-grow bg-[#090D16] hover:bg-[#1E293B] text-white font-mono text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Inspect Case Study</span>
                  <span className="text-[#00F0FF]">→</span>
                </button>

                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl bg-[#00F0FF] text-[#090D16] font-mono text-xs font-bold hover:bg-[#0F172A] hover:text-[#00F0FF] transition-all flex items-center gap-1 shrink-0"
                    title="Visit Live Client Website"
                  >
                    <span>Visit Live Site</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
