import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] pt-[var(--space-lg)] pb-[var(--space-md)]">
      <div className="max-w-[1180px] mx-auto px-[var(--space-gutter)]">
        <div className="flex justify-between flex-wrap gap-[var(--space-md)] mb-[var(--space-lg)]">
          <div>
            <Link href="#top" className="text-[20px] font-extrabold tracking-[-0.02em]">English<span className="text-[var(--color-success)]">Homestay</span></Link>
            <p className="t-body-sm muted" style={{ maxWidth: '280px', marginTop: '10px' }}>A place to actually speak — not just study.</p>
          </div>
          <div className="flex gap-[48px] flex-wrap">
            <div className="flex flex-col">
              <h4 className="text-[13px] uppercase tracking-[0.04em] text-[var(--color-muted)] m-0 mb-[12px]">Explore</h4>
              <Link href="#why" className="block text-[14px] mb-[10px]">Why English</Link>
              <Link href="#method" className="block text-[14px] mb-[10px]">Our Method</Link>
              <Link href="#week" className="block text-[14px] mb-[10px]">A Week Here</Link>
              <Link href="#gallery" className="block text-[14px] mb-[10px]">Life Here</Link>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[13px] uppercase tracking-[0.04em] text-[var(--color-muted)] m-0 mb-[12px]">Get Started</h4>
              <Link href="#contact" className="block text-[14px] mb-[10px]">Free Trial Class</Link>
              <Link href="#" className="block text-[14px] mb-[10px]">Free Placement Test</Link>
              <Link href="#faq" className="block text-[14px] mb-[10px]">FAQ</Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-[var(--space-md)] border-t border-[var(--color-border)] text-[13px] text-[var(--color-muted)] flex-wrap gap-[10px]">
          <span>© 2026 English Homestay. All rights reserved.</span>
          <span>Made for people who want to actually speak English.</span>
        </div>
      </div>
    </footer>
  );
}
