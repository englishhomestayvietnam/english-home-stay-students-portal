import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // We use the default/placeholder URL
  const baseUrl = 'https://englishhomestay.vn';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add more URLs here as you create new pages
  ];
}
