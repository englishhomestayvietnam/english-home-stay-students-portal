import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export function FAQ() {
  const fallbackFaqs = [
    { q: "Do I need a certain English level to join?", a: "No. We place every student with a free placement test first, so you start at the right level — from complete beginner to advanced." },
    { q: "What actually happens in a Free Talk session?", a: "You drop in any time between 6:30 and 10:00 PM, Monday to Saturday. Teaching assistants and international volunteers are there to chat using our 180+ conversation topics — stay 30 minutes or the whole evening." },
    { q: "Who are the international volunteers?", a: "They're native and fluent English speakers who join our community specifically to have real conversations with students — not to teach grammar." },
    { q: "How long until I notice a real difference?", a: "It depends on your starting point and how often you practice, but most students report a noticeable jump in speaking confidence within their first month of regular Free Talk sessions." },
    { q: "Is there a trial before I commit?", a: "Yes — every student can book a free trial class and a free placement test before deciding anything." },
    { q: "What happens after I submit the contact form?", a: "Our team will reach out, usually within one business day, to understand your goals and book your free trial class." },
  ];

  const data = fallbackFaqs;

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
            {data.map((faq: any, index: number) => (
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
