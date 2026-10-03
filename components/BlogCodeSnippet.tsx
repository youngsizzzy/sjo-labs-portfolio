'use client';

import React, { useState } from 'react';

interface BlogCodeSnippetProps {
  title?: string;
  code: string;
}

export default function BlogCodeSnippet({ title = '// Technical Snippet', code }: BlogCodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-[#090D16] text-[#F8FAFC] overflow-hidden border border-[#1E293B] shadow-xl my-6">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-[#1E293B] text-xs font-mono">
        <span className="text-[#94A3B8]">{title}</span>
        <button
          onClick={handleCopy}
          className="px-3 py-1 rounded-md bg-[#1E293B] hover:bg-[#334155] text-[#00F0FF] transition-all flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-5 font-mono text-xs overflow-x-auto text-[#E2E8F0] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
