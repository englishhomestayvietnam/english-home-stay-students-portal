'use client';

import React from 'react';
import Link from 'next/link';
import { FadeIn } from '../ui/FadeIn';
import { AnimatedPointer } from '../ui/AnimatedPointer';
import { Sparkles, Clock, Users, Shield, ArrowRight, Award, Coffee, Globe } from 'lucide-react';

export function Contact({ data }: { data?: any }) {

  const stripEnglish = (text?: string) => {
    if (!text) return '';
    if (text.includes(' / ')) {
      const parts = text.split(' / ');
      return parts[parts.length - 1].trim();
    }
    if (text.includes(' /')) {
      const parts = text.split(' /');
      return parts[parts.length - 1].trim();
    }
    if (text.includes('/ ')) {
      const parts = text.split('/ ');
      return parts[parts.length - 1].trim();
    }
    return text.trim();
  };

  const headline = stripEnglish(data?.headline) || "Bạn đã sẵn sàng ngừng dịch trong đầu?";
  const body = stripEnglish(data?.body) || "Đăng ký lớp học thử miễn phí và tự mình trải nghiệm phương pháp homestay.";
  const ctaLabel = stripEnglish(data?.primary_cta_label) || "Đăng ký học thử";

  const perks = [
    { icon: Globe, title: "Học thử miễn phí", desc: "Một buổi học với giáo viên bản ngữ + tình nguyện viên quốc tế", color: "text-[#09a86f]" },
    { icon: Award, title: "Đánh giá trình độ", desc: "Bài kiểm tra miễn phí + tư vấn lộ trình phù hợp", color: "text-[#6c5ce7]" },
    { icon: Coffee, title: "Môi trường thân thiện", desc: "Học qua cà phê, trò chuyện — không áp lực, không bài tập", color: "text-[#e17055]" },
    { icon: Clock, title: "Phản hồi nhanh", desc: "Đội ngũ thường phản hồi trong vòng 24 giờ làm việc", color: "text-[#00b894]" },
  ];

  return (
    <section id="contact" className="py-[var(--space-section)] relative bg-transparent">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)] relative">
        <FadeIn>
          <div className="max-w-[720px] mb-[var(--space-lg)] text-center mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-[#e9ffe0] text-[#09a86f] text-[12px] font-bold rounded-full px-3.5 py-1.5 mb-4 border border-[#d8ded2]">
              <Sparkles className="w-3.5 h-3.5" />
              Ưu đãi có hạn tuần này
            </span>
            <h2 className="t-lg">{headline}</h2>
            <p className="t-body-md muted" style={{ marginTop: '14px' }}>
              {body}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-5 gap-[var(--space-lg)] items-stretch max-[980px]:grid-cols-1 max-[980px]:gap-[var(--space-md)]">
            
            {/* Big Signup CTA Card — takes 3 cols */}
            <div className="col-span-3 max-[980px]:col-span-1">
              <div className="relative bg-white rounded-2xl p-8 sm:p-10 h-full border border-[#d8ded2] flex flex-col justify-between">
                
                {/* Social proof row */}
                <div>
                  <div className="flex items-center gap-3 mb-6 relative">
                    <div className="flex -space-x-2.5">
                      {['A', 'M', 'T', 'K'].map((initial, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#e9ffe0] text-[#09a86f] flex items-center justify-center text-[11px] font-bold">
                          {initial}
                        </div>
                      ))}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} width="13" height="13" viewBox="0 0 14 14" fill="#09a86f">
                            <path d="M7 1L8.6 5.1L13 5.6L9.6 8.6L10.5 13L7 10.7L3.5 13L4.4 8.6L1 5.6L5.4 5.1L7 1Z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[12px] font-semibold text-[#0b0c0b] leading-tight">
                        400+ học viên hài lòng
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.2] mb-3 text-[#0b0c0b]">
                    Sẵn sàng nói tiếng Anh<br className="max-[520px]:hidden" />
                    <span className="text-[#09a86f]"> chỉ sau 30 ngày?</span> ✨
                  </h3>
                  <p className="text-sm text-[#6f736d] mb-6 max-w-md leading-relaxed">
                    Chỉ mất <span className="font-bold text-[#0b0c0b]">30 giây</span> để đăng ký. Nhận lịch học thử ngay trong hôm nay — hoàn toàn miễn phí.
                  </p>

                  {/* Clean CTA Button */}
                  <div className="relative inline-block">
                    <Link
                      href="/register"
                      className="btn btn-primary font-bold px-7 py-3 text-sm sm:text-base rounded-full active:scale-95 transition-all duration-150 cursor-pointer !shadow-none inline-flex items-center"
                    >
                      <span className="flex items-center gap-2 text-[#0b0c0b] font-bold">
                        <Sparkles className="w-4 h-4 text-[#09a86f]" />
                        {ctaLabel}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-5 mt-8 pt-6 border-t border-[#d8ded2]">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#6f736d]">
                    <Shield className="w-4 h-4 text-[#09a86f]" />
                    Không ràng buộc
                  </div>
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-[#6f736d]">
                    <Users className="w-4 h-4 text-[#09a86f]" />
                    Hoàn tiền 100% nếu không hài lòng
                  </div>
                </div>
              </div>
            </div>

            {/* Perks Column — 2 cols */}
            <div className="col-span-2 max-[980px]:col-span-1 flex flex-col gap-3">
              {perks.map((p, i) => (
                <FadeIn key={p.title} delay={0.15 + i * 0.08}>
                  <div className="bg-white border border-[#d8ded2] rounded-xl p-4 sm:p-5 hover:border-[#09a86f]/60 transition-colors flex gap-3.5 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-[#f5f9f1] flex items-center justify-center">
                      <p.icon className={"w-5 h-5 " + p.color} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[#0b0c0b] text-[14px] sm:text-[15px] mb-0.5">{p.title}</p>
                      <p className="text-xs sm:text-[13px] text-[#6f736d] leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}

              {/* Urgency strip */}
              <div className="mt-1 rounded-xl bg-[#fff8f6] border border-[#fecdca] p-3.5 flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#e84e2b] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold text-[#e84e2b] leading-tight">
                    Chỉ còn 5 chỗ trống tuần này!
                  </p>
                  <p className="text-[11px] text-[#6f736d] mt-0.5">
                    Đăng ký ngay để nhận lịch ưu tiên — lớp sẽ đóng khi đủ chỗ.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
