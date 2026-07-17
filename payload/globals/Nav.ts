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
      type: 'group',
      fields: [
        { name: 'why', type: 'text', label: 'Tại sao chọn chúng tôi', defaultValue: 'Tại sao chọn chúng tôi' },
        { name: 'method', type: 'text', label: 'Phương pháp', defaultValue: 'Phương pháp' },
        { name: 'week', type: 'text', label: 'Lịch trình', defaultValue: 'Lịch trình' },
        { name: 'gallery', type: 'text', label: 'Hình ảnh', defaultValue: 'Hình ảnh' },
        { name: 'stories', type: 'text', label: 'Học viên', defaultValue: 'Học viên' },
        { name: 'faq', type: 'text', label: 'Hỏi đáp', defaultValue: 'Hỏi đáp' },
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
