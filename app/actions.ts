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

import { cookies, headers } from 'next/headers';

export async function registerStudentAction(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;

  if (!name || name.length < 2) {
    return { error: 'Vui lòng nhập họ và tên của bạn (tối thiểu 2 ký tự).' };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Vui lòng nhập địa chỉ email hợp lệ.' };
  }
  if (!password || password.length < 6) {
    return { error: 'Mật khẩu phải có ít nhất 6 ký tự.' };
  }

  try {
    const payload = await getPayload({ config });

    // Check if user already exists
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: email },
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      return { error: 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.' };
    }

    // Create the student account with status: 'paused' (pending admin approval)
    await payload.create({
      collection: 'users',
      data: {
        name,
        email,
        password,
        role: 'student',
        status: 'paused',
        xp: 0,
        streak: 0,
        badges: [],
      },
    });

    // Automatically log the new student in
    const loginResult = await payload.login({
      collection: 'users',
      data: { email, password },
    });

    if (loginResult.token) {
      const cookieStore = await cookies();
      cookieStore.set('payload-token', loginResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error('Student registration error:', error);
    return { error: error?.message || 'Đã có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.' };
  }
}

export async function loginStudentAction(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Vui lòng nhập đầy đủ email và mật khẩu.' };
  }

  try {
    const payload = await getPayload({ config });

    const loginResult = await payload.login({
      collection: 'users',
      data: { email, password },
    });

    if (!loginResult.token) {
      return { error: 'Email hoặc mật khẩu không chính xác.' };
    }

    const cookieStore = await cookies();
    cookieStore.set('payload-token', loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Student login error:', error);
    return { error: 'Email hoặc mật khẩu không chính xác.' };
  }
}

export async function logoutStudentAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('payload-token');
    return { success: true };
  } catch (error) {
    return { success: true };
  }
}

export async function getStudentSession() {
  try {
    const headersList = await headers();
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: headersList });
    return user || null;
  } catch (error) {
    return null;
  }
}

