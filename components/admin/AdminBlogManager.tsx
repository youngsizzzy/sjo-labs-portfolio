'use client';

import React, { useState, useEffect } from 'react';
import {
  BlogItem,
  FAQItem,
  getStoredBlogs,
  saveStoredBlogs,
  getStoredContentBriefs,
  saveStoredContentBriefs,
  fetchBlogsFromSupabase,
  fetchBriefsFromSupabase,
} from '@/lib/adminStore';
import { ContentBrief, CONTENT_PILLARS } from '@/lib/contentArchitecture';

export default function AdminBlogManager() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [briefs, setBriefs] = useState<ContentBrief[]>([]);
  
  // Top view mode: 'articles' | 'roadmap' | 'topical'
  const [adminViewMode, setAdminViewMode] = useState<'articles' | 'roadmap' | 'topical'>('articles');

  // Article Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  // Active tab inside Article modal
  const [activeTab, setActiveTab] = useState<'core' | 'seo' | 'structure' | 'connections' | 'checklist'>('core');

  // Core Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('WEB ARCHITECTURE');
  const [readTime, setReadTime] = useState('OCT 2026 • 6 MIN READ');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [ttfbBenchmark, setTtfbBenchmark] = useState('42ms Edge');
  const [codeSnippets, setCodeSnippets] = useState(4);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [publishedAt, setPublishedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  // Groq AI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  // SEO & AI Search Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [secondaryKeywordsText, setSecondaryKeywordsText] = useState('');
  const [searchIntent, setSearchIntent] = useState<'informational' | 'commercial' | 'transactional' | 'navigational'>('informational');
  const [targetLocation, setTargetLocation] = useState<'Global' | 'USA' | 'UK' | 'Canada' | 'Australia' | ''>('Global');
  const [targetIndustry, setTargetIndustry] = useState<'Small Business' | 'Real Estate' | 'Plumbing' | 'HVAC' | 'Electrical' | 'Roofing' | 'Construction' | 'Professional Services' | 'Other' | ''>('Professional Services');
  const [aiSummary, setAiSummary] = useState('');

  // Content Structure Fields
  const [keyQuestions, setKeyQuestions] = useState<string[]>(['']);
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>(['']);
  const [faqs, setFaqs] = useState<FAQItem[]>([{ question: '', answer: '' }]);

  // Content Connections Fields
  const [authorName, setAuthorName] = useState('SJO LABS Engineering Team');
  const [authorRole, setAuthorRole] = useState('Principal Systems Architect');
  const [relatedService, setRelatedService] = useState<'Web Design & Web Development' | 'Mobile App Development' | 'WordPress' | 'AI Automation' | 'AI Chatbots' | 'AI Phone Agents' | 'AI Search Visibility' | 'Meta & Google Ads' | ''>('Web Design & Web Development');
  const [selectedRelatedSlugs, setSelectedRelatedSlugs] = useState<string[]>([]);

  // Roadmap Filters & Brief Modal State
  const [pillarFilter, setPillarFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedBriefModal, setSelectedBriefModal] = useState<ContentBrief | null>(null);

  useEffect(() => {
    setBlogs(getStoredBlogs());
    setBriefs(getStoredContentBriefs());

    fetchBlogsFromSupabase().then((data) => {
      if (data && data.length > 0) setBlogs(data);
    });
    fetchBriefsFromSupabase().then((data) => {
      if (data && data.length > 0) setBriefs(data);
    });
  }, []);

  const resetForm = () => {
    setEditingSlug(null);
    setTitle('');
    setCategory('WEB ARCHITECTURE');
    setReadTime('OCT 2026 • 6 MIN READ');
    setExcerpt('');
    setContent('');
    setImageSrc('');
    setImageAlt('');
    setTtfbBenchmark('42ms Edge');
    setCodeSnippets(4);
    setStatus('published');
    setPublishedAt(new Date().toISOString().split('T')[0]);
    setUpdatedAt(new Date().toISOString().split('T')[0]);

    setGenerateError(null);
    setIsGenerating(false);

    setSeoTitle('');
    setMetaDescription('');
    setFocusKeyword('');
    setSecondaryKeywordsText('');
    setSearchIntent('informational');
    setTargetLocation('Global');
    setTargetIndustry('Professional Services');
    setAiSummary('');

    setKeyQuestions(['']);
    setKeyTakeaways(['']);
    setFaqs([{ question: '', answer: '' }]);

    setAuthorName('SJO LABS Engineering Team');
    setAuthorRole('Principal Systems Architect');
    setRelatedService('Web Design & Web Development');
    setSelectedRelatedSlugs([]);
    setActiveTab('core');
  };

  const handleGenerateWithAi = async () => {
    if (!title.trim()) {
      alert('Please enter an Article Title or Topic first before generating with AI.');
      return;
    }

    setIsGenerating(true);
    setGenerateError(null);

    try {
      const adminToken = typeof window !== 'undefined' ? (sessionStorage.getItem('sjolabs_admin_token') || 'sjolabs2026') : 'sjolabs2026';
      const res = await fetch('/api/admin/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
          'x-admin-passcode': 'sjolabs2026',
        },
        body: JSON.stringify({
          title,
          category,
          focusKeyword,
          targetIndustry,
          targetLocation,
        }),
      });


      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate article with Groq AI.');
      }

      const aiData = json.data;

      if (aiData.title && aiData.title !== title) setTitle(aiData.title);
      if (aiData.content) setContent(aiData.content);
      if (aiData.seoTitle) setSeoTitle(aiData.seoTitle);
      setImageAlt(aiData.imageAlt || aiData.title || title);
      if (aiData.metaDescription) {
        setMetaDescription(aiData.metaDescription);
        if (!excerpt) setExcerpt(aiData.metaDescription);
      }
      if (aiData.focusKeyword) setFocusKeyword(aiData.focusKeyword);
      if (aiData.secondaryKeywords && Array.isArray(aiData.secondaryKeywords)) {
        setSecondaryKeywordsText(aiData.secondaryKeywords.join(', '));
      }
      if (aiData.aiSummary) setAiSummary(aiData.aiSummary);
      if (aiData.keyQuestions && Array.isArray(aiData.keyQuestions) && aiData.keyQuestions.length > 0) {
        setKeyQuestions(aiData.keyQuestions);
      }
      if (aiData.keyTakeaways && Array.isArray(aiData.keyTakeaways) && aiData.keyTakeaways.length > 0) {
        setKeyTakeaways(aiData.keyTakeaways);
      }
      if (aiData.faqs && Array.isArray(aiData.faqs) && aiData.faqs.length > 0) {
        setFaqs(aiData.faqs);
      }

      // Always default to draft status when generating with AI
      setStatus('draft');
    } catch (err: any) {
      console.error('Error generating with Groq AI:', err);
      setGenerateError(err.message || 'An error occurred during AI generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  // Load a Brief directly into the Editor
  const handleLoadBriefIntoEditor = (brief: ContentBrief) => {
    resetForm();
    setTitle(brief.title);
    
    // Map content pillar to category
    let mappedCat = 'WEB ARCHITECTURE';
    if (brief.contentPillar.includes('AI')) mappedCat = 'AI AUTOMATION';
    else if (brief.contentPillar.includes('WordPress')) mappedCat = 'WEB ARCHITECTURE';
    setCategory(mappedCat);

    setExcerpt(brief.keyPoints && brief.keyPoints.length > 0 ? brief.keyPoints[0] : brief.primaryQuestion);
    setContent(`### Executive Direct Answer: ${brief.primaryQuestion}\n\n${brief.keyPoints ? brief.keyPoints.join('\n\n') : ''}`);
    setSeoTitle(brief.title);
    setMetaDescription(brief.keyPoints ? brief.keyPoints.join(' ') : brief.primaryQuestion);
    setFocusKeyword(brief.focusKeyword);
    setSecondaryKeywordsText(brief.secondaryKeywords ? brief.secondaryKeywords.join(', ') : '');
    setSearchIntent(brief.searchIntent);
    setTargetLocation(brief.targetLocation);
    setTargetIndustry(brief.targetIndustry);
    setAiSummary(`Direct Answer Brief for ${brief.primaryQuestion}: ${brief.keyPoints ? brief.keyPoints.join(' ') : ''}`);
    
    setKeyQuestions(brief.secondaryQuestions && brief.secondaryQuestions.length > 0 ? [brief.primaryQuestion, ...brief.secondaryQuestions] : [brief.primaryQuestion]);
    setKeyTakeaways(brief.keyPoints && brief.keyPoints.length > 0 ? brief.keyPoints : ['Direct answers placed upfront for AI engine extraction.']);
    
    setFaqs([
      {
        question: brief.primaryQuestion,
        answer: brief.keyPoints && brief.keyPoints.length > 0 ? brief.keyPoints[0] : 'Detailed answer provided in full article.'
      }
    ]);

    setRelatedService(brief.relatedService);
    setStatus('draft');
    
    // Mark brief status in store as in_editor
    const updatedBriefs = briefs.map(b => b.id === brief.id ? { ...b, status: 'in_editor' as const } : b);
    setBriefs(updatedBriefs);
    saveStoredContentBriefs(updatedBriefs);

    setSelectedBriefModal(null);
    setShowAddModal(true);
  };

  const handleEditBlog = (blog: BlogItem) => {
    setEditingSlug(blog.slug);
    setTitle(blog.title || '');
    setCategory(blog.category || 'WEB ARCHITECTURE');
    setReadTime(blog.dateAndReadTime || 'OCT 2026 • 6 MIN READ');
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setImageSrc(blog.imageSrc || '');
    setImageAlt(blog.imageAlt || '');
    setTtfbBenchmark(blog.ttfbBenchmark || '42ms Edge');
    setCodeSnippets(blog.codeSnippets || 4);
    setStatus(blog.status || 'published');
    setPublishedAt(blog.publishedAt ? blog.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0]);
    setUpdatedAt(new Date().toISOString().split('T')[0]);

    setSeoTitle(blog.seoTitle || '');
    setMetaDescription(blog.metaDescription || '');
    setFocusKeyword(blog.focusKeyword || '');
    setSecondaryKeywordsText(blog.secondaryKeywords ? blog.secondaryKeywords.join(', ') : '');
    setSearchIntent(blog.searchIntent || 'informational');
    setTargetLocation(blog.targetLocation || 'Global');
    setTargetIndustry(blog.targetIndustry || 'Professional Services');
    setAiSummary(blog.aiSummary || '');

    setKeyQuestions(blog.keyQuestions && blog.keyQuestions.length > 0 ? blog.keyQuestions : ['']);
    setKeyTakeaways(blog.keyTakeaways && blog.keyTakeaways.length > 0 ? blog.keyTakeaways : ['']);
    setFaqs(blog.faqs && blog.faqs.length > 0 ? blog.faqs : [{ question: '', answer: '' }]);

    setAuthorName(blog.authorName || 'SJO LABS Engineering Team');
    setAuthorRole(blog.authorRole || 'Principal Systems Architect');
    setRelatedService(blog.relatedService || 'Web Design & Web Development');
    setSelectedRelatedSlugs(blog.relatedArticleSlugs || []);

    setActiveTab('core');
    setShowAddModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImageSrc(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) return;

    const slug = editingSlug || (
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `article-${Date.now()}`
    );

    const parsedSecondary = secondaryKeywordsText
      ? secondaryKeywordsText.split(',').map((k) => k.trim()).filter(Boolean)
      : [];

    const parsedQuestions = keyQuestions.map((q) => q.trim()).filter(Boolean);
    const parsedTakeaways = keyTakeaways.map((t) => t.trim()).filter(Boolean);
    const parsedFaqs = faqs
      .filter((f) => f.question.trim() && f.answer.trim())
      .map((f, i) => ({ ...f, displayOrder: i + 1 }));

    const updatedBlogItem: BlogItem = {
      slug,
      title,
      category,
      dateAndReadTime: readTime,
      excerpt,
      content,
      imageSrc: imageSrc || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
      imageAlt: imageAlt || title,
      ttfbBenchmark: ttfbBenchmark || '50ms Edge',
      codeSnippets: Number(codeSnippets) || 3,
      status,
      publishedAt: publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      seoTitle: seoTitle || title,
      metaDescription: metaDescription || excerpt,
      focusKeyword,
      secondaryKeywords: parsedSecondary,
      searchIntent,
      targetLocation: targetLocation || null,
      targetIndustry: targetIndustry || null,
      aiSummary,

      keyQuestions: parsedQuestions,
      keyTakeaways: parsedTakeaways,
      faqs: parsedFaqs,

      authorName: authorName || 'SJO LABS Engineering Team',
      authorRole: authorRole || 'Principal Systems Architect',
      relatedService: relatedService || null,
      relatedArticleSlugs: selectedRelatedSlugs,
    };

    let updatedList: BlogItem[];
    if (editingSlug) {
      updatedList = blogs.map((b) => (b.slug === editingSlug ? updatedBlogItem : b));
    } else {
      updatedList = [updatedBlogItem, ...blogs];
    }

    setBlogs(updatedList);
    saveStoredBlogs(updatedList);
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteBlog = (slug: string) => {
    if (confirm('Are you sure you want to delete this technical field note?')) {
      const updated = blogs.filter((b) => b.slug !== slug);
      setBlogs(updated);
      saveStoredBlogs(updated);
    }
  };

  // Checklist Evaluation
  const checklistItems = [
    { label: 'Article Title', isComplete: Boolean(title) },
    { label: 'SEO Title', isComplete: Boolean(seoTitle || title) },
    { label: 'Meta Description', isComplete: Boolean(metaDescription || excerpt) },
    { label: 'Focus Keyword', isComplete: Boolean(focusKeyword) },
    { label: 'Article Excerpt', isComplete: Boolean(excerpt) },
    { label: 'Featured Image', isComplete: Boolean(imageSrc) },
    { label: 'Image Alt Text', isComplete: Boolean(imageAlt) },
    { label: 'Author Info', isComplete: Boolean(authorName) },
    { label: 'AI Search Summary', isComplete: Boolean(aiSummary) },
    { label: 'Key Questions', isComplete: keyQuestions.some((q) => q.trim().length > 0) },
    { label: 'Key Takeaways', isComplete: keyTakeaways.some((t) => t.trim().length > 0) },
    { label: 'Related Service', isComplete: Boolean(relatedService) },
    { label: 'Internal / Related Articles', isComplete: selectedRelatedSlugs.length > 0 },
    { label: 'Category Assigned', isComplete: Boolean(category) },
    { label: 'Published Date', isComplete: Boolean(publishedAt) },
  ];

  const completedCount = checklistItems.filter((i) => i.isComplete).length;

  // Filtered Roadmap Briefs
  const filteredBriefs = briefs.filter((b) => {
    if (pillarFilter !== 'all' && b.contentPillar !== pillarFilter) return false;
    if (locationFilter !== 'all' && b.targetLocation !== locationFilter) return false;
    if (priorityFilter !== 'all' && b.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090D16] border border-[#1E293B] p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#00F0FF]">SJOLabs Content &amp; AI Search Hub</h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Phase 1 &amp; Phase 2: SEO, Answer Engine Optimization (AEO), 30-Article Roadmap &amp; Strategic Briefs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-3 bg-[#00F0FF] text-[#090D16] font-mono font-bold text-xs rounded-xl hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20 flex items-center justify-center gap-2"
          >
            <span>+ Write / Edit Article</span>
          </button>
        </div>
      </div>

      {/* Top Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#1E293B] pb-4 text-xs font-mono">
        <button
          onClick={() => setAdminViewMode('articles')}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 font-bold ${
            adminViewMode === 'articles'
              ? 'bg-[#00F0FF] text-[#090D16] shadow-lg shadow-[#00F0FF]/20'
              : 'bg-[#0F172A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
          }`}
        >
          <span>📝 1. Published &amp; Draft Field Notes ({blogs.length})</span>
        </button>
        <button
          onClick={() => setAdminViewMode('roadmap')}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 font-bold ${
            adminViewMode === 'roadmap'
              ? 'bg-[#00F0FF] text-[#090D16] shadow-lg shadow-[#00F0FF]/20'
              : 'bg-[#0F172A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
          }`}
        >
          <span>🚀 2. 30-Article Strategic Roadmap &amp; Briefs ({briefs.length})</span>
        </button>
        <button
          onClick={() => setAdminViewMode('topical')}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 font-bold ${
            adminViewMode === 'topical'
              ? 'bg-[#00F0FF] text-[#090D16] shadow-lg shadow-[#00F0FF]/20'
              : 'bg-[#0F172A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
          }`}
        >
          <span>🏛 3. Topical Authority Map &amp; Pillars</span>
        </button>
      </div>

      {/* VIEW MODE 1: PUBLISHED & DRAFT FIELD NOTES */}
      {adminViewMode === 'articles' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] bg-[#090D16] p-4 rounded-xl border border-[#1E293B]">
            <span>Active Articles in CMS: {blogs.length} Total</span>
            <span>All articles feature structured JSON-LD &amp; AEO metadata.</span>
          </div>

          <div className="space-y-4">
            {blogs.map((b) => (
              <div
                key={b.slug}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#00F0FF] transition-all"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#090D16] text-[#00F0FF] text-[10px] font-mono font-bold uppercase">
                      {b.category}
                    </span>
                    <span className="text-xs font-mono text-[#94A3B8]">{b.dateAndReadTime}</span>
                    {b.status === 'draft' && (
                      <span className="text-[10px] font-mono bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full font-bold">
                        DRAFT
                      </span>
                    )}
                    {b.relatedService && (
                      <span className="text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                        {b.relatedService}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-1">{b.excerpt}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleEditBlog(b)}
                    className="px-3 py-1.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] text-xs font-mono font-bold hover:bg-[#00F0FF] hover:text-[#090D16] transition-all"
                  >
                    Edit Meta / CMS
                  </button>
                  <a
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#090D16] text-[#00F0FF] text-xs font-mono font-bold hover:bg-black transition-all"
                  >
                    Preview →
                  </a>
                  <button
                    onClick={() => handleDeleteBlog(b.slug)}
                    className="text-xs font-mono text-red-500 hover:text-red-700 px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: 30-ARTICLE STRATEGIC ROADMAP */}
      {adminViewMode === 'roadmap' && (
        <div className="space-y-6">
          {/* Roadmap Info & Filters */}
          <div className="bg-[#090D16] border border-[#1E293B] p-6 rounded-2xl text-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
              <div>
                <h2 className="text-lg font-bold font-serif text-[#00F0FF]">
                  30 Strategic Content Briefs (Phase 2 Architecture)
                </h2>
                <p className="text-xs text-[#94A3B8] font-mono mt-1">
                  Targeting USA, UK, Canada, and Australia across Web Design, AI Automation, Chatbots, Voice AI &amp; AEO.
                </p>
              </div>
              <div className="text-xs font-mono text-[#00F0FF] bg-[#0F172A] px-4 py-2 rounded-xl border border-[#334155]">
                Showing {filteredBriefs.length} of {briefs.length} Planned Briefs
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <label className="block text-[#94A3B8] uppercase mb-1">Content Pillar</label>
                <select
                  value={pillarFilter}
                  onChange={(e) => setPillarFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="all">All Content Pillars</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Web Development">Web Development</option>
                  <option value="WordPress">WordPress</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="AI Chatbots">AI Chatbots</option>
                  <option value="AI Phone Agents">AI Phone Agents</option>
                  <option value="AI Search Visibility">AI Search Visibility</option>
                  <option value="Small Business Digital Growth">Small Business Digital Growth</option>
                </select>
              </div>

              <div>
                <label className="block text-[#94A3B8] uppercase mb-1">Target Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="all">All Target Locations</option>
                  <option value="Global">Global</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div>
                <label className="block text-[#94A3B8] uppercase mb-1">Editorial Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="all">All Priorities</option>
                  <option value="FOUNDATIONAL">Foundational</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="SUPPORTING">Supporting</option>
                  <option value="AUTHORITY">Authority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Roadmap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBriefs.map((brief) => (
              <div
                key={brief.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:border-[#00F0FF] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <span className="text-xs font-mono font-bold text-[#090D16] bg-[#00F0FF]/20 px-2.5 py-1 rounded-md">
                      Article #{brief.articleNumber}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                        brief.priority === 'FOUNDATIONAL'
                          ? 'bg-purple-100 text-purple-700'
                          : brief.priority === 'COMMERCIAL'
                          ? 'bg-emerald-100 text-emerald-700'
                          : brief.priority === 'AUTHORITY'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {brief.priority}
                      </span>
                      <span className="bg-[#090D16] text-[#00F0FF] px-2 py-0.5 rounded-full font-bold">
                        {brief.targetLocation}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                      {brief.title}
                    </h3>
                    <p className="text-xs text-[#64748B] font-mono mt-1">
                      Pillar: <strong className="text-[#0F172A]">{brief.contentPillar}</strong> • Industry: <strong>{brief.targetIndustry}</strong>
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1">
                    <div className="font-bold text-[#0F172A]">❓ Primary Question:</div>
                    <div className="text-[#334155] italic">&quot;{brief.primaryQuestion}&quot;</div>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[10px] font-mono text-[#64748B]">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">Keyword: {brief.focusKeyword}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded uppercase">Intent: {brief.searchIntent}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedBriefModal(brief)}
                    className="px-3 py-1.5 rounded-lg bg-[#F1F5F9] text-[#0F172A] text-xs font-mono font-bold hover:bg-[#090D16] hover:text-[#00F0FF] transition-all"
                  >
                    View Content Brief →
                  </button>
                  <button
                    onClick={() => handleLoadBriefIntoEditor(brief)}
                    className="px-3 py-1.5 rounded-lg bg-[#00F0FF] text-[#090D16] text-xs font-mono font-bold hover:bg-black hover:text-white transition-all shadow-sm"
                  >
                    Load into Editor ⚡
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: TOPICAL AUTHORITY MAP */}
      {adminViewMode === 'topical' && (
        <div className="space-y-6">
          <div className="bg-[#090D16] border border-[#1E293B] p-6 rounded-2xl text-white space-y-3">
            <h2 className="text-lg font-bold font-serif text-[#00F0FF]">
              Topical Authority Model &amp; Content Pillars
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Topical authority is established by clustering informational and commercial articles under primary pillar topics, linking cluster content back to primary SJOLabs services, and providing direct synthesized answers for AI engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTENT_PILLARS.map((pillar) => (
              <div key={pillar.id} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#0F172A]">{pillar.name}</h3>
                  <span className="text-[10px] font-mono bg-[#090D16] text-[#00F0FF] px-2.5 py-1 rounded-full font-bold">
                    {briefs.filter(b => b.contentPillar === pillar.name).length} Briefs Allocated
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">{pillar.description}</p>
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1 font-bold">
                    Key Topics in Cluster:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {pillar.topics.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono bg-gray-100 text-[#334155] px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BRIEF DETAILS MODAL */}
      {selectedBriefModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090D16] border border-[#1E293B] rounded-3xl p-6 sm:p-8 max-w-3xl w-full text-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans text-xs">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00F0FF] bg-[#1E293B] px-3 py-1 rounded-full uppercase">
                  Article #{selectedBriefModal.articleNumber} • {selectedBriefModal.contentPillar} Brief
                </span>
                <h2 className="text-lg font-bold font-serif text-white mt-2">
                  {selectedBriefModal.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedBriefModal(null)}
                className="text-[#94A3B8] hover:text-white font-mono text-sm px-3 py-1 bg-[#1E293B] rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
                <div className="p-3 bg-[#0F172A] rounded-xl border border-[#334155]">
                  <span className="text-[#94A3B8] block text-[9px]">PRIORITY</span>
                  <span className="font-bold text-[#00F0FF]">{selectedBriefModal.priority}</span>
                </div>
                <div className="p-3 bg-[#0F172A] rounded-xl border border-[#334155]">
                  <span className="text-[#94A3B8] block text-[9px]">TARGET LOCATION</span>
                  <span className="font-bold text-white">{selectedBriefModal.targetLocation}</span>
                </div>
                <div className="p-3 bg-[#0F172A] rounded-xl border border-[#334155]">
                  <span className="text-[#94A3B8] block text-[9px]">SEARCH INTENT</span>
                  <span className="font-bold text-white uppercase">{selectedBriefModal.searchIntent}</span>
                </div>
                <div className="p-3 bg-[#0F172A] rounded-xl border border-[#334155]">
                  <span className="text-[#94A3B8] block text-[9px]">RELATED SERVICE</span>
                  <span className="font-bold text-[#00F0FF]">{selectedBriefModal.relatedService}</span>
                </div>
              </div>

              <div className="p-4 bg-[#0F172A] rounded-xl border border-[#334155] space-y-2">
                <h4 className="text-[#00F0FF] font-mono uppercase font-bold text-[11px]">
                  ❓ Primary Question:
                </h4>
                <p className="text-sm font-semibold text-white">&quot;{selectedBriefModal.primaryQuestion}&quot;</p>
              </div>

              {selectedBriefModal.secondaryQuestions && (
                <div className="p-4 bg-[#0F172A] rounded-xl border border-[#334155] space-y-2">
                  <h4 className="text-[#00F0FF] font-mono uppercase font-bold text-[11px]">
                    ❓ Secondary Questions to Answer:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-[#94A3B8]">
                    {selectedBriefModal.secondaryQuestions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 bg-[#0F172A] rounded-xl border border-[#334155] space-y-2">
                <h4 className="text-[#00F0FF] font-mono uppercase font-bold text-[11px]">
                  💡 Key Points &amp; Answer Guidance:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-white">
                  {selectedBriefModal.keyPoints.map((kp, i) => (
                    <li key={i}>{kp}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
                <div>
                  <span className="text-[#94A3B8] font-mono text-[10px] uppercase block">Focus Keyword</span>
                  <span className="font-bold font-mono text-white text-xs">{selectedBriefModal.focusKeyword}</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] font-mono text-[10px] uppercase block">Target Audience</span>
                  <span className="font-bold font-mono text-white text-xs">{selectedBriefModal.targetAudience}</span>
                </div>
              </div>

              <div className="p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
                <span className="text-[#94A3B8] font-mono text-[10px] uppercase block">Suggested Conversion CTA</span>
                <span className="font-semibold text-emerald-400 text-xs">{selectedBriefModal.suggestedCta}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedBriefModal(null)}
                className="px-4 py-2 rounded-xl bg-[#1E293B] text-[#94A3B8] font-mono"
              >
                Back to Roadmap
              </button>
              <button
                type="button"
                onClick={() => handleLoadBriefIntoEditor(selectedBriefModal)}
                className="px-6 py-2.5 rounded-xl bg-[#00F0FF] text-[#090D16] font-mono font-bold text-xs hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20"
              >
                Load Brief into Article Editor ⚡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE EDIT / ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090D16] border border-[#1E293B] rounded-3xl p-6 sm:p-8 max-w-4xl w-full text-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#00F0FF]">
                  {editingSlug ? 'Edit Field Note &amp; SEO Meta' : 'Publish New Field Note'}
                </h2>
                <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                  Configure core content, search engine fields, and AI search readiness.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-[#94A3B8] hover:text-white font-mono text-sm px-3 py-1 bg-[#1E293B] rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#1E293B] pb-3 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('core')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'core'
                    ? 'bg-[#00F0FF] text-[#090D16] font-bold'
                    : 'bg-[#0F172A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                1. Core Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'seo'
                    ? 'bg-[#00F0FF] text-[#090D16] font-bold'
                    : 'bg-[#0F172A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                2. SEO &amp; AI Search
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('structure')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'structure'
                    ? 'bg-[#00F0FF] text-[#090D16] font-bold'
                    : 'bg-[#0F172A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                3. Content Structure
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('connections')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'connections'
                    ? 'bg-[#00F0FF] text-[#090D16] font-bold'
                    : 'bg-[#0F172A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                4. Content Connections
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('checklist')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'checklist'
                    ? 'bg-[#00F0FF] text-[#090D16] font-bold'
                    : 'bg-[#0F172A] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                }`}
              >
                5. AI Search Readiness ({completedCount}/{checklistItems.length})
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-6 font-sans text-xs">
              {/* TAB 1: CORE DETAILS */}
              {activeTab === 'core' && (
                <div className="space-y-4">
                  {/* Groq AI Generation Banner */}
                  <div className="p-4 bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl border border-[#00F0FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#00F0FF]">
                        <span>⚡ Groq AI Article Generator</span>
                        <span className="text-[10px] bg-[#00F0FF]/20 text-[#00F0FF] px-2 py-0.5 rounded-full uppercase">Llama 3.3 70B</span>
                      </div>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">
                        Enter an article title/topic below and click to generate full article content, SEO metadata, AI summary, questions, takeaways, and FAQs.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateWithAi}
                      disabled={isGenerating}
                      className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                        isGenerating
                          ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                          : 'bg-[#00F0FF] text-[#090D16] hover:bg-white shadow-md shadow-[#00F0FF]/20'
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <span className="animate-spin inline-block">⏳</span> Generating Content...
                        </>
                      ) : (
                        <>
                          <span>⚡ Generate with AI</span>
                        </>
                      )}
                    </button>
                  </div>

                  {generateError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-mono">
                      ⚠ AI Generation Error: {generateError}
                    </div>
                  )}

                  <div>
                    <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Achieving Sub-140ms TTFB Worldwide with Decoupled Next.js Stacks"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="WEB ARCHITECTURE">WEB ARCHITECTURE</option>
                        <option value="AI AUTOMATION">AI AUTOMATION</option>
                        <option value="AD MACHINERY">AD MACHINERY</option>
                        <option value="PERFORMANCE">PERFORMANCE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Date &amp; Read Time
                      </label>
                      <input
                        type="text"
                        placeholder="OCT 2026 • 6 MIN READ"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Publish Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft (Hidden)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                      Article Excerpt / Summary *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Brief human-readable summary of the article..."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-mono uppercase mb-1 flex items-center justify-between">
                      <span>Article Body Content (Markdown Format)</span>
                      <span className="text-[10px] text-[#64748B]">Full Markdown Text &amp; Headings</span>
                    </label>
                    <textarea
                      rows={8}
                      placeholder="Full markdown article content generated by Groq AI or written manually..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] font-mono text-xs focus:outline-none focus:border-[#00F0FF]"
                    ></textarea>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3 p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B]">
                    <div className="flex items-center justify-between">
                      <label className="block text-[#00F0FF] font-mono uppercase font-bold">
                        📷 Featured Cover Image *
                      </label>
                      <div className="flex gap-2 text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={() => setUploadMode('file')}
                          className={`px-2.5 py-1 rounded-md ${
                            uploadMode === 'file'
                              ? 'bg-[#00F0FF] text-[#090D16] font-bold'
                              : 'bg-[#1E293B] text-[#94A3B8]'
                          }`}
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setUploadMode('url')}
                          className={`px-2.5 py-1 rounded-md ${
                            uploadMode === 'url'
                              ? 'bg-[#00F0FF] text-[#090D16] font-bold'
                              : 'bg-[#1E293B] text-[#94A3B8]'
                          }`}
                        >
                          Enter URL
                        </button>
                      </div>
                    </div>

                    {uploadMode === 'file' ? (
                      <div className="border-2 border-dashed border-[#334155] hover:border-[#00F0FF] rounded-xl p-4 text-center bg-[#090D16] transition-all relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {imageSrc ? (
                          <div className="space-y-2 pointer-events-none">
                            <div className="relative h-28 w-full max-w-xs mx-auto rounded-lg overflow-hidden border border-[#00F0FF]">
                              <img src={imageSrc} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-xs font-mono text-[#00F0FF]">
                              ✓ Image Loaded! Click or drop to replace.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1 pointer-events-none">
                            <p className="text-xs font-bold text-white font-mono">
                              Click to upload image file from device
                            </p>
                            <p className="text-[10px] text-[#64748B] font-mono">
                              PNG, JPG, WEBP, or SVG
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={imageSrc}
                        onChange={(e) => setImageSrc(e.target.value)}
                        className="w-full px-4 py-3 bg-[#090D16] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    )}

                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Image Alt Text (for Accessibility &amp; Search Crawlers)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next.js App Router edge architecture deployment diagram"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        TTFB Telemetry Badge
                      </label>
                      <input
                        type="text"
                        placeholder="42ms Edge"
                        value={ttfbBenchmark}
                        onChange={(e) => setTtfbBenchmark(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Code Snippets Count
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={codeSnippets}
                        onChange={(e) => setCodeSnippets(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SEO & AI SEARCH */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#0F172A] rounded-xl border border-[#1E293B] space-y-1">
                    <h3 className="text-xs font-mono font-bold text-[#00F0FF] uppercase">
                      SEO &amp; Generative Engine Optimization (GEO)
                    </h3>
                    <p className="text-[11px] text-[#94A3B8]">
                      Dedicated metadata for search engines and AI assistants. Fallbacks apply automatically if left empty.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                      SEO Title (Dedicated Search Title)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sub-140ms TTFB Guide: Decoupled Next.js Architecture | SJO LABS"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                    />
                    <p className="text-[10px] text-[#64748B] font-mono mt-1">
                      If left empty, defaults to Article Title.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                      Meta Description (SERP Snippet)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Concise snippet for search engine result pages (140-160 characters)..."
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Focus Keyword
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sub-second TTFB Next.js"
                        value={focusKeyword}
                        onChange={(e) => setFocusKeyword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Secondary Keywords (Comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. edge rendering, decoupled frontend, Core Web Vitals"
                        value={secondaryKeywordsText}
                        onChange={(e) => setSecondaryKeywordsText(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Search Intent
                      </label>
                      <select
                        value={searchIntent}
                        onChange={(e) => setSearchIntent(e.target.value as any)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="informational">Informational</option>
                        <option value="commercial">Commercial</option>
                        <option value="transactional">Transactional</option>
                        <option value="navigational">Navigational</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Target Location
                      </label>
                      <select
                        value={targetLocation}
                        onChange={(e) => setTargetLocation(e.target.value as any)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="Global">Global</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="">None / Not Specified</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Target Industry
                      </label>
                      <select
                        value={targetIndustry}
                        onChange={(e) => setTargetIndustry(e.target.value as any)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="Small Business">Small Business</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Roofing">Roofing</option>
                        <option value="Construction">Construction</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Other">Other</option>
                        <option value="">None / General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                      AI Search Summary (Core Answer Topic Breakdown)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Concise summary clarifying the main answer and core topic of the article..."
                      value={aiSummary}
                      onChange={(e) => setAiSummary(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* TAB 3: CONTENT STRUCTURE */}
              {activeTab === 'structure' && (
                <div className="space-y-6">
                  {/* Key Questions */}
                  <div className="p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B] space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-[#00F0FF] font-mono uppercase font-bold">
                        ❓ Key Questions Answered by Article
                      </label>
                      <button
                        type="button"
                        onClick={() => setKeyQuestions([...keyQuestions, ''])}
                        className="text-[10px] font-mono text-[#00F0FF] bg-[#1E293B] px-2.5 py-1 rounded-md hover:bg-[#334155]"
                      >
                        + Add Question
                      </button>
                    </div>
                    {keyQuestions.map((q, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="e.g. How does edge deployment reduce TTFB?"
                          value={q}
                          onChange={(e) => {
                            const copy = [...keyQuestions];
                            copy[idx] = e.target.value;
                            setKeyQuestions(copy);
                          }}
                          className="flex-grow px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                        />
                        {keyQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setKeyQuestions(keyQuestions.filter((_, i) => i !== idx))}
                            className="text-red-400 hover:text-red-300 font-mono text-xs px-2"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B] space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-[#00F0FF] font-mono uppercase font-bold">
                        💡 Key Takeaways (3–5 Bullet Points)
                      </label>
                      <button
                        type="button"
                        onClick={() => setKeyTakeaways([...keyTakeaways, ''])}
                        className="text-[10px] font-mono text-[#00F0FF] bg-[#1E293B] px-2.5 py-1 rounded-md hover:bg-[#334155]"
                      >
                        + Add Takeaway
                      </button>
                    </div>
                    {keyTakeaways.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Decoupling presentation removes PHP server bottlenecks."
                          value={t}
                          onChange={(e) => {
                            const copy = [...keyTakeaways];
                            copy[idx] = e.target.value;
                            setKeyTakeaways(copy);
                          }}
                          className="flex-grow px-4 py-2.5 bg-[#090D16] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                        />
                        {keyTakeaways.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setKeyTakeaways(keyTakeaways.filter((_, i) => i !== idx))}
                            className="text-red-400 hover:text-red-300 font-mono text-xs px-2"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Article FAQs */}
                  <div className="p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B] space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-[#00F0FF] font-mono uppercase font-bold">
                        💬 Article Specific FAQs (Question &amp; Answer Pairs)
                      </label>
                      <button
                        type="button"
                        onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
                        className="text-[10px] font-mono text-[#00F0FF] bg-[#1E293B] px-2.5 py-1 rounded-md hover:bg-[#334155]"
                      >
                        + Add FAQ Item
                      </button>
                    </div>
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="p-3 bg-[#090D16] rounded-xl border border-[#334155] space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#94A3B8]">FAQ #{idx + 1}</span>
                          {faqs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                              className="text-red-400 hover:text-red-300 font-mono text-xs"
                            >
                              Remove FAQ
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Question..."
                          value={faq.question}
                          onChange={(e) => {
                            const copy = [...faqs];
                            copy[idx].question = e.target.value;
                            setFaqs(copy);
                          }}
                          className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                        />
                        <textarea
                          rows={2}
                          placeholder="Answer..."
                          value={faq.answer}
                          onChange={(e) => {
                            const copy = [...faqs];
                            copy[idx].answer = e.target.value;
                            setFaqs(copy);
                          }}
                          className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CONTENT CONNECTIONS */}
              {activeTab === 'connections' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        placeholder="SJO LABS Engineering Team"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                        Author Role / Title
                      </label>
                      <input
                        type="text"
                        placeholder="Principal Systems Architect"
                        value={authorRole}
                        onChange={(e) => setAuthorRole(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                      Related SJOLabs Service
                    </label>
                    <select
                      value={relatedService}
                      onChange={(e) => setRelatedService(e.target.value as any)}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                    >
                      <option value="Web Design">Web Design</option>
                      <option value="WordPress Development">WordPress Development</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="AI Chatbot">AI Chatbot</option>
                      <option value="AI Phone Agent">AI Phone Agent</option>
                      <option value="AI Search Visibility">AI Search Visibility</option>
                      <option value="">None / Unassigned</option>
                    </select>
                  </div>

                  <div className="p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B] space-y-3">
                    <label className="block text-[#00F0FF] font-mono uppercase font-bold">
                      🔗 Related Internal Field Notes
                    </label>
                    <p className="text-[11px] text-[#94A3B8]">
                      Select articles to display under the &quot;Related Field Notes&quot; section:
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {blogs
                        .filter((b) => b.slug !== editingSlug)
                        .map((b) => {
                          const isChecked = selectedRelatedSlugs.includes(b.slug);
                          return (
                            <label
                              key={b.slug}
                              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#090D16] border border-[#334155] cursor-pointer hover:border-[#00F0FF]"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedRelatedSlugs([...selectedRelatedSlugs, b.slug]);
                                  } else {
                                    setSelectedRelatedSlugs(
                                      selectedRelatedSlugs.filter((s) => s !== b.slug)
                                    );
                                  }
                                }}
                                className="w-4 h-4 accent-[#00F0FF]"
                              />
                              <div className="text-xs">
                                <span className="font-bold text-white block">{b.title}</span>
                                <span className="text-[10px] text-[#94A3B8] font-mono">
                                  {b.category} • {b.slug}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: AI SEARCH READINESS CHECKLIST */}
              {activeTab === 'checklist' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B] space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-mono font-bold text-[#00F0FF] uppercase">
                        AI SEARCH READINESS (INTERNAL CMS CHECKLIST)
                      </h3>
                      <span className="text-xs font-mono font-bold text-white bg-[#1E293B] px-3 py-1 rounded-full">
                        {completedCount} / {checklistItems.length} COMPLETED
                      </span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                      Internal completeness evaluation to verify whether structured metadata, content questions, and internal links have been configured.
                    </p>
                    <div className="text-[10px] font-mono text-[#64748B] italic pt-1">
                      Note: This is an internal CMS audit checklist. It does not predict or guarantee search engine positions.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {checklistItems.map((item, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between ${
                          item.isComplete
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span>{item.isComplete ? '✓ Complete' : '⚠ Missing'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 flex items-center justify-between border-t border-[#1E293B]">
                <div className="text-[11px] font-mono text-[#94A3B8]">
                  Tab {activeTab.toUpperCase()}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#1E293B] text-[#94A3B8] font-mono text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#00F0FF] text-[#090D16] font-mono font-bold text-xs hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20"
                  >
                    {editingSlug ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
