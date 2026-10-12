'use client';

import React from 'react';
import Image from 'next/image';

export default function ZilkanTeam() {
  const team = [
    {
      name: 'Shepherd John Onole',
      role: 'Founder & Lead Web Architect',
      specialty: 'Web Design & Dev',
      image: '/images/team-shepherd.jpg',
      bio: 'Pioneers high-velocity Next.js web architectures, conversion rate optimization, and enterprise web engineering.',
      tags: ['Next.js 15', 'React', 'TypeScript', 'Web Architecture'],
      status: 'Accepting Clients',
      linkedin: 'https://www.linkedin.com/in/shepherd-onole-784834389',
      github: 'https://github.com/youngsizzzy',
    },
    {
      name: 'Rita Isioma Ojelede',
      role: 'AI Automation Specialist',
      specialty: 'AI Automation',
      image: '/images/team-rita.jpg',
      bio: 'Engineers autonomous workflow automation pipelines, CRM integrations, and custom LLM triage agents.',
      tags: ['n8n / Make', 'AI Agents', 'CRM Workflows', 'Python'],
      status: 'In Studio',
      linkedin: 'https://www.linkedin.com/in/shepherd-onole-784834389',
    },
    {
      name: 'Marcus Vance',
      role: 'Head of UI/UX & Mobile Engineering',
      specialty: 'Mobile & UI/UX',
      image: '/images/team-marcus.jpg',
      bio: 'Crafts luxury digital aesthetics, cross-platform mobile app interfaces, and conversion-focused user journeys.',
      tags: ['Figma', 'iOS & Android', 'Design Tokens', 'Framer'],
      status: 'In Studio',
      linkedin: 'https://www.linkedin.com/in/shepherd-onole-784834389',
    },
    {
      name: 'David Miller',
      role: 'Performance Marketing Director',
      specialty: 'Meta & Google Ads',
      image: '/images/team-david.jpg',
      bio: 'Data-driven media buyer scaling profitable paid acquisition campaigns across Meta and Google.',
      tags: ['Meta Ads', 'Google Ads', 'Pixel CAPI', 'ROAS Scaling'],
      status: 'In Studio',
      linkedin: 'https://www.linkedin.com/in/shepherd-onole-784834389',
    },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-20 md:py-28 px-6 md:px-12 border-t border-[#E2E8F0]" id="team">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-widest text-[#2563EB] font-bold block mb-2">
            SENIOR LEADERSHIP &amp; SPECIALISTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#0F172A] tracking-tight uppercase">
            MEET THE <span className="font-bold text-[#2563EB]">SJO LABS TEAM</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#64748B] mt-3 max-w-xl mx-auto">
            The core senior leadership and engineering specialists behind our Web Architecture, AI Automation, Mobile Apps, and Performance Marketing machinery.
          </p>
        </div>

        {/* 4 Column Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:border-[#00F0FF] hover:shadow-2xl transition-all duration-300 group"
            >
              <div>
                {/* Member Portrait */}
                <div className="relative w-full h-[320px] sm:h-[340px] rounded-2xl overflow-hidden mb-6 border border-[#E2E8F0] bg-[#090D16]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    priority={idx < 2}
                  />
                  {/* Status Overlay Pill */}
                  <div className="absolute top-3 left-3 bg-[#090D16]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#00F0FF]/30 flex items-center space-x-2 z-10">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
                    <span className="font-sans text-[10px] text-white font-medium">
                      {member.status}
                    </span>
                  </div>
                </div>

                {/* Role Badge */}
                <div className="mb-3">
                  <span className="font-sans text-[10px] uppercase tracking-wider font-extrabold text-[#2563EB] bg-[#00F0FF]/15 px-3 py-1 rounded-full border border-[#00F0FF]/30 inline-block">
                    {member.specialty}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-xl font-bold text-[#0F172A] mb-1 leading-snug">
                  {member.name}
                </h3>
                <p className="font-sans text-xs font-semibold text-[#2563EB] mb-3">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="font-sans text-xs text-[#64748B] leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Tech Stack Chips & Socials */}
              <div className="pt-4 border-t border-[#F1F5F9]">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {member.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-sans text-[10px] font-medium bg-[#F1F5F9] text-[#334155] px-2.5 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-between text-[#64748B] text-xs pt-2">
                  <span className="font-mono text-[10px] text-[#94A3B8]">SENIOR LEAD</span>
                  <div className="flex items-center space-x-3">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#2563EB] transition-colors flex items-center gap-1"
                        title={`${member.name} on LinkedIn`}
                      >
                        <span className="material-symbols-outlined text-base">link</span>
                        <span className="text-[10px] font-sans font-medium">LinkedIn</span>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#0F172A] transition-colors flex items-center gap-1"
                        title={`${member.name} on GitHub`}
                      >
                        <span className="material-symbols-outlined text-base">code</span>
                        <span className="text-[10px] font-sans font-medium">GitHub</span>
                      </a>
                    )}
                    <a
                      href="mailto:contact@sjolabs.site"
                      className="hover:text-[#2563EB] transition-colors"
                      title={`Contact ${member.name} Direct`}
                    >
                      <span className="material-symbols-outlined text-base">mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
