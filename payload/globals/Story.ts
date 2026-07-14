import type { GlobalConfig } from 'payload'

export const Story: GlobalConfig = {
  slug: 'story',
  label: 'Story Section',
  admin: {
    group: 'Sections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'problem_title',
      type: 'text',
      required: true,
    },
    {
      name: 'problem_eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'problem_body',
      type: 'richText',
      required: true,
    },
    {
      name: 'problem_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'solution_title',
      type: 'text',
      required: true,
    },
    {
      name: 'solution_eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'solution_body',
      type: 'richText',
      required: true,
    },
    {
      name: 'solution_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
