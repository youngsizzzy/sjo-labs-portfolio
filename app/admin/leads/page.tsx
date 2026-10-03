'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  getStoredLeads,
  fetchLeadsFromSupabase,
  updateLeadStatus,
  deleteLead,
  LeadItem,
  LeadStatus,
} from '@/lib/leadStore';

export default function AdminLeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  useEffect(() => {
    const authSession = sessionStorage.getItem('sjolabs_admin_authenticated');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    setLeads(getStoredLeads());
    fetchLeadsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        setLeads(data);
      }
    });
  }, []);

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this enquiry record?')) {
      const updated = deleteLead(id);
      setLeads(updated);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesQuery =
      searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.referral_source && lead.referral_source.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesQuery;
  });

  const newCount = leads.filter((l) => l.status === 'New').length;
  const wonCount = leads.filter((l) => l.status === 'Won').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0F172A] border border-[#1E293B] rounded-3xl p-8 text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-white">Admin Authentication Required</h2>
          <p className="text-xs text-[#94A3B8] font-mono">
            Please log in at the Admin Control Center first.
          </p>
          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-[#00F0FF] text-[#090D16] font-bold font-mono text-xs uppercase rounded-xl"
          >
            Go to Admin Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 lg:p-12 space-y-8 overflow-y-auto text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
              <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                SJOLABS LEAD PIPELINE
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#0F172A]">
              Project Enquiries &amp; Leads
            </h1>
            <p className="font-sans text-xs text-[#64748B] pt-1">
              Track inbound client project requests, budgets, target countries, referral sources, and originating URLs.
            </p>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-[#64748B] uppercase">Total Inbound Enquiries</span>
            <div className="text-3xl font-bold text-[#0F172A]">{leads.length}</div>
          </div>
          <div className="bg-white border border-[#00F0FF]/40 rounded-2xl p-5 shadow-sm space-y-1 bg-gradient-to-br from-white to-[#00F0FF]/5">
            <span className="text-[#2563EB] font-bold uppercase">New Unhandled Enquiries</span>
            <div className="text-3xl font-bold text-[#2563EB]">{newCount}</div>
          </div>
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-emerald-600 uppercase">Won Projects</span>
            <div className="text-3xl font-bold text-emerald-600">{wonCount}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="w-full sm:w-80 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#94A3B8] text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name, email, business, country, referral source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto font-mono text-xs">
            {['All', 'New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg border transition-all shrink-0 ${statusFilter === st
                    ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                    : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:bg-[#E2E8F0]'
                  }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-mono text-[11px] uppercase text-[#64748B]">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Client / Business</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Service Needed</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Referral Source</th>
                  <th className="py-3 px-4">Source Page</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-[#94A3B8] font-mono">
                      No project enquiries found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#64748B]">
                        {new Date(lead.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0F172A]">{lead.name}</div>
                        <div className="text-[11px] text-[#64748B]">{lead.email}</div>
                        <div className="text-[11px] text-[#2563EB] font-medium">
                          {lead.business_name}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">
                        {lead.country}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#0F172A]">
                        {lead.service}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">
                        {lead.budget}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#2563EB] font-bold">
                        {lead.referral_source || 'Google Search'}
                      </td>
                      <td className="py-3.5 px-4 max-w-[140px] truncate font-mono text-[11px] text-[#2563EB]">
                        <a
                          href={lead.source_page}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {lead.source_page}
                        </a>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as LeadStatus)
                          }
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border focus:outline-none ${lead.status === 'New'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : lead.status === 'Qualified'
                                ? 'bg-purple-50 text-purple-700 border-purple-300'
                                : lead.status === 'Won'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Proposal">Proposal</option>
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2 font-mono">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-white text-[11px] font-bold hover:bg-[#2563EB] transition-all"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="px-2 py-1 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold hover:bg-red-100 transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Drawer / Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white border border-[#CBD5E1] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-left">
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-5 right-5 text-[#64748B] hover:text-[#0F172A] text-xl font-bold"
              >
                ✕
              </button>

              <div>
                <span className="text-[10px] font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                  ENQUIRY DETAILS • {selectedLead.id}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0F172A]">
                  {selectedLead.name}
                </h2>
                <p className="text-xs text-[#64748B] font-mono">
                  Submitted on {new Date(selectedLead.created_at).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-[#2563EB] hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase">Business</span>
                  <span className="font-bold text-[#0F172A]">{selectedLead.business_name}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase">Country</span>
                  <span className="font-bold text-[#0F172A]">{selectedLead.country}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase">Service</span>
                  <span className="font-bold text-[#0F172A]">{selectedLead.service}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase">Budget</span>
                  <span className="font-bold text-[#0F172A]">{selectedLead.budget}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[10px] uppercase">Referral Source</span>
                  <span className="font-bold text-[#2563EB]">{selectedLead.referral_source || 'Google Search'}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-1">
                  Source &amp; Originating Page URL
                </span>
                <div className="bg-[#0F172A] text-[#00F0FF] font-mono text-xs p-3 rounded-xl break-all">
                  {selectedLead.source_page}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block mb-1">
                  Project Description / Message
                </span>
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl text-xs text-[#0F172A] whitespace-pre-wrap leading-relaxed font-sans">
                  {selectedLead.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#64748B]">Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      handleStatusChange(selectedLead.id, e.target.value as LeadStatus)
                    }
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold border border-[#CBD5E1] bg-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2 rounded-xl bg-[#0F172A] text-white font-mono text-xs font-bold hover:bg-[#2563EB]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
