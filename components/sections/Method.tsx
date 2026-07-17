import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export function Method({ data }: { data?: any }) {
  const headline = data?.headline || "Bớt học sách vở. Thêm thời gian giao tiếp.";
  const body = data?.body || "Học viên học các nền tảng trước — phát âm, cấu trúc, những điều cần thiết — sau đó áp dụng ngay vào các cuộc trò chuyện thực tế. Kiến thức không được thực hành sẽ mờ nhạt đi. Kiến thức được thực hành sẽ trở thành thói quen.";
  const learnPct = data?.learn_pct || 30;
  const practicePct = data?.practice_pct || 70;

  return (
    <section id="method" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm">Phương pháp học của chúng tôi</span>
            <h2 className="t-lg">{headline}</h2>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="flex gap-[var(--space-xl)] items-center max-[860px]:flex-col">
            <div className="flex-1 flex h-[220px] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] max-[860px]:flex-col max-[860px]:h-auto max-[860px]:w-full">
              <div className="flex flex-col justify-end p-[20px] bg-[var(--color-surface-strong)] text-[var(--color-on-surface)] max-[860px]:p-[24px] max-[860px]:!flex-none" style={{ flex: `${learnPct} ${learnPct} 0%` }}>
                <span className="text-[40px] font-extrabold tracking-[-0.02em]">{learnPct}%</span>
                <p className="t-label-md" style={{ marginTop: '6px' }}>Học nền tảng</p>
              </div>
              <div className="flex flex-col justify-end p-[20px] text-[var(--color-primary-contrast)] bg-[var(--color-primary)] max-[860px]:p-[24px] max-[860px]:!flex-none max-[860px]:pb-[40px]" style={{ flex: `${practicePct} ${practicePct} 0%` }}>
                <span className="text-[40px] font-extrabold tracking-[-0.02em]">{practicePct}%</span>
                <p className="t-label-md" style={{ marginTop: '6px' }}>Thực hành</p>
              </div>
            </div>
            <div className="flex-1 min-w-[260px]">
              <p className="t-body-lg muted">{body}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
