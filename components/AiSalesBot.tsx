'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AiSalesBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content:
        '👋 Welcome to SJO LABS! I am your 24/7 AI Sales Concierge. How can I help you accelerate your business today? Feel free to ask about our Web Architecture ($500+), Mobile Apps ($600+), AI Automation ($200+), or Meta/Google Ads ($300+)!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCapturedNotice, setLeadCapturedNotice] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'What services do you offer?',
    'How much does a Next.js website cost?',
    'Tell me about AI Automation workflows',
    'I want to get a project quote',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/bot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const assistantMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        if (data.leadCaptured) {
          setLeadCapturedNotice(true);
        }
      } else {
        const errMessage: ChatMessage = {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'I encountered a brief connection glitch. Please try asking again or click "Contact Us" to speak directly with our engineering team!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errMessage]);
      }
    } catch (err) {
      console.error('AI Bot fetch error:', err);
      const errMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Connection timed out. Please try sending your query again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. FLOATING NEON TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#090D16] border-2 border-[#00F0FF] text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Open AI Sales Concierge"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-[#00F0FF] animate-ping absolute"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] relative"></span>
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <span>🤖</span>
            <span>SJO AI CONCIERGE</span>
          </span>

          <span className="text-[10px] font-mono font-bold bg-[#00F0FF] text-[#090D16] px-2 py-0.5 rounded-full">
            24/7 ONLINE
          </span>
        </button>
      )}

      {/* 2. GLASSMORPHISM CHAT DRAWER */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] bg-[#090D16]/95 backdrop-blur-xl border-2 border-[#00F0FF]/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-white relative animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header Telemetry Bar */}
          <div className="bg-[#131927] border-b border-[#1E293B] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#090D16] border border-[#00F0FF]/50 flex items-center justify-center text-xl shadow-inner">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-xs font-extrabold text-white uppercase tracking-wider">
                    SJO AI Concierge
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] font-mono text-[#00F0FF]">
                  Groq AI Engine • 24/7 Sales &amp; Intake
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors font-bold text-xs"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Lead Captured Success Banner */}
          {leadCapturedNotice && (
            <div className="bg-emerald-500/15 border-b border-emerald-500/40 p-3 text-center space-y-1">
              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                <span>🚀 Project Brief Recorded!</span>
              </div>
              <p className="text-[10px] text-emerald-200">
                Synced to Supabase &amp; dispatched to SJO LABS engineering lead.
              </p>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#1E293B]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#2563EB] text-white rounded-br-none shadow-md'
                      : 'bg-[#131927] border border-[#1E293B] text-[#E2E8F0] rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="text-[9px] font-mono text-[#64748B] pt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Animation */}
            {isLoading && (
              <div className="flex items-center gap-2 bg-[#131927] border border-[#1E293B] px-4 py-3 rounded-2xl rounded-bl-none w-fit text-xs text-[#00F0FF]">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="font-mono text-[10px] text-[#94A3B8] ml-1">Analyzing scope...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 bg-[#090D16] border-t border-[#1E293B] flex gap-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#131927] hover:bg-[#00F0FF]/15 border border-[#1E293B] hover:border-[#00F0FF]/50 text-[10px] font-mono text-[#94A3B8] hover:text-[#00F0FF] transition-all shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#131927] border-t border-[#1E293B] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about services, pricing, or project scope..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-[#090D16] border border-[#1E293B] focus:border-[#00F0FF] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="px-4 py-2.5 bg-[#00F0FF] hover:bg-white text-[#090D16] font-mono font-bold text-xs rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-[#00F0FF] cursor-pointer flex items-center justify-center shrink-0"
            >
              Send →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
