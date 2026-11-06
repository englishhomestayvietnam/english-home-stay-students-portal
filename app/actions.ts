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

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { cookies, headers } from 'next/headers';

function computeResetToken(email: string, code: string): string {
  const secret = process.env.PAYLOAD_SECRET || 'SECRET_KEY';
  return crypto
    .createHmac('sha256', secret)
    .update(`reset:${email.trim().toLowerCase()}:${code.trim()}`)
    .digest('hex');
}

function getResendApiKey(): string {
  if (process.env.RESEND_API_KEY?.trim()) {
    return process.env.RESEND_API_KEY.trim().replace(/^["']|["']$/g, '');
  }
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/^\s*RESEND_API_KEY\s*=\s*(.+)\s*$/m);
      if (match?.[1]) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    }
  } catch {
    // ignore
  }
  return '';
}

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
    if (error?.status !== 401 && error?.name !== 'AuthenticationError') {
      console.error('Student login error:', error);
    }
    return { error: 'Email hoặc mật khẩu không chính xác.' };
  }
}

export async function requestPasswordResetCodeAction(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Vui lòng nhập địa chỉ email hợp lệ.' };
  }

  try {
    const payload = await getPayload({ config });

    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: email },
      },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      return {
        error: 'Không tìm thấy tài khoản học viên nào với địa chỉ email này. Vui lòng kiểm tra lại.',
      };
    }

    const user = existing.docs[0];
    const code = crypto.randomInt(100000, 1000000).toString();
    const hashedToken = computeResetToken(email, code);
    const resetPasswordExpiration = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpiration,
      } as any,
    });

    const studentName = (user as any).name || 'Học viên EHV';
    const serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(
      /\/$/,
      ''
    );
    const autoFillUrl = `${serverUrl}/portal/forgot-password?email=${encodeURIComponent(
      email
    )}&code=${encodeURIComponent(code)}`;
    const subject = `[English Homestay] Mã xác nhận đặt lại mật khẩu: ${code}`;
    const html = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="utf-8">
        <title>Mã xác nhận đặt lại mật khẩu</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f9f1; margin: 0; padding: 24px; color: #0b0c0b;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #d8ded2;">
          <div style="background: #09a86f; padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700;">English Homestay Vietnam</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.92;">Cổng Học Viên EHV — Khôi phục mật khẩu</p>
          </div>
          <div style="padding: 28px 24px;">
            <p style="margin: 0 0 12px 0; font-size: 15px;">Xin chào <strong>${studentName}</strong>,</p>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
              Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản Cổng Học Viên của bạn. Vui lòng nhập mã xác nhận 6 chữ số dưới đây để tiếp tục:
            </p>
            <div style="background: #e9ffe0; border: 1px solid #bbffa6; border-radius: 6px; padding: 22px 20px; text-align: center; margin: 0 0 20px 0;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #09a86f; font-weight: 700; margin-bottom: 8px;">
                Mã xác nhận của bạn
              </div>
              <div style="display: inline-block; background: #ffffff; border: 1px dashed #09a86f; border-radius: 6px; padding: 10px 24px; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0b0c0b; font-family: monospace; user-select: all; -webkit-user-select: all; cursor: pointer;" title="Nhấp để chọn và sao chép mã">${code}</div>
              <div style="margin-top: 14px;">
                <a href="${autoFillUrl}" style="display: inline-block; background-color: #09a86f; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 9px 18px; border-radius: 4px;">
                  📋 Sao chép &amp; Tự động điền mã
                </a>
              </div>
              <div style="margin-top: 8px; font-size: 11px; color: #4b5563;">
                (Hoặc nhấp đúp vào ô mã số phía trên để sao chép nhanh)
              </div>
            </div>
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #6f736d; line-height: 1.5;">
              Mã xác nhận này có hiệu lực trong vòng <strong>15 phút</strong>. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
            </p>
          </div>
          <div style="background-color: #f8fafc; padding: 14px 24px; border-top: 1px solid #d8ded2; text-align: center; font-size: 12px; color: #6f736d;">
            Email tự động từ hệ thống English Homestay Portal.
          </div>
        </div>
      </body>
      </html>
    `;

    const apiKey = getResendApiKey();
    if (!apiKey) {
      return {
        error:
          'Chưa cấu hình RESEND_API_KEY trong file .env nên hệ thống chưa thể gửi email xác nhận.',
      };
    }

    const fromName = process.env.RESEND_DEFAULT_FROM_NAME || 'English Home Stay';
    const fromAddress =
      process.env.RESEND_DEFAULT_FROM_ADDRESS || 'notifications@englishhomestay.vn';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${fromName} <${fromAddress}>`,
        to: [email],
        subject,
        html,
      }),
    });

    const resData = await response.json();
    if (!response.ok || !('id' in resData)) {
      console.error('Failed to send password reset email via Resend:', resData);
      return {
        error:
          resData?.message ||
          'Không thể gửi email xác nhận. Vui lòng kiểm tra cấu hình Resend API Key.',
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    console.error('Request password reset error:', error);
    return { error: 'Đã có lỗi xảy ra. Vui lòng thử lại.' };
  }
}

export async function verifyPasswordResetCodeAction(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const code = (formData.get('code') as string)?.trim();

  if (!email || !code || !/^\d{6}$/.test(code)) {
    return { error: 'Vui lòng nhập mã xác nhận gồm 6 chữ số.' };
  }

  try {
    const payload = await getPayload({ config });
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: email },
      },
      showHiddenFields: true,
      limit: 1,
    });

    if (existing.docs.length === 0) {
      return { error: 'Mã xác nhận không hợp lệ.' };
    }

    const user = existing.docs[0] as any;
    const hashedToken = computeResetToken(email, code);

    if (!user.resetPasswordToken || user.resetPasswordToken !== hashedToken) {
      return { error: 'Mã xác nhận không chính xác. Vui lòng kiểm tra lại email của bạn.' };
    }

    if (
      !user.resetPasswordExpiration ||
      new Date(user.resetPasswordExpiration).getTime() <= Date.now()
    ) {
      return {
        error: 'Mã xác nhận đã hết hạn (hiệu lực 15 phút). Vui lòng bấm gửi lại mã mới.',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Verify password reset code error:', error);
    return { error: 'Không thể xác thực mã lúc này. Vui lòng thử lại.' };
  }
}

export async function resetStudentPasswordAction(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const code = (formData.get('code') as string)?.trim();
  const password = formData.get('password') as string;

  if (!email || !code || !/^\d{6}$/.test(code)) {
    return { error: 'Mã xác nhận không hợp lệ.' };
  }
  if (!password || password.length < 6) {
    return { error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
  }

  try {
    const payload = await getPayload({ config });
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: email },
      },
      showHiddenFields: true,
      limit: 1,
    });

    if (existing.docs.length === 0) {
      return { error: 'Không tìm thấy tài khoản học viên.' };
    }

    const user = existing.docs[0] as any;
    const hashedToken = computeResetToken(email, code);

    if (!user.resetPasswordToken || user.resetPasswordToken !== hashedToken) {
      return { error: 'Mã xác nhận không chính xác hoặc đã được sử dụng.' };
    }

    if (
      !user.resetPasswordExpiration ||
      new Date(user.resetPasswordExpiration).getTime() <= Date.now()
    ) {
      return {
        error: 'Mã xác nhận đã hết hạn. Vui lòng yêu cầu gửi lại mã mới.',
      };
    }

    const resetResult = await payload.resetPassword({
      collection: 'users',
      data: {
        token: hashedToken,
        password,
      },
      overrideAccess: true,
    });

    // Clear resetPasswordToken after successful reset
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        resetPasswordToken: null,
      } as any,
    });

    if (resetResult.token) {
      const cookieStore = await cookies();
      cookieStore.set('payload-token', resetResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error('Reset student password error:', error);
    return { error: 'Không thể đặt lại mật khẩu. Vui lòng kiểm tra lại mã xác nhận.' };
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

