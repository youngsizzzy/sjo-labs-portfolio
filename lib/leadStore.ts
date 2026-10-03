'use client';

import { createClient } from '@/lib/supabase/client';

export type LeadCountry = 'USA' | 'Canada' | 'UK' | 'Australia' | 'Nigeria' | 'Other';

export type LeadService =
  | 'Web Design & Web Development'
  | 'Mobile App Development'
  | 'WordPress'
  | 'AI Automation'
  | 'AI Chatbots'
  | 'AI Phone Agents'
  | 'AI Search Visibility'
  | 'Meta & Google Ads'
  | 'Not sure';

export type LeadBudget =
  | 'Under $200'
  | '$200–$499'
  | '$500–$999'
  | '$1,000–$1,500'
  | '$1,500+'
  | 'Not sure';

export type LeadReferralSource =
  | 'Google Search'
  | 'ChatGPT / AI Search'
  | 'LinkedIn'
  | 'Instagram'
  | 'Referral'
  | 'Portfolio'
  | 'Other';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';

export interface LeadItem {
  id: string;
  created_at: string;
  name: string;
  email: string;
  business_name: string;
  country: LeadCountry;
  service: LeadService;
  budget: LeadBudget;
  message: string;
  website_url?: string;
  source_page: string;
  referral_source?: LeadReferralSource;
  landing_page?: string;
  referrer?: string;
  status: LeadStatus;
}

const STORAGE_KEY = 'sjolabs_leads_v1';

const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-101',
    created_at: '2026-09-17T03:15:00Z',
    name: 'Marcus Vance',
    email: 'marcus@vancehvac.com',
    business_name: 'Vance Heating & Air',
    country: 'USA',
    service: 'AI Phone Agents',
    budget: '$500–$999',
    message: 'Looking for an AI phone agent to take after-hours calls and schedule repair technician appointments.',
    website_url: 'https://vancehvac.com',
    source_page: '/services/ai-phone-agents',
    referral_source: 'Google Search',
    landing_page: '/services/ai-phone-agents',
    status: 'New',
  },
  {
    id: 'lead-102',
    created_at: '2026-09-16T18:40:00Z',
    name: 'Elena Rostova',
    email: 'elena@rostovadesign.co.uk',
    business_name: 'Rostova Architectural Studio',
    country: 'UK',
    service: 'Web Design & Web Development',
    budget: '$1,000–$1,500',
    message: 'We need a high-velocity Next.js website with fast global edge delivery to showcase luxury architectural portfolios.',
    website_url: 'https://rostovadesign.co.uk',
    source_page: '/services/web-design-web-development',
    referral_source: 'ChatGPT / AI Search',
    landing_page: '/services/web-design-web-development',
    status: 'Qualified',
  },
  {
    id: 'lead-103',
    created_at: '2026-09-15T11:20:00Z',
    name: 'David Nwosu',
    email: 'david@primelogistics.ng',
    business_name: 'Prime Logistics Hub',
    country: 'Nigeria',
    service: 'AI Automation',
    budget: '$500–$999',
    message: 'We want to automate lead triage from WhatsApp and email into our CRM within 45 seconds.',
    website_url: 'https://primelogistics.ng',
    source_page: '/services/ai-automation',
    referral_source: 'LinkedIn',
    landing_page: '/',
    status: 'Proposal',
  },
];

export function getStoredLeads(): LeadItem[] {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading leads from localStorage:', err);
    return INITIAL_LEADS;
  }
}

export function saveStoredLeads(leads: LeadItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Error saving leads to localStorage:', err);
  }
}

/**
 * Async Supabase Fetcher: retrieves live leads from Supabase Postgres,
 * updates local storage cache, and returns fresh lead list.
 */
export async function fetchLeadsFromSupabase(): Promise<LeadItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error for leads:', error);
      return getStoredLeads();
    }

    if (data && data.length > 0) {
      saveStoredLeads(data as LeadItem[]);
      return data as LeadItem[];
    } else {
      return getStoredLeads();
    }
  } catch (err) {
    console.error('Unexpected error fetching leads from Supabase:', err);
    return getStoredLeads();
  }
}

export function addLead(newLeadData: Omit<LeadItem, 'id' | 'created_at' | 'status'>): LeadItem {
  const current = getStoredLeads();
  const createdLead: LeadItem = {
    ...newLeadData,
    id: `lead-${Date.now()}`,
    created_at: new Date().toISOString(),
    status: 'New',
  };
  const updated = [createdLead, ...current];
  saveStoredLeads(updated);

  // Async background sync to Supabase Postgres
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.from('leads').insert([createdLead]);
        if (error) console.error('Failed to sync new lead to Supabase:', error);
        else console.log('Successfully synced new lead to Supabase Postgres:', createdLead.id);
      } catch (err) {
        console.error('Supabase lead insert error:', err);
      }
    })();
  }

  return createdLead;
}

export function updateLeadStatus(id: string, status: LeadStatus): LeadItem[] {
  const current = getStoredLeads();
  const updated = current.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  saveStoredLeads(updated);

  // Async background sync to Supabase Postgres
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.from('leads').update({ status }).eq('id', id);
        if (error) console.error('Failed to update lead status in Supabase:', error);
        else console.log('Successfully updated lead status in Supabase Postgres:', id, status);
      } catch (err) {
        console.error('Supabase lead status update error:', err);
      }
    })();
  }

  return updated;
}

export function deleteLead(id: string): LeadItem[] {
  const current = getStoredLeads();
  const updated = current.filter((lead) => lead.id !== id);
  saveStoredLeads(updated);

  // Async background sync to Supabase Postgres
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) console.error('Failed to delete lead from Supabase:', error);
        else console.log('Successfully deleted lead from Supabase Postgres:', id);
      } catch (err) {
        console.error('Supabase lead delete error:', err);
      }
    })();
  }

  return updated;
}
