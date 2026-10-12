'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './offer-chat.module.css';
import { WHATSAPP, PRICE_NGN, SPOTS_LEFT, SPOTS_TOTAL } from '@/lib/offer-bot/offer-config';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface LeadState {
  name?: string | null;
  business?: string | null;
  what_it_does?: string | null;
  whatsapp?: string | null;
}

const STORAGE_KEY_SESSION = 'fo_chat_session_id';
const STORAGE_KEY_HISTORY = 'fo_chat_history';
const STORAGE_KEY_LEAD = 'fo_chat_lead';
const STORAGE_KEY_HANDOFF = 'fo_chat_handoff';

const INITIAL_GREETING = `Hi! I'm the AI assistant for SJOlabs' founding-client offer. We're building conversion-focused websites with custom AI chatbots for ${SPOTS_TOTAL} businesses at ₦${PRICE_NGN} (one-time). Only ${SPOTS_LEFT} spots are open. How can I help you today?`;

const QUICK_CHIPS = [
  `What's included in the ₦${PRICE_NGN} offer?`,
  `How do the ${SPOTS_LEFT} spots work?`,
  `I want to claim a founding spot`,
];

export default function OfferChatWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      return search.includes('chat=open') || search.includes('openChat=true');
    }
    return false;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      return window.innerWidth <= 640 || search.includes('view=mobile') || search.includes('mobile=true');
    }
    return false;
  });
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init-msg', role: 'assistant', content: INITIAL_GREETING },
  ]);
  const [inputText, setInputText] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [friendlyError, setFriendlyError] = useState<string | null>(null);
  const [lead, setLead] = useState<LeadState | null>(null);
  const [readyToHandOff, setReadyToHandOff] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Initialize or restore session and conversation
  useEffect(() => {
    setIsMounted(true);
    try {
      if (typeof window !== 'undefined') {
        const search = window.location.search;
        if (search.includes('chat=open') || search.includes('openChat=true')) {
          setIsOpen(true);
        }
      }
      let storedId = sessionStorage.getItem(STORAGE_KEY_SESSION);
      if (!storedId) {
        storedId = `fo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem(STORAGE_KEY_SESSION, storedId);
      }
      setSessionId(storedId);

      const storedHistory = sessionStorage.getItem(STORAGE_KEY_HISTORY);
      if (storedHistory) {
        const parsed = JSON.parse(storedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([{ id: 'init-msg', role: 'assistant', content: INITIAL_GREETING }]);
        }
      } else {
        setMessages([{ id: 'init-msg', role: 'assistant', content: INITIAL_GREETING }]);
      }

      const storedLead = sessionStorage.getItem(STORAGE_KEY_LEAD);
      if (storedLead) {
        setLead(JSON.parse(storedLead));
      }

      const storedHandoff = sessionStorage.getItem(STORAGE_KEY_HANDOFF);
      if (storedHandoff === 'true') {
        setReadyToHandOff(true);
      }

      const checkMobile = () => {
        if (typeof window !== 'undefined') {
          const search = window.location.search;
          const isNarrow = window.innerWidth <= 640;
          const isMobileQuery = search.includes('view=mobile') || search.includes('mobile=true');
          setIsMobile(isNarrow || isMobileQuery);
        }
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);

      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('chat') === 'open' || urlParams.get('openChat') === 'true') {
          setIsOpen(true);
        }
      }

      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', checkMobile);
        }
      };
    } catch {
      setMessages([{ id: 'init-msg', role: 'assistant', content: INITIAL_GREETING }]);
    }
  }, []);

  // Sync state to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  useEffect(() => {
    if (lead) {
      try {
        sessionStorage.setItem(STORAGE_KEY_LEAD, JSON.stringify(lead));
      } catch {}
    }
  }, [lead]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_HANDOFF, readyToHandOff ? 'true' : 'false');
    } catch {}
  }, [readyToHandOff]);

  // Scroll to bottom when messages change or typing begins
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClearChat = () => {
    const newSessionId = `fo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const freshMessages: ChatMessage[] = [{ id: 'init-msg', role: 'assistant', content: INITIAL_GREETING }];
    setSessionId(newSessionId);
    setMessages(freshMessages);
    setLead(null);
    setReadyToHandOff(false);
    setFriendlyError(null);
    setInputText('');

    try {
      sessionStorage.setItem(STORAGE_KEY_SESSION, newSessionId);
      sessionStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(freshMessages));
      sessionStorage.removeItem(STORAGE_KEY_LEAD);
      sessionStorage.removeItem(STORAGE_KEY_HANDOFF);
    } catch {}
  };

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    if (trimmed.length > 500) {
      setFriendlyError('Messages are limited to 500 characters.');
      return;
    }

    setFriendlyError(null);

    const userMessage: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInputText('');
    setIsLoading(true);

    // Payload constraints:
    // - sessionId
    // - honeypot
    // - last 10 messages only
    // - max 500 characters per message
    const last10Messages = nextHistory
      .slice(-10)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 500),
      }));

    try {
      const response = await fetch('/api/offer-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          honeypot,
          messages: last10Messages,
        }),
      });

      if (!response.ok) {
        // Friendly, non-technical error handling for 403, 429, 500
        setFriendlyError(
          'Our assistant is experiencing high demand right now. Shepherd is available directly on WhatsApp to answer your questions.'
        );
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.reply) {
        const assistantMessage: ChatMessage = {
          id: `a_${Date.now()}`,
          role: 'assistant',
          content: data.reply,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }

      if (data.lead) {
        setLead((prev) => ({ ...prev, ...data.lead }));
      }

      // Check for complete handoff
      if (data.ready_to_hand_off === true) {
        setReadyToHandOff(true);
      }
    } catch {
      // Friendly network fallback
      setFriendlyError(
        'Unable to reach the assistant right now. You can chat directly with Shepherd on WhatsApp.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const hasAllLeadFields = Boolean(
    lead?.name &&
    lead?.business &&
    lead?.what_it_does &&
    lead?.whatsapp
  );

  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    hasAllLeadFields
      ? `Hi Shepherd, my name is ${lead?.name} from ${lead?.business}. I just completed the founding client chat on your website and would like to confirm my spot.`
      : `Hi Shepherd, I was reviewing the founding offer on your website and would like more details.`
  )}`;

  if (!isMounted) return null;

  return (
    <div className={styles.widgetContainer} aria-label="Founding Offer Assistant">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={styles.launcherBtn}
          aria-label="Open founding offer chat assistant"
        >
          <div className={styles.launcherIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className={styles.launcherText}>Chat with AI</span>
          <span className={styles.launcherBadge}>{SPOTS_LEFT} spots left</span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`${styles.chatWindow} ${isMobile ? styles.chatWindowMobile : ''}`}
          role="dialog"
          aria-labelledby="fo-chat-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <div className={styles.headerText}>
                <h3 id="fo-chat-title" className={styles.title}>Founding Offer Assistant</h3>
                <div className={styles.status}>
                  <span className={styles.statusDot}></span>
                  <span>Shepherd John · {SPOTS_LEFT} of {SPOTS_TOTAL} open</span>
                </div>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                type="button"
                onClick={handleClearChat}
                className={styles.iconBtn}
                title="Clear chat and restart"
                aria-label="Clear chat"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={styles.iconBtn}
                title="Close chat window"
                aria-label="Close chat"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className={styles.messagesArea} role="log" aria-live="polite">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.messageRow} ${m.role === 'user' ? styles.userRow : styles.botRow}`}
              >
                <div
                  className={`${styles.bubble} ${m.role === 'user' ? styles.userBubble : styles.botBubble}`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Quick Suggestion Chips (Shown only at start) */}
            {messages.length === 1 && !isLoading && (
              <div className={styles.chipsContainer}>
                {QUICK_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => sendMessage(chip)}
                    className={styles.chip}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Typing Indicator while in flight */}
            {isLoading && (
              <div className={styles.typingIndicator} aria-label="Assistant is typing">
                <span className={styles.typingDot}></span>
                <span className={styles.typingDot}></span>
                <span className={styles.typingDot}></span>
              </div>
            )}

            {/* Friendly Non-Technical Error Banner */}
            {friendlyError && (
              <div className={styles.errorCard} role="alert">
                <p className={styles.errorText}>{friendlyError}</p>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=Hi%20Shepherd,%20I%20have%20a%20question%20about%20the%20founding%20offer.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.errorWhatsappLink}
                >
                  Message Shepherd on WhatsApp →
                </a>
              </div>
            )}

            {/* "Continue on WhatsApp" Button: Displayed ONLY when ready_to_hand_off is true AND all 4 fields are present */}
            {readyToHandOff && hasAllLeadFields && (
              <div className={styles.whatsappCard}>
                <div className={styles.whatsappCardTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" color="#25D366">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.45 0.742.966 1.201.664.591 1.224.774 1.397.86.173.086.275.072.376-.044.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z" />
                  </svg>
                  <span>Your Founding Spot is Saved!</span>
                </div>
                <p className={styles.whatsappCardDesc}>
                  Shepherd will confirm your spot and prepare your free preview. Tap below to continue directly in WhatsApp.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappActionBtn}
                >
                  Continue on WhatsApp →
                </a>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className={styles.inputFooter}>
            {/* Honeypot field (hidden from real users, traps bots) */}
            <input
              type="text"
              name="bot_verification"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className={styles.inputRow}>
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question or enter your details..."
                rows={1}
                className={styles.chatTextarea}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isLoading}
                className={styles.sendBtn}
                aria-label="Send message"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>

            <div className={styles.inputMeta}>
              <span>Press Enter to send</span>
              <span className={`${styles.charCount} ${inputText.length >= 480 ? styles.charCountLimit : ''}`}>
                {inputText.length}/500
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
