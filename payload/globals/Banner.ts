import type { GlobalConfig } from 'payload'

export const Banner: GlobalConfig = {
  slug: 'banner',
  label: 'Sticky CTA Banner',
  admin: {
    group: 'Settings',
    description: 'Thanh thông báo nổi ở cạnh dưới màn hình (Minimalist Glassmorphism Pill)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enable',
      type: 'checkbox',
      label: 'Bật hiển thị thanh banner',
      defaultValue: true,
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Tiêu đề thông báo',
      defaultValue: 'Học thử miễn phí cùng tình nguyện viên quốc tế',
    },
    {
      name: 'subtext',
      type: 'text',
      label: 'Mô tả phụ',
      defaultValue: 'Trải nghiệm môi trường tiếng Anh homestay thực tế',
    },
    {
      name: 'cta_label',
      type: 'text',
      label: 'Chữ trên nút',
      defaultValue: 'Đăng ký ngay',
    },
  ],
}
