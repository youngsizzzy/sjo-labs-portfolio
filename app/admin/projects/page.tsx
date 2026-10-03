'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminProjectsManager from '@/components/admin/AdminProjectsManager';

export default function AdminProjectsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authSession = sessionStorage.getItem('sjolabs_admin_authenticated');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-sm font-mono text-[#00F0FF]">Admin Session Required</p>
          <Link
            href="/admin"
            className="px-6 py-3 rounded-xl bg-[#00F0FF] text-[#090D16] font-mono font-bold text-xs uppercase"
          >
            Go to Admin Passcode Screen →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-grow p-6 lg:p-12">
        <AdminProjectsManager />
      </main>
    </div>
  );
}
