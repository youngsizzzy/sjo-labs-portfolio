import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ZilkanNavbar from '@/components/ZilkanNavbar';
import ZilkanFooter from '@/components/ZilkanFooter';
import ZilkanCta from '@/components/ZilkanCta';
import ServiceDetailSection from '@/components/ServiceDetailSection';
import { getServiceConfig, SERVICES_CONFIG } from '@/lib/servicesConfig';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.values(SERVICES_CONFIG).map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceConfig(params.slug);
  if (!service) {
    return {
      title: 'Service Not Found | SJO LABS',
    };
  }

  return {
    title: service.seoTitle || `${service.name} Services | SJO LABS`,
    description: service.metaDescription || service.shortDescription,
    keywords: [service.focusKeyword, service.name, 'SJO LABS', 'digital studio'],
    alternates: {
      canonical: `https://sjolabs.site/services/${service.slug}`,
    },
    openGraph: {
      title: service.seoTitle || `${service.name} Services | SJO LABS`,
      description: service.metaDescription || service.shortDescription,
      url: `https://sjolabs.site/services/${service.slug}`,
      siteName: 'SJO LABS',
      type: 'website',
    },
  };
}

export default function DynamicServicePage({ params }: ServicePageProps) {
  const service = getServiceConfig(params.slug);
  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.name,
        serviceType: service.name,
        provider: {
          '@type': 'Organization',
          name: 'SJO LABS',
          url: 'https://sjolabs.site',
        },
        description: service.shortDescription,
        offers: {
          '@type': 'Offer',
          price: service.startingPrice.replace(/[^0-9]/g, '') || '500',
          priceCurrency: 'USD',
          description: service.pricingNote,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://sjolabs.site',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://sjolabs.site/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.name,
            item: `https://sjolabs.site/services/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00F0FF] selection:text-[#090D16]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <ZilkanNavbar />

      <main className="flex-grow">
        {/* HERO */}
        <section className="relative py-20 bg-[#090D16] text-[#F8FAFC] overflow-hidden border-b border-[#1E293B]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left space-y-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
              <Link href="/" className="hover:text-[#00F0FF]">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#00F0FF]">Services</Link>
              <span>/</span>
              <span className="text-[#00F0FF] font-bold">{service.name}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E293B] border border-[#334155]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-widest">
                0{service.displayOrder} • {service.categoryGroup}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
              {service.name}
            </h1>

            <p className="text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
              {service.fullDescription || service.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="px-6 py-3.5 bg-[#00F0FF] text-[#090D16] font-bold font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-lg shadow-[#00F0FF]/20"
              >
                Start a Project →
              </a>
              <Link
                href="/work"
                className="px-6 py-3.5 bg-[#1E293B] text-white font-bold font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-[#334155] transition-all border border-[#334155]"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* DETAILED COMMERCIAL CONTENT BREAKDOWN */}
        <ServiceDetailSection service={service} index={0} />

        {/* CALL TO ACTION */}
        <ZilkanCta />
      </main>

      <ZilkanFooter />
    </div>
  );
}
