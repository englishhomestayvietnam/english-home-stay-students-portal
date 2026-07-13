import React from 'react';
import Image from 'next/image';

export function WhyEnglish() {
  const learningReasonsData = [
    {
      title: "Career Growth",
      description: "Unlock better job opportunities and earn a higher salary in multinational companies.",
      image: "/career-growth.png"
    },
    {
      title: "Study Abroad",
      description: "Prepare for international universities and access world-class education.",
      image: "/study-abroad.png"
    },
    {
      title: "Travel Freely",
      description: "Navigate the world with confidence and connect with locals anywhere you go.",
      image: "/travel-freely.png"
    },
    {
      title: "Personal Development",
      description: "Access a wider range of information, books, and courses available only in English.",
      image: "/work-internationally.png"
    }
  ];

  return (
    <section id="why" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <div className="max-w-[640px] mb-[var(--space-lg)]">
          <span className="eyebrow t-label-sm">Why English</span>
          <h2 className="t-lg">Everyone has a reason to speak English.</h2>
          <p className="t-body-md muted" style={{ marginTop: '10px' }}>
            What&apos;s yours? Most of our students start with one of these — maybe you&apos;ll recognize your own.
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-[var(--space-gutter)] max-[960px]:grid-cols-2 max-[560px]:grid-cols-1">
          {learningReasonsData.map((r: any, i: number) => (
            <div key={i} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_12px_24px_rgba(11,12,11,0.08)]">
              <Image 
                src={r.image || 'https://picsum.photos/seed/why/400/300'} 
                alt={r.title || 'Reason image'} 
                width={400} 
                height={300} 
                style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
              />
              <div className="p-[18px]">
                <p className="text-[18px] font-semibold leading-[24px] mb-[6px]">{r.title}</p>
                <p className="t-body-sm muted">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
