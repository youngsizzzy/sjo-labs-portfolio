'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ADMIN_SESSION_KEY, ADMIN_TOKEN_KEY } from '@/lib/adminAuth';

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleSignOut = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    window.location.href = '/admin';
  };

  const links = [
    { label: 'Control Center', href: '/admin', icon: 'dashboard' },
    { label: 'Project Enquiries & Leads', href: '/admin/leads', icon: 'inbox' },
    { label: 'Manage Portfolio Works', href: '/admin/projects', icon: 'folder_open' },
    { label: 'Publish Field Notes', href: '/admin/blog', icon: 'article' },
  ];

  return (
    <aside className="w-full lg:w-64 bg-[#090D16] border-b lg:border-b-0 lg:border-r border-[#1E293B] p-6 text-[#F8FAFC] flex flex-col justify-between shrink-0">
      <div className="space-y-8">
        {/* Admin Header / Logo */}
        <div className="space-y-2">
          <Link href="/admin" className="inline-block hover:opacity-90 transition-opacity">
            <img
              src="/images/sjo-labs-logo.png"
              alt="SJO LABS Admin"
              className="h-12 sm:h-14 w-auto object-contain block filter brightness-110 contrast-125 drop-shadow-[0_2px_12px_rgba(0,240,255,0.25)]"
            />
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-widest">
              ADMIN CONTROL PANEL
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 font-mono text-xs">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 font-bold shadow-md'
                    : 'text-[#94A3B8] hover:bg-[#131927] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Live Site & Sign Out */}
      <div className="pt-6 border-t border-[#1E293B] space-y-3 font-mono text-xs">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all font-bold"
        >
          <span>🔐 Sign Out</span>
          <span>✕</span>
        </button>

        <Link
          href="/"
          className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#131927] text-[#94A3B8] hover:text-[#00F0FF] border border-[#1E293B] hover:border-[#00F0FF]/40 transition-all"
        >
          <span>View Live Site</span>
          <span>→</span>
        </Link>

        <div className="text-[10px] text-[#64748B] text-center">
          SYSTEM HEALTH: 100% OPERATIONAL
        </div>
      </div>
    </aside>
  );
}

