'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredBlogs, fetchBlogsFromSupabase, BlogItem } from '@/lib/adminStore';

const categories = [
  'ALL FIELD NOTES',
  'WEB ARCHITECTURE',
  'AI AUTOMATION',
  'AD MACHINERY',
  'PERFORMANCE',
  'WEB DESIGN',
  'WORDPRESS',
  'AI SEARCH VISIBILITY',
];

export default function BlogSearchFilter() {
  const [articles, setArticles] = useState<BlogItem[]>(getStoredBlogs().filter((b) => b.status !== 'draft'));
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL FIELD NOTES');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchBlogsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        const publishedOnly = data.filter((b) => b.status !== 'draft');
        setArticles(publishedOnly);
      }
    });
  }, []);


  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'ALL FIELD NOTES' || article.category === selectedCategory;
    const matchesQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filter Bar */}
      <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm space-y-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search field notes by keyword (e.g. Next.js, CAPI, AI Triage)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-sm font-sans text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20 transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#64748B] hover:text-[#0F172A]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills - Responsive grid on mobile, flex on desktop */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#F1F5F9] pt-4">
          <div className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">
            Filter Topic:
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all text-center ${
                  selectedCategory === cat
                    ? 'bg-[#090D16] text-[#00F0FF] shadow-sm border border-[#1E293B]'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-mono text-[#64748B]">
          SHOWING <strong className="text-[#0F172A]">{filteredArticles.length}</strong> TECHNICAL FIELD NOTES
        </span>
        {selectedCategory !== 'ALL FIELD NOTES' && (
          <span className="text-xs font-mono text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-md border border-[#BFDBFE]">
            Category: {selectedCategory}
          </span>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.slug}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-[#090D16]">
                  <img
                    src={art.imageSrc}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-4 left-4 bg-[#090D16]/90 backdrop-blur-sm border border-[#1E293B] text-[#00F0FF] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {art.category}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#090D16]/80 backdrop-blur-sm text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-[#1E293B] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
                    <span>{art.ttfbBenchmark}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-3">
                    <span>{art.dateAndReadTime}</span>
                    <span className="text-[#64748B]">{art.codeSnippets} Code Snippets</span>
                  </div>

                  <h2 className="text-xl font-bold text-[#090D16] mb-3 group-hover:text-[#2563EB] transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${art.slug}`}
                  className="inline-flex items-center justify-between w-full font-semibold text-xs text-[#090D16] group-hover:text-white bg-[#F1F5F9] group-hover:bg-[#090D16] px-5 py-3 rounded-xl transition-all border border-transparent group-hover:border-[#00F0FF]/30"
                >
                  <span>Read Field Note</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center mx-auto mb-4 font-mono text-xl">
            ?
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] mb-2">No matching field notes found</h3>
          <p className="text-sm text-[#64748B] max-w-md mx-auto mb-6">
            Try adjusting your search query or selecting a different topic filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL FIELD NOTES');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#090D16] text-[#00F0FF] text-xs font-mono font-bold hover:bg-[#1E293B] transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
