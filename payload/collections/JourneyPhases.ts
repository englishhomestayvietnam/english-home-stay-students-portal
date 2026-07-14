import type { CollectionConfig } from 'payload'

export const JourneyPhases: CollectionConfig = {
  slug: 'journey-phases',
  labels: {
    singular: 'Journey Phase',
    plural: 'Journey Phases',
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
      name: 'phase_tag',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'points',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
