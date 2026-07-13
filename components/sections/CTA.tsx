import React from 'react';
import Link from 'next/link';

export function CTA() {
  return (
    <section id="cta" className="py-[var(--space-section)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <div className="bg-[var(--color-tertiary)] text-white rounded-[var(--radius-xl)] px-[var(--space-lg)] py-[var(--space-xl)] text-center relative overflow-hidden before:content-[''] before:absolute before:w-[520px] before:h-[520px] before:bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] before:opacity-[0.18] before:-top-[220px] before:-right-[160px]">
          <h2 className="t-lg text-white max-w-[560px] mx-auto">Your bridge to the world starts with one conversation.</h2>
          <p className="t-body-lg text-[rgba(255,255,255,0.75)] mt-[var(--space-sm)]">Book a free trial class and see what real English practice feels like — no pressure, no obligation.</p>
          <div className="flex justify-center gap-[14px] mt-[var(--space-md)] flex-wrap relative">
            <Link href="#" className="btn btn-primary">Book a Free Trial Class</Link>
            <Link href="#" className="btn btn-secondary !border-[rgba(255,255,255,.5)] !text-white hover:!bg-[rgba(255,255,255,.12)]">Take a Free Placement Test</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
