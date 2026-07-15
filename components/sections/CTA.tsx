import React from 'react';
import Link from 'next/link';
import { FadeIn } from '../ui/FadeIn';

export function CTA() {
  return (
    <section id="cta" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <FadeIn>
          <div className="bg-[var(--color-tertiary)] text-white rounded-[var(--radius-xl)] px-[var(--space-lg)] py-[var(--space-xl)] text-center relative overflow-hidden before:content-[''] before:absolute before:w-[520px] before:h-[520px] before:bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] before:opacity-[0.18] before:-top-[220px] before:-right-[160px]">
            <h2 className="t-lg text-white max-w-[560px] mx-auto">Your bridge to the world starts with one conversation.</h2>
            <p className="t-body-lg text-[rgba(255,255,255,0.75)] mt-[var(--space-sm)]">Book a free trial class and see what real English practice feels like — no pressure, no obligation.</p>
            <div className="flex justify-center gap-[14px] mt-[var(--space-md)] flex-wrap relative">
              <div className="relative group p-[3px] rounded-[var(--radius-full)] overflow-hidden shadow-md inline-flex">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#09a86f_0%,#ffffff_50%,#09a86f_100%)]" />
                <Link href="#" className="btn btn-primary !m-0 relative z-10 !rounded-[calc(var(--radius-full)-3px)]">Book a Free Trial Class</Link>
              </div>
              <Link href="#" className="btn btn-secondary !border-[rgba(255,255,255,.5)] !text-white hover:!bg-[rgba(255,255,255,.12)]">Take a Free Placement Test</Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
