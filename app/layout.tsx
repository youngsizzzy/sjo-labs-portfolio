import type { Metadata } from 'next';
import Script from 'next/script';
import AiSalesBot from '@/components/AiSalesBot';
import './globals.css';


export const metadata: Metadata = {

  metadataBase: new URL('https://sjolabs.site'),
  title: 'SJO LABS® — Web Design & Dev, Mobile Apps, AI Automation & Meta/Google Ads',
  description: 'SJO LABS is a high-velocity digital service studio offering Web Design & Development, Mobile Apps, WordPress, Autonomous AI Automation, AI Chatbots, AI Phone Agents, AI Search Visibility, and Meta & Google Ads.',
  keywords: [
    'SJO LABS',
    'Web Design & Development',
    'Mobile App Development',
    'WordPress',
    'AI Automation',
    'AI Chatbots',
    'AI Phone Agents',
    'AI Search Visibility',
    'Meta & Google Ads',
  ],
  alternates: {
    canonical: 'https://sjolabs.site',
  },
  openGraph: {
    title: 'SJO LABS® — Web Design & Dev, Mobile Apps, AI Automation & Meta/Google Ads',
    description: 'High-velocity digital service studio delivering sub-second Web Architecture, Mobile Applications, Autonomous AI Automation Workflows, and Meta/Google Ads Scaling.',
    url: 'https://sjolabs.site',
    siteName: 'SJO LABS',
    images: [
      {
        url: '/images/hero-showcase-new.png',
        width: 1200,
        height: 630,
        alt: 'SJO LABS Digital Infrastructure & Service Portfolio Showcase',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SJO LABS® — Web Design & Dev, Mobile Apps, AI Automation & Meta/Google Ads',
    description: 'High-velocity digital service studio delivering sub-second Web Architecture, Mobile Applications, Autonomous AI Automation Workflows, and Meta/Google Ads Scaling.',
    images: ['/images/hero-showcase-new.png'],
  },
  icons: {
    icon: [
      { url: '/images/sjo-labs-logo.png', sizes: 'any', type: 'image/png' },
      { url: '/images/sjo-labs-logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/images/sjo-labs-logo.png',
    apple: [
      { url: '/images/sjo-labs-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://sjolabs.site/#organization',
        name: 'SJO LABS',
        url: 'https://sjolabs.site',
        logo: 'https://sjolabs.site/images/sjo-labs-logo.png',
        description: 'Digital service studio delivering high-velocity Web Development, Web Design, WordPress, AI Chatbots, AI Automation, AI Phone Agents, and AI Search Visibility.',
        knowsAbout: [
          'Web Development',
          'Web Design',
          'WordPress Development',
          'AI Chatbots',
          'AI Automation',
          'AI Phone Agents',
          'Answer Engine Optimization (AEO)',
          'Generative Engine Optimization (GEO)',
          'Next.js Edge Architecture',
        ],
        areaServed: ['USA', 'Canada', 'UK', 'Australia', 'Nigeria', 'Global'],
        sameAs: [
          'https://www.linkedin.com/in/shepherd-onole-784834389',
          'https://github.com/youngsizzzy',
        ],
        founder: {
          '@type': 'Person',
          name: 'Shepherd John Onole',
          jobTitle: 'Founder & Principal Systems Architect',
          url: 'https://sjolabs.site/about',
          sameAs: [
            'https://www.linkedin.com/in/shepherd-onole-784834389',
            'https://github.com/youngsizzzy',
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sjolabs.site/#website',
        url: 'https://sjolabs.site',
        name: 'SJO LABS',
        publisher: {
          '@id': 'https://sjolabs.site/#organization',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://sjolabs.site/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How fast can SJO LABS kick off our project?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We intentionally limit our capacity to 2-3 new client engagements per month to maintain monolithic quality. Once our initial discovery call and agreement are signed, we kick off within 3 business days.',
            },
          },
          {
            '@type': 'Question',
            name: 'What skills and services does SJO LABS provide?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SJO LABS provides 8 specialized services: Web Design & Web Development (Next.js/React), Mobile App Development (iOS & Android), WordPress Development, Autonomous AI Automation workflows, AI Chatbots, AI Phone Agents, AI Search Visibility (AEO/GEO), and Meta & Google Ads growth marketing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do we own all Figma design files and source code?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '100% yes. Upon project completion, all intellectual property, Figma component libraries, Github repositories, AI workflow scripts, and ad account assets are completely transferred to your organization.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you handle post-launch support & maintenance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every project includes dedicated post-launch support and performance optimization. Clients who require continuous updates transition seamlessly into our Full Growth Retainer plan.',
            },
          },
          {
            '@type': 'Question',
            name: 'What technologies and platforms do you build with?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We engineer with Next.js 14/15 App Router, React, TypeScript, React Native, Tailwind CSS, n8n, Supabase, Groq AI, and server-side Meta Conversions API (CAPI) relays to guarantee maximum speed and conversion.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PEFZPD3ZE5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PEFZPD3ZE5', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function purgeNetlifyBadge() {
                  try {
                    var selectors = [
                      '#netlify-badge', '.netlify-badge', '[data-netlify-badge]', '[class*="netlify-badge"]', '[id*="netlify-badge"]',
                      '#netlify-drawer', '[data-netlify-drawer]', '[class*="netlify-drawer"]', '[id*="netlify-drawer"]',
                      '#netlify-toolbar', '[data-netlify-toolbar]', '[class*="netlify-toolbar"]', '[id*="netlify-toolbar"]',
                      '#netlify-feedback', '[data-netlify-feedback]', '[class*="netlify-feedback"]', '[id*="netlify-feedback"]',
                      'iframe[src*="netlify"]', 'netlify-badge', 'netlify-toolbar'
                    ];
                    selectors.forEach(function(sel) {
                      var els = document.querySelectorAll(sel);
                      els.forEach(function(el) { if (el && el.parentNode) el.parentNode.removeChild(el); });
                    });
                    var allElements = document.querySelectorAll('div, a, span, iframe');
                    allElements.forEach(function(el) {
                      if (el.textContent && (el.textContent.indexOf('Powered by Netlify') !== -1 || el.textContent.indexOf('Netlify') !== -1 && el.style.position === 'fixed')) {
                        var target = el.closest('div[style*="fixed"]') || el.closest('a') || el;
                        if (target && target.parentNode) target.parentNode.removeChild(target);
                      }
                    });
                  } catch(e) {}
                }
                if (typeof window !== 'undefined') {
                  window.addEventListener('DOMContentLoaded', purgeNetlifyBadge);
                  window.addEventListener('load', purgeNetlifyBadge);
                  setInterval(purgeNetlifyBadge, 300);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-surface-container-lowest overflow-x-hidden min-h-screen flex flex-col">
        {children}
        <AiSalesBot />
      </body>

    </html>
  );
}
