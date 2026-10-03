'use client';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'WEB ARCHITECTURE' | 'MOBILE APP DEV' | 'AI AUTOMATION' | 'META & GOOGLE ADS';
  description: string;
  imageSrc: string;
  liveUrl?: string;
  metrics: string;
  techStack: string[];
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  displayOrder?: number;
}

export interface BlogItem {
  slug: string;
  title: string;
  category: string;
  dateAndReadTime: string;
  excerpt: string;
  content?: string;
  imageSrc: string;
  imageAlt?: string;
  ttfbBenchmark: string;
  codeSnippets: number;
  status?: 'published' | 'draft';
  publishedAt?: string;
  updatedAt?: string;

  // SEO & AI Search fields (Phase 1)
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  searchIntent?: 'informational' | 'commercial' | 'transactional' | 'navigational';
  targetLocation?: 'Global' | 'USA' | 'UK' | 'Canada' | 'Australia' | '' | null;
  targetIndustry?: 'Small Business' | 'Real Estate' | 'Plumbing' | 'HVAC' | 'Electrical' | 'Roofing' | 'Construction' | 'Professional Services' | 'Other' | '' | null;
  aiSummary?: string;
  keyQuestions?: string[];
  keyTakeaways?: string[];
  authorName?: string;
  authorRole?: string;
  relatedService?: 'Web Design & Web Development' | 'Mobile App Development' | 'WordPress' | 'AI Automation' | 'AI Chatbots' | 'AI Phone Agents' | 'AI Search Visibility' | 'Meta & Google Ads' | '' | null;
  relatedArticleSlugs?: string[];
  relatedPortfolioId?: string;
  faqs?: FAQItem[];
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Joksybee Properties Luxury Real Estate Platform',
    category: 'WEB ARCHITECTURE',
    description: 'High-velocity Next.js web architecture & lead generation engine with 0.4s page speed and instant lead capture.',
    imageSrc: '/images/joksybee-hero.png',
    liveUrl: 'https://joksybeeproperties.com',
    metrics: '+340% Lead Conversion',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Meta CAPI'],
    date: 'OCT 2026',
  },
  {
    id: 'proj-2',
    title: 'Building Beyond Architecture Portal',
    category: 'WEB ARCHITECTURE',
    description: 'Bespoke web design & digital asset showcase for high-end luxury architectural projects worldwide.',
    imageSrc: '/images/project-laptop.jpg',
    liveUrl: 'https://example.com/building-beyond',
    metrics: '140ms TTFB Worldwide',
    techStack: ['Next.js 14', 'Framer Motion', 'Tailwind', 'Vercel Edge'],
    date: 'SEP 2026',
  },
  {
    id: 'proj-3',
    title: 'Leaf & Grow Mobile Plant Care App',
    category: 'MOBILE APP DEV',
    description: 'Cross-platform native iOS & Android mobile application with real-time plant diagnostics and push alerts.',
    imageSrc: '/images/project-plant.jpg',
    liveUrl: 'https://example.com/leaf-grow-app',
    metrics: '45,000+ Downloads',
    techStack: ['React Native', 'Expo', 'Node.js', 'Firebase'],
    date: 'AUG 2026',
  },
  {
    id: 'proj-4',
    title: 'Autonomous AI Inbound Lead Triage Pipeline',
    category: 'AI AUTOMATION',
    description: 'Multi-agent LLM workflow that screens inbound sales inquiries, qualifies intent, and books calendar slots in 45 seconds.',
    imageSrc: '/images/ai-automation.jpg',
    liveUrl: 'https://example.com/ai-triage-demo',
    metrics: '45-Sec Lead Response',
    techStack: ['n8n', 'OpenAI GPT-4o', 'Python', 'Webhooks'],
    date: 'AUG 2026',
  },
];

const DEFAULT_BLOGS: BlogItem[] = [
  {
    slug: 'sub-second-ttfb-nextjs-guide',
    title: 'Achieving Sub-140ms TTFB Worldwide with Decoupled Next.js Stacks',
    category: 'WEB ARCHITECTURE',
    dateAndReadTime: 'OCT 24 • 6 MIN READ',
    excerpt: 'How decoupling your frontend from monolithic WordPress and Webflow backends eliminates server-side rendering bottlenecks under high traffic.',
    imageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'High performance server architecture diagram for Next.js edge deployment',
    ttfbBenchmark: '42ms Edge',
    codeSnippets: 4,
    status: 'published',
    publishedAt: '2026-10-24T00:00:00.000Z',
    updatedAt: '2026-10-24T00:00:00.000Z',
    seoTitle: 'Sub-140ms TTFB Guide: Decoupled Next.js Architecture | SJO LABS',
    metaDescription: 'Learn how to eliminate server rendering latency and achieve sub-140ms TTFB globally using decoupled Next.js App Router on CDN edge runtimes.',
    focusKeyword: 'Sub-second TTFB Next.js',
    secondaryKeywords: ['Next.js edge rendering', 'decoupled frontend architecture', 'Core Web Vitals optimization'],
    searchIntent: 'informational',
    targetLocation: 'Global',
    targetIndustry: 'Professional Services',
    aiSummary: 'Decoupling frontend presentation from traditional CMS monoliths and deploying via Next.js App Router on global edge CDNs reduces TTFB to under 140ms globally, eliminating server bottleneck latency and boosting Core Web Vitals scores.',
    keyQuestions: [
      'What causes slow TTFB in monolithic CMS platforms?',
      'How does edge caching improve global page response speeds?',
      'What architectural changes are required to decouple Next.js from legacy backends?'
    ],
    keyTakeaways: [
      'Monolithic WordPress & Webflow backends create server execution bottlenecks under heavy load.',
      'Edge CDN deployment with Next.js App Router delivers cached static pages under 50ms.',
      'Decoupled architectures maintain 100/100 Lighthouse performance metrics during traffic spikes.'
    ],
    authorName: 'SJO LABS Engineering Team',
    authorRole: 'Principal Systems Architect',
    relatedService: 'Web Design & Web Development',
    relatedPortfolioId: 'proj-2',
    relatedArticleSlugs: ['autonomous-ai-lead-triage-45-seconds', 'server-side-meta-capi-scaling-guide'],
    faqs: [
      {
        question: 'What is Time to First Byte (TTFB)?',
        answer: 'TTFB measures the duration from the browser requesting a page until receiving the first byte of data from the web server.'
      },
      {
        question: 'Why should I decouple my Next.js frontend from WordPress?',
        answer: 'Decoupling removes heavy PHP database query overhead from the initial page load path, serving instant HTML responses directly from edge CDNs.'
      }
    ]
  },
  {
    slug: 'autonomous-ai-lead-triage-45-seconds',
    title: 'How 45-Second AI Inbound Triage Prevents Lead Decay and Churn',
    category: 'AI AUTOMATION',
    dateAndReadTime: 'NOV 12 • 8 MIN READ',
    excerpt: 'Manual sales triage is losing you deal flow. Explore how autonomous LLM agents filter high-intent prospects and book calendar slots instantly.',
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Autonomous AI lead qualification workflow diagram',
    ttfbBenchmark: '1.2s Agent AI',
    codeSnippets: 6,
    status: 'published',
    publishedAt: '2026-11-12T00:00:00.000Z',
    updatedAt: '2026-11-12T00:00:00.000Z',
    seoTitle: 'Autonomous AI Lead Triage: 45-Second Qualification Workflow | SJO LABS',
    metaDescription: 'Discover how multi-agent LLM pipelines qualify inbound inquiries and book calendar appointments in under 45 seconds to eliminate lead decay.',
    focusKeyword: 'AI lead triage automation',
    secondaryKeywords: ['inbound sales automation', 'LLM agent qualification', 'instant lead booking'],
    searchIntent: 'commercial',
    targetLocation: 'Global',
    targetIndustry: 'Small Business',
    aiSummary: 'Autonomous LLM agent workflows evaluate incoming lead data, verify budget and intent criteria, and schedule calendar appointments within 45 seconds, eliminating manual response delays and improving conversion rates.',
    keyQuestions: [
      'Why is speed to lead critical for inbound sales conversions?',
      'How do multi-agent AI systems evaluate lead qualification intent?',
      'Can AI lead triage integrate with existing CRM and calendar systems?'
    ],
    keyTakeaways: [
      'Inbound leads contacted within 5 minutes are 21x more likely to enter the sales pipeline.',
      'Multi-agent LLM workflows screen, qualify, and route leads in 45 seconds automatically.',
      'Instant CRM and calendar synchronization prevents human response bottlenecks.'
    ],
    authorName: 'SJO LABS Engineering Team',
    authorRole: 'Principal Systems Architect',
    relatedService: 'AI Automation',
    relatedPortfolioId: 'proj-4',
    relatedArticleSlugs: ['sub-second-ttfb-nextjs-guide'],
    faqs: [
      {
        question: 'How fast does the AI agent respond to an inbound form submit?',
        answer: 'The system parses the payload, runs intent evaluation, and executes calendar booking hooks within 45 seconds.'
      },
      {
        question: 'Is human override supported for high-value enterprise leads?',
        answer: 'Yes, edge cases or high-value accounts can trigger instant Slack or SMS alerts for direct human sales handoff.'
      }
    ]
  },
  {
    slug: 'server-side-meta-capi-scaling-guide',
    title: 'Bypassing iOS Privacy Drops with Server-Side Meta CAPI Relays',
    category: 'AD MACHINERY',
    dateAndReadTime: 'DEC 04 • 7 MIN READ',
    excerpt: 'Client-side pixels drop 30%+ of purchase events. Build server-to-server CAPI pipelines that feed ad engines verified first-party revenue.',
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Server-side Meta Conversions API data flow schema',
    ttfbBenchmark: '99.4% Match Rate',
    codeSnippets: 5,
    status: 'published',
    publishedAt: '2026-12-04T00:00:00.000Z',
    updatedAt: '2026-12-04T00:00:00.000Z',
    seoTitle: 'Meta CAPI Server-Side Relay Guide: Fix iOS Privacy Drops | SJO LABS',
    metaDescription: 'Stop losing 30%+ of purchase events. Learn how to implement server-to-server Meta CAPI integration to deliver verified first-party ad data.',
    focusKeyword: 'Server-Side Meta CAPI',
    secondaryKeywords: ['iOS privacy tracking fix', 'first-party ad attribution', 'conversions API setup'],
    searchIntent: 'commercial',
    targetLocation: 'USA',
    targetIndustry: 'Professional Services',
    aiSummary: 'Server-side Meta Conversions API (CAPI) relays process customer event data directly from web server to ad engine, bypassing browser ad-blockers and iOS privacy restrictions to recover dropped conversion data.',
    keyQuestions: [
      'Why do client-side pixel events drop after iOS privacy updates?',
      'How does Meta CAPI improve event match quality scores?',
      'What server architecture is required for CAPI relays?'
    ],
    keyTakeaways: [
      'Client-side tracking pixels drop up to 35% of conversion events due to ad blockers and browser policies.',
      'Server-side CAPI sends SHA-256 hashed customer identifiers directly from node/edge backends.',
      'First-party event matching improves ROAS optimization algorithms on Meta & Google ad platforms.'
    ],
    authorName: 'SJO LABS Engineering Team',
    authorRole: 'Principal Systems Architect',
    relatedService: 'Meta & Google Ads',
    relatedPortfolioId: 'proj-1',
    relatedArticleSlugs: ['sub-second-ttfb-nextjs-guide'],
    faqs: [
      {
        question: 'What is Meta Conversions API (CAPI)?',
        answer: 'Meta CAPI allows advertisers to share web customer events directly from their server to Meta, ensuring reliable event tracking regardless of client browser restrictions.'
      }
    ]
  },
  // ===================================================
  // PHASE 3 STRATEGIC DRAFT ARTICLES (UNPUBLISHED DRAFTS)
  // ===================================================
  {
    slug: 'small-business-website-cost-usa',
    title: 'How Much Does a Small Business Website Cost in the USA?',
    category: 'WEB ARCHITECTURE',
    dateAndReadTime: 'OCT 2026 • 7 MIN READ',
    excerpt: 'Comprehensive 2026 breakdown of small business website development pricing in the US, comparing custom edge-rendered sites vs template builders.',
    content: `Building a professional website is one of the most critical investments for a US small business. However, pricing varies significantly based on design customisation, performance requirements, and lead capture features.

### Executive Direct Answer: Website Cost Breakdown in the USA

For most US small businesses, a professional, custom-engineered website costs starting from **$500 to $1,500+** (typical project range) depending on scope:

- **Basic Business Site:** Starting from $500
- **High-Converting Service Lead Engine:** $500 – $1,500+
- **Custom Decoupled Edge Web App / Portal:** Custom quote based on scope

---

### What Factors Drive Web Design Costs in the US Market?

1. **Frontend Architecture & Speed:** Static template builders (Wix, Squarespace) have low upfront costs but suffer from slow mobile speeds that degrade Google ad conversions. Decoupled Next.js edge architectures deliver sub-100ms TTFB worldwide.
2. **Custom Lead Generation Features:** Integrating 45-second AI lead triage workflows, instant calendar booking, or custom calculators adds setup value that directly increases client conversion rates.
3. **SEO & Structured Microdata:** Professional setup includes JSON-LD microdata, schema validation, and AEO optimization so content is indexing-ready for both Google Search and ChatGPT.

---

### Ongoing Maintenance & Hosting Budget

Beyond initial development, US small businesses should budget monthly for high-speed edge CDN hosting, security header management, domain SSL, and performance monitoring.`,
    imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'US Small business website design cost breakdown chart on desktop and mobile',
    ttfbBenchmark: '42ms Edge',
    codeSnippets: 2,
    status: 'draft',
    publishedAt: '2026-10-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z',
    seoTitle: 'How Much Does a Small Business Website Cost in the USA? (2026 Guide) | SJO LABS',
    metaDescription: 'Complete guide to small business website costs in the USA. Compare pricing for custom web design, edge performance, ongoing maintenance, and lead capture ROI.',
    focusKeyword: 'small business website cost USA',
    secondaryKeywords: ['website design pricing US', 'web development cost breakdown', 'custom website vs wix cost'],
    searchIntent: 'commercial',
    targetLocation: 'USA',
    targetIndustry: 'Small Business',
    aiSummary: 'A custom small business website at SJO LABS starts from $500 with a typical project range of $500–$1,500+. High-speed edge rendering and automated lead triage workflows deliver higher ROI by eliminating mobile bounce rates and converting visitors into inquiries.',
    keyQuestions: [
      'How much does a small business website cost in the USA?',
      'What factors drive custom web development pricing in the US market?',
      'How much do ongoing website maintenance and edge hosting cost annually?',
      'Is custom web design more cost-effective long-term than DIY website builders?'
    ],
    keyTakeaways: [
      'US small business web design at SJO LABS starts from $500, with typical projects ranging from $500 to $1,500+ depending on scope.',
      'DIY template builders often have hidden performance costs due to slow mobile load speeds and lower conversion rates.',
      'Decoupled Next.js edge architectures deliver sub-100ms response times globally for maximum ad ROI.',
      'Ongoing hosting and security maintenance ensures zero security vulnerabilities.'
    ],
    authorName: 'SJO LABS Engineering Team',
    authorRole: 'Principal Systems Architect',
    relatedService: 'Web Design & Web Development',
    relatedPortfolioId: 'proj-1',
    relatedArticleSlugs: ['sub-second-ttfb-nextjs-guide'],
    faqs: [
      {
        question: 'How much does a small business website cost at SJO LABS?',
        answer: 'Web Design & Web Development at SJO LABS starts from $500, with a typical project range of $500–$1,500+ depending on custom features and page count.'
      },
      {
        question: 'Why does custom Next.js web design perform better than Wix?',
        answer: 'Custom Next.js web design provides 100/100 Lighthouse performance, sub-50ms server responses, zero plugin security vulnerabilities, and higher conversion rates compared to generic template builders.'
      }
    ]
  },
  {
    slug: 'decoupled-nextjs-vs-monolithic-wordpress',
    title: 'Decoupled Next.js vs Monolithic WordPress: Which Is Best for Growing Companies?',
    category: 'WEB ARCHITECTURE',
    dateAndReadTime: 'NOV 2026 • 8 MIN READ',
    excerpt: 'Detailed technical and business evaluation comparing Next.js headless frontend architecture against traditional monolithic WordPress backends.',
    content: `As businesses scale, traditional monolithic CMS setups often struggle with slow server response times, plugin conflicts, and security vulnerabilities under high traffic.

### Executive Direct Answer: Next.js Decoupled vs Monolithic WordPress

**Next.js Decoupled Architecture** separates the frontend user presentation layer from the backend content management system, serving pre-rendered HTML directly from global edge CDNs.

- **Next.js Decoupled:** Sub-100ms TTFB worldwide, zero public SQL injection attack surface, 100/100 Core Web Vitals, handles traffic spikes effortlessly.
- **Monolithic WordPress:** 800ms–2.5s+ PHP server execution delay, vulnerable to plugin exploits, requires frequent database tuning under load.

---

### Key Comparison Dimensions for Business Leaders

1. **Speed & Core Web Vitals:** Monolithic WordPress executes heavy PHP database queries on every page request. Decoupled Next.js caches static pages across 300+ CDN edge nodes worldwide.
2. **Security & Data Isolation:** In a decoupled stack, the WordPress database is hidden behind a secure GraphQL or REST API API gateway, eliminating public admin login attack vectors.
3. **Total Cost of Ownership (TCO):** WordPress service at SJO LABS starts from $400, providing headless setup and optimization that drastically lowers long-term maintenance costs.`,
    imageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Decoupled Next.js vs WordPress architectural comparison diagram',
    ttfbBenchmark: '42ms Edge',
    codeSnippets: 4,
    status: 'draft',
    publishedAt: '2026-11-01T00:00:00.000Z',
    updatedAt: '2026-11-01T00:00:00.000Z',
    seoTitle: 'Decoupled Next.js vs Monolithic WordPress: Architecture Comparison | SJO LABS',
    metaDescription: 'Should growing companies choose decoupled Next.js or monolithic WordPress? Compare performance, security, maintenance, and scalability in our technical guide.',
    focusKeyword: 'Next.js vs WordPress business website',
    secondaryKeywords: ['decoupled CMS vs monolithic', 'headless web development', 'Next.js page speed comparison'],
    searchIntent: 'commercial',
    targetLocation: 'Global',
    targetIndustry: 'Professional Services',
    aiSummary: 'Decoupled Next.js frontend architecture provides sub-100ms page response times, superior security, and 100/100 Lighthouse performance by separating static presentation from backend CMS databases.',
    keyQuestions: [
      'Should a growing company choose Next.js decoupled architecture or traditional WordPress?',
      'How does serverless edge rendering compare to standard PHP hosting?',
      'What are the security advantages of separating frontend from database?',
      'How do maintenance costs compare over a 3-year period?'
    ],
    keyTakeaways: [
      'Decoupled Next.js frontends deliver sub-100ms TTFB worldwide compared to 1.5s+ PHP rendering on monolithic WordPress.',
      'Hiding the WordPress CMS behind API gateways removes public SQL injection and bot scanning targets.',
      'Decoupled architectures maintain 100/100 Lighthouse scores even during unexpected viral traffic spikes.',
      'WordPress service at SJO LABS starts from $400, offering performance and headless decoupling.'
    ],
    authorName: 'SJO LABS Engineering Team',
    authorRole: 'Principal Systems Architect',
    relatedService: 'WordPress',
    relatedPortfolioId: 'proj-2',
    relatedArticleSlugs: ['sub-second-ttfb-nextjs-guide', 'small-business-website-cost-usa'],
    faqs: [
      {
        question: 'Can I still use WordPress as an admin editor with Next.js?',
        answer: 'Yes! In a headless setup, your team continues using the familiar WordPress Gutenberg editor, while Next.js handles high-speed frontend display.'
      },
      {
        question: 'What does WordPress service cost at SJO LABS?',
        answer: 'SJO LABS WordPress development and optimization services start from $400, depending on performance tuning and integration requirements.'
      }
    ]
  },
  {
    slug: '45-second-ai-lead-triage-sales-decay',
    title: 'How 45-Second AI Lead Triage Prevents Sales Decay and Increases Revenue',
    category: 'AI AUTOMATION',
    dateAndReadTime: 'NOV 2026 • 8 MIN READ',
    excerpt: 'Explore how autonomous multi-agent LLM workflows evaluate inbound form submissions and schedule qualified calls in 45 seconds.',
    content: `When a prospect submits an inquiry on your website, every minute of delay reduces the probability of closing the deal.

### Executive Direct Answer: What Is 45-Second AI Lead Triage?

**45-Second AI Lead Triage** is an autonomous multi-agent workflow that intercepts inbound web form submits, parses intent and budget criteria using LLMs, verifies contact data, and triggers instant calendar booking links within 45 seconds of submission.

- **Speed to Lead Impact:** Contacting inbound leads within 5 minutes yields a 21x higher qualification rate compared to 30-minute delays.
- **Automation Pipeline:** Webhook Submission → LLM Intent Screening → CRM Enrichment → Automated SMS/Email Booking Trigger.
- **Service Investment:** SJO LABS AI Automation solutions start from $200.

---

### Why Manual Response Processes Fail Growing Businesses

Traditional sales processes rely on human reps checking email inboxes hours after a prospect submits a form. By the time a rep responds, the prospect has already contacted two competitors.

### How SJO LABS Multi-Agent AI Workflow Functions

1. **Instant Webhook Ingestion:** Inbound form data is received by an edge webhook handler in milliseconds.
2. **Intent & Budget Parsing:** An LLM agent evaluates the inquiry against ideal customer profile (ICP) parameters.
3. **Automated CRM & Calendar Hook:** Qualified leads receive a personalized calendar link instantly, while high-value enterprise accounts trigger instant Slack/SMS alerts for human sales handoff.`,
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Autonomous AI lead qualification workflow diagram',
    ttfbBenchmark: '1.2s Agent AI',
    codeSnippets: 5,
    status: 'draft',
    publishedAt: '2026-11-15T00:00:00.000Z',
    updatedAt: '2026-11-15T00:00:00.000Z',
    seoTitle: 'How 45-Second AI Lead Triage Prevents Sales Decay | SJO LABS',
    metaDescription: 'Stop losing inbound prospects to manual delays. Discover how 45-second autonomous AI lead triage qualifies leads and books calls instantly.',
    focusKeyword: 'AI lead triage qualification automation',
    secondaryKeywords: ['instant lead response AI', 'speed to lead automation', 'n8n OpenAI sales workflow'],
    searchIntent: 'commercial',
    targetLocation: 'Global',
    targetIndustry: 'Small Business',
    aiSummary: 'Autonomous LLM agent workflows evaluate incoming lead data, verify budget and intent criteria, and schedule calendar appointments within 45 seconds, eliminating manual response delays and improving conversion rates. AI Automation starting from $200 at SJO LABS.',
    keyQuestions: [
      'How does instant 45-second AI lead qualification increase conversion rates?',
      'Why does lead conversion drop by 80%+ after 5 minutes of waiting?',
      'How do multi-agent LLM workflows evaluate inbound form submissions?',
      'Can AI lead triage connect automatically with HubSpot, Salesforce, or Pipedrive?'
    ],
    keyTakeaways: [
      'Leads responded to within 5 minutes are 21x more likely to qualify than those contacted after 30 minutes.',
      'Autonomous LLM workflows screen, score, and route inbound web form leads in 45 seconds automatically.',
      'Instant calendar booking integrations eliminate email back-and-forth friction.',
      'AI Automation services at SJO LABS start from $200.'
    ],
    authorName: 'SJO LABS Engineering Team',
    authorRole: 'Principal Systems Architect',
    relatedService: 'AI Automation',
    relatedPortfolioId: 'proj-4',
    relatedArticleSlugs: ['autonomous-ai-lead-triage-45-seconds'],
    faqs: [
      {
        question: 'How does the AI agent evaluate if a lead is qualified?',
        answer: 'The system evaluates form inputs against custom ICP parameters (e.g. project budget, timeline, service location) using deterministic prompt engineering.'
      },
      {
        question: 'What is the starting price for AI Automation at SJO LABS?',
        answer: 'AI Automation services at SJO LABS start from $200, depending on workflow complexity and integration endpoints.'
      }
    ]
  },
  {
    slug: 'ai-phone-agents-answer-calls-book-appointments',
    title: 'How AI Phone Agents Answer Calls & Book Appointments for Local Service Businesses',
    category: 'AI AUTOMATION',
    dateAndReadTime: 'DEC 2026 • 7 MIN READ',
    excerpt: 'How local trade contractors (plumbers, electricians, HVAC) use 24/7 Voice AI receptionists to eliminate missed calls and book jobs automatically.',
    content: `For local service contractors, an unanswered phone call is a lost customer. When field crews are on job sites, office phones ring unanswered, driving callers straight to competitors.

### Executive Direct Answer: How Voice AI Receptionists Work

**Voice AI Phone Agents** are conversational AI phone receptionists that answer incoming phone calls 24/7, speak naturally with callers using sub-800ms voice latencies, answer common service pricing questions, and schedule jobs directly into company booking calendars.

- **Missed Call Cost:** 85% of callers who hit voicemail do not leave a message; they immediately call the next local contractor.
- **Voice AI Solution:** 24/7 instant call pickup, emergency triage, SMS confirmation sending, and CRM logging.
- **Pricing:** AI Phone Agents at SJO LABS start from $250.

---

### Emergency Triage vs Routine Inquiries

1. **Emergency Call Handling:** If a caller reports an active electrical fire risk or burst pipe emergency, the AI Voice Agent instantly transfers the call or sends an urgent SMS dispatch alert to on-call technicians.
2. **Routine Job Booking:** For routine service requests, the AI Agent checks live calendar slots, agrees on a window with the customer, and creates the job entry automatically.

---

### Setup & Integration for Service Companies

Setting up a Voice AI receptionist requires no line hardware changes. Incoming calls forward seamlessly when line busy or after 3 rings.`,
    imageSrc: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'AI Voice Phone Agent automated phone receptionist diagram',
    ttfbBenchmark: '800ms Voice',
    codeSnippets: 2,
    status: 'draft',
    publishedAt: '2026-12-01T00:00:00.000Z',
    updatedAt: '2026-12-01T00:00:00.000Z',
    seoTitle: 'How AI Phone Agents Answer Calls & Book Appointments | SJO LABS',
    metaDescription: 'Never miss another high-value customer call. Discover how 24/7 Voice AI receptionists answer phone calls, triage emergencies, and book jobs automatically.',
    focusKeyword: 'AI phone agent answer calls book appointments',
    secondaryKeywords: ['voice AI receptionist for service business', 'automated phone booking system', 'missed call AI recovery'],
    searchIntent: 'commercial',
    targetLocation: 'USA',
    targetIndustry: 'Electrical',
    aiSummary: 'Conversational Voice AI phone agents handle incoming calls 24/7, answer service questions with sub-800ms natural voice responses, and schedule appointments directly into business calendars. Starting from $250 at SJO LABS.',
    keyQuestions: [
      'How do Voice AI phone agents handle inbound phone calls and book clients?',
      'How natural do modern Voice AI phone receptionists sound?',
      'Can AI phone agents check live calendar availability during a call?',
      'What happens when a caller has an emergency requirement?'
    ],
    keyTakeaways: [
      'Unanswered calls represent lost revenue, as 85% of callers hitting voicemail call a competitor.',
      'Voice AI phone agents deliver sub-800ms natural human voice responses 24/7.',
      'Emergency calls are routed to on-call technicians via automated instant SMS dispatch.',
      'AI Phone Agents at SJO LABS start from $250.'
    ],
    authorName: 'SJO LABS Engineering Team',
    authorRole: 'Principal Systems Architect',
    relatedService: 'AI Phone Agents',
    relatedPortfolioId: 'proj-4',
    relatedArticleSlugs: ['45-second-ai-lead-triage-sales-decay'],
    faqs: [
      {
        question: 'Does the caller know they are speaking with an AI assistant?',
        answer: 'Best practice guidelines recommend a clear, polite opening disclosure (e.g. "Hi, thanks for calling! I am SJO LABS digital phone assistant...").'
      },
      {
        question: 'How much does an AI Phone Agent cost at SJO LABS?',
        answer: 'AI Phone Agent setup at SJO LABS starts from $250, depending on call handling workflows and calendar integration requirements.'
      }
    ]
  },
  {
    slug: 'what-is-answer-engine-optimization-aeo-vs-seo',
    title: 'What Is Answer Engine Optimization (AEO) and How Does It Differ From Traditional SEO?',
    category: 'WEB ARCHITECTURE',
    dateAndReadTime: 'DEC 2026 • 9 MIN READ',
    excerpt: 'Comprehensive guide explaining Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and how to prepare web content for ChatGPT & Gemini.',
    content: `Search behavior is shifting from clicking ten blue links on Google to receiving direct, synthesized answers from AI assistants like ChatGPT Search, Perplexity, and Google AI Overviews.

### Executive Direct Answer: AEO vs Traditional SEO

**Answer Engine Optimization (AEO)** is the practice of structuring digital content and microdata so that AI search engines can easily parse, cite, and synthesize direct answers to user inquiries.

- **Traditional SEO:** Focused on keyword density, backlink quantity, and ranking web pages in organic search results lists.
- **AEO / GEO:** Focused on direct synthesized answers, structured JSON-LD microdata, clear Q&A hierarchy, and verified entity authority signals.
- **Service Investment:** SJO LABS AI Search Visibility services start from $200 (ongoing visibility work from ~$200/month depending on scope).

---

### Core Optimization Framework for AEO Readiness

1. **Direct Front-Loaded Answers:** Place a concise 2–3 sentence direct answer immediately below H2 or H3 question headings before expanding into detailed explanations.
2. **Dynamic JSON-LD Schema:** Embed \`BlogPosting\`, \`FAQPage\`, and \`BreadcrumbList\` schemas to give AI crawlers explicit machine-readable context.
3. **Key Takeaways & Summary Boxes:** High-contrast summary callouts help LLM retrieval algorithms extract core facts with high confidence.`,
    imageSrc: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Answer Engine Optimization AEO vs SEO comparison framework',
    ttfbBenchmark: '42ms Edge',
    codeSnippets: 3,
    status: 'draft',
    publishedAt: '2026-12-10T00:00:00.000Z',
    updatedAt: '2026-12-10T00:00:00.000Z',
    seoTitle: 'What Is Answer Engine Optimization (AEO) vs SEO? (2026 Guide) | SJO LABS',
    metaDescription: 'Learn what Answer Engine Optimization (AEO) is, how AI search engines cite web content, and how to optimize your site for ChatGPT & Google AI Overviews.',
    focusKeyword: 'Answer Engine Optimization AEO vs SEO',
    secondaryKeywords: ['ChatGPT Search optimization', 'Generative Engine Optimization GEO', 'AI search indexing schema'],
    searchIntent: 'informational',
    targetLocation: 'Global',
    targetIndustry: 'Small Business',
    aiSummary: 'Answer Engine Optimization (AEO) focuses on structuring web content with direct answers, logical Q&A hierarchies, and JSON-LD microdata so AI search systems like ChatGPT Search can cite and display your brand. SJO LABS AI Search Visibility starts from $200.',
    keyQuestions: [
      'What is Answer Engine Optimization (AEO) and why is it critical for 2026 search visibility?',
      'How do ChatGPT Search, Perplexity, and Google AI Overviews extract web answers?',
      'Why are traditional keyword-stuffed articles failing in AI-driven search?',
      'What structured data schemas are required for AI search indexing?'
    ],
    keyTakeaways: [
      'Search behavior is moving from clicking blue links to receiving synthesized AI answers.',
      'AEO prioritizes clear direct answers placed near the top of content sections.',
      'JSON-LD microdata provides essential machine-readable entity context for LLM crawlers.',
      'SJO LABS AI Search Visibility services start from $200 (ongoing packages from ~$200/month).'
    ],
    authorName: 'SJO LABS Engineering Team',
    authorRole: 'Principal Systems Architect',
    relatedService: 'AI Search Visibility',
    relatedPortfolioId: 'proj-1',
    relatedArticleSlugs: ['sub-second-ttfb-nextjs-guide'],
    faqs: [
      {
        question: 'Does AEO replace traditional search engine optimization?',
        answer: 'AEO builds upon traditional SEO foundation by enhancing content structure, schema microdata, and answer clarity for both human readers and AI systems.'
      },
      {
        question: 'How much does AI Search Visibility cost at SJO LABS?',
        answer: 'AI Search Visibility setup starts from $200, with ongoing optimization work starting from approximately $200/month depending on content scope.'
      }
    ]
  }
];

import { ContentBrief, INITIAL_30_ROADMAP_BRIEFS } from './contentArchitecture';
import { createClient } from '@/lib/supabase/client';

export type { ContentBrief };

const PROJECTS_STORAGE_KEY = 'sjolabs_admin_projects_v1';
const BLOGS_STORAGE_KEY = 'sjolabs_admin_blogs_v1';
const BRIEFS_STORAGE_KEY = 'sjolabs_admin_briefs_v1';

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === 'undefined') return DEFAULT_PROJECTS;
  try {
    const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_PROJECTS;
  } catch (e) {
    return DEFAULT_PROJECTS;
  }
}

export function saveStoredProjects(projects: ProjectItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects to localStorage', e);
  }

  // Background sync projects to Supabase Postgres
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        const supabase = createClient();
        const rows = projects.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          description: p.description,
          image_src: p.imageSrc,
          live_url: p.liveUrl || null,
          metrics: p.metrics,
          tech_stack: p.techStack || [],
          date: p.date,
        }));

        const { error } = await supabase.from('projects').upsert(rows, { onConflict: 'id' });
        if (error) console.error('Failed to sync projects to Supabase Postgres:', error);
        else console.log('Successfully synced projects list to Supabase Postgres!');
      } catch (err) {
        console.error('Supabase projects upsert error:', err);
      }
    })();
  }
}


export function getStoredBlogs(): BlogItem[] {
  if (typeof window === 'undefined') return DEFAULT_BLOGS;
  try {
    const data = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (!data) return DEFAULT_BLOGS;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_BLOGS;
  } catch (e) {
    return DEFAULT_BLOGS;
  }
}

export function saveStoredBlogs(blogs: BlogItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
  } catch (e) {
    console.error('Failed to save blogs to localStorage', e);
  }

  // Background sync blogs to Supabase Postgres
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        const supabase = createClient();
        const rows = blogs.map((b) => ({
          slug: b.slug,
          title: b.title,
          category: b.category,
          date_and_read_time: b.dateAndReadTime,
          excerpt: b.excerpt,
          content: b.content || '',
          image_src: b.imageSrc,
          image_alt: b.imageAlt || '',
          ttfb_benchmark: b.ttfbBenchmark,
          code_snippets: b.codeSnippets,
          status: b.status || 'published',
          published_at: b.publishedAt || new Date().toISOString(),
          updated_at: b.updatedAt || new Date().toISOString(),
          seo_title: b.seoTitle || '',
          meta_description: b.metaDescription || '',
          focus_keyword: b.focusKeyword || '',
          secondary_keywords: b.secondaryKeywords || [],
          search_intent: b.searchIntent || 'informational',
          target_location: b.targetLocation || 'Global',
          target_industry: b.targetIndustry || 'Professional Services',
          ai_summary: b.aiSummary || '',
          author_name: b.authorName || 'SJO LABS Engineering Team',
          author_role: b.authorRole || 'Principal Systems Architect',
          related_service: b.relatedService || '',
          related_article_slugs: b.relatedArticleSlugs || [],
          related_portfolio_id: b.relatedPortfolioId || '',
          key_questions: b.keyQuestions || [],
          key_takeaways: b.keyTakeaways || [],
          faqs: b.faqs || [],
        }));

        const { error } = await supabase.from('blogs').upsert(rows, { onConflict: 'slug' });
        if (error) console.error('Failed to sync blogs to Supabase Postgres:', error);
        else console.log('Successfully synced blogs list to Supabase Postgres!');
      } catch (err) {
        console.error('Supabase blogs upsert error:', err);
      }
    })();
  }
}

export function getStoredContentBriefs(): ContentBrief[] {
  if (typeof window === 'undefined') return INITIAL_30_ROADMAP_BRIEFS;
  try {
    const data = localStorage.getItem(BRIEFS_STORAGE_KEY);
    if (!data) return INITIAL_30_ROADMAP_BRIEFS;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_30_ROADMAP_BRIEFS;
  } catch (e) {
    return INITIAL_30_ROADMAP_BRIEFS;
  }
}

export function saveStoredContentBriefs(briefs: ContentBrief[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BRIEFS_STORAGE_KEY, JSON.stringify(briefs));
  } catch (e) {
    console.error('Failed to save content briefs to localStorage', e);
  }

  // Background sync content briefs to Supabase Postgres
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        const supabase = createClient();
        const rows = briefs.map((b) => ({
          id: b.id,
          article_number: b.articleNumber,
          title: b.title,
          primary_question: b.primaryQuestion,
          secondary_questions: b.secondaryQuestions || [],
          content_pillar: b.contentPillar,
          search_intent: b.searchIntent,
          target_audience: b.targetAudience,
          target_location: b.targetLocation,
          target_industry: b.targetIndustry,
          focus_keyword: b.focusKeyword,
          secondary_keywords: b.secondaryKeywords || [],
          key_points: b.keyPoints || [],
          related_service: b.relatedService,
          priority: b.priority,
          status: b.status,
          suggested_cta: b.suggestedCta || '',
          parent_pillar_article: b.parentPillarArticle || '',
          related_article_slugs: b.relatedArticleSlugs || [],
        }));

        const { error } = await supabase.from('blog_content_briefs').upsert(rows, { onConflict: 'id' });
        if (error) console.error('Failed to sync content briefs to Supabase Postgres:', error);
        else console.log('Successfully synced content briefs to Supabase Postgres!');
      } catch (err) {
        console.error('Supabase briefs upsert error:', err);
      }
    })();
  }
}

/**
 * Async Supabase Fetcher for Blogs: fetches from Supabase public.blogs table
 * and updates localStorage cache.
 */
export async function fetchBlogsFromSupabase(): Promise<BlogItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error for blogs:', error);
      return getStoredBlogs();
    }

    if (data && data.length > 0) {
      const mapped: BlogItem[] = data.map((d: any) => ({
        slug: d.slug,
        title: d.title,
        category: d.category,
        dateAndReadTime: d.date_and_read_time,
        excerpt: d.excerpt,
        content: d.content,
        imageSrc: d.image_src,
        imageAlt: d.image_alt,
        ttfbBenchmark: d.ttfb_benchmark,
        codeSnippets: d.code_snippets,
        status: d.status,
        publishedAt: d.published_at,
        updatedAt: d.updated_at,
        seoTitle: d.seo_title,
        metaDescription: d.meta_description,
        focusKeyword: d.focus_keyword,
        secondaryKeywords: d.secondary_keywords,
        searchIntent: d.search_intent,
        targetLocation: d.targetLocation || d.target_location,
        targetIndustry: d.targetIndustry || d.target_industry,
        aiSummary: d.ai_summary,
        authorName: d.author_name,
        authorRole: d.author_role,
        relatedService: d.related_service,
        relatedArticleSlugs: d.related_article_slugs,
        relatedPortfolioId: d.related_portfolio_id,
        keyQuestions: d.key_questions,
        keyTakeaways: d.key_takeaways,
        faqs: d.faqs,
      }));

      saveStoredBlogs(mapped);
      return mapped;
    } else {
      return getStoredBlogs();
    }
  } catch (err) {
    console.error('Unexpected error fetching blogs from Supabase:', err);
    return getStoredBlogs();
  }
}

/**
 * Async Supabase Fetcher for Briefs: fetches from Supabase public.blog_content_briefs table
 */
export async function fetchBriefsFromSupabase(): Promise<ContentBrief[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('blog_content_briefs')
      .select('*')
      .order('article_number', { ascending: true });

    if (error) {
      console.error('Supabase fetch error for briefs:', error);
      return getStoredContentBriefs();
    }

    if (data && data.length > 0) {
      const mapped: ContentBrief[] = data.map((d: any) => ({
        id: d.id,
        articleNumber: d.article_number,
        title: d.title,
        primaryQuestion: d.primary_question,
        secondaryQuestions: d.secondary_questions,
        contentPillar: d.content_pillar,
        searchIntent: d.search_intent,
        targetAudience: d.target_audience,
        targetLocation: d.target_location,
        targetIndustry: d.target_industry,
        focusKeyword: d.focus_keyword,
        secondaryKeywords: d.secondary_keywords,
        keyPoints: d.key_points,
        relatedService: d.related_service,
        priority: d.priority,
        status: d.status,
        suggestedCta: d.suggested_cta,
        parentPillarArticle: d.parent_pillar_article,
        relatedArticleSlugs: d.related_article_slugs,
      }));

      saveStoredContentBriefs(mapped);
      return mapped;
    } else {
      return getStoredContentBriefs();
    }
  } catch (err) {
    console.error('Unexpected error fetching briefs from Supabase:', err);
    return getStoredContentBriefs();
  }
}

/**
 * Async Supabase Fetcher for Projects: fetches from Supabase public.projects table
 * and updates localStorage cache.
 */
export async function fetchProjectsFromSupabase(): Promise<ProjectItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error for projects:', error);
      return getStoredProjects();
    }

    if (data && data.length > 0) {
      const mapped: ProjectItem[] = data.map((d: any) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        description: d.description,
        imageSrc: d.image_src,
        liveUrl: d.live_url || undefined,
        metrics: d.metrics,
        techStack: d.tech_stack || [],
        date: d.date,
      }));

      saveStoredProjects(mapped);
      return mapped;
    } else {
      return getStoredProjects();
    }
  } catch (err) {
    console.error('Unexpected error fetching projects from Supabase:', err);
    return getStoredProjects();
  }
}



