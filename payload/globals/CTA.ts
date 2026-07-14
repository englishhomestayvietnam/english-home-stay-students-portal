import type { GlobalConfig } from 'payload'

export const CTA: GlobalConfig = {
  slug: 'cta',
  label: 'CTA Section',
  admin: {
    group: 'Sections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
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
