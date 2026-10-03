export interface ServiceConfig {
  id: string;
  name: string;
  slug: string;
  displayOrder: number;
  categoryGroup: 'BUILD' | 'AUTOMATE' | 'GROW';
  icon: string;
  shortDescription: string;
  fullDescription: string;
  capabilities: string[];
  startingPrice: string;
  typicalRange: string;
  pricingNote: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaButtonText: string;
  servicePageUrl: string;
  portfolioId?: string;
  portfolioTitle?: string;
  portfolioSummary?: string;
  whoItsFor: string[];
  problemsSolved: string[];
  deliverables: string[];
  processSteps: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  published: boolean;
}

export const SERVICES_CONFIG: Record<string, ServiceConfig> = {
  'Web Design & Web Development': {
    id: 'web-design-dev',
    name: 'Web Design & Web Development',
    slug: 'web-design-web-development',
    displayOrder: 1,
    categoryGroup: 'BUILD',
    icon: 'desktop_windows',
    shortDescription: 'Professional websites and custom web experiences designed around business goals, usability, performance, and conversion.',
    fullDescription: 'High-velocity Next.js web architectures, bespoke Figma UI/UX design systems, responsive layouts, and conversion-engineered frontends built for sub-second edge delivery.',
    capabilities: [
      'Custom UI/UX Design',
      'Responsive Web Development',
      'Business Websites',
      'E-commerce Solutions',
      'React / Next.js Development',
      'API & Backend Integration',
      'SEO-Ready Technical Foundation',
    ],
    startingPrice: '$500',
    typicalRange: '$500–$1,500+',
    pricingNote: 'Projects start from $500. Final pricing depends on scope, functionality, integrations, content requirements, and project complexity.',
    ctaHeadline: 'Need a high-converting website for your business?',
    ctaBody: 'SJOLabs builds business websites and custom web applications starting from $500. Tell us what you need and we\'ll help you determine the right approach.',
    ctaButtonText: 'Start a Web Project',
    servicePageUrl: '/services/web-design-web-development',
    portfolioId: 'proj-1',
    portfolioTitle: 'Joksybee Properties Luxury Real Estate Platform',
    portfolioSummary: 'Next.js 15 web architecture & lead capture engine delivered with sub-second page speed.',
    whoItsFor: [
      'Growing small businesses needing high-speed custom web presence',
      'Companies upgrading from slow template builders (Wix, Squarespace)',
      'Service businesses wanting direct calendar booking & lead capture',
    ],
    problemsSolved: [
      'Slow mobile page load speeds that waste paid ad budgets',
      'High bounce rates on traditional monolithic CMS platforms',
      'Inflexible web templates that limit custom features and lead forms',
    ],
    deliverables: [
      'Decoupled Next.js Edge Web Architecture',
      '100/100 Core Web Vitals Optimization',
      'Responsive Mobile, Tablet & Desktop UI',
      'Automated Lead Qualification Form Integration',
      'Basic SEO & Structured Schema Setup',
    ],
    processSteps: [
      { title: '1. Tell Us About Your Project', desc: 'We discuss your business goals, target market, and feature requirements.' },
      { title: '2. Review Requirements', desc: 'We map out wireframes, user paths, and technical specifications.' },
      { title: '3. Define Scope', desc: 'We deliver a clear proposal with transparent pricing and milestone delivery dates.' },
      { title: '4. Build & Implement', desc: 'We design custom UI layouts and write clean Next.js/TypeScript code.' },
      { title: '5. Review & Refine', desc: 'We test speed, mobile responsiveness, forms, and incorporate your revisions.' },
      { title: '6. Launch & Support', desc: 'We point DNS, activate SSL, and provide ongoing technical support.' },
    ],
    faqs: [
      {
        question: 'How much does a custom small business website cost?',
        answer: 'Projects start from $500. Typical projects range between $500 and $1,500+ depending on page count, custom features, and backend integrations.',
      },
      {
        question: 'How long does a website project take from start to launch?',
        answer: 'Typical website projects are delivered within 2 to 4 weeks depending on prompt feedback and content availability.',
      },
      {
        question: 'Can you build websites for clients outside Nigeria?',
        answer: 'Yes! SJOLabs works with clients across the USA, Canada, UK, Australia, Nigeria, and globally via async communication and Loom walkthroughs.',
      },
    ],
    seoTitle: 'Web Design & Web Development Services | SJO LABS',
    metaDescription: 'High-velocity custom Web Design & Web Development services by SJOLabs. Next.js edge performance, sub-second TTFB, and conversion engineering.',
    focusKeyword: 'Web Design & Web Development',
    published: true,
  },

  'Mobile App Development': {
    id: 'mobile-app-dev',
    name: 'Mobile App Development',
    slug: 'mobile-app-development',
    displayOrder: 2,
    categoryGroup: 'BUILD',
    icon: 'smartphone',
    shortDescription: 'Mobile applications designed for iOS and Android with intuitive interfaces, reliable functionality, and robust backend integrations.',
    fullDescription: 'Cross-platform mobile application development delivering native performance, real-time push notifications, offline caching, and secure API data synchronization.',
    capabilities: [
      'iOS & Android App Development',
      'Cross-platform Development',
      'Mobile UI/UX Design',
      'API & Cloud Integration',
      'User Authentication & Security',
      'Database Synchronization',
      'App Store & Play Store Deployment',
    ],
    startingPrice: '$600',
    typicalRange: 'Request a Quote / From $600',
    pricingNote: 'Pricing depends on app screens, offline capability, backend API complexity, and platform target requirements.',
    ctaHeadline: 'Want a custom mobile app for your business?',
    ctaBody: 'SJOLabs engineers iOS and Android mobile apps tailored to your workflow and customer requirements.',
    ctaButtonText: 'Discuss a Mobile App',
    servicePageUrl: '/services/mobile-app-development',
    portfolioId: 'proj-3',
    portfolioTitle: 'Leaf & Grow Mobile Plant Care App',
    portfolioSummary: 'Cross-platform mobile app with real-time diagnostics and push notification alerts.',
    whoItsFor: [
      'Startups and businesses needing custom mobile experiences for iOS & Android',
      'Companies wanting customer portal apps or field service mobile tools',
      'Brands extending web platforms into native mobile applications',
    ],
    problemsSolved: [
      'Clunky mobile web experiences that lack offline capabilities',
      'Lack of direct mobile push communication with customers',
      'Manual field operations that require mobile data capture',
    ],
    deliverables: [
      'Cross-Platform iOS & Android App Build',
      'Mobile UI/UX Wireframes & Interaction Prototypes',
      'Backend API & Database Connection',
      'Push Notification & Authentication Setup',
      'Store Submission Assistance',
    ],
    processSteps: [
      { title: '1. Tell Us About Your Project', desc: 'We outline app features, target mobile platforms, and user roles.' },
      { title: '2. Review Requirements', desc: 'We structure user flows, API schemas, and screen wireframes.' },
      { title: '3. Define Scope', desc: 'We provide a clear scope estimate covering frontend UI and backend integration.' },
      { title: '4. Build & Implement', desc: 'We write cross-platform mobile code with real-time data sync.' },
      { title: '5. Review & Refine', desc: 'We test on physical iOS/Android devices and incorporate feedback.' },
      { title: '6. Launch & Support', desc: 'We assist with store deployment and post-launch maintenance.' },
    ],
    faqs: [
      {
        question: 'Do you build for both iOS and Android?',
        answer: 'Yes! We use modern cross-platform frameworks (React Native / Expo) to deliver native-performing apps for both iOS and Android simultaneously.',
      },
      {
        question: 'How much does mobile app development cost?',
        answer: 'Mobile app projects start from $600 depending on screen count, authentication requirements, and backend API complexity.',
      },
    ],
    seoTitle: 'Mobile App Development Services (iOS & Android) | SJO LABS',
    metaDescription: 'Custom mobile app development for iOS and Android by SJOLabs. Cross-platform performance, mobile UI/UX, and cloud API integration.',
    focusKeyword: 'Mobile App Development',
    published: true,
  },

  'WordPress': {
    id: 'wordpress-dev',
    name: 'WordPress',
    slug: 'wordpress',
    displayOrder: 3,
    categoryGroup: 'BUILD',
    icon: 'grid_view',
    shortDescription: 'Professional WordPress websites for businesses that need a flexible, manageable, and conversion-focused online presence.',
    fullDescription: 'Custom WordPress theme development, Gutenberg block customization, performance optimization, and plugin hardening designed for easy internal content management.',
    capabilities: [
      'WordPress Website Development',
      'WordPress Redesign',
      'Custom Theme & Gutenberg Customization',
      'Plugin Integration & Audit',
      'Business Websites',
      'Performance & Speed Optimization',
      'SEO & Security Setup',
      'Website Maintenance',
    ],
    startingPrice: '$400',
    typicalRange: '$400–$800+',
    pricingNote: 'Projects start from $400. Final pricing depends on project scope, custom theme elements, and plugin requirements.',
    ctaHeadline: 'Looking for a professional WordPress website?',
    ctaBody: 'SJOLabs WordPress projects start from $400, depending on your design, functionality, and content requirements.',
    ctaButtonText: 'Get a WordPress Quote',
    servicePageUrl: '/services/wordpress',
    portfolioId: 'proj-2',
    portfolioTitle: 'Building Beyond Architecture Portal',
    portfolioSummary: 'Fast, secure portal architecture with flexible CMS editing capabilities.',
    whoItsFor: [
      'Content-heavy businesses needing simple blog/page publishing',
      'Companies wanting an easy-to-edit CMS for non-technical staff',
      'Businesses requiring custom Gutenberg block templates',
    ],
    problemsSolved: [
      'Bloated WordPress themes that load slowly on mobile phones',
      'Frequent plugin crashes and security vulnerabilities',
      'Difficult CMS backends that make updating content frustrating',
    ],
    deliverables: [
      'Custom Lightweight WordPress Theme',
      'Gutenberg Block Customization',
      'Speed & Caching Optimization (Sub-1.5s load target)',
      'Security Hardening & Automated Backup Configuration',
      'Content Migration & SEO Redirect Setup',
    ],
    processSteps: [
      { title: '1. Tell Us About Your Project', desc: 'We define theme requirements and CMS content structures.' },
      { title: '2. Review Requirements', desc: 'We inspect existing plugins, pages, and media assets.' },
      { title: '3. Define Scope', desc: 'We outline theme customization, plugins needed, and migration steps.' },
      { title: '4. Build & Implement', desc: 'We build clean theme components without unnecessary plugin bloat.' },
      { title: '5. Review & Refine', desc: 'We verify site speed, mobile display, and conduct staff training.' },
      { title: '6. Launch & Support', desc: 'We launch on your server, point DNS, and configure backups.' },
    ],
    faqs: [
      {
        question: 'How much does a WordPress website cost?',
        answer: 'WordPress projects start from $400, with typical projects ranging between $400 and $800+ based on scope.',
      },
      {
        question: 'Can I edit the website content myself after launch?',
        answer: 'Yes! WordPress provides an intuitive visual dashboard so you can update text, add blog posts, and edit images without coding.',
      },
    ],
    seoTitle: 'WordPress Website Development & Redesign | SJO LABS',
    metaDescription: 'Professional WordPress website development and redesign by SJOLabs. Fast, secure, custom Gutenberg themes optimized for conversions.',
    focusKeyword: 'WordPress Development',
    published: true,
  },

  'AI Automation': {
    id: 'ai-automation',
    name: 'AI Automation',
    slug: 'ai-automation',
    displayOrder: 4,
    categoryGroup: 'AUTOMATE',
    icon: 'hub',
    shortDescription: 'AI-powered workflows that reduce repetitive manual work and connect business processes seamlessly.',
    fullDescription: 'Autonomous multi-agent LLM pipelines, webhook integrations, CRM synchronizations, and 45-second lead triage workflows designed to eliminate manual data entry bottlenecks.',
    capabilities: [
      'Workflow Automation',
      'AI-Assisted Lead Triage',
      'Lead Qualification & Scoring',
      'CRM & Database Synchronization',
      'API & Webhook Integrations',
      'Automated Email & SMS Notifications',
      'AI Agent Pipelines (n8n / Make / Python)',
    ],
    startingPrice: '$200',
    typicalRange: '$200–$500+',
    pricingNote: 'Projects start from $200. Final pricing depends on workflow complexity, triggers, APIs, and custom logic.',
    ctaHeadline: 'Want to automate repetitive business tasks?',
    ctaBody: 'SJOLabs AI automation projects start from $200. Streamline lead triage, follow-ups, and data pipelines.',
    ctaButtonText: 'Explore AI Automation',
    servicePageUrl: '/services/ai-automation',
    portfolioId: 'proj-4',
    portfolioTitle: 'Autonomous AI Inbound Lead Triage Pipeline',
    portfolioSummary: 'Multi-agent LLM pipeline screening leads and booking calendar slots in 45 seconds.',
    whoItsFor: [
      'Businesses losing leads due to delayed manual follow-ups',
      'Teams spending hours copying data between web forms, email, and CRMs',
      'Operations managers looking to scale lead triage without adding headcount',
    ],
    problemsSolved: [
      'Hours lost to manual email filtering and lead assignment',
      'Lead decay caused by taking hours to contact inbound web form submissions',
      'Human copy-paste errors between software tools',
    ],
    deliverables: [
      '45-Second Automated Lead Triage & Intent Screening Workflow',
      'Webhook Integrations (n8n, Make, Zapier, Python)',
      'CRM Synchronization (HubSpot, Salesforce, Pipedrive, Custom DB)',
      'Automated SMS & Email Booking Link Triggers',
      'Error Monitoring & Slack/Email Exception Alerts',
    ],
    processSteps: [
      { title: '1. Tell Us About Your Project', desc: 'We analyze your current manual process and software tools.' },
      { title: '2. Review Requirements', desc: 'We map trigger events, LLM screening logic, and API endpoints.' },
      { title: '3. Define Scope', desc: 'We specify workflow nodes, data payloads, and exception rules.' },
      { title: '4. Build & Implement', desc: 'We build webhooks, connect APIs, and test LLM intent scoring.' },
      { title: '5. Review & Refine', desc: 'We run test submissions through the pipeline end-to-end.' },
      { title: '6. Launch & Support', desc: 'The automation runs silently in the background 24/7 with error monitoring.' },
    ],
    faqs: [
      {
        question: 'How much does AI automation cost?',
        answer: 'AI automation projects start from $200, with typical projects ranging from $200 to $500+ depending on workflow complexity.',
      },
      {
        question: 'What tools can AI automation connect with?',
        answer: 'It can connect web forms, email, Google Sheets, HubSpot, Salesforce, WhatsApp, Stripe, and custom APIs.',
      },
    ],
    seoTitle: 'AI Automation & Workflow Engineering | SJO LABS',
    metaDescription: 'Custom AI automation and workflow pipelines by SJOLabs. Eliminate manual lead triage, connect CRMs, and automate business processes.',
    focusKeyword: 'AI Automation',
    published: true,
  },

  'AI Chatbots': {
    id: 'ai-chatbots',
    name: 'AI Chatbots',
    slug: 'ai-chatbots',
    displayOrder: 5,
    categoryGroup: 'AUTOMATE',
    icon: 'chat',
    shortDescription: 'AI-powered website and business chat experiences designed to answer questions, qualify enquiries, and support customers.',
    fullDescription: 'Custom website conversational AI assistants trained strictly on your business knowledge base to intake qualified lead data and handle customer inquiries 24/7.',
    capabilities: [
      'Website AI Chatbots',
      'FAQ & Policy Automation',
      'Lead Intake & Qualification',
      'Customer Support Automation',
      'Knowledge-Base Embeddings Integration',
      'Human Agent Handoff Triggers',
    ],
    startingPrice: '$150',
    typicalRange: '$150–$300+',
    pricingNote: 'Projects start from $150. Final pricing depends on knowledge base depth, channels, and system integrations.',
    ctaHeadline: 'Want an AI chatbot that answers questions and qualifies leads 24/7?',
    ctaBody: 'SJOLabs AI chatbot projects start from $150. Automate customer inquiries and capture leads round the clock.',
    ctaButtonText: 'Discuss an AI Chatbot',
    servicePageUrl: '/services/ai-chatbots',
    whoItsFor: [
      'E-commerce stores and service providers receiving repetitive customer questions',
      'Local businesses wanting 24/7 lead intake on their website',
      'Teams wanting to reduce customer support response workload',
    ],
    problemsSolved: [
      'Unanswered website visitors who leave when staff are offline',
      'Repetitive support tickets taking up team bandwidth',
      'Inconsistent product or service explanations',
    ],
    deliverables: [
      'Custom LLM Assistant Trained on Business Knowledge Base',
      'Embeddable Website Chat Widget (Matching Brand Colors)',
      'Lead Qualification & Contact Capture Prompts',
      'Human Handoff & Email/Webhook Notification System',
      'Monthly Inquiry Analytics & Accuracy Tuning',
    ],
    processSteps: [
      { title: '1. Tell Us About Your Project', desc: 'We discuss your main customer inquiry types and lead questions.' },
      { title: '2. Review Requirements', desc: 'We compile your business FAQs, services, and pricing policies.' },
      { title: '3. Define Scope', desc: 'We define chatbot guardrails, fallback rules, and widget design.' },
      { title: '4. Build & Implement', desc: 'We train the AI model and embed the widget onto your website.' },
      { title: '5. Review & Refine', desc: 'We test responses against edge-case customer inquiries.' },
      { title: '6. Launch & Support', desc: 'The chatbot begins capturing leads and answering visitors 24/7.' },
    ],
    faqs: [
      {
        question: 'How much does an AI chatbot cost?',
        answer: 'AI chatbot projects start from $150, with typical setups ranging between $150 and $300+ based on knowledge scope.',
      },
      {
        question: 'Will the AI chatbot make up false information?',
        answer: 'No. We configure strict guardrail prompts restricting the AI to answer solely from your verified business documentation.',
      },
    ],
    seoTitle: 'AI Chatbots & Conversational Lead Intake | SJO LABS',
    metaDescription: 'Custom AI chatbots for business websites by SJOLabs. Automate FAQs, intake leads, and provide 24/7 customer support.',
    focusKeyword: 'AI Chatbots',
    published: true,
  },

  'AI Phone Agents': {
    id: 'ai-phone-agents',
    name: 'AI Phone Agents',
    slug: 'ai-phone-agents',
    displayOrder: 6,
    categoryGroup: 'AUTOMATE',
    icon: 'support_agent',
    shortDescription: 'AI-powered voice systems designed to handle appropriate business calls, answer common questions, collect information, and route enquiries.',
    fullDescription: 'Human-sounding conversational AI phone receptionists that answer incoming calls 24/7 with sub-800ms speech latencies, emergency triage logic, and direct calendar booking.',
    capabilities: [
      'AI Voice Receptionists',
      '24/7 Inbound Call Handling',
      'Lead Qualification & Info Collection',
      'Appointment Booking Workflows',
      'Call Routing & Dispatch Rules',
      'Business Information Responses',
    ],
    startingPrice: '$250',
    typicalRange: '$250–$500+',
    pricingNote: 'Projects start from $250. Final pricing depends on call volume, integrations, provider costs, workflow complexity, and requirements.',
    ctaHeadline: 'Want an AI agent to answer calls and help handle customer enquiries?',
    ctaBody: 'AI phone-agent projects start from $250. Never miss an inbound lead call or booking request again.',
    ctaButtonText: 'Discuss an AI Phone Agent',
    servicePageUrl: '/services/ai-phone-agents',
    whoItsFor: [
      'Local trade contractors (electricians, plumbers, HVAC, roofing) on job sites',
      'Service businesses missing after-hours phone calls',
      'Medical or professional clinics needing automated appointment scheduling',
    ],
    problemsSolved: [
      'Unanswered phone calls when staff are busy or out in the field',
      'Potential clients hanging up and calling competitors when sent to voicemail',
      'Manual call scheduling taking up administrative time',
    ],
    deliverables: [
      '24/7 Inbound Voice AI Receptionist Setup',
      'Sub-800ms Natural Conversational Speech Tuning',
      'Emergency Triage & Instant SMS Technician Dispatch Alerts',
      'Direct Calendar Integration (Google Calendar, Outlook, CRM)',
      'Call Log Transcripts & Summary Email Reports',
    ],
    processSteps: [
      { title: '1. Tell Us About Your Project', desc: 'We identify typical caller questions, service hours, and booking rules.' },
      { title: '2. Review Requirements', desc: 'We script greeting prompts, emergency dispatch triggers, and calendar rules.' },
      { title: '3. Define Scope', desc: 'We outline voice latency parameters, call forwarding, and provider costs.' },
      { title: '4. Build & Implement', desc: 'We configure phone line forwarding (on busy or 3 rings) and voice AI hooks.' },
      { title: '5. Review & Refine', desc: 'We place test calls to verify voice clarity and booking accuracy.' },
      { title: '6. Launch & Support', desc: 'Your AI phone agent begins answering caller inquiries 24/7.' },
    ],
    faqs: [
      {
        question: 'How much does an AI phone agent cost?',
        answer: 'Projects start from $250. Final pricing depends on call volume, telephony provider fees, and booking workflow complexity.',
      },
      {
        question: 'Does the AI phone agent sound natural?',
        answer: 'Yes! Modern voice AI models deliver sub-800ms latencies with natural inflection, pauses, and clear pronunciation.',
      },
    ],
    seoTitle: 'AI Phone Agents & Voice Receptionist Setup | SJO LABS',
    metaDescription: '24/7 AI Phone Agents for local service businesses by SJOLabs. Answer calls, qualify callers, and book appointments automatically.',
    focusKeyword: 'AI Phone Agents',
    published: true,
  },

  'AI Search Visibility': {
    id: 'ai-search-vis',
    name: 'AI Search Visibility',
    slug: 'ai-search-visibility',
    displayOrder: 7,
    categoryGroup: 'GROW',
    icon: 'search_spark',
    shortDescription: 'Improve a business\'s content, technical SEO, structured data, and online authority so its information is easier for search engines and AI-powered discovery systems to understand.',
    fullDescription: 'Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) architecture structured to maximize entity clarity across Google Search, ChatGPT, Perplexity, and Gemini.',
    capabilities: [
      'Technical SEO & Site Audits',
      'Content Architecture & Hierarchy',
      'Search Intent Research',
      'Answer-Focused Content (AEO)',
      'JSON-LD Microdata Implementation',
      'Internal Linking Architecture',
      'AI-Search-Oriented Content Optimization',
      'Business & Entity Clarity',
    ],
    startingPrice: '$200',
    typicalRange: 'From ~$200/month',
    pricingNote: 'Projects start from $200 for initial setup/audit. Ongoing optimization services start from approx. $200/month.',
    ctaHeadline: 'Want your business website structured for better visibility across traditional and AI-powered search?',
    ctaBody: 'SJOLabs AI search visibility services start from $200. Optimize your content for AI engines and traditional search.',
    ctaButtonText: 'Request an AI Search Audit',
    servicePageUrl: '/services/ai-search-visibility',
    whoItsFor: [
      'Businesses wanting to appear in ChatGPT, Perplexity, and Gemini search answers',
      'Companies needing technical SEO microdata and schema structural fixes',
      'Brands building long-term topical authority in their industry',
    ],
    problemsSolved: [
      'Invisibility when potential clients search for answers on AI assistants',
      'Missing or malformed JSON-LD schema microdata',
      'Unstructured website content that AI search engines cannot easily cite',
    ],
    deliverables: [
      'Complete Technical SEO & AEO Site Audit',
      'JSON-LD Microdata (Organization, Service, FAQ, Article, Breadcrumbs)',
      'Answer Engine Optimization (AEO) Content Structure',
      'Search Intent Alignment & Key Takeaway Callout Boxes',
      'Robots.txt & Sitemap Optimization for Search Crawlers',
    ],
    processSteps: [
      { title: '1. Tell Us About Your Project', desc: 'We review your target keywords, competitors, and current search visibility.' },
      { title: '2. Review Requirements', desc: 'We conduct a technical audit of schema microdata and indexing blockers.' },
      { title: '3. Define Scope', desc: 'We map out JSON-LD schemas, sitemap updates, and content restructuring.' },
      { title: '4. Build & Implement', desc: 'We inject validated schema microdata and reformat page answer boxes.' },
      { title: '5. Review & Refine', desc: 'We validate schemas via Google Rich Results and test AI crawler access.' },
      { title: '6. Launch & Support', desc: 'We monitor indexation and provide monthly authority optimization.' },
    ],
    faqs: [
      {
        question: 'How much does AI search visibility cost?',
        answer: 'Initial setup and audits start from $200. Ongoing optimization services start from approximately $200/month.',
      },
      {
        question: 'Do you guarantee #1 Google rankings or ChatGPT recommendations?',
        answer: 'No. No ethical studio guarantees fixed rankings. We optimize site structure, microdata, and entity authority to maximize discoverability.',
      },
    ],
    seoTitle: 'AI Search Visibility & Answer Engine Optimization (AEO) | SJO LABS',
    metaDescription: 'Optimize your site for ChatGPT Search, Gemini, and Google with SJOLabs AI Search Visibility services. Technical SEO, JSON-LD microdata, and AEO.',
    focusKeyword: 'AI Search Visibility',
    published: true,
  },

  'Meta & Google Ads': {
    id: 'meta-google-ads',
    name: 'Meta & Google Ads',
    slug: 'meta-google-ads',
    displayOrder: 8,
    categoryGroup: 'GROW',
    icon: 'ads_click',
    shortDescription: 'Paid advertising campaigns designed to help businesses reach relevant audiences and generate measurable traffic and enquiries.',
    fullDescription: 'High-ROAS Meta (Facebook & Instagram) and Google Search paid acquisition campaigns combined with Server-Side Conversions API (CAPI) relays and landing page conversion rate engineering.',
    capabilities: [
      'Meta Ads (Facebook & Instagram)',
      'Google Search & Display Ads',
      'Campaign Architecture & Setup',
      'Precision Audience Targeting',
      'Ad Creative Direction & Copywriting',
      'Server-Side Meta CAPI & Conversion Tracking',
      'Campaign Optimization & Management',
    ],
    startingPrice: '$300',
    typicalRange: 'Request a Quote / From $300',
    pricingNote: 'Pricing depends on monthly ad spend, number of ad channels, creative variations required, and campaign setup complexity.',
    ctaHeadline: 'Ready to scale paid customer acquisition with Meta & Google Ads?',
    ctaBody: 'SJOLabs designs and manages high-converting ad campaigns paired with server-side attribution tracking.',
    ctaButtonText: 'Discuss Paid Ads',
    servicePageUrl: '/services/meta-google-ads',
    portfolioId: 'proj-[#capi]',
    portfolioTitle: 'Server-Side Meta CAPI Scaling Relay',
    portfolioSummary: 'Bypassing client-side tracking drops with server-to-server CAPI relays for verified ROAS attribution.',
    whoItsFor: [
      'Businesses wanting to reach qualified buyers via Google Search intent and Meta targeting',
      'Companies losing conversion data due to iOS privacy drops and ad blockers',
      'Brands looking for managed ad campaigns tied directly to landing page conversions',
    ],
    problemsSolved: [
      'Wasted ad spend on low-intent or unoptimized traffic',
      '30%+ missing conversion data caused by client-side tracking pixels',
      'Weak ad copy or unaligned landing pages that fail to convert clicks',
    ],
    deliverables: [
      'Campaign Structure & Targeting Setup',
      'High-Converting Ad Copy & Creative Direction',
      'Server-Side Meta CAPI Relay Implementation',
      'Google Ads Conversion Tag Configuration',
      'Weekly ROAS & Lead Cost Telemetry Reports',
    ],
    processSteps: [
      { title: '1. Tell Us About Your Project', desc: 'We evaluate your offering, monthly ad budget, and target customer profile.' },
      { title: '2. Review Requirements', desc: 'We audit past ad data, landing pages, and conversion tracking setup.' },
      { title: '3. Define Scope', desc: 'We propose campaign architecture, ad budgets, and server-side tracking.' },
      { title: '4. Build & Implement', desc: 'We launch campaigns, write ad copy, and deploy server-side CAPI relays.' },
      { title: '5. Review & Refine', desc: 'We test ad variations, optimize keyword bids, and adjust targeting.' },
      { title: '6. Launch & Support', desc: 'Ongoing weekly optimization to maximize qualified lead return.' },
    ],
    faqs: [
      {
        question: 'Do you guarantee a specific ROAS or number of sales?',
        answer: 'No. Ad performance depends on market demand and offer strength. We optimize campaign structure, ad copy, targeting, and tracking to maximize performance.',
      },
      {
        question: 'How much does Meta & Google Ads management cost?',
        answer: 'Campaign setup and management starts from $300/month depending on ad channels and monthly ad spend level.',
      },
    ],
    seoTitle: 'Meta & Google Ads Campaign Management | SJO LABS',
    metaDescription: 'Paid ad campaign setup and optimization for Meta & Google Ads by SJOLabs. Server-side CAPI tracking, precision targeting, and landing page alignment.',
    focusKeyword: 'Meta & Google Ads',
    published: true,
  },
};

export function getServiceConfig(nameOrSlug?: string | null): ServiceConfig {
  if (!nameOrSlug) {
    return SERVICES_CONFIG['Web Design & Web Development'];
  }

  const normalized = nameOrSlug.toLowerCase().trim();

  // 1. Direct match by exact key
  if (SERVICES_CONFIG[nameOrSlug]) {
    return SERVICES_CONFIG[nameOrSlug];
  }

  // 2. Search by slug or partial key match
  const found = Object.values(SERVICES_CONFIG).find(
    (s) =>
      s.slug === normalized ||
      s.name.toLowerCase() === normalized ||
      s.id === normalized
  );
  if (found) return found;

  // 3. Backward-compatible aliases
  if (normalized.includes('web-dev') || normalized.includes('web development') || normalized.includes('web design')) {
    return SERVICES_CONFIG['Web Design & Web Development'];
  }
  if (normalized.includes('app') || normalized.includes('mobile')) {
    return SERVICES_CONFIG['Mobile App Development'];
  }
  if (normalized.includes('wordpress')) {
    return SERVICES_CONFIG['WordPress'];
  }
  if (normalized.includes('automation')) {
    return SERVICES_CONFIG['AI Automation'];
  }
  if (normalized.includes('chatbot')) {
    return SERVICES_CONFIG['AI Chatbots'];
  }
  if (normalized.includes('phone') || normalized.includes('voice')) {
    return SERVICES_CONFIG['AI Phone Agents'];
  }
  if (normalized.includes('search') || normalized.includes('aeo') || normalized.includes('geo')) {
    return SERVICES_CONFIG['AI Search Visibility'];
  }
  if (normalized.includes('ad') || normalized.includes('meta') || normalized.includes('google')) {
    return SERVICES_CONFIG['Meta & Google Ads'];
  }

  return SERVICES_CONFIG['Web Design & Web Development'];
}

export function getAllServicesSorted(): ServiceConfig[] {
  return Object.values(SERVICES_CONFIG)
    .filter((s) => s.published !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
