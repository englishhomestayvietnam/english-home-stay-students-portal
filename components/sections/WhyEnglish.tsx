import React from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';

export function WhyEnglish({ data }: { data?: any[] }) {
  const learningReasonsData = data && data.length > 0 ? data : [
    {
      title: "Career Growth",
      description: "Unlock better job opportunities and earn a higher salary in multinational companies.",
      image: { url: "/career-growth.png" }
    }
  ];

  return (
    <section id="why" className="py-[var(--space-section)] p-3">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm">Why English</span>
            <h2 className="t-lg">Everyone has a reason to speak English.</h2>
            <p className="t-body-md muted" style={{ marginTop: '10px' }}>
              What&apos;s yours? Most of our students start with one of these — maybe you&apos;ll recognize your own.
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
