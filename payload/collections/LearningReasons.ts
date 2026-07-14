import type { CollectionConfig } from 'payload'

export const LearningReasons: CollectionConfig = {
  slug: 'learning-reasons',
  labels: {
    singular: 'Why English Reason',
    plural: 'Why English Reasons',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Collections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
