import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'status', 'cohort', 'createdAt'],
    group: 'Students',
    description: 'EHV student and staff accounts',
  },
  auth: true,
  access: {
    admin: ({ req }) => {
      const role = (req.user as any)?.role
      return role === 'admin' || role === 'teacher'
    },
  },
  fields: [
    // ─── Identity ───────────────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the user',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile photo',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Vietnamese phone number (e.g. 0912 345 678)',
      },
    },

    // ─── Role & Access ───────────────────────────────────────────────────────
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Volunteer', value: 'volunteer' },
        { label: 'Admin', value: 'admin' },
      ],
      admin: {
        description: 'Controls what areas of the portal this user can access',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Completed', value: 'completed' },
        { label: 'Alumni', value: 'alumni' },
      ],
      admin: {
        description: 'Current enrollment status — only "active" users can access games',
        position: 'sidebar',
      },
    },

    // ─── Student Profile ────────────────────────────────────────────────────
    {
      name: 'studentId',
      type: 'text',
      unique: true,
      admin: {
        description: 'Unique student code (e.g. EHV-2026-081). Auto-assigned by admin.',
        position: 'sidebar',
      },
    },
    {
      name: 'cohort',
      type: 'text',
      admin: {
        description: 'Homestay batch or class (e.g. "Hà Nội Batch 3 — Spring 2026")',
        position: 'sidebar',
      },
    },
    {
      name: 'enrolledAt',
      type: 'date',
      admin: {
        description: 'Date the student officially enrolled',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'accessExpiresAt',
      type: 'date',
      admin: {
        description: 'Optional: Portal access expiry date. Leave blank for unlimited access.',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
        position: 'sidebar',
      },
    },

    // ─── Gamification (managed by the app, read-only in admin) ─────────────
    {
      name: 'xp',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Total XP points earned across all games',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'streak',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Current daily practice streak (days)',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'lastPlayedAt',
      type: 'date',
      admin: {
        description: 'Last date the student completed a game session',
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'badges',
      type: 'json',
      admin: {
        description: 'Array of unlocked badge IDs with timestamps',
        readOnly: true,
      },
    },

    // ─── Internal Notes ─────────────────────────────────────────────────────
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes visible only to admins (not shown to the student)',
      },
    },
  ],
}
