'use server';

import { getPayload } from 'payload';
import config from '@/payload.config';

export async function submitContactForm(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim();
  const yearOfBirth = (formData.get('yearOfBirth') as string)?.trim();
  const address = (formData.get('address') as string)?.trim();
  const level = formData.get('level') as string;
  const goal = formData.get('goal') as string;

  if (!name || !phone || !yearOfBirth || !address) {
    return { error: 'Vui lòng điền đầy đủ 4 thông tin bắt buộc: Họ tên, Số điện thoại, Năm sinh và Địa chỉ.' };
  }

  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection: 'leads',
      data: {
        name,
        phone,
        yearOfBirth,
        address,
        ...(level ? { level: level as any } : {}),
        ...(goal ? { goal: goal as any } : {}),
        status: 'new',
      },
    });

    console.log('Lead successfully saved to Payload CMS:', { name, phone, yearOfBirth, address });
    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { error: 'Đã có lỗi xảy ra khi lưu đăng ký. Vui lòng thử lại.' };
  }
}
