'use client';

import React, { useState, useEffect } from 'react';
import {
  ProjectItem,
  getStoredProjects,
  addStoredProject,
  deleteStoredProject,
  fetchProjectsFromSupabase,
} from '@/lib/adminStore';

export default function AdminProjectsManager() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isFetchingLive, setIsFetchingLive] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectItem['category']>('WEB ARCHITECTURE');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [metrics, setMetrics] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');

  useEffect(() => {
    // 1. Initial render from local cache
    setProjects(getStoredProjects());

    // 2. Fetch fresh live state directly from Supabase
    fetchProjectsFromSupabase()
      .then((liveData) => {
        if (liveData && liveData.length > 0) {
          setProjects(liveData);
        }
      })
      .catch((err) => {
        console.error('Error fetching live projects:', err);
      })
      .finally(() => {
        setIsFetchingLive(false);
      });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use HTML Canvas to downscale and compress images to <100KB JPEG
    // This prevents localStorage QuotaExceededError and ensures instant loading
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.8);
          setImageSrc(compressed);
        } else {
          setImageSrc(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setIsSaving(true);

    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      category,
      description,
      imageSrc: imageSrc || '/images/project-laptop.jpg',
      liveUrl: liveUrl.trim() || undefined,
      metrics: metrics || '100% Production Ready',
      techStack: techStackInput ? techStackInput.split(',').map((t) => t.trim()) : ['Next.js 15', 'TypeScript'],
      date: 'OCT 2026',
    };

    // Optimistically update list
    setProjects((prev) => [newProj, ...prev]);

    try {
      await addStoredProject(newProj);
    } catch (err) {
      console.error('Failed to add project:', err);
    } finally {
      setIsSaving(false);
      // Reset Form
      setTitle('');
      setDescription('');
      setImageSrc('');
      setLiveUrl('');
      setMetrics('');
      setTechStackInput('');
      setShowAddModal(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio project?')) {
      setDeletingId(id);
      // Optimistically remove from state
      setProjects((prev) => prev.filter((p) => p.id !== id));

      try {
        await deleteStoredProject(id);
      } catch (err) {
        console.error('Failed to delete project:', err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#090D16] border border-[#1E293B] p-6 rounded-2xl text-white">
        <div>
          <h1 className="text-2xl font-bold font-serif">Manage Portfolio &amp; Client Works</h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Add new completed projects, upload cover images, and attach live client site URLs.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-[#00F0FF] text-[#090D16] font-mono font-bold text-xs rounded-xl hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20 flex items-center justify-center gap-2"
        >
          <span>+ Add New Project Work</span>
        </button>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090D16] border border-[#1E293B] rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
              <h2 className="text-xl font-bold font-serif text-[#00F0FF]">
                Add Portfolio Case Study &amp; Image
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#94A3B8] hover:text-white font-mono text-sm"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Joksybee Properties Luxury Real Estate Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectItem['category'])}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white focus:outline-none focus:border-[#00F0FF]"
                  >
                    <option value="WEB ARCHITECTURE">WEB ARCHITECTURE</option>
                    <option value="MOBILE APP DEV">MOBILE APP DEV</option>
                    <option value="AI AUTOMATION">AI AUTOMATION</option>
                    <option value="META &amp; GOOGLE ADS">META &amp; GOOGLE ADS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#00F0FF] font-mono uppercase mb-1 font-bold">
                    🔗 Live Client Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://joksybeeproperties.com"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#00F0FF]/50 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Brief breakdown of what was engineered and the results achieved..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                ></textarea>
              </div>

              {/* Cover Image Upload Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[#00F0FF] font-mono uppercase font-bold">
                    📷 Cover Image Upload *
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
                  <div className="border-2 border-dashed border-[#334155] hover:border-[#00F0FF] rounded-2xl p-6 text-center bg-[#0F172A] transition-all relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {imageSrc ? (
                      <div className="space-y-3 pointer-events-none">
                        <div className="relative h-36 w-full max-w-xs mx-auto rounded-xl overflow-hidden border border-[#00F0FF]">
                          <img src={imageSrc} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-mono text-[#00F0FF]">
                          ✓ Image Selected! Click or drag to replace file.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-[#1E293B] text-[#00F0FF] font-mono flex items-center justify-center mx-auto text-lg">
                          📁
                        </div>
                        <p className="text-xs font-bold text-white font-mono">
                          Click to select an image file from your device
                        </p>
                        <p className="text-[10px] text-[#64748B] font-mono">
                          Supports PNG, JPG, WEBP &amp; SVG formats
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="https://... or /images/joksybee-hero.png"
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                    Key Performance Metric
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +340% Lead Conversion"
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-mono uppercase mb-1">
                    Tech Stack Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Next.js 15, TypeScript, Tailwind, Meta CAPI"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1E293B] text-[#94A3B8] font-mono text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#00F0FF] text-[#090D16] font-mono font-bold text-xs hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20 disabled:opacity-50"
                >
                  {isSaving ? 'Publishing to Database...' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List Grid */}
      {isFetchingLive && projects.length === 0 ? (
        <div className="p-12 text-center text-xs font-mono text-[#64748B] bg-white border border-[#E2E8F0] rounded-2xl">
          Fetching live projects from Supabase database...
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center text-xs font-mono text-[#64748B] bg-white border border-[#E2E8F0] rounded-2xl">
          No projects found. Click &quot;+ Add New Project Work&quot; above to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#00F0FF] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#090D16] text-[#00F0FF] text-[10px] font-mono font-bold uppercase">
                    {proj.category}
                  </span>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    disabled={deletingId === proj.id}
                    className="text-xs font-mono text-red-500 hover:text-red-700 disabled:opacity-40"
                  >
                    {deletingId === proj.id ? '[ Deleting... ]' : '[ Delete ]'}
                  </button>
                </div>

              {/* Thumbnail Image Preview */}
              {proj.imageSrc && (
                <div className="relative h-44 w-full rounded-xl overflow-hidden bg-[#090D16] border border-[#E2E8F0]">
                  <img src={proj.imageSrc} alt={proj.title} className="w-full h-full object-cover" />
                </div>
              )}

              <h3 className="text-lg font-bold text-[#0F172A] font-serif leading-snug">
                {proj.title}
              </h3>

              <p className="text-xs text-[#64748B] leading-relaxed">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-[#F1F5F9] text-[#334155] px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-mono">
              <span className="text-[#2563EB] font-bold">{proj.metrics}</span>

              {proj.liveUrl ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00F0FF]/15 text-[#090D16] border border-[#00F0FF] font-bold hover:bg-[#00F0FF] transition-all"
                >
                  <span>Visit Live Site</span>
                  <span>↗</span>
                </a>
              ) : (
                <span className="text-[#94A3B8]">No Live Link</span>
              )}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
