import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export function Week({ data }: { data?: any }) {
  const defaultItems = [
    {
      label: "Learning Roadmap",
      value: "6 - 9 - 12 - 18 - 24 months (48 - 72 - 96 - 144 - 192 sessions)"
    },
    {
      label: "Learning Format",
      value: "1-on-1, small group (2-4 students), and standard (up to 10 students per class)"
    },
    {
      label: "Class Schedule",
      value: "2 sessions/week (90 minutes/session)"
    },
    {
      label: "Freetalk Program",
      value: "Evening practice from Monday to Saturday (7:00 PM – 10:00 PM) with flexible scheduling"
    }
  ];

  // Parse activities from CMS or fallback to default 4 items
  const items = data?.activities && data.activities.length > 0
    ? data.activities.map((act: any) => {
        const titleStr = typeof act === 'string' ? act : (act?.title || '');
        const colonIndex = titleStr.indexOf(':');
        if (colonIndex > -1) {
          return {
            label: titleStr.substring(0, colonIndex).trim(),
            value: titleStr.substring(colonIndex + 1).trim()
          };
        }
        return {
          label: titleStr,
          value: ''
        };
      })
    : defaultItems;

  const eyebrow = data?.eyebrow || "Một tuần tại English Homestay";
  const headline = data?.headline || "Lịch trình thực tế trong tuần của bạn.";

  return (
    <section id="week" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-8 sm:mb-10">
            <span className="eyebrow t-label-sm">{eyebrow}</span>
            <h2 className="t-lg">{headline}</h2>
          </div>
        </FadeIn>

        {/* 2x2 Grid of the 4 Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          {items.map((item: any, i: number) => (
            <FadeIn key={i} delay={i * 0.08} className="h-full">
              <div className="h-full p-6 sm:p-7 bg-[#f5f9f1] border border-[#d8ded2] rounded-2xl flex items-start gap-3.5 hover:border-[#09a86f]/50 hover:shadow-sm transition-all duration-200">
                <span className="w-2.5 h-2.5 rounded-full bg-[#09a86f] mt-1.5 shrink-0" />
                <div className="text-[#0b0c0b] text-[15px] sm:text-base leading-relaxed">
                  <strong className="font-bold text-[#0b0c0b]">
                    {item.label}{item.value ? ': ' : ''}
                  </strong>
                  {item.value && (
                    <span className="text-[#0b0c0b]/80">{item.value}</span>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
