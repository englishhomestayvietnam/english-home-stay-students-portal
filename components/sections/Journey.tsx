import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export function Journey({ data }: { data?: any[] }) {
  const fallbackPhases = [
    {
      phase_tag: "Bài 1–5",
      title: "Xây dựng nền tảng",
      points: [
        { point: "Nắm vững các quy tắc phát âm tiếng Anh" },
        { point: "Tự tin đọc to các từ mới" },
        { point: "Xây dựng thói quen nói tiếng Anh từ bài học đầu tiên" }
      ]
    },
    {
      phase_tag: "Từ bài 6 trở đi",
      title: "Học cách giao tiếp",
      points: [
        { point: "Luyện nghe và hiểu hội thoại tự nhiên" },
        { point: "Đặt câu hỏi, không chỉ trả lời" },
        { point: "Nói tự nhiên, không cần dịch trong đầu" }
      ]
    }
  ];

  const phases = data && data.length > 0 ? data : fallbackPhases;

  return (
    <section className="py-[var(--space-section)]" style={{ background: 'var(--color-surface-strong)' }}>
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm">Hành trình học tập</span>
            <h2 className="t-lg">Từ âm thanh đầu tiên đến cuộc hội thoại thực tế đầu tiên.</h2>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="relative grid grid-cols-2 gap-[var(--space-gutter)] max-[760px]:grid-cols-1">
            {phases.map((phase: any, index: number) => (
              <React.Fragment key={index}>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[28px] relative">
                  <span className="inline-block bg-[var(--color-surface-strong)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold mb-[14px]">{phase.phase_tag}</span>
                  <h3 className="t-sm">{phase.title}</h3>
                  <ul className="mt-[14px] pl-[18px] list-disc marker:text-[var(--color-muted)]">
                    {(phase.points || []).map((pt: any, idx: number) => (
                      <li key={idx} className="mb-[8px] text-[var(--color-muted)] text-[15px] leading-[22px]">{pt.point}</li>
                    ))}
                  </ul>
                </div>
                {index === 0 && (
                  <div className="hidden min-[761px]:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-[var(--color-primary)] rounded-full items-center justify-center font-bold z-[2]">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
