import type { Metadata, Viewport } from 'next';
import { PRICE_NGN, SPOTS_TOTAL } from '@/lib/offer-bot/offer-config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Conversion Website & 24/7 AI Chatbot for Business Owners | SJOlabs',
  description: `Get a conversion-focused website, custom AI chatbot, and AI-search optimization for ₦${PRICE_NGN}. ${SPOTS_TOTAL} founding-client spots available.`,
  alternates: {
    canonical: 'https://sjolabs.site/founding',
  },
  openGraph: {
    title: 'Stop Losing Leads While You Sleep — SJOlabs Founding Offer',
    description: `Get your website, AI chatbot, and AI search setup built for ₦${PRICE_NGN} (covers domain & hosting). ${SPOTS_TOTAL} spots only.`,
    url: 'https://sjolabs.site/founding',
    siteName: 'SJOlabs',
    images: [
      {
        url: '/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Shepherd John — SJOlabs Founding Client Offer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop Losing Leads While You Sleep — SJOlabs Founding Offer',
    description: `Get your website, AI chatbot, and AI search setup built for ₦${PRICE_NGN} (covers domain & hosting). ${SPOTS_TOTAL} spots only.`,
    images: ['/hero.jpg'],
  },
};

export default function FoundingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
