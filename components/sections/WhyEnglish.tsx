import React from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';

const contextualImages: Record<string, string> = {
  growth: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', // Phát triển bản thân
  work: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', // Công việc
  study: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', // Du học
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80', // Du lịch
  parent: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80', // Đồng hành cùng con
};

function getReasonImage(r: any, index: number): string {
  const title = (r?.title || '').toLowerCase();
  
  if (title.includes('phát triển') || title.includes('bản thân') || title.includes('tự tin')) {
    return contextualImages.growth;
  }
  if (title.includes('công việc') || title.includes('sự nghiệp') || title.includes('thăng tiến')) {
    return contextualImages.work;
  }
  if (title.includes('du học') || title.includes('học tập')) {
    return contextualImages.study;
  }
  if (title.includes('du lịch') || title.includes('thế giới')) {
    return contextualImages.travel;
  }
  if (title.includes('con') || title.includes('đồng hành') || title.includes('gia đình') || title.includes('cha mẹ')) {
    return contextualImages.parent;
  }

  // Fallback by order
  const orderKeys = ['growth', 'work', 'study', 'travel', 'parent'];
  return contextualImages[orderKeys[index % orderKeys.length]];
}

export function WhyEnglish({ data }: { data?: any[] }) {
  const learningReasonsData = data && data.length > 0 ? data : [
    {
      title: "Phát triển bản thân",
      description: "Kỹ năng sử dụng tiếng Anh giao tiếp thành thạo giúp mở rộng cơ hội trong công việc và cuộc sống.",
    },
    {
      title: "Công việc",
      description: "Yêu cầu công việc: thường xuyên phải giao tiếp với người nước ngoài; Công tác nước ngoài; Cơ hội thăng tiến.",
    },
    {
      title: "Du học",
      description: "Trang bị kỹ năng, cần môi trường để làm quen và tăng phản xạ giao tiếp tiếng Anh với người nước ngoài.",
    },
    {
      title: "Du lịch",
      description: "Du lịch nước ngoài – các quốc gia có sử dụng tiếng Anh một cách tự tin và thoải mái.",
    },
    {
      title: "Đồng hành cùng con",
      description: "Cha mẹ đồng hành cùng con trong việc chinh phục ngôn ngữ mới trong thời buổi hiện đại.",
    }
  ];

  return (
    <section id="why" className="py-[var(--space-section)] p-3">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm">Tại sao học tiếng Anh</span>
            <h2 className="t-lg">Ai cũng có lý do để học tiếng Anh.</h2>
            <p className="t-body-md muted" style={{ marginTop: '10px' }}>
              Lý do của bạn là gì? Hầu hết học viên của chúng tôi bắt đầu từ những lý do này.
            </p>
          </div>
        </FadeIn>
        
        {/* 3 + 2 Centered Layout for 5 cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {learningReasonsData.map((r: any, i: number) => {
            const imageUrl = getReasonImage(r, i);

            return (
              <div 
                key={i} 
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[380px] flex"
              >
                <FadeIn delay={i * 80} className="w-full flex">
                  <div className="w-full flex flex-col bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[#d8ded2] hover:border-[#09a86f]/40 transition-all duration-200 shadow-xs hover:shadow-md group">
                    <div className="relative w-full h-[200px] bg-neutral-100 overflow-hidden">
                      <Image 
                        src={imageUrl} 
                        alt={r.title || 'Reason image'} 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow bg-white">
                      <p className="text-[17px] sm:text-[18px] font-bold text-[#0b0c0b] mb-1.5">{r.title}</p>
                      <p className="text-xs sm:text-sm text-[#6f736d] leading-relaxed">{r.description}</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
