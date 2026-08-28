'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

import { FadeIn } from '@/components/ui/FadeIn';
import Link from 'next/link';

import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Hero Section component - displays at the top of the landing page.
 * Renders either a full-screen background video or a fallback Ken Burns animated image.
 */
export function Hero({ data }: { data?: any }) {
  // Extract URL from poster media relation or use students/teachers/volunteers photo
  const posterUrl = (data?.poster?.imagekit?.url || data?.poster?.url) || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80';

  return (
    <section className="relative w-full aspect-[16/9] max-[768px]:aspect-[3/4] flex items-end overflow-hidden text-white p-0" id="top">
      {/* Background Media Container: Contains the image/video & opacity overlay */}
      <div className="absolute inset-0 overflow-hidden bg-tertiary">
        <Image
          src={posterUrl}
          alt={data?.poster?.alt || "Students and international volunteers talking and learning English together at English Homestay"}
          fill
          className="object-cover animate-kenburns"
          priority
          loading="eager"
        />
        {/* Dark opacity (15%) + Gradient overlay to ensure text readability */}
        <div 
          className="absolute inset-0 pointer-events-none bg-tertiary/45 bg-gradient-to-b bg-black/50"
        />
      </div>

      {/* Hero content foreground layout */}
      <div className="max-w-[1180px] mx-auto px-[5%] relative z-10 pb-[6%] w-full text-left">
        <FadeIn>
          {/* Spotlight Homestay Badge - cleanly aligned to the left */}
          <div className="inline-flex items-start sm:items-center gap-2.5 bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-2xl sm:rounded-full text-xs font-semibold text-white/95 mb-3.5 sm:mb-4 shadow-sm text-left max-w-full">
            <span className="flex h-2 w-2 relative shrink-0 mt-1 sm:mt-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#09a86f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#09a86f]"></span>
            </span>
            <span className="leading-snug">Môi trường 100% tiếng Anh tự nhiên cùng tình nguyện viên quốc tế</span>
          </div>

          <h1 className="t-display text-white max-w-[780px] leading-[1.1] text-left max-[768px]:text-[26px] max-[480px]:text-[20px]" dangerouslySetInnerHTML={{ __html: data?.headline || 'English Homestay' }}></h1>
          <p className="text-sm sm:text-base text-white/90 max-w-[560px] mt-3 sm:mt-4 text-left leading-relaxed">{data?.subheadline || 'Luyện tiếng Anh mỗi ngày qua những cuộc trò chuyện thực tế và môi trường sống năng động.'}</p>
          
          {/* Action CTAs - Full width on mobile, inline on desktop, centered content */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto items-stretch sm:items-center">
            {/* Primary CTA button with rotating border and shine sweep for design consistency */}
            <Link
              href="/register"
              className="relative inline-flex w-full sm:w-auto p-[1.5px] sm:p-[2px] overflow-hidden rounded-full active:scale-95 transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#09a86f_0%,#bbffa6_35%,#ffffff_50%,#09a86f_75%,#09a86f_100%)] pointer-events-none" />
              <span className="relative z-10 overflow-hidden inline-flex w-full items-center justify-center gap-2 bg-[#09a86f] hover:bg-[#089763] text-white font-extrabold px-6 sm:px-7 h-11 sm:h-12 text-sm sm:text-base rounded-full transition-colors whitespace-nowrap">
                <span className="absolute inset-0 -translate-x-full animate-[shimmerRay_2.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none skew-x-[-20deg]" />
                <span>{data?.primary_cta_label || 'Bắt đầu ngay'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </span>
            </Link>
            
            {/* Secondary CTA button - Clean consistent glassmorphic outline */}
            <Link
              href="/register"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold backdrop-blur-md px-5.5 sm:px-6.5 h-11 sm:h-12 rounded-full active:scale-95 transition-all duration-150 cursor-pointer text-sm sm:text-base whitespace-nowrap shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-white/90 shrink-0" />
              <span>{data?.secondary_cta_label || 'Kiểm tra trình độ miễn phí'}</span>
            </Link>
          </div>
        </FadeIn>
      </div>
      
      {/* Scroll indicator overlay - hidden on very small screens since 16:9 is short */}
      <div className="absolute bottom-[4%] right-[4%] z-10 text-white/70 flex items-center gap-2 text-[10px] tracking-wider uppercase after:content-[''] after:w-[1px] after:h-[20px] after:bg-white/50 after:animate-scrolldrop max-[600px]:hidden">
        Scroll
      </div>
    </section>
  );
}
