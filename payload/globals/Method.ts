import type { GlobalConfig } from 'payload'

export const Method: GlobalConfig = {
  slug: 'method',
  label: 'Method Section',
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
      name: 'learn_pct',
      type: 'number',
      required: true,
      defaultValue: 30,
    },
    {
      name: 'practice_pct',
      type: 'number',
      required: true,
      defaultValue: 70,
    },
  ],
}
