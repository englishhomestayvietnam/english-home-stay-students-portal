'use client';

import React, { useState } from 'react';
import { FadeIn } from '../ui/FadeIn';
import { submitContactForm } from '@/app/actions';

export function Contact({ data }: { data?: any }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const res = await submitContactForm(formData);
    
    if (res.success) {
      setStatus('success');
    } else {
      setStatus('idle');
      alert(res.error || "Something went wrong.");
    }
  }

  const headline = data?.headline || "Cây cầu kết nối bạn với thế giới bắt đầu từ một cuộc trò chuyện.";
  const body = data?.body || "Hãy cho chúng tôi biết một chút về bạn, đội ngũ của chúng tôi sẽ liên hệ để xếp lịch học thử miễn phí — không áp lực, không ràng buộc.";
  const ctaLabel = data?.primary_cta_label || "Đăng ký học thử miễn phí";

  return (
    <section id="contact" className="py-(--space-section)">
      <div className="max-w-[1180px] mx-auto px-(--space-gutter)">
        <FadeIn>
          <div className="max-w-[640px] mb-(--space-lg)">
            <span className="eyebrow t-label-sm">Bắt đầu ngay</span>
            <h2 className="t-lg">{headline}</h2>
            <p className="t-body-md muted" style={{ marginTop: '10px' }}>
              {body}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 gap-(--space-xl) items-start max-[860px]:grid-cols-1 max-[860px]:gap-(--space-md)">
            
            {/* Form Column */}
            <div>
              {status !== 'success' ? (
                <form onSubmit={handleSubmit} className="card p-[24px]">
                  <div className="mb-[16px]">
                    <label htmlFor="cf-name" className="block text-[13px] font-semibold mb-[6px]">Họ và tên</label>
                    <input 
                      type="text" 
                      id="cf-name" 
                      name="name" 
                      placeholder="Tên của bạn" 
                      className="w-full border border-(--color-border) bg-(--color-surface) rounded-(--radius-md) py-[12px] px-[14px] text-[15px] font-[inherit] text-(--color-on-surface) focus:outline focus:outline-[2px] focus:outline-(--color-primary) focus:outline-offset-[1px]"
                      required 
                    />
                  </div>
                  <div className="mb-[24px]">
                    <label htmlFor="cf-phone" className="block text-[13px] font-semibold mb-[6px]">Số điện thoại</label>
                    <input 
                      type="tel" 
                      id="cf-phone" 
                      name="phone" 
                      placeholder="VD: 090 123 4567" 
                      className="w-full border border-(--color-border) bg-(--color-surface) rounded-(--radius-md) py-[12px] px-[14px] text-[15px] font-[inherit] text-(--color-on-surface) focus:outline focus:outline-[2px] focus:outline-(--color-primary) focus:outline-offset-[1px]"
                      required 
                    />
                  </div>
                  <div className="relative p-[3px] overflow-hidden rounded-[var(--radius-full)] w-full group shadow-md mb-[16px]">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#09a86f_0%,#ffffff_50%,#09a86f_100%)]" />
                    <button type="submit" disabled={status === 'submitting'} className="btn btn-primary w-full disabled:opacity-[0.55] disabled:cursor-not-allowed relative z-10 !rounded-[calc(var(--radius-full)-3px)] !m-0">
                      {status === 'submitting' ? 'Đang gửi...' : ctaLabel}
                    </button>
                  </div>
                  <p className="text-[12px] text-(--color-muted) mt-[10px]">
                    Bằng việc gửi thông tin, bạn đồng ý để đội ngũ của chúng tôi liên hệ về buổi học thử miễn phí. Không gửi tin rác.
                  </p>
                </form>
              ) : (
                <div className="text-center px-[20px] py-[40px] card">
                  <p className="t-sm">Cảm ơn bạn! 🎉</p>
                  <p className="t-body-md muted" style={{ marginTop: '10px' }}>
                    Đội ngũ của chúng tôi sẽ liên hệ trong thời gian sớm nhất để xếp lịch học thử.
                  </p>
                </div>
              )}
            </div>

            {/* Perks Column */}
            <div className="flex flex-col gap-[18px]">
              <div className="flex gap-[14px] items-start">
                <span className="w-[8px] h-[8px] rounded-full bg-(--color-primary) mt-[8px] shrink-0"></span>
                <p className="t-body-md">Một buổi học thử miễn phí với giáo viên bản ngữ và tình nguyện viên quốc tế — trải nghiệm phương pháp học thực tế.</p>
              </div>
              <div className="flex gap-[14px] items-start">
                <span className="w-[8px] h-[8px] rounded-full bg-(--color-primary) mt-[8px] shrink-0"></span>
                <p className="t-body-md">Một bài kiểm tra trình độ miễn phí để chúng tôi tư vấn lớp học phù hợp nhất.</p>
              </div>
              <div className="flex gap-[14px] items-start">
                <span className="w-[8px] h-[8px] rounded-full bg-(--color-primary) mt-[8px] shrink-0"></span>
                <p className="t-body-md">Không áp lực, không bắt buộc — chỉ là một cuộc trò chuyện về mục tiêu của bạn.</p>
              </div>
              <div className="flex gap-[14px] items-start">
                <span className="w-[8px] h-[8px] rounded-full bg-(--color-primary) mt-[8px] shrink-0"></span>
                <p className="t-body-md">Đội ngũ của chúng tôi thường phản hồi trong vòng 24 giờ làm việc.</p>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
