import React from 'react';
import Image from 'next/image';

export function Testimonials({ data }: { data?: any[] }) {
  const testimonialsData = data && data.length > 0 ? data : [
    {
      quote: "I used to translate everything in my head before speaking. The environment here forced me to stop doing that. I just speak now.",
      tag: "Noticeable progress",
      student_name: "Linh Nguyen",
      role_or_background: "University Student",
      photo: { url: "https://picsum.photos/seed/test1/100/100" }
    }
  ];

  return (
    <section id="stories" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <div className="max-w-[640px] mb-[var(--space-lg)]">
          <span className="eyebrow t-label-sm">Student stories</span>
          <h2 className="t-lg">Before and after — in their own words.</h2>
        </div>
        
        <div className="flex gap-[var(--space-gutter)] overflow-x-auto snap-x snap-mandatory pb-[8px] no-scrollbar [&::-webkit-scrollbar]:hidden">
          {testimonialsData.map((t: any, i: number) => (
            <div key={i} className="snap-start flex-[0_0_320px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[24px] flex flex-col gap-[14px]">
              {t.tag && <span className="text-[var(--color-success)] text-[12px] font-semibold">{t.tag}</span>}
              <p className="text-[17px] font-light leading-[26px] tracking-[-0.01em]">“{t.quote}”</p>
              <div className="flex items-center gap-[12px] mt-auto pt-[8px]">
                <Image 
                  src={t.photo?.url || 'https://picsum.photos/seed/test1/100/100'} 
                  alt={t.student_name || 'Student photo'} 
                  width={44} 
                  height={44} 
                  className="rounded-[var(--radius-full)] object-cover w-[44px] h-[44px]"
                />
                <div>
                  <p className="t-label-md" style={{ margin: 0 }}>{t.student_name}</p>
                  <p className="t-body-sm muted" style={{ margin: 0 }}>{t.role_or_background}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-[10px] mt-[var(--space-md)]">
          <button className="w-[36px] h-[36px] rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center hover:bg-[var(--color-surface-strong)]" aria-label="Previous">←</button>
          <button className="w-[36px] h-[36px] rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center hover:bg-[var(--color-surface-strong)]" aria-label="Next">→</button>
        </div>
      </div>
    </section>
  );
}
