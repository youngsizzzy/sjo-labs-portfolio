'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getStoredProjects, getStoredBlogs, fetchProjectsFromSupabase, fetchBlogsFromSupabase } from '@/lib/adminStore';

import { validateAdminPasscode, generateAdminAuthToken, ADMIN_SESSION_KEY, ADMIN_TOKEN_KEY } from '@/lib/adminAuth';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [projectCount, setProjectCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    // Check if session authenticated
    const authSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }

    setProjectCount(getStoredProjects().length);
    setBlogCount(getStoredBlogs().length);

    fetchProjectsFromSupabase().then((p) => {
      if (p) setProjectCount(p.length);
    });
    fetchBlogsFromSupabase().then((b) => {
      if (b) setBlogCount(b.length);
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdminPasscode(passcode)) {
      const token = generateAdminAuthToken(passcode);
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid passcode. Default passcode is sjolabs2026');
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex items-center justify-center p-6 selection:bg-[#00F0FF] selection:text-[#090D16]">
        <div className="max-w-md w-full bg-[#0F172A] border border-[#1E293B] rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center space-y-2 relative z-10">
            <span className="font-serif text-3xl font-extrabold tracking-wider uppercase text-white block">
              SJO LABS<sup className="text-xs font-sans font-bold text-[#00F0FF] ml-0.5">®</sup>
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#334155]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-widest">
                ADMIN CONTROL CENTER
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] font-mono pt-2">
              Enter admin passcode to manage portfolio works &amp; field notes.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs relative z-10">
            <div>
              <label className="block text-[#94A3B8] uppercase mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter passcode (default: sjolabs2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 bg-[#090D16] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#00F0FF] text-[#090D16] font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20"
            >
              Access Control Panel →
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-[11px] font-mono text-[#64748B] hover:text-[#00F0FF]">
              ← Return to SJO LABS Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-grow p-6 lg:p-12 space-y-8">
        {/* Header Telemetry Bar */}
        <div className="bg-[#090D16] border border-[#1E293B] rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131927] border border-[#1E293B]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] uppercase tracking-widest">
                SYSTEM STATUS: ACTIVE ONLINE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">
              SJO LABS® Content Engine
            </h1>
            <p className="text-sm text-[#94A3B8] max-w-xl leading-relaxed">
              Manage client portfolio case studies, attach live preview links, and publish technical field notes in real-time.
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-2 border-l-4 border-l-[#00F0FF]">
            <div className="text-xs font-mono text-[#64748B] uppercase">Published Case Studies</div>
            <div className="text-3xl font-bold font-mono text-[#0F172A]">{projectCount}</div>
            <Link
              href="/admin/projects"
              className="text-xs font-mono font-bold text-[#2563EB] hover:underline inline-block pt-2"
            >
              Manage Projects →
            </Link>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-2 border-l-4 border-l-[#2563EB]">
            <div className="text-xs font-mono text-[#64748B] uppercase">Technical Field Notes</div>
            <div className="text-3xl font-bold font-mono text-[#0F172A]">{blogCount}</div>
            <Link
              href="/admin/blog"
              className="text-xs font-mono font-bold text-[#2563EB] hover:underline inline-block pt-2"
            >
              Manage Field Notes →
            </Link>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-2 border-l-4 border-l-emerald-500">
            <div className="text-xs font-mono text-[#64748B] uppercase">System Health</div>
            <div className="text-3xl font-bold font-mono text-emerald-600">99.9%</div>
            <div className="text-xs font-mono text-[#94A3B8] pt-2">All edge pipelines active</div>
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold font-serif text-[#0F172A]">Quick Control Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/projects"
              className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00F0FF] transition-all group space-y-2"
            >
              <div className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] flex items-center justify-between">
                <span>📁 Upload Portfolio Case Study</span>
                <span>→</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Add completed projects with live client website preview URLs.
              </p>
            </Link>

            <Link
              href="/admin/blog"
              className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00F0FF] transition-all group space-y-2"
            >
              <div className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] flex items-center justify-between">
                <span>📝 Write Technical Field Note</span>
                <span>→</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Publish articles on Next.js, CAPI, AI agents, and ad scaling.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
