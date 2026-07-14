import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { RichText } from '@payloadcms/richtext-lexical/react';
import { FadeIn } from '../ui/FadeIn';

export function Story({ data }: { data?: any }) {
  const problemStory = {
    title: data?.problem_title || "You've studied English for 7 years, but when a foreigner asks for directions, you freeze.",
    eyebrow: data?.problem_eyebrow || "The Problem",
    body: data?.problem_body,
    image: data?.problem_image?.url || "https://picsum.photos/seed/story1/900/900"
  };

  const solutionStory = {
    title: data?.solution_title || "We created a space where speaking English is unavoidable.",
    eyebrow: data?.solution_eyebrow || "The Solution",
    body: data?.solution_body,
    image: data?.solution_image?.url || "https://picsum.photos/seed/story2/900/901"
  };

  return (
    <section id="story" className="bg-[var(--color-surface-strong)] py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)] relative">
        <svg className="absolute left-1/2 top-0 bottom-0 w-[220px] -translate-x-1/2 pointer-events-none z-0 max-[860px]:hidden bridge-svg" viewBox="0 0 220 840" preserveAspectRatio="none" aria-hidden="true">
          <path className="fill-none stroke-[var(--color-primary)] stroke-[2] [stroke-linecap:round] transition-[stroke-dashoffset] duration-[1.6s] ease-[ease] bridge-path" style={{ strokeDasharray: '6 8, 1000', strokeDashoffset: '1000' }} d="M 110 0 C 40 140, 180 260, 110 420 C 40 580, 180 700, 110 840" />
          <circle className="fill-[var(--color-primary)] opacity-0 [offset-path:path('M_110_0_C_40_140,_180_260,_110_420_C_40_580,_180_700,_110_840')] bridge-dot" r="5" />
        </svg>

        {problemStory && (
          <FadeIn>
            <div className="flex items-center gap-[var(--space-xl)] py-[var(--space-lg)] max-[860px]:flex-col max-[860px]:gap-[var(--space-md)] relative z-10">
            <div className="flex-1 min-w-0 w-full">
              <Image 
                src={problemStory.image} 
                alt={problemStory.title || 'Story image'} 
                width={900} 
                height={900} 
                className="w-full h-[420px] object-cover rounded-[var(--radius-xl)] max-[860px]:h-[280px]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="eyebrow t-label-sm">{problemStory.eyebrow}</span>
              <h3 className="t-lg mb-[var(--space-sm)]">{problemStory.title}</h3>
              <div className="t-body-lg muted">
                {problemStory.body ? <RichText data={problemStory.body} /> : <p>Missing text.</p>}
              </div>
            </div>
            </div>
          </FadeIn>
        )}

        {solutionStory && (
          <FadeIn>
            <div className="flex items-center gap-[var(--space-xl)] py-[var(--space-lg)] flex-row-reverse max-[860px]:flex-col max-[860px]:gap-[var(--space-md)] relative z-10">
            <div className="flex-1 min-w-0 w-full">
              <Image 
                src={solutionStory.image} 
                alt={solutionStory.title || 'Story image'} 
                width={900} 
                height={901} 
                className="w-full h-[420px] object-cover rounded-[var(--radius-xl)] max-[860px]:h-[280px]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="eyebrow t-label-sm">{solutionStory.eyebrow}</span>
              <h3 className="t-lg mb-[var(--space-sm)]">{solutionStory.title}</h3>
              <div className="t-body-lg muted">
                {solutionStory.body ? <RichText data={solutionStory.body} /> : <p>Missing text.</p>}
              </div>
              <Link href="#cta" className="btn btn-tertiary mt-[12px] !p-0 !bg-transparent !text-[var(--color-on-surface)] !h-auto underline underline-offset-4 rounded-none border-0 hover:scale-100 active:scale-100">See how it works →</Link>
            </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
