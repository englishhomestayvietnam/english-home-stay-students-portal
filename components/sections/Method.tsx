import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export function Method({ data }: { data?: any }) {
  const headline = data?.headline || "Less studying about English. More speaking it.";
  const body = data?.body || "Students learn the fundamentals first — pronunciation, structure, the essentials — then immediately put them to use in real conversation. Knowledge that isn't practiced fades. Knowledge that's practiced becomes a habit.";
  const learnPct = data?.learn_pct || 30;
  const practicePct = data?.practice_pct || 70;

  return (
    <section id="method" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm">Our learning method</span>
            <h2 className="t-lg">{headline}</h2>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="flex gap-[var(--space-xl)] items-center max-[860px]:flex-col">
            <div className="flex-1 flex h-[220px] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] max-[860px]:flex-col max-[860px]:h-auto max-[860px]:w-full">
              <div className="flex flex-col justify-end p-[20px] bg-[var(--color-surface-strong)] text-[var(--color-on-surface)] max-[860px]:p-[24px] max-[860px]:!flex-none" style={{ flex: `${learnPct} ${learnPct} 0%` }}>
                <span className="text-[40px] font-extrabold tracking-[-0.02em]">{learnPct}%</span>
                <p className="t-label-md" style={{ marginTop: '6px' }}>Learning</p>
              </div>
              <div className="flex flex-col justify-end p-[20px] text-[var(--color-primary-contrast)] bg-[var(--color-primary)] max-[860px]:p-[24px] max-[860px]:!flex-none max-[860px]:pb-[40px]" style={{ flex: `${practicePct} ${practicePct} 0%` }}>
                <span className="text-[40px] font-extrabold tracking-[-0.02em]">{practicePct}%</span>
                <p className="t-label-md" style={{ marginTop: '6px' }}>Practicing</p>
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
