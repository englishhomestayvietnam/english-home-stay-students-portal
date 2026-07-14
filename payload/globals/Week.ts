import type { GlobalConfig } from 'payload'

export const Week: GlobalConfig = {
  slug: 'week',
  label: 'Week Section',
  admin: {
    group: 'Sections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'main_classes_desc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'freetalk_desc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'topics_count',
      type: 'text',
      required: true,
      defaultValue: '180+',
    },
    {
      name: 'topics_desc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'activities',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
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
    },
  ],
}
