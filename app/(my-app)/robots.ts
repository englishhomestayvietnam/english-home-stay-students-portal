import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://englishhomestay.vn';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Hide API routes and Payload CMS admin from crawlers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
