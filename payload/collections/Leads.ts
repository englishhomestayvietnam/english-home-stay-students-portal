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
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            const rawAdminEmails = process.env.ADMIN_NOTIFICATION_EMAIL || 'english.homestaynn@gmail.com';
            const adminEmails = rawAdminEmails
              .split(',')
              .map((email) => email.trim())
              .filter(Boolean);
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

            const LEVEL_LABELS: Record<string, string> = {
              beginner: '🌱 Mới bắt đầu',
              elementary: '📚 Cơ bản',
              intermediate: '🚀 Trung bình',
              advanced: '💪 Khá',
            };

            const GOAL_LABELS: Record<string, string> = {
              work: '💼 Công việc & Sự nghiệp',
              study: '🎓 Du học & Học tập',
              travel: '✈️ Du lịch & Gặp gỡ',
              exam: '📝 Thi IELTS / TOEIC',
              confidence: '🎤 Tự tin giao tiếp',
              other: '🌟 Mục tiêu khác',
            };

            const levelLabel = doc.level ? (LEVEL_LABELS[doc.level] || doc.level) : 'Chưa cung cấp';
            const goalLabel = doc.goal ? (GOAL_LABELS[doc.goal] || doc.goal) : 'Chưa cung cấp';
            const registrationTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

            await req.payload.sendEmail({
              to: adminEmails,
              subject: `[English Home Stay] Đăng ký tư vấn mới: ${doc.name} - ${doc.phone}`,
              html: `
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                  <meta charset="utf-8">
                  <title>Thông Báo Đăng Ký Mới</title>
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
                  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
                      <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">English Home Stay</h1>
                      <p style="margin: 6px 0 0 0; font-size: 15px; opacity: 0.9;">🎉 Có học viên mới vừa đăng ký tư vấn!</p>
                    </div>
                    <div style="padding: 24px;">
                      <h2 style="font-size: 16px; font-weight: 600; color: #334155; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Thông Tin Học Viên</h2>
                      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr>
                          <td style="padding: 10px 0; color: #64748b; width: 140px;">Họ và tên:</td>
                          <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${doc.name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #64748b;">Số điện thoại / Zalo:</td>
                          <td style="padding: 10px 0; font-weight: 600; color: #059669;"><a href="tel:${doc.phone}" style="color: #059669; text-decoration: none;">${doc.phone}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #64748b;">Năm sinh:</td>
                          <td style="padding: 10px 0; color: #0f172a;">${doc.yearOfBirth || 'Chưa cung cấp'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #64748b;">Địa chỉ:</td>
                          <td style="padding: 10px 0; color: #0f172a;">${doc.address || 'Chưa cung cấp'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #64748b;">Trình độ hiện tại:</td>
                          <td style="padding: 10px 0; color: #0f172a;">${levelLabel}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #64748b;">Mục tiêu học tập:</td>
                          <td style="padding: 10px 0; color: #0f172a;">${goalLabel}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; color: #64748b;">Thời gian gửi:</td>
                          <td style="padding: 10px 0; color: #0f172a;">${registrationTime}</td>
                        </tr>
                      </table>

                      <div style="margin-top: 28px; text-align: center;">
                        <a href="${serverUrl}/admin/collections/leads/${doc.id}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 8px;">Xem Trong Admin Panel</a>
                      </div>
                    </div>
                    <div style="background-color: #f8fafc; padding: 16px 24px; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8;">
                      Email tự động được gửi từ hệ thống English Home Stay Portal qua Resend.
                    </div>
                  </div>
                </body>
                </html>
              `,
            });
            req.payload.logger.info(`Notification email sent to ${adminEmails.join(', ')} for lead ${doc.name} (${doc.id})`);
          } catch (err) {
            req.payload.logger.error(`Failed to send notification email for lead ${doc.id}: ${err}`);
          }
        }
      },
    ],
  },
};
