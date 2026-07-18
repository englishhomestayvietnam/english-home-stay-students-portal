import React from 'react';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';

export function Testimonials({ data }: { data?: any[] }) {
  const testimonialsData = data && data.length > 0 ? data : [
    {
      beforeText: "Trước đây mình hay dịch mọi thứ trong đầu trước khi nói. Mình rất sợ mắc lỗi sai.",
      afterText: "Môi trường ở đây buộc mình phải bỏ thói quen đó. Giờ mình có thể phản xạ tự nhiên và trò chuyện liên tục 20 phút.",
      tag: "Tiến bộ rõ rệt",
      student_name: "Linh Nguyen",
      role_or_background: "Sinh viên",
      photo: { url: "https://picsum.photos/seed/placeholder/800/600" }
    }
  ];

  return (
    <section id="stories" className="py-[var(--space-section)] bg-[#f9fdf5]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm text-[#09a86f]">Câu chuyện học viên</span>
            <h2 className="t-lg text-[#0b0c0b]">Trước và sau — qua lời kể của họ.</h2>
          </div>
        </FadeIn>
        
        <div className="flex gap-[var(--space-gutter)] overflow-x-auto snap-x snap-mandatory pb-[8px] no-scrollbar [&::-webkit-scrollbar]:hidden">
          {testimonialsData.map((t: any, i: number) => (
            <FadeIn key={i} delay={i * 100} className="snap-start flex-[0_0_280px] sm:flex-[0_0_400px] bg-white border border-[#d8ded2] shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[var(--radius-lg)] p-4 sm:p-[24px] flex flex-col gap-3 sm:gap-[20px]">
              {t.tag && <span className="text-[#09a86f] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider">{t.tag}</span>}
              
              <div className="flex flex-col gap-3 sm:gap-4 relative">
                <div className="bg-[#fdf0f0] border border-[#facdcd] p-3 sm:p-4 rounded-xl relative">
                  <span className="absolute -top-3 left-3 sm:left-4 bg-[#fdf0f0] border border-[#facdcd] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#d93838] rounded-md uppercase tracking-wide">Trước</span>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#0b0c0b]/80 mt-1">“{t.beforeText}”</p>
                </div>
                
                <div className="flex justify-center -my-2.5 sm:-my-3 relative z-10">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#d8ded2] flex items-center justify-center shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#09a86f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[14px] sm:h-[14px]"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>
                </div>

                <div className="bg-[#f0f9f4] border border-[#b2dfc8] p-3 sm:p-4 rounded-xl relative">
                  <span className="absolute -top-3 left-3 sm:left-4 bg-[#f0f9f4] border border-[#b2dfc8] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#09a86f] rounded-md uppercase tracking-wide">Sau</span>
                  <p className="text-[14px] sm:text-[15px] font-semibold leading-relaxed text-[#0b0c0b] mt-1">“{t.afterText}”</p>
                </div>
              </div>

              <div className="flex items-center gap-[12px] mt-auto pt-[8px]">
                <Image 
                  src={t.photo?.url || 'https://picsum.photos/seed/placeholder/800/600'} 
                  alt={t.student_name || 'Student photo'} 
                  width={44} 
                  height={44} 
                  className="rounded-[var(--radius-full)] object-cover w-[44px] h-[44px]"
                />
                <div>
                  <p className="t-label-md text-[#0b0c0b]" style={{ margin: 0 }}>{t.student_name}</p>
                  <p className="t-body-sm text-[#0b0c0b]/60" style={{ margin: 0 }}>{t.role_or_background}</p>
                </div>
              </div>
            </FadeIn>
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
