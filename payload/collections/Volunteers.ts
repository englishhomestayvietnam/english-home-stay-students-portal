import type { CollectionConfig } from 'payload'

export const Volunteers: CollectionConfig = {
  slug: 'volunteers',
  labels: {
    singular: 'Volunteer',
    plural: 'Volunteers',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Collections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'country_flag',
      label: 'Country Flag Emoji',
      type: 'text',
      required: true,
      admin: {
        description: 'E.g., 🇬🇧, 🇺🇸, 🇩🇪',
      }
    },
    {
      name: 'role',
      label: 'Role or Background',
      type: 'text',
      required: true,
      admin: {
        description: 'E.g., Engineer, Teacher, University Student',
      }
    },
    {
      name: 'duration',
      label: 'Volunteer Since or Duration',
      type: 'text',
      required: false,
      admin: {
        description: 'E.g., Volunteer since 2025 (Optional)',
      }
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
