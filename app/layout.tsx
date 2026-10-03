import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sjolabs.com'),
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
    canonical: 'https://sjolabs.com',
  },
  openGraph: {
    title: 'SJO LABS® — Web Design & Dev, Mobile Apps, AI Automation & Meta/Google Ads',
    description: 'High-velocity digital service studio delivering sub-second Web Architecture, Mobile Applications, Autonomous AI Automation Workflows, and Meta/Google Ads Scaling.',
    url: 'https://sjolabs.com',
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
        '@id': 'https://sjolabs.com/#organization',
        name: 'SJO LABS',
        url: 'https://sjolabs.com',
        logo: 'https://sjolabs.com/images/sjo-labs-logo.png',
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
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sjolabs.com/#website',
        url: 'https://sjolabs.com',
        name: 'SJO LABS',
        publisher: {
          '@id': 'https://sjolabs.com/#organization',
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-surface text-on-surface antialiased selection:bg-primary-container selection:text-surface-container-lowest overflow-x-hidden min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
