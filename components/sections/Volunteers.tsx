import React from 'react';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';

export function Volunteers({ data }: { data?: any[] }) {
  const volunteersData = data && data.length > 0 ? data : [
    {
      name: "James",
      country_flag: "🇬🇧",
      role: "Kỹ sư",
      duration: "Tình nguyện viên từ 2025",
      photo: { url: "https://picsum.photos/seed/placeholder/800/600" }
    },
    {
      name: "Emily",
      country_flag: "🇺🇸",
      role: "Giáo viên",
      duration: "Tình nguyện viên từ 2024",
      photo: { url: "https://picsum.photos/seed/placeholder/800/600" }
    },
    {
      name: "David",
      country_flag: "🇩🇪",
      role: "Sinh viên đại học",
      duration: "",
      photo: { url: "https://picsum.photos/seed/placeholder/800/600" }
    }
  ];

  return (
    <section id="volunteers" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-6">
        <FadeIn>
          <div className="max-w-[640px] mb-12 sm:mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-[#09a86f]/10 text-[#09a86f] text-sm font-bold tracking-wide uppercase mb-4">
              Cộng đồng
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b0c0b] tracking-tight mb-4">
              Gặp gỡ tình nguyện viên.
            </h2>
            <p className="text-lg text-[#0b0c0b]/70">
              Trò chuyện thực tế với người thật. Xây dựng kết nối chân thực với những người bạn quốc tế.
            </p>
          </div>
        </FadeIn>
        
        {/* Mobile Smooth Infinite Marquee */}
        <div className="sm:hidden flex overflow-hidden -mx-6 px-6 group">
          <div className="flex w-max animate-marquee gap-4 items-stretch hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {[...volunteersData, ...volunteersData].map((v: any, i: number) => (
              <FadeIn key={i} delay={0} className="h-auto shrink-0 w-[260px] self-stretch">
                <div className="h-full flex flex-col group relative overflow-hidden rounded-2xl bg-[#f5f9f1] border border-[#d8ded2] shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative h-[280px] shrink-0 w-full overflow-hidden">
                    <Image 
                      src={(v.photo?.imagekit?.url || v.photo?.url) || `https://picsum.photos/seed/placeholder/800/600`} 
                      alt={v.name} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-[#0b0c0b]">{v.name}</h3>
                      <span className="text-xl">{v.country_flag}</span>
                    </div>
                    <p className="text-[15px] font-semibold text-[#09a86f] mb-2">{v.role}</p>
                    {v.duration && (
                      <p className="text-[14px] text-[#0b0c0b]/60">{v.duration}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Desktop Static Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {volunteersData.map((v: any, i: number) => (
            <FadeIn key={i} delay={i * 0.1} className="h-auto self-stretch">
              <div className="h-full flex flex-col group relative overflow-hidden rounded-2xl bg-[#f5f9f1] border border-[#d8ded2] shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative h-[320px] shrink-0 w-full overflow-hidden">
                  <Image 
                    src={(v.photo?.imagekit?.url || v.photo?.url) || `https://picsum.photos/seed/placeholder/800/600`} 
                    alt={v.name} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[#0b0c0b]">{v.name}</h3>
                    <span className="text-xl">{v.country_flag}</span>
                  </div>
                  <p className="text-[15px] font-semibold text-[#09a86f] mb-2">{v.role}</p>
                  {v.duration && (
                    <p className="text-[14px] text-[#0b0c0b]/60">{v.duration}</p>
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
