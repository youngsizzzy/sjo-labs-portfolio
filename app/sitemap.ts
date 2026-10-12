import { MetadataRoute } from 'next';
import { getStoredBlogs } from '@/lib/adminStore';
import { SERVICES_CONFIG } from '@/lib/servicesConfig';

const BASE_URL = 'https://sjolabs.site';

const SERVER_BLOG_SLUGS = [
  'sub-second-ttfb-nextjs-guide',
  'autonomous-ai-lead-triage-45-seconds',
  'server-side-meta-capi-scaling-guide',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/process`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic Service Pages for all 8 official services
  const serviceRoutes: MetadataRoute.Sitemap = Object.values(SERVICES_CONFIG).map((svc) => ({
    url: `${BASE_URL}/services/${svc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Retrieve published articles (filtering out draft status)
  let blogs = [];
  try {
    blogs = getStoredBlogs().filter((b) => b.status !== 'draft');
  } catch (e) {
    blogs = SERVER_BLOG_SLUGS.map((slug) => ({ slug, updatedAt: new Date().toISOString() }));
  }

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}

