import React from 'react';
import Link from 'next/link';

export function FloatingContact() {
  return (
    <div className="fixed bottom-[24px] right-[24px] z-[90] flex flex-col gap-[14px] items-end">
      {/* Zalo Button */}
      <div className="relative group p-[4px] rounded-[var(--radius-full)] overflow-hidden w-[72px] h-[72px] shadow-[0_8px_20px_rgba(0,104,255,0.4)] hover:-translate-y-1 transition-transform duration-200">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0068FF_0%,#ffffff_50%,#0068FF_100%)]" />
        <Link 
          href="https://zalo.me/0968199900" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Chat on Zalo"
          className="relative flex items-center justify-center w-full h-full rounded-[calc(var(--radius-full)-4px)] bg-[#0068FF] text-white z-10"
        >
          <span className="font-bold text-[22px] tracking-tight">Zalo</span>
        </Link>
      </div>
      
    </div>
  );
}
