import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero Section',
  admin: {
    group: 'Sections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'text',
      required: true,
    },
    {
      name: 'primary_cta_label',
      type: 'text',
      required: true,
    },
    {
      name: 'secondary_cta_label',
      type: 'text',
      required: true,
    },
  ],
}
