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
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Một tuần tại English Homestay',
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Lịch trình thực tế trong tuần của bạn.',
    },
    {
      name: 'main_classes_desc',
      type: 'textarea',
      required: false,
    },
    {
      name: 'freetalk_desc',
      type: 'textarea',
      required: false,
    },
    {
      name: 'topics_count',
      type: 'text',
      required: false,
      defaultValue: '180+',
    },
    {
      name: 'topics_desc',
      type: 'textarea',
      required: false,
    },
    {
      name: 'activities',
      type: 'array',
      label: '4 Thông tin khóa học (Boxes)',
      required: false,
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
          required: false,
        },
      ],
    },
  ],
}
