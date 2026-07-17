import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    group: 'System',
  },
  access: {
    read: () => true,
  },
  upload: {
    disableLocalStorage: true,
    formatOptions: {
      format: 'webp',
      options: {
        quality: 75, // Adjust compression quality (0-100)
      },
    },
    resizeOptions: {
      width: 1920, // Max width, will downscale larger images
      withoutEnlargement: true,
    },
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (doc?.imagekit?.url) {
          doc.url = doc.imagekit.url;
        }
        return doc;
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
