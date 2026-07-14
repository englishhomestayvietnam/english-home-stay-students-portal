import type { CollectionConfig } from 'payload'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  labels: {
    singular: 'Gallery Item',
    plural: 'Gallery Items',
  },
  admin: {
    useAsTitle: 'caption',
    group: 'Collections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      required: true,
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Wide', value: 'wide' },
        { label: 'Tall', value: 'tall' },
      ],
      defaultValue: 'normal',
    },
  ],
}
