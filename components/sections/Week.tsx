import React from 'react';
import Image from 'next/image';
import { FadeIn } from '../ui/FadeIn';

export function Week({ data }: { data?: any }) {
  const activitiesData = data?.activities?.length > 0 ? data.activities : [
    { title: "Cooking together", image: { url: "https://picsum.photos/seed/act1/400/300" } },
    { title: "Weekend trips", image: { url: "https://picsum.photos/seed/act2/400/300" } },
    { title: "Movie nights", image: { url: "https://picsum.photos/seed/act3/400/300" } },
    { title: "Local events", image: { url: "https://picsum.photos/seed/act4/400/300" } }
  ];

  const mainClassesDesc = data?.main_classes_desc || "Every class pairs structured teaching with immediate practice, so what you learn gets used the same day.";
  const freetalkDesc = data?.freetalk_desc || "Drop in whenever it suits your schedule. Teaching assistants and international volunteers are on hand the whole time.";
  const topicsCount = data?.topics_count || "180+";
  const topicsDesc = data?.topics_desc || "Not knowing what to talk about is the #1 thing that stops practice. We've prepared over 180 topics, so every session has a clear purpose.";

  return (
    <section id="week" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="max-w-[640px] mb-[var(--space-lg)]">
            <span className="eyebrow t-label-sm">A week at English Homestay</span>
            <h2 className="t-lg">This is what your week actually looks like.</h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-[1.2fr_1fr] gap-[var(--space-gutter)] max-[960px]:grid-cols-1">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[28px]">
              <span className="eyebrow t-label-sm">Two main classes / week</span>
              <h3 className="t-sm">90 minutes, split for a reason</h3>
              <p className="t-body-md muted" style={{ marginTop: '8px' }}>{mainClassesDesc}</p>
              
              <div className="flex h-[56px] rounded-[var(--radius-md)] overflow-hidden my-[18px] mb-[10px]">
                <div className="flex-[2] bg-[var(--color-surface-strong)] flex items-center justify-center text-[13px] font-semibold text-[var(--color-on-surface)]">60 min · Vietnamese teacher</div>
                <div className="flex-1 bg-[var(--color-primary)] flex items-center justify-center text-[13px] font-semibold text-[var(--color-primary-contrast)]">30 min · Volunteers</div>
              </div>
              
              <p className="t-body-sm muted">
                A qualified Vietnamese teacher builds your foundation, then international volunteers help you use it right away.
              </p>
            </div>

            <div className="bg-[var(--color-tertiary)] text-white border border-[var(--color-tertiary)] rounded-[var(--radius-lg)] p-[28px]">
              <span className="eyebrow t-label-sm opacity-60">Free Talk sessions</span>
              <h3 className="t-sm">Monday–Saturday, 6:30–10:00 PM</h3>
              <p className="t-body-md text-[rgba(255,255,255,0.75)] mt-[8px]">{freetalkDesc}</p>
              
              <div className="flex gap-[8px] flex-wrap mt-[16px]">
                <span className="bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.18)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold">Stay 30 min</span>
                <span className="bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.18)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold">Stay 1 hour</span>
                <span className="bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.18)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold">Stay 2 hours</span>
                <span className="bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.18)] rounded-[var(--radius-full)] px-[12px] py-[4px] text-[12px] font-semibold">Stay the evening</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-[1.2fr_1fr] gap-[var(--space-gutter)] max-[960px]:grid-cols-1 mt-[var(--space-gutter)]">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[28px]">
              <span className="eyebrow t-label-sm">Never run out of things to say</span>
              <div className="text-[56px] font-extrabold tracking-[-0.02em] text-[var(--color-primary)] leading-none">{topicsCount}</div>
              <h3 className="t-sm mt-[6px]">Conversation topics, ready to go</h3>
              <p className="t-body-md muted mt-[8px]">{topicsDesc}</p>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-[28px]">
              <span className="eyebrow t-label-sm">Beyond the classroom</span>
              <h3 className="t-sm">This is where English becomes part of everyday life.</h3>
              <div className="grid grid-cols-4 gap-[10px] mt-[var(--space-md)] max-[760px]:grid-cols-2">
                {activitiesData.map((act: any, i: number) => (
                  <div key={i} className="relative rounded-[var(--radius-md)] overflow-hidden h-[140px]">
                    <Image 
                      src={act.image?.url || 'https://picsum.photos/seed/act1/400/300'} 
                      alt={act.title || 'Activity image'} 
                      fill 
                      className="object-cover w-full h-full" 
                    />
                    <span className="absolute left-[8px] bottom-[8px] bg-[rgba(11,12,11,0.65)] text-white text-[11px] font-medium px-[10px] py-[5px] rounded-[var(--radius-full)] backdrop-blur-[4px]">{act.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
