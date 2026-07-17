import type { GlobalConfig } from 'payload'

export const Nav: GlobalConfig = {
  slug: 'nav',
  label: 'Navigation Bar',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo_text',
      type: 'text',
      required: true,
      defaultValue: 'English Homestay',
    },
    {
      name: 'links',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'primary_cta_label',
      type: 'text',
      required: true,
      defaultValue: 'Học thử',
    },
    {
      name: 'primary_cta_url',
      type: 'text',
      required: true,
      defaultValue: '#contact',
    },
    {
      name: 'secondary_cta_label',
      type: 'text',
      required: true,
      defaultValue: 'Thi thử',
    },
    {
      name: 'secondary_cta_url',
      type: 'text',
      required: true,
      defaultValue: '#',
    },
  ],
}
