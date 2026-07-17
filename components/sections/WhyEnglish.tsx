import React from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';

export function WhyEnglish({ data }: { data?: any[] }) {
  const learningReasonsData = data && data.length > 0 ? data : [
    {
      title: "Thăng tiến sự nghiệp",
      description: "Mở ra cơ hội việc làm tốt hơn và nhận mức lương cao hơn ở các công ty đa quốc gia.",
      image: { url: "https://picsum.photos/seed/career/400/300" }
    },
    {
      title: "Du lịch",
      description: "Tự tin du lịch vòng quanh thế giới và kết nối với mọi người ở khắp nơi.",
      image: { url: "https://picsum.photos/seed/travel/400/300" }
    },
    {
      title: "Du học",
      description: "Đạt điểm IELTS yêu cầu và chuẩn bị cho cuộc sống đại học ở nước ngoài.",
      image: { url: "https://picsum.photos/seed/study/400/300" }
    },
    {
      title: "Tự tin cá nhân",
      description: "Ngừng dịch trong đầu và bắt đầu nói một cách tự nhiên.",
      image: { url: "https://picsum.photos/seed/confidence/400/300" }
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
        
        <div className="grid grid-cols-4 gap-[var(--space-gutter)] max-[960px]:grid-cols-2 max-[560px]:grid-cols-1">
          {learningReasonsData.map((r: any, i: number) => (
            <FadeIn key={i} delay={i * 100} className="h-full">
              <div className="h-full flex flex-col bg-[var(--color-surface)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)]">
                <Image 
                  src={r.image?.url || 'https://picsum.photos/seed/why/400/300'} 
                  alt={r.title || 'Reason image'} 
                  width={400} 
                  height={300} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                />
                <div className="p-[18px] flex flex-col flex-grow">
                  <p className="text-[18px] font-semibold leading-[24px] mb-[6px]">{r.title}</p>
                  <p className="t-body-sm muted">{r.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
