import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export function FAQ({ data }: { data?: any[] }) {
  const fallbackFaqs = [
    { q: "Do I need a certain English level to join?", a: "No. We place every student with a free placement test first, so you start at the right level — from complete beginner to advanced." },
  ];

  const faqs = data && data.length > 0 ? data : fallbackFaqs;

  return (
    <section id="faq" className="py-[var(--space-section)]" style={{ background: 'var(--color-surface-strong)' }}>
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)] mx-auto text-center">
            <span className="eyebrow t-label-sm">FAQ</span>
            <h2 className="t-lg">Questions we hear a lot.</h2>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="max-w-[780px] mx-auto">
            {faqs.map((faq: any, index: number) => (
              <details key={index} className="border-b border-[var(--color-border)] group">
                <summary className="list-none cursor-pointer py-[22px] flex items-center justify-between gap-[16px] text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                  <span>{faq.question || faq.q}</span>
                  <span className="shrink-0 w-[28px] h-[28px] rounded-full border border-[var(--color-border)] flex items-center justify-center text-[18px] transition-transform duration-200 group-open:rotate-45 group-open:bg-[var(--color-primary)] group-open:border-[var(--color-primary)]">+</span>
                </summary>
                <p className="pb-[22px] text-[var(--color-muted)] text-[15px] leading-[24px] max-w-[660px]">
                  {faq.answer || faq.a}
                </p>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
