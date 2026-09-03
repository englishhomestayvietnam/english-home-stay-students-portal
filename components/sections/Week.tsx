import React from 'react';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';

export function Week({ data }: { data?: any }) {
  const defaultItems = [
    {
      label: "Learning Roadmap",
      value: "6 - 9 - 12 - 18 - 24 months (48 - 72 - 96 - 144 - 192 sessions)",
      icon: "/images/english_homestay_roadmap_icon.png",
    },
    {
      label: "Learning Format",
      value: "1-on-1, small group (2-4 students), and standard (up to 10 students per class)",
      icon: "/images/english_homestay_learning_format_icon.png",
    },
    {
      label: "Class Schedule",
      value: "2 sessions/week (90 minutes/session)",
      icon: "/images/english_homestay_schedule_icon.png",
    },
    {
      label: "Freetalk Program",
      value: "Evening practice from Monday to Saturday (7:00 PM – 10:00 PM) with flexible scheduling",
      icon: "/images/english_homestay_freetalk_icon.png",
    }
  ];

  const getFallbackIcon = (index: number, label: string) => {
    const l = (label || '').toLowerCase();
    if (l.includes('roadmap') || l.includes('lộ trình')) return '/images/english_homestay_roadmap_icon.png';
    if (l.includes('format') || l.includes('hình thức')) return '/images/english_homestay_learning_format_icon.png';
    if (l.includes('schedule') || l.includes('lịch học')) return '/images/english_homestay_schedule_icon.png';
    if (l.includes('freetalk') || l.includes('free talk')) return '/images/english_homestay_freetalk_icon.png';
    const icons = [
      '/images/english_homestay_roadmap_icon.png',
      '/images/english_homestay_learning_format_icon.png',
      '/images/english_homestay_schedule_icon.png',
      '/images/english_homestay_freetalk_icon.png',
    ];
    return icons[index % icons.length];
  };

  // Parse activities from CMS or fallback to default 4 items
  const items = data?.activities && data.activities.length > 0
    ? data.activities.map((act: any, idx: number) => {
        const titleStr = typeof act === 'string' ? act : (act?.title || '');
        const colonIndex = titleStr.indexOf(':');
        const label = colonIndex > -1 ? titleStr.substring(0, colonIndex).trim() : titleStr;
        const value = colonIndex > -1 ? titleStr.substring(colonIndex + 1).trim() : '';
        const icon = (typeof act === 'object' && act?.image?.url)
          ? act.image.url
          : (typeof act === 'object' && typeof act?.image === 'string' && act.image.startsWith('/')
              ? act.image
              : getFallbackIcon(idx, label));

        return {
          label,
          value,
          icon
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
              <div className="h-full p-5 sm:p-6 bg-[#f5f9f1] border border-[#d8ded2] rounded-2xl flex items-start gap-4 hover:border-[#09a86f]/50 hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-[#d8ded2]/70 p-2 shrink-0 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[#0b0c0b] text-[15px] sm:text-base leading-relaxed flex-1 pt-0.5">
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
