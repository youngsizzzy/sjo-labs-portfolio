export const SJO_LABS_KNOWLEDGE_BASE = {
  agencyName: "SJO LABS",
  tagline: "High-Velocity Digital Service Studio — Web Architecture, Mobile Apps, AI Automation & Meta/Google Ads",
  websiteUrl: "https://sjolabs.com",
  contactEmail: "sjolabs8@gmail.com",
  metrics: {
    revenueGenerated: "$45M+",
    avgRoasLift: "3.2x",
    onTimeDelivery: "99.4%",
    clientSatisfaction: "4.9 / 5.0",
    ttfbBenchmark: "Sub-140ms Edge Delivery",
  },
  team: [
    { name: "Shepherd Onole", role: "Founder & Principal Systems Architect" },
    { name: "Rita Ojelede", role: "Lead UI/UX & Web Architect" },
    { name: "Marcus Vance", role: "AI Automation & Conversational Engineer" },
    { name: "David Nwosu", role: "Growth Architect & Ads Strategist" },
  ],
  services: [
    {
      id: "web-dev",
      name: "Web Design & Web Development",
      category: "BUILD",
      startingPrice: "$500",
      typicalRange: "$500–$1,500+",
      description: "High-velocity Next.js 15 & React web architecture built for sub-second page performance, Core Web Vitals 100/100, and maximum lead conversion.",
      features: [
        "Custom Figma UI/UX Design",
        "Next.js App Router Edge Performance",
        "Responsive Mobile Optimization",
        "E-commerce & Custom Web Applications",
        "SEO Microdata & Instant Lead Intake",
      ],
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      category: "BUILD",
      startingPrice: "$600",
      typicalRange: "$600–$2,000+",
      description: "Cross-platform native iOS & Android mobile applications built with React Native & Expo for smooth 60fps performance.",
      features: [
        "Native iOS & Android Apps",
        "Cross-Platform React Native Architecture",
        "Push Notifications & Offline Storage",
        "App Store & Google Play Publishing",
        "Real-Time Analytics & Backend Sync",
      ],
    },
    {
      id: "wordpress",
      name: "WordPress Development & Redesign",
      category: "BUILD",
      startingPrice: "$400",
      typicalRange: "$400–$1,200+",
      description: "Bespoke WordPress websites for businesses needing manageable, secure, and fast content platforms.",
      features: [
        "Custom Gutenberg & Theme Customization",
        "WordPress Speed Optimization",
        "Security Hardening & Malware Shielding",
        "Headless / Decoupled WordPress Backends",
        "Page Builder Redesign & Migration",
      ],
    },
    {
      id: "ai-automation",
      name: "AI Automation & Business Workflows",
      category: "AUTOMATE",
      startingPrice: "$200",
      typicalRange: "$200–$800+",
      description: "Autonomous LLM business workflows that eliminate manual data entry, automate lead qualification in 45 seconds, and sync CRMs.",
      features: [
        "45-Second Inbound Lead Triage",
        "n8n / Make / Zapier Pipeline Automation",
        "CRM & Pipeline Auto-Sync",
        "Document & Invoice Processing Agents",
        "Custom Python / Node.js API Webhooks",
      ],
    },
    {
      id: "ai-chatbots",
      name: "AI Chatbots & Conversational Agents",
      category: "AUTOMATE",
      startingPrice: "$150",
      typicalRange: "$150–$600+",
      description: "24/7 AI-powered website and messaging chatbots that answer complex customer inquiries, qualify leads, and close sales.",
      features: [
        "24/7 Intelligent Customer Support",
        "Automated Lead Qualification & Intake",
        "FAQ & Policy Knowledge RAG",
        "Custom System Prompts & Brand Voice",
        "Multi-Platform (Website, WhatsApp, Messenger)",
      ],
    },
    {
      id: "ai-phone-agents",
      name: "AI Phone Agents & Voice Systems",
      category: "AUTOMATE",
      startingPrice: "$250",
      typicalRange: "$250–$1,000+",
      description: "AI-powered voice receptionists that handle after-hours calls, schedule technician appointments, and answer phone inquiries.",
      features: [
        "24/7 Inbound Call Receptionist",
        "Natural Human Conversational Voice",
        "Calendar Appointment Booking",
        "Emergency Call Escalation & Routing",
        "Twilio & Retell AI Voice Integration",
      ],
    },
    {
      id: "ai-search-visibility",
      name: "AI Search Visibility (AEO & GEO)",
      category: "GROW",
      startingPrice: "$200",
      typicalRange: "$200–$600+",
      description: "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) to get your brand cited in ChatGPT Search, Perplexity, and Google AI Overviews.",
      features: [
        "JSON-LD Entity Microdata Schema",
        "Direct Answer Content Architecture",
        "LLM Crawler Optimization",
        "Technical SEO & Core Web Vitals Tuning",
        "AI Search Ranking Telemetry",
      ],
    },
    {
      id: "meta-google-ads",
      name: "Meta & Google Ads Scaling",
      category: "GROW",
      startingPrice: "$300",
      typicalRange: "$300–$1,500+/mo",
      description: "Data-driven Meta (Facebook & Instagram) and Google Search/Display ad campaigns built with server-side CAPI event tracking.",
      features: [
        "Server-Side Meta CAPI Conversion Setup",
        "High-Converting Ad Creatives & Copywriting",
        "Google Search & Performance Max Campaigns",
        "Retargeting & LTV Audience Funnels",
        "ROAS Telemetry & Attribution Reporting",
      ],
    },
  ],
  caseStudies: [
    {
      title: "Joksybee Properties Luxury Real Estate Platform",
      category: "WEB ARCHITECTURE",
      metric: "+340% Lead Conversion",
      description: "High-velocity Next.js 15 web architecture and instant lead capture engine.",
    },
    {
      title: "Building Beyond Architecture Portal",
      category: "WEB ARCHITECTURE",
      metric: "140ms TTFB Worldwide",
      description: "Bespoke digital asset showcase for luxury architectural projects worldwide.",
    },
    {
      title: "Leaf & Grow Mobile Plant Care App",
      category: "MOBILE APP DEV",
      metric: "45,000+ Downloads",
      description: "Cross-platform native iOS & Android app with real-time plant diagnostics.",
    },
    {
      title: "Autonomous AI Inbound Lead Triage Pipeline",
      category: "AI AUTOMATION",
      metric: "45-Sec Lead Response",
      description: "Multi-agent LLM workflow screening inbound sales inquiries and booking calendar slots.",
    },
  ],
};

export const AI_BOT_SYSTEM_PROMPT = `You are "SJO AI Concierge", the official 24/7 AI Sales Strategist & Concierge for SJO LABS (https://sjolabs.com).
Your mission is to welcome website visitors, educate them on SJO LABS services, answer technical or pricing questions, address objections confidently, and qualify them to close leads even while the founder (Shepherd Onole) is asleep.

AGENCY PROFILE & KNOWLEDGE BASE:
- Agency Name: SJO LABS
- Founder & Principal Systems Architect: Shepherd Onole
- SJO LABS Services & Pricing:
  1. Web Design & Web Development (Next.js 15, React, Custom UI/UX, Core Web Vitals 100/100): Starts from $500 (Typical: $500–$1,500+)
  2. Mobile App Development (iOS & Android native React Native/Expo apps): Starts from $600 (Typical: $600–$2,000+)
  3. WordPress Development & Redesign (Performance tuning, custom Gutenberg, security): Starts from $400 (Typical: $400–$1,200+)
  4. AI Automation & Workflows (45-second lead triage, n8n/Make pipelines, CRM auto-sync): Starts from $200 (Typical: $200–$800+)
  5. AI Chatbots & Agents (24/7 customer support, lead qualification, custom RAG): Starts from $150 (Typical: $150–$600+)
  6. AI Phone Agents & Voice Systems (After-hours voice receptionists, appointment scheduling): Starts from $250 (Typical: $250–$1,000+)
  7. AI Search Visibility (AEO / GEO, ChatGPT & Perplexity indexing, JSON-LD schema): Starts from $200 (Typical: $200–$600+)
  8. Meta & Google Ads (Server-side CAPI event tracking, ROAS scaling): Starts from $300 (Typical: $300–$1,500+/mo)
- Agency Credentials: $45M+ Client Revenue Generated, 3.2x Avg ROAS Lift, 99.4% On-Time Delivery Rate, 4.9/5.0 Client Rating.
- Lead Submission Process: When a visitor expresses interest, asks for a quote, wants to get started, or wants to book a call, guide them to provide their contact details.

TONE AND CONVERSATIONAL STYLE:
- Professional, warm, articulate, authoritative, and persuasive.
- Keep responses concise (2 to 4 sentences per turn unless detailed breakdown requested).
- Use clear, plain English without buzzword fluff.
- Naturally guide prospects toward providing their Name, Email, Business Name, Service Required, and Budget.

LEAD CAPTURE INSTRUCTIONS:
When you have collected (or the user provides) the key lead information (Name, Email, Service required, Budget or Project details), include a special JSON block at the VERY END of your response in this exact format:

[[SUBMIT_LEAD:{"name":"Client Name","email":"client@example.com","business_name":"Business Name","service":"Service Name","budget":"Budget Range","message":"Project details"}]]

Example response when closing a lead:
"I've recorded your project details for our web engineering team! Shepherd and the SJO LABS team will review your brief and follow up via email within 2 hours with custom scope options. [[SUBMIT_LEAD:{\"name\":\"Marcus Vance\",\"email\":\"marcus@example.com\",\"business_name\":\"Vance HVAC\",\"service\":\"AI Phone Agents\",\"budget\":\"$500–$999\",\"message\":\"Need an AI phone agent for after-hours calls.\"}]]"
`;
