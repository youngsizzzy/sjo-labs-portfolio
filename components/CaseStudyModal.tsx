'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/lib/adminStore';
import LeadEnquiryModal from './LeadEnquiryModal';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  if (!project) return null;

  const mapCategoryToService = (cat: string) => {
    if (cat.includes('WEB')) return 'Web Development';
    if (cat.includes('AI')) return 'AI Automation';
    if (cat.includes('MOBILE')) return 'Web Design';
    return 'Web Development';
  };

  const relatedService = mapCategoryToService(project.category);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#090D16]/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-3xl bg-[#0F172A] border border-[#1E293B] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden my-8 text-left text-white space-y-6">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all z-20"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          {/* Header */}
          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-3 py-1 rounded-full uppercase">
                CASE STUDY • {project.category}
              </span>
              <span className="text-[10px] font-mono text-[#94A3B8] bg-[#131927] px-3 py-1 rounded-full border border-[#1E293B]">
                {project.date}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {project.title}
            </h2>
          </div>

          {/* Featured Image */}
          {project.imageSrc && (
            <div className="rounded-2xl overflow-hidden border border-[#1E293B] max-h-72 shadow-lg">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-6 font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed relative z-10 max-h-[50vh] overflow-y-auto pr-1">
            {/* Overview */}
            <div className="p-4 bg-[#131927] border border-[#1E293B] rounded-2xl text-white">
              <h3 className="font-mono text-xs text-[#00F0FF] uppercase mb-1 font-bold">
                PROJECT OVERVIEW
              </h3>
              <p>{project.description}</p>
            </div>

            {/* Challenge */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#00F0FF] font-mono text-sm">01.</span> THE CHALLENGE
              </h3>
              <p>
                The client required a modern digital platform capable of delivering instant page loads globally while capturing and qualifying client enquiries without manual response friction.
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#00F0FF] font-mono text-sm">02.</span> THE SOLUTION
              </h3>
              <p>
                SJOLabs engineered a high-velocity solution utilizing Next.js edge deployment, TypeScript component modules, automated lead triage triggers, and sub-100ms global CDN caching.
              </p>
            </div>

            {/* Verified Metrics (if present) */}
            {project.metrics && (
              <div className="p-4 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] text-[#00F0FF] uppercase block">
                    VERIFIED BENCHMARK RESULT
                  </span>
                  <span className="font-mono text-xl font-bold text-white">
                    {project.metrics}
                  </span>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#00F0FF] text-[#090D16] font-mono font-bold text-xs rounded-xl hover:bg-white transition-all shrink-0"
                  >
                    Visit Live Site ↗
                  </a>
                )}
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="space-y-2">
              <h3 className="font-mono text-xs text-[#94A3B8] uppercase">TECHNOLOGIES USED</h3>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#131927] border border-[#1E293B] text-[#00F0FF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-4 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="text-xs text-[#94A3B8] font-sans">
              Need a similar solution for your business?
            </div>
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-[#00F0FF] hover:bg-white text-[#090D16] font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Start {relatedService} Project →
            </button>
          </div>
        </div>
      </div>

      <LeadEnquiryModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        serviceName={relatedService}
        sourcePage={`/work#${project.id}`}
      />
    </>
  );
}
