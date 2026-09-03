import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'Câu hỏi thường gặp',
    plural: 'Hỏi đáp (FAQ)',
  },
  admin: {
    useAsTitle: 'question',
    group: 'Nội dung trang',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      label: 'Danh mục',
      required: true,
      options: [
        { label: 'Thông tin cơ bản', value: 'The Basics' },
        { label: 'Học thử miễn phí', value: 'Free Trial' },
        { label: 'Lớp học & Giáo trình', value: 'Classes & Curriculum' },
        { label: 'Tình nguyện viên & Luyện nói', value: 'Volunteers & Practice' },
        { label: 'Vượt qua rào cản & Tự tin', value: 'Fears & Confidence' },
        { label: 'Lịch học & Độ tuổi', value: 'Schedules & Ages' },
      ],
      defaultValue: 'The Basics',
    },
    {
      name: 'question',
      type: 'text',
      label: 'Câu hỏi (Tiêu đề FAQ)',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      label: 'Câu trả lời',
      required: true,
    },
  ],
}
