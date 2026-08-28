import type { CollectionConfig } from 'payload';

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'level', 'goal', 'status', 'createdAt'],
    group: 'Registrations',
    description: 'Danh sách học viên đăng ký học thử và kiểm tra trình độ',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Publicly allow form submissions
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Họ và tên',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Số điện thoại / Zalo',
    },
    {
      name: 'yearOfBirth',
      type: 'text',
      label: 'Năm sinh',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Địa chỉ',
    },
    {
      name: 'level',
      type: 'select',
      label: 'Trình độ hiện tại',
      options: [
        { label: '🌱 Mới bắt đầu', value: 'beginner' },
        { label: '📚 Cơ bản', value: 'elementary' },
        { label: '🚀 Trung bình', value: 'intermediate' },
        { label: '💪 Khá', value: 'advanced' },
      ],
    },
    {
      name: 'goal',
      type: 'select',
      label: 'Mục tiêu học tập',
      options: [
        { label: '💼 Công việc & Sự nghiệp', value: 'work' },
        { label: '🎓 Du học & Học tập', value: 'study' },
        { label: '✈️ Du lịch & Gặp gỡ', value: 'travel' },
        { label: '📝 Thi IELTS / TOEIC', value: 'exam' },
        { label: '🎤 Tự tin giao tiếp', value: 'confidence' },
        { label: '🌟 Mục tiêu khác', value: 'other' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Trạng thái xử lý',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: '🆕 Mới đăng ký', value: 'new' },
        { label: '📞 Đã liên hệ', value: 'contacted' },
        { label: '📅 Đã xếp lịch học thử', value: 'scheduled' },
        { label: '✅ Đã nhập học', value: 'enrolled' },
        { label: '❌ Huỷ / Không phù hợp', value: 'cancelled' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Ghi chú của tư vấn viên',
    },
  ],
};
