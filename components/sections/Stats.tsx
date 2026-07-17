import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export function Stats() {
  const stats = [
    { label: "Giờ giao tiếp", value: "5,000+" },
    { label: "Tình nguyện viên quốc tế", value: "40+" },
    { label: "Chủ đề thảo luận", value: "180+" },
    { label: "Quốc gia đại diện", value: "15+" },
    { label: "Học viên", value: "500+" },
    { label: "Năm kinh nghiệm", value: "5+" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#d8ded2]">
      <div className="max-w-[1180px] mx-auto px-6">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 items-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#09a86f] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-[#0b0c0b]/70 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
