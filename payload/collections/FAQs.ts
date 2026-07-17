import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    useAsTitle: 'question',
    group: 'Collections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'The Basics', value: 'The Basics' },
        { label: 'Free Trial', value: 'Free Trial' },
        { label: 'Classes & Curriculum', value: 'Classes & Curriculum' },
        { label: 'Volunteers & Practice', value: 'Volunteers & Practice' },
        { label: 'Fears & Confidence', value: 'Fears & Confidence' },
        { label: 'Schedules & Ages', value: 'Schedules & Ages' },
      ],
      defaultValue: 'The Basics',
    },
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
  ],
}
